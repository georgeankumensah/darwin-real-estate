import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } },
) {
    const id = params.id;

    try {
        const property = await prisma.properties.findUniqueOrThrow({
            where: { id },
        });

        return new Response(JSON.stringify(property), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Property not found' }), {
            status: 404,
        });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } },
) {
    const id = params.id;

    try {
        await prisma.properties.delete({
            where: { id },
        });

        return new Response(null, { status: 204 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Property not found' }), {
            status: 404,
        });
    }
}

export async function PATCH(){}