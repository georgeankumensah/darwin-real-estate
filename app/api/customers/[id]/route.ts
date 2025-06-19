import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    try {
        const customer = await prisma.customer.findUniqueOrThrow({
            where: { id },
            include: {
                property: { select: { id: true, title: true } }
            }
        });

        return new Response(JSON.stringify(customer), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Tenant not found" }), {
            status: 404
        });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const body = await request.json();

    try {
        const updatedTenant = await prisma.customer.update({
            where: { id },
            data: {
                ...body,
                startDate: body.startDate ? new Date(body.startDate) : undefined,
                endDate: body.endDate ? new Date(body.endDate) : undefined
            }
        });

        return new Response(JSON.stringify(updatedTenant), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("PATCH tenant error:", error);
        return new Response(JSON.stringify({ error: "Failed to update tenant" }), {
            status: 500
        });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    try {
        await prisma.customer.delete({ where: { id } });

        return new Response(null, { status: 204 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to delete tenant" }), {
            status: 500
        });
    }
}
