"use client"

import {ArrowLeft, Mail, MapPin, Phone, User, Building2, DollarSign, Download} from "lucide-react"
import Link from "next/link"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {TableCell, TableBody, TableHead, TableRow, TableHeader, Table} from "@/components/ui/table"
import {useOwnerById} from "@/hooks/api/owners/useOwnerById";
import {useParams} from "next/navigation";
import {formatPrice} from "@/lib/helpers/formatPrice";
import {generateAndDownloadCsv} from "@/lib/helpers/generateCsv";

export default function OwnerDetailPage() {
    const params = useParams();
    const ownerId = params.id as string;
    const {data: owner, isLoading, error} = useOwnerById(ownerId);

    if (isLoading) {
        return <div className="p-6">Loading...</div>;
    }

    if (error || !owner) {
        return <div className="p-6">Owner not found</div>;
    }

    // Get transactions from the owner data
    const transactions = owner.transactions || [];

    const getStatusBadge = (status: string) => {
        const statusColors = {
            FOR_SALE: "bg-blue-500",
            FOR_RENT: "bg-green-500",
            SOLD: "bg-gray-500",
            RENTED: "bg-purple-500",
        }
        return statusColors[status as keyof typeof statusColors] || "bg-gray-500"
    }

    const getTransactionTypeBadge = (type: string) => {
        const typeColors = {
            RENT: "bg-green-500",
            SALE: "bg-blue-500",
            DEPOSIT: "bg-yellow-500",
            OTHER: "bg-gray-500",
        }
        return typeColors[type as keyof typeof typeColors] || "bg-gray-500"
    }

    const handleExport = () => {
        generateAndDownloadCsv({
            data: transactions,
            fileName: "transactions-" + Date.now(),
            headers: [
                { name: "Ref Number", accessor: "refNumber" },
                { name: "Type", accessor: "type" },
                { name: "Property Name", accessor: "property.title" },
                { name: "Property Address", accessor: "property.address" },
                { name: "Customer First Name", accessor: "customer.firstName" },
                { name: "Customer Last Name", accessor: "customer.lastName" },
                { name: "Customer Email", accessor: "customer.email" },
                { name: "Customer Phone", accessor: "customerPhoneNumber" },
                { name: "Amound", accessor: "amount" },
                { name: "Status", accessor: "status" },
                { name: "Date", accessor: "createdAt" },
                {name: "Payment Method", accessor: "paymentMethod"},
            ],
        });
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/owners">
                        <ArrowLeft className="h-4 w-4"/>
                    </Link>
                </Button>
                <h1 className="text-2xl font-semibold">Owner Profile</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <Avatar className="h-24 w-24">
                                <AvatarImage
                                    src={owner.profileImage || "/placeholder.svg?height=96&width=96"}
                                    alt={`${owner.firstName} ${owner.lastName}`}
                                />
                                <AvatarFallback className="text-2xl">
                                    {owner.firstName[0]}
                                    {owner.lastName[0]}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <CardTitle>
                            {owner.firstName} {owner.lastName}
                        </CardTitle>
                        <CardDescription>Property Owner</CardDescription>
                        <div className="mt-2">
                            <Badge
                                className={owner.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"}>{owner.status}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4 text-muted-foreground"/>
                                <span>{owner.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4 text-muted-foreground"/>
                                <span>{owner.phoneNumber}</span>
                            </div>
                            {owner.altPhoneNumber && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground"/>
                                    <span>{owner.altPhoneNumber} (Alt)</span>
                                </div>
                            )}
                            {owner.location && (
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-muted-foreground"/>
                                    <span>{owner.location}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2 text-sm">
                                <User className="h-4 w-4 text-muted-foreground"/>
                                <span>Owner since {new Date(owner.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 pt-4">
                            <Button>
                                <Phone className="mr-2 h-4 w-4"/>
                                Contact Owner
                            </Button>
                            <Button variant="outline">
                                <Mail className="mr-2 h-4 w-4"/>
                                Send Email
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-muted-foreground"/>
                                    {owner.ownedProperties?.length || 0}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-muted-foreground"/>
                                    {transactions.length}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {formatPrice(
                                        transactions.reduce((sum, txn) => sum + txn.amount, 0),
                                        transactions[0]?.currency as 'USD' | 'GHS' || "USD",
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Tabs defaultValue="properties">
                        <TabsList>
                            <TabsTrigger value="properties">Properties</TabsTrigger>
                            <TabsTrigger value="transactions">Transactions</TabsTrigger>
                        </TabsList>

                        <TabsContent value="properties" className="space-y-4 pt-4">
                            <h2 className="text-xl font-medium">Owned Properties</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {owner.ownedProperties?.map((property) => (
                                    <Card key={property.id}>
                                        <div className="aspect-video overflow-hidden rounded-t-lg">
                                            <img
                                                src={property.media?.[0]?.url || "/placeholder.svg?height=200&width=300"}
                                                alt={property.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <CardContent className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-medium">{property.title}</h3>
                                                    <p className="text-sm text-muted-foreground">{property.address}</p>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {property.bedrooms} bed • {property.bathrooms} bath
                                                        • {property.area} sq ft
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <div
                                                        className="text-sm font-medium">{formatPrice(property.price, property.currency as 'USD' | 'GHS')}</div>
                                                    <div
                                                        className="text-xs text-muted-foreground">Built {property.yearBuilt}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <Badge
                                                    className={getStatusBadge(property.status)}>{property.status.replace("_", " ")}</Badge>
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={`/properties/${property.id}`}>View Details</Link>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )) || <p className="text-muted-foreground">No properties found</p>}
                            </div>
                        </TabsContent>

                        <TabsContent value="transactions" className="pt-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-medium mb-4">Property Transactions</h2>
                                <Button variant="outline" onClick={handleExport}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Export
                                </Button>
                            </div>
                            {transactions.length > 0 ? (
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Reference</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Property</TableHead>
                                                <TableHead>Customer</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Payment Method</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {transactions.map((transaction) => (
                                                <TableRow key={transaction.id}>
                                                    <TableCell
                                                        className="font-mono text-sm">{transaction.refNumber}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            className={getTransactionTypeBadge(transaction.transactionType)}>
                                                            {transaction.transactionType}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <div
                                                                className="font-medium">{transaction.propertyTitle}</div>
                                                            <div
                                                                className="text-sm text-muted-foreground">{transaction.propertyAddress}</div>
                                                        </div>
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
                                                    <TableCell className="font-medium">
                                                        {formatPrice(transaction.amount, transaction.currency as 'USD' | 'GHS')}
                                                    </TableCell>
                                                    <TableCell>{new Date(transaction.transactionDate).toLocaleDateString()}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={transaction.status === "COMPLETED" ? "default" : "secondary"}
                                                            className={transaction.status === "COMPLETED" ? "bg-green-500" : ""}
                                                        >
                                                            {transaction.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>{transaction.paymentMethod.replace("_", " ")}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No transactions found</p>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}