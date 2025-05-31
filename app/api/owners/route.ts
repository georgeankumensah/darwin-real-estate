import {prisma} from "@/lib/prisma";
import {NextRequest} from "next/server";
import {CreateUserSchema} from "@/lib/validators/owner.validation";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status") || "";

    const where: any = {
        type: 'OWNER',
    };

    if (search) {
        where.OR = [
            { email: { contains: search, mode: "insensitive" } },
            { firstName: { contains: search, mode: "insensitive" } },
            { lastName: { contains: search, mode: "insensitive" } },
        ];
    }

    if (status) {
        where.status = status;
    }

    // Get total count first
    const total = await prisma.user.count({ where });

    // Fetch paginated results
    const owners = await prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            status: true,
        },
    });

    return new Response(JSON.stringify({
        owners,
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
}

export async function POST(request: Request) {
    const body = await request.json();

    const result = CreateUserSchema.safeParse(body);

    if (!result.success) {
        return new Response(JSON.stringify({errors: result.error.flatten()}), {
            status: 400,
            headers: {'Content-Type': 'application/json'},
        });
    }

    const property = await prisma.user.create({
        data: {
            ...result.data,
            type: 'OWNER',
        },
    });

    return new Response(JSON.stringify(property), {
        status: 201,
        headers: {'Content-Type': 'application/json'},
    });
}