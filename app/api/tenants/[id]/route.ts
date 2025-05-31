import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import {UpdateOwnerSchema} from "@/lib/validators/owner.validation";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } },
) {
    const id = params.id;

    try {
        const owner = await prisma.user.findUniqueOrThrow({
            where: { type: 'OWNER', id },
        });

        return new Response(JSON.stringify(owner), {
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
        await prisma.user.delete({
            where: { type: 'OWNER', id },
        });

        return new Response(null, { status: 204 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Property not found' }), {
            status: 404,
        });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } },
){
    const id = params.id;

    try {
        const body = await request.json();

        const result = UpdateOwnerSchema.safeParse(body);

        if (!result.success) {
            return new Response(JSON.stringify({ error: result.error.message }), {
                status: 400,
            });
        }

        const property = await prisma.user.update({
            where: { type: 'OWNER', id },
            data: {
                ...result.data,
            },
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