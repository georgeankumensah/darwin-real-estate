import {prisma} from "@/lib/prisma";
import {uploadToCloudinary} from "@/lib/helpers/cloudinary";
import {validateEnumValue} from "@/lib/helpers/validateEnum";
import {$Enums} from "@/app/generated/prisma";
import {NextRequest} from "next/server";
import PropertyStatus = $Enums.PropertyStatus;

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const search = searchParams.get("search")?.trim() || "";
    const currency = searchParams.get("currency") || "";
    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "0");
    const status = searchParams.get("status") || "";

    const where: any = {};

    if (search) {
        where.OR = [
            { title: { contains: search, mode: "insensitive" } },
            { address: { contains: search, mode: "insensitive" } },
        ];
    }

    if (currency) where.currency = currency;
    if (status) where.status = status;
    if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = minPrice;
        if (maxPrice) where.price.lte = maxPrice;
    }

    const total = await prisma.property.count({ where });

    const properties = await prisma.property.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
            media: {
                select: {
                    id: true,
                    url: true,
                    type: true,
                    publicId: true,
                    createdAt: true,
                    propertyId: true,
                },
            },
        },
    });

    return new Response(JSON.stringify({
        properties,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export async function POST(request: Request) {
    const formData = await request.formData();

    try {
        const title = formData.get('title')?.toString();
        const description = formData.get('description')?.toString();
        const propertyType = formData.get('propertyType')?.toString();
        const currency = formData.get('currency')?.toString();
        const price = parseFloat(formData.get('price') as string);
        const bedrooms = parseInt(formData.get('bedrooms') as string) || 0;
        const bathrooms = parseInt(formData.get('bathrooms') as string) || 0;
        const area = parseInt(formData.get('area') as string) || 0;
        const yearBuilt = parseInt(formData.get('yearBuilt') as string) || 0;
        const address = formData.get('address')?.toString();
        const rawStatus = formData.get('status')?.toString() || '';
        const ownerId = formData.get('ownerId')?.toString() || null;

        // Validation
        if (!title || !description || !currency || !propertyType || !price || !address) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Validate price is positive
        if (price <= 0) {
            return new Response(JSON.stringify({ error: "Price must be greater than 0" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Validate owner exists if provided
        if (ownerId) {
            const ownerExists = await prisma.user.findUnique({
                where: { id: ownerId }
            });

            if (!ownerExists) {
                return new Response(JSON.stringify({ error: "Owner not found" }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        }

        const status = validateEnumValue(PropertyStatus, rawStatus, PropertyStatus.FOR_SALE);
        const mediaFiles = formData.getAll('media') as File[];

        // Upload media to Cloudinary (if any)
        const uploadedMedia: { url: string; publicId: string; type: string; }[] = [];
        if (mediaFiles.length > 0) {
            const uploadPromises = mediaFiles.map(async (file) => {
                try {
                    // Determine if it's an image or video
                    const isVideo = file.type.startsWith('video/');

                    const result = await uploadToCloudinary(file, {
                        folder: isVideo ? 'properties/videos' : 'properties/images',
                        resourceType: isVideo ? 'video' : 'image',
                    });

                    return {
                        url: result.secure_url,
                        publicId: result.public_id,
                        type: isVideo ? 'video' : 'image',
                    };
                } catch (err) {
                    console.error(`Media upload failed for file ${file.name}:`, err);
                    throw new Error(`Failed to upload ${file.name}`);
                }
            });

            try {
                const results = await Promise.all(uploadPromises);
                uploadedMedia.push(...results);
            } catch (uploadError) {
                return new Response(JSON.stringify({
                    error: "Failed to upload one or more media files"
                }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        }

        // Create property with transaction for data consistency
        const property = await prisma.$transaction(async (tx) => {
            return tx.property.create({
                data: {
                    title,
                    description,
                    propertyType,
                    currency,
                    price,
                    bedrooms,
                    bathrooms,
                    area,
                    yearBuilt,
                    address,
                    status,
                    ownerId: ownerId || undefined,
                    media: {
                        create: uploadedMedia,
                    },
                },
                include: {
                    media: true,
                    owner: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        }
                    }
                },
            });
        });

        return new Response(JSON.stringify({
            message: "Property created successfully",
            property
        }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (err) {
        console.error("POST /properties error:", err);

        // Return more specific error messages
        if (err instanceof Error) {
            return new Response(JSON.stringify({
                error: err.message
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({
            error: "Failed to create property"
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
