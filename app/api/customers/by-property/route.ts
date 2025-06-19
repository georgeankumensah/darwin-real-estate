import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("id");

    if (!propertyId) {
        return new Response(JSON.stringify({ error: "Missing property ID" }), {
            status: 400
        });
    }

    const tenants = await prisma.customer.findMany({
        where: { propertyId },
        orderBy: { createdAt: "desc" }
    });

    return new Response(JSON.stringify(tenants), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}
