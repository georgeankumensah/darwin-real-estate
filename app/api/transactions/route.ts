import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { CreateTransactionSchema } from "@/lib/validators/transaction.validation";
import {$Enums, TransactionType} from "@/app/generated/prisma";
import TransactionStatus = $Enums.TransactionStatus;
import PaymentMethod = $Enums.PaymentMethod;

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const skip = (page - 1) * limit;

        const search = searchParams.get("search")?.trim() || "";
        const status = searchParams.get("status")?.toUpperCase() || "";

        const where: any = {};

        if (search) {
            where.OR = [
                { refNumber: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
                { customerFirstName: { contains: search, mode: "insensitive" } },
                { customerLastName: { contains: search, mode: "insensitive" } },
                { customerEmail: { contains: search, mode: "insensitive" } },
                { propertyTitle: { contains: search, mode: "insensitive" } },
                { propertyAddress: { contains: search, mode: "insensitive" } },
            ];
        }

        if (status) {
            where.status = status;
        }

        const total = await prisma.transaction.count({ where });

        const transactions = await prisma.transaction.findMany({
            where,
            skip,
            take: limit,
            orderBy: { transactionDate: "desc" },
            select: {
                id: true,
                transactionType: true,
                amount: true,
                transactionDate: true,
                status: true,
                refNumber: true,
                customerFirstName: true,
                customerLastName: true,
                customerEmail: true,
                customerPhoneNumber: true,
                customerStartDate: true,
                customerEndDate: true,
                propertyTitle: true,
                propertyAddress: true,
                property: {
                    select: {
                        media: true,
                        title: true,
                        address: true,
                    },
                },
            },
        });

        return new Response(JSON.stringify({
            transactions,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("GET /transactions error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch transactions" }), {
            status: 500,
        });
    }
}

export async function POST(request: Request) {
    const body = await request.json();
    const result = CreateTransactionSchema.safeParse(body);

    if (!result.success) {
        return new Response(JSON.stringify({ errors: result.error.flatten() }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const data = result.data;

    try {
        const property = await prisma.property.findUnique({
            where: { id: data.propertyId },
            select: {
                title: true,
                address: true,
            },
        });

        if (!property) {
            return new Response(JSON.stringify({ error: "Invalid propertyId" }), {
                status: 400,
            });
        }

        const transaction = await prisma.transaction.create({
            data: {
                ...data,
                status: data.status.toUpperCase() as TransactionStatus,
                transactionType: data.transactionType.toUpperCase() as TransactionType,
                paymentMethod: data.paymentMethod.toUpperCase() as PaymentMethod,
                propertyTitle: property.title,
                propertyAddress: property.address,
            },
        });

        return new Response(JSON.stringify(transaction), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error("POST /transactions error:", error);

        const code = error?.code;

        if (code === "P2003") {
            // Foreign key constraint failed
            return new Response(JSON.stringify({
                error: "Invalid propertyId",
            }), { status: 400 });
        }

        return new Response(JSON.stringify({
            error: "Failed to create transaction",
        }), { status: 500 });
    }
}
