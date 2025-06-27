"use client";

import {
    Download,
    Search,
    SlidersHorizontal,
    X,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {useAllTransactions} from "@/hooks/api/transactions/useAllTransactions";
import {Skeleton} from "@/components/ui/skeleton";
import {useTransactionFilters} from "@/hooks/filters/useTransactionFilters";
import {generateAndDownloadCsv} from "@/lib/helpers/generateCsv";
import {useState} from "react";
import { TransactionRowSkeleton } from "@/components/ui/skeletons/TransactionRowSkeleton";

type Filter = {
    type: string;
    status: string;
    amount: string;
};

export default function TransactionsClientPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    
    const { data, isLoading } = useAllTransactions({
        page: currentPage,
        limit: itemsPerPage,
    });
    const transactions = data?.transactions || [];
    const pagination = data?.pagination

    const {
        searchQuery,
        setSearchQuery,
        tempFilters,
        setTempFilters,
        activeFilters,
        applyFilters,
        resetFilters,
        clearAllFilters,
        removeFilter,
        filteredTransactions,
    } = useTransactionFilters(transactions);

    const handleExport = () => {
        generateAndDownloadCsv({
            data: filteredTransactions,
            fileName: "transactions-" + Date.now(),
            headers: [
                { name: "Ref Number", accessor: "refNumber" },
                { name: "Amount", accessor: "amount" },
                { name: "Property Name", accessor: "property.title" },
                { name: "Property Address", accessor: "property.address" },
                { name: "Customer First Name", accessor: "customerFirstName" },
                { name: "Customer Last Name", accessor: "customerLastName" },
                { name: "Customer Email", accessor: "customerEmail" },
                { name: "Customer Phone", accessor: "customerPhoneNumber" },
                { name: "Status", accessor: "status" },
                { name: "Date", accessor: "createdAt" },
            ],
        });
    };
    
    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (value: string) => {
        setItemsPerPage(Number.parseInt(value));
        setCurrentPage(1); // Reset to first page when items per page changes
    };

    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                        View and manage all your financial transactions.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                            <Input
                                type="search"
                                placeholder="Search transactions..."
                                className="w-full pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-x-[10px]">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <SlidersHorizontal className="mr-2 h-4 w-4"/>
                                        Filter
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[200px]">
                                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <div className="p-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="type-filter">Type</Label>
                                            <Select
                                                value={tempFilters.type}
                                                onValueChange={(value) =>
                                                    setTempFilters({...tempFilters, type: value})
                                                }
                                            >
                                                <SelectTrigger id="type-filter">
                                                    <SelectValue placeholder="Any type"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">Any type</SelectItem>
                                                    <SelectItem value="sale">Sale</SelectItem>
                                                    <SelectItem value="deposit">Deposit</SelectItem>
                                                    <SelectItem value="commission">Commission</SelectItem>
                                                    <SelectItem value="rental">Rental</SelectItem>
                                                    <SelectItem value="refund">Refund</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2 mt-4">
                                            <Label htmlFor="status-filter">Status</Label>
                                            <Select
                                                value={tempFilters.status}
                                                onValueChange={(value) =>
                                                    setTempFilters({...tempFilters, status: value})
                                                }
                                            >
                                                <SelectTrigger id="status-filter">
                                                    <SelectValue placeholder="Any status"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">Any status</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="failed">Failed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2 mt-4">
                                            <Label htmlFor="amount-filter">Amount</Label>
                                            <Select
                                                value={tempFilters.amount}
                                                onValueChange={(value) =>
                                                    setTempFilters({...tempFilters, amount: value})
                                                }
                                            >
                                                <SelectTrigger id="amount-filter">
                                                    <SelectValue placeholder="Any amount"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">Any amount</SelectItem>
                                                    <SelectItem value="small">
                                                        Less than $10,000
                                                    </SelectItem>
                                                    <SelectItem value="medium">
                                                        $10,000 - $99,999
                                                    </SelectItem>
                                                    <SelectItem value="large">
                                                        $100,000 - $999,999
                                                    </SelectItem>
                                                    <SelectItem value="xlarge">$1,000,000+</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={resetFilters}
                                            >
                                                Reset
                                            </Button>
                                            <Button size="sm" onClick={applyFilters}>
                                                Apply Filters
                                            </Button>
                                        </div>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                                <Button variant="outline" onClick={handleExport}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Export
                                </Button>
                        </div>
                    </div>

                    {activeFilters.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {activeFilters.map((filter, index) => (
                                <Badge
                                    key={index}
                                    variant="outline"
                                    className="flex items-center gap-1"
                                >
                                    {filter}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-4 w-4 p-0 hover:bg-transparent"
                                        onClick={() => removeFilter(filter)}
                                    >
                                        <X className="h-3 w-3"/>
                                    </Button>
                                </Badge>
                            ))}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={clearAllFilters}
                            >
                                Clear all
                            </Button>
                        </div>
                    )}

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Transaction ID</TableHead>
                                    <TableHead>Property</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    Array(5).fill(0).map((_, index) => (
                                        <TransactionRowSkeleton key={index}/>
                                    ))
                                ) : filteredTransactions.length > 0 ? (
                                    filteredTransactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell className="font-medium">
                                                {transaction.id}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-md overflow-hidden">
                                                        <img
                                                            src={
                                                                transaction.property.media[0].url || "/placeholder.svg"
                                                            }
                                                            alt={transaction.property.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">
                                                            {transaction.property.title}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                            {transaction.property.address}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{transaction.transactionType}</TableCell>
                                            <TableCell>
                                                ${transaction.amount.toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(transaction.transactionDate).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        transaction.status === "COMPLETED"
                                                            ? "default"
                                                            : transaction.status === "PENDING"
                                                                ? "outline"
                                                                : "secondary"
                                                    }
                                                    className={
                                                        transaction.status === "COMPLETED"
                                                            ? "bg-green-500"
                                                            : transaction.status === "FAILED"
                                                                ? "bg-red-500"
                                                                : ""
                                                    }
                                                >
                                                    {transaction.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            Actions
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/transactions/${transaction.id}`}>
                                                                View Details
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            Edit Transaction
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            Download Receipt
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator/>
                                                        <DropdownMenuItem className="text-destructive">
                                                            Void Transaction
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            No transactions found matching your filters.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        
                        {/* Pagination */}
                        {!isLoading && pagination && pagination.totalPages > 1 && (
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-2">
                                    <Select
                                        value={itemsPerPage.toString()}
                                        onValueChange={handleItemsPerPageChange}
                                    >
                                        <SelectTrigger className="w-[100px]">
                                            <SelectValue placeholder="Per page" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="5">5 per page</SelectItem>
                                            <SelectItem value="10">10 per page</SelectItem>
                                            <SelectItem value="20">20 per page</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <span className="text-sm text-muted-foreground">
                            Showing{" "}
                                        {pagination.page === 1
                                            ? 1
                                            : (pagination.page - 1) * itemsPerPage + 1}
                                        -
                                        {Math.min(
                                            pagination.page * itemsPerPage,
                                            pagination.total
                                        )}{" "}
                                        of {pagination.total}
                        </span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => goToPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>

                                    {Array.from(
                                        { length: Math.min(pagination.totalPages, 5) },
                                        (_, i) => {
                                            // Show pages around current page
                                            let pageNum = i + 1;
                                            if (pagination.totalPages > 5) {
                                                if (currentPage > 3) {
                                                    pageNum = currentPage - 3 + i;
                                                }
                                                if (currentPage > pagination.totalPages - 2) {
                                                    pageNum = pagination.totalPages - 4 + i;
                                                }
                                            }

                                            return (
                                                <Button
                                                    key={pageNum}
                                                    variant={currentPage === pageNum ? "default" : "outline"}
                                                    size="icon"
                                                    onClick={() => goToPage(pageNum)}
                                                    className="w-8 h-8"
                                                >
                                                    {pageNum}
                                                </Button>
                                            );
                                        }
                                    )}

                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => goToPage(currentPage + 1)}
                                        disabled={
                                            currentPage === pagination.totalPages ||
                                            pagination.totalPages === 0
                                        }
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
