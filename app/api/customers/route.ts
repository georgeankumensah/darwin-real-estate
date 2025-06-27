import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const tenants = await prisma.customer.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                property: {
                    select: { id: true, title: true, address: true }
                }
            }
        });

        return new Response(JSON.stringify(tenants), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to fetch tenants" }), {
            status: 500
        });
    }
}

export async function POST(request: Request) {
    const body = await request.json();

    const {
        firstName,
        lastName,
        phoneNumber,
        email,
        startDate,
        endDate,
        propertyId,
        status
    } = body;

    if (!firstName || !lastName || !phoneNumber || !propertyId || !startDate || !status) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
            status: 400
        });
    }

    try {
        const tenant = await prisma.customer.create({
            data: {
                firstName,
                lastName,
                phoneNumber,
                email,
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null,
                propertyId,
                status
            }
        });

        return new Response(JSON.stringify(tenant), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to create tenant" }), {
            status: 500
        });
    }
}
