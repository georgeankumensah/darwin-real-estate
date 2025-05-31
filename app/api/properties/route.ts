import {prisma} from "@/lib/prisma";
import {uploadToCloudinary} from "@/lib/helpers/cloudinary";
import {validateEnumValue} from "@/lib/helpers/validateEnum";
import {$Enums} from "@/app/generated/prisma";
import PropertyStatus = $Enums.PropertyStatus;
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const search = searchParams.get("search")?.trim() || "";

    const where: any = {};

    if (search) {
        where.OR = [
            {title: {contains: search, mode: "insensitive"}},
            {address: {contains: search, mode: "insensitive"}},
        ];
    }

    const total = await prisma.properties.count({where});

    const properties = await prisma.properties.findMany({
        where,
        skip,
        take: limit,
        orderBy: {createdAt: "desc"},
        select: {
            id: true,
            title: true,
            images: true,
            address: true,
            currency: true,
            price: true,
            description: true,
        },
    });

    // Map to Property type and pick the first image
    const result = properties.map((prop) => ({
        id: prop.id,
        title: prop.title,
        image: prop.images?.[0] || "", // Fallback to empty string if no image
        address: prop.address,
        currency: prop.currency,
        price: prop.price.toString(),
        description: prop.description,
    }));

    return new Response(
        JSON.stringify({
            properties: result,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        }),
        {
            status: 200,
            headers: {"Content-Type": "application/json"},
        }
    );
}

export async function POST(request: Request) {
    const formData = await request.formData();

    const title = formData.get('title')?.toString() || '';
    const description = formData.get('description')?.toString() || '';
    const propertyType = formData.get('propertyType')?.toString() || '';
    const currency = formData.get('currency')?.toString() || '';
    const price = parseFloat(formData.get('price') as string) || 0;
    const bedrooms = parseInt(formData.get('bedrooms') as string) || 0;
    const bathrooms = parseInt(formData.get('bathrooms') as string) || 0;
    const area = parseInt(formData.get('area') as string) || 0;
    const yearBuilt = parseInt(formData.get('yearBuilt') as string) || 0;
    const address = formData.get('address')?.toString() || '';
    const rawStatus = formData.get('status')?.toString() || '';

    const status = validateEnumValue(PropertyStatus, rawStatus, PropertyStatus.FOR_SALE);

    // Upload each image file to Cloudinary
    const imageFiles = formData.getAll('images') as File[];

    const uploadedImages = await Promise.all(imageFiles.map(uploadToCloudinary));

    const property = await prisma.properties.create({
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
            images: uploadedImages,
        },
    });

    return new Response(JSON.stringify(property), {
        status: 201,
        headers: {'Content-Type': 'application/json'},
    });
}
