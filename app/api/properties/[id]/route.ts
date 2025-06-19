import {NextRequest} from 'next/server';
import {prisma} from '@/lib/prisma';
import {uploadToCloudinary, deleteFromCloudinary} from '@/lib/helpers/cloudinary';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;

    try {
        const property = await prisma.property.findUnique({
            where: {id},
            include: {
                owner: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                tenants: true,
                media: true,
            },
        });

        if (!property) {
            return new Response(JSON.stringify({error: 'Property not found'}), {
                status: 404,
            });
        }

        return new Response(JSON.stringify(property), {
            status: 200,
            headers: {'Content-Type': 'application/json'},
        });
    } catch (error) {
        console.error("GET /property/:id error:", error);
        return new Response(JSON.stringify({error: 'Failed to fetch property'}), {
            status: 500,
        });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;

    try {
        const property = await prisma.property.findUnique({
            where: {id},
            include: {media: true},
        });

        if (!property) {
            return new Response(JSON.stringify({error: 'Property not found'}), {
                status: 404,
            });
        }

        // Delete media from Cloudinary
        await Promise.all(
            property.media.map(media =>
                deleteFromCloudinary(media.publicId, media.type as 'image' | 'video')
            )
        );

        // Delete property (cascade deletes media if configured, or explicitly delete media first)
        await prisma.media.deleteMany({where: {propertyId: id}});
        await prisma.property.delete({where: {id}});

        return new Response(null, {status: 204});
    } catch (error: any) {
        const message =
            error?.code === 'P2025'
                ? 'Property not found'
                : 'Failed to delete property';

        return new Response(JSON.stringify({error: message}), {
            status: error?.code === 'P2025' ? 404 : 500,
        });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const propertyId = (await params).id;
    const formData = await request.formData();

    try {
        const updates: any = {};

        for (const [key, value] of formData.entries()) {
            if (key === 'addMedia') {
                const files = formData.getAll('addMedia') as File[];
                const uploaded = await Promise.all(
                    files.map(async file => {
                        const type = file.type.startsWith('video') ? 'video' : 'image';
                        const {secure_url, public_id} = await uploadToCloudinary(file, {
                            resourceType: type,
                        });

                        return {
                            url: secure_url,
                            publicId: public_id,
                            type,
                            propertyId,
                        };
                    })
                );

                await prisma.media.createMany({data: uploaded});
            }

            if (key === 'removeMedia') {
                const publicIds = JSON.parse(value as string) as string[];

                const mediaToDelete = await prisma.media.findMany({
                    where: {
                        publicId: {in: publicIds},
                        propertyId,
                    },
                });

                await Promise.all(
                    mediaToDelete.map(media =>
                        deleteFromCloudinary(media.publicId, media.type as 'image' | 'video')
                    )
                );

                await prisma.media.deleteMany({
                    where: {
                        publicId: {in: publicIds},
                        propertyId,
                    },
                });
            }

            if (
                !['addMedia', 'removeMedia'].includes(key) &&
                typeof value === 'string' &&
                value.trim().length > 0
            ) {
                updates[key] = isNaN(Number(value)) ? value : Number(value);
            }
        }

        const updatedProperty = await prisma.property.update({
            where: {id: propertyId},
            data: updates,
        });

        return new Response(JSON.stringify({property: updatedProperty}), {
            status: 200,
            headers: {'Content-Type': 'application/json'},
        });
    } catch (error: any) {
        console.error("PATCH /property/:id error:", error);
        const message =
            error?.code === 'P2025'
                ? 'Property not found'
                : 'Failed to update property';

        return new Response(JSON.stringify({error: message}), {
            status: error?.code === 'P2025' ? 404 : 500,
        });
    }
}
