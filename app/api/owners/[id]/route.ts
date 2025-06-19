import {NextRequest} from 'next/server';
import {prisma} from '@/lib/prisma';
import {UpdateOwnerSchema} from "@/lib/validators/owner.validation";

export async function GET(
    request: NextRequest,
    {params}: { params: { id: string } },
) {
    const id = params.id;

    try {
        const owner = await prisma.user.findUniqueOrThrow({
            where: {id},
            include: {
                ownedProperties: {
                    include: {
                        media: true,
                        transactions: {
                            orderBy: {
                                transactionDate: 'desc'
                            }
                        }
                    }
                }
            },
        });

        // Flatten all transactions from all properties owned by this owner
        const allTransactions = owner.ownedProperties.flatMap(property =>
            property.transactions || []
        );

        // Add transactions as a separate field for easier access
        const ownerWithTransactions = {
            ...owner,
            transactions: allTransactions
        };

        return new Response(JSON.stringify(ownerWithTransactions), {
            status: 200,
            headers: {'Content-Type': 'application/json'},
        });
    } catch (error) {
        console.error('Error fetching owner:', error);
        return new Response(JSON.stringify({error: 'Owner not found'}), {
            status: 404,
        });
    }
}

export async function DELETE(
    request: NextRequest,
    {params}: { params: { id: string } },
) {
    const id = params.id;

    try {
        await prisma.user.delete({
            where: {type: 'OWNER', id},
        });

        return new Response(null, {status: 204});
    } catch (error) {
        console.error('Error deleting owner:', error);
        return new Response(JSON.stringify({error: 'Owner not found'}), {
            status: 404,
        });
    }
}

export async function PATCH(
    request: NextRequest,
    {params}: { params: { id: string } },
) {
    const id = params.id;

    try {
        const body = await request.json();

        const result = UpdateOwnerSchema.safeParse(body);

        if (!result.success) {
            return new Response(JSON.stringify({error: result.error.message}), {
                status: 400,
            });
        }

        const owner = await prisma.user.update({
            where: {type: 'OWNER', id},
            data: {
                ...result.data,
            },
        });

        return new Response(JSON.stringify(owner), {
            status: 200,
            headers: {'Content-Type': 'application/json'},
        });
    } catch (error) {
        console.error('Error updating owner:', error);
        return new Response(JSON.stringify({error: 'Owner not found'}), {
            status: 404,
        });
    }
}
