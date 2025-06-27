import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        // Get total counts
        const [totalProperties, totalUsers, totalCustomers] = await Promise.all([
            prisma.property.count({
                where: {
                    deletedAt: null,
                },
            }),
            prisma.user.count({
                where: {
                    deletedAt: null,
                },
            }),
            prisma.customer.count({
                where: {
                    deletedAt: null,
                },
            }),
        ])

        // Get property stats grouped by status
        const propertyStatsRaw = await prisma.property.groupBy({
            by: ['status'],
            _count: true,
            where: {
                deletedAt: null,
            },
        })

        // Transform property stats to match expected format
        const propertyStats: Record<string, number> = {}
        propertyStatsRaw.forEach(stat => {
            propertyStats[stat.status] = stat._count
        })

        // Get recent transactions with all needed fields
        const recentTransactions = await prisma.transaction.findMany({
            orderBy: { transactionDate: 'desc' },
            take: 10,
            select: {
                id: true,
                refNumber: true,
                transactionType: true,
                amount: true,
                currency: true,
                transactionDate: true,
                status: true,
                paymentMethod: true,
                propertyTitle: true,
                propertyAddress: true,
                customerFirstName: true,
                customerLastName: true,
                customerEmail: true,
            },
        })

        return NextResponse.json({
            totalProperties,
            totalUsers,
            totalCustomers,
            propertyStats,
            recentTransactions,
        })
    } catch (error) {
        console.error('Dashboard API error:', error)
        return new NextResponse(JSON.stringify({ error: "Failed to fetch dashboard data" }), { status: 500 })
    }
}
