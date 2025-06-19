"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Badge} from "@/components/ui/badge"
import {Building2, DollarSign, TrendingUp, UserCheck, Users} from "lucide-react"
import {useDashboardMetrics} from "@/hooks/api/dashboard/useDashboardMetrics";
import {formatPrice} from "@/lib/helpers/formatPrice";

const getTransactionTypeColor = (type: string) => {
    switch (type) {
        case "RENT":
            return "bg-blue-100 text-blue-800"
        case "SALE":
            return "bg-green-100 text-green-800"
        case "DEPOSIT":
            return "bg-yellow-100 text-yellow-800"
        case "OTHER":
            return "bg-purple-100 text-purple-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "COMPLETED":
            return "bg-green-100 text-green-800"
        case "PENDING":
            return "bg-yellow-100 text-yellow-800"
        case "FAILED":
            return "bg-red-100 text-red-800"
        case "CANCELLED":
            return "bg-gray-100 text-gray-800"
        default:
            return "bg-muted text-muted-foreground"
    }
}

const getPropertyStatusColor = (status: string) => {
    switch (status) {
        case "FOR_SALE":
            return "bg-blue-500"
        case "FOR_RENT":
            return "bg-green-500"
        case "SOLD":
            return "bg-purple-500"
        case "RENTED":
            return "bg-orange-500"
        default:
            return "bg-gray-500"
    }
}

export default function DashboardPage() {
    const {data: dashboardData, isLoading, error} = useDashboardMetrics();

    if (isLoading) {
        return <div className="p-6">Loading dashboard...</div>;
    }

    if (error || !dashboardData) {
        return <div className="p-6">Error loading dashboard data</div>;
    }

    // Calculate total revenue from completed transactions
    const totalRevenue = dashboardData.recentTransactions
        .filter((txn) => txn.status === "COMPLETED")
        .reduce((sum, txn) => sum + txn.amount, 0)

    return (
        <div className="space-y-6 p-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
                <p className="text-muted-foreground">Welcome back! Here's what's happening with your properties
                    today.</p>
            </div>

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                        <Building2 className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dashboardData.totalProperties}</div>
                        <p className="text-xs text-muted-foreground">Across all statuses</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dashboardData.totalUsers}</div>
                        <p className="text-xs text-muted-foreground">Property owners & admins</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dashboardData.totalCustomers}</div>
                        <p className="text-xs text-muted-foreground">Active tenants & buyers</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Property Status Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle>Property Status</CardTitle>
                        <CardDescription>Current status of all properties</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {Object.entries(dashboardData.propertyStats).map(([status, count]) => (
                                <div key={status} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${getPropertyStatusColor(status)}`}></div>
                                        <span className="text-sm">{status.replace("_", " ")}</span>
                                    </div>
                                    <span className="font-semibold">{count}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common tasks and shortcuts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                <Building2 className="h-6 w-6 text-blue-600"/>
                                <span className="text-sm font-medium">Add Property</span>
                            </button>
                            <button
                                className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                <Users className="h-6 w-6 text-green-600"/>
                                <span className="text-sm font-medium">Add Customer</span>
                            </button>
                            <button
                                className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                <DollarSign className="h-6 w-6 text-purple-600"/>
                                <span className="text-sm font-medium">Record Transaction</span>
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Latest financial transactions across all properties</CardDescription>
                </CardHeader>
                <CardContent>
                    {dashboardData.recentTransactions.length > 0 ? (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Reference</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Property</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Payment Method</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dashboardData.recentTransactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell className="font-mono text-sm">{transaction.refNumber}</TableCell>
                                            <TableCell>
                                                <Badge className={getTransactionTypeColor(transaction.transactionType)}>
                                                    {transaction.transactionType}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">
                                                        {transaction.customerFirstName} {transaction.customerLastName}
                                                    </div>
                                                    <div
                                                        className="text-sm text-muted-foreground">{transaction.customerEmail}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-[200px]">
                                                <div>
                                                    <div
                                                        className="font-medium truncate">{transaction.propertyTitle}</div>
                                                    <div
                                                        className="text-sm text-muted-foreground truncate">{transaction.propertyAddress}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {formatPrice(transaction.amount, transaction.currency as 'USD' | 'GHS')}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                {transaction.transactionDate instanceof Date
                                                    ? transaction.transactionDate.toLocaleDateString()
                                                    : new Date(transaction.transactionDate).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>{transaction.paymentMethod.replace("_", " ")}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-center py-4">No transactions found</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
