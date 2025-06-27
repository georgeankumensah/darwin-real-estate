"use client"

import {useState, useEffect} from "react"
import {PlusCircle, Search, SlidersHorizontal, X, ChevronLeft, ChevronRight} from "lucide-react"
import Link from "next/link"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useAllOwners} from "@/hooks/api/owners/useAllOwners"
import {useDebounce} from "@/hooks/useDebounce"
import {OwnersTableSkeleton} from "@/components/ui/skeletons/OwnersTableSkeleton";
import {toast} from "@/hooks/use-toast";



type Filter = {
    status?: string
}

export default function OwnersClientPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const debouncedSearchQuery = useDebounce(searchQuery, 300)
    const [filters, setFilters] = useState<Filter>({})
    const [tempFilters, setTempFilters] = useState<Filter>({})
    const [activeFilters, setActiveFilters] = useState<string[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    // Create filters object for API call
    const apiFilters = {
        search: debouncedSearchQuery,
        status: filters.status && filters.status !== "all" ? filters.status : undefined,
        page: currentPage,
        limit: itemsPerPage
    }

    const {data, isLoading, isError, error} = useAllOwners(apiFilters)
    const owners = data?.owners || []
    const pagination = data?.pagination

    useEffect(() => {
        if (isError) {
            toast({
                variant: "destructive",
                title: "Error loading owners",
                description: error?.message || "An unknown error occurred.",
            });
        }
    }, [isError, error]);

    const goToPage = (page: number) => {
        setCurrentPage(page)
    }

    const handleItemsPerPageChange = (value: string) => {
        setItemsPerPage(Number.parseInt(value))
        setCurrentPage(1) // Reset to first page when items per page changes
    }

    const applyFilters = () => {
        const newFilters = { ...tempFilters }

        // Normalize "all" to empty strings so they don't interfere with logic
        if (newFilters.status === "all") newFilters.status = ""

        setFilters(newFilters)
        setCurrentPage(1) // Reset to first page when filters are applied

        const newActiveFilters: string[] = []

        if (newFilters.status) {
            let statusLabel = newFilters.status
            if (newFilters.status === "active") statusLabel = "Active"
            else if (newFilters.status === "inactive") statusLabel = "Inactive"
            else if (newFilters.status === "banned") statusLabel = "Banned"
            newActiveFilters.push(`Status: ${statusLabel}`)
        }

        setActiveFilters(newActiveFilters)
    }

    const resetFilters = () => {
        setTempFilters({
            status: "all"
        })
    }

    const clearAllFilters = () => {
        setFilters({
            status: "all"
        })
        setTempFilters({
            status: "all"
        })
        setActiveFilters([])
        setCurrentPage(1) // Reset to first page when filters are cleared
    }

    const removeFilter = (filter: string) => {
        const newActiveFilters = activeFilters.filter((f) => f !== filter)
        setActiveFilters(newActiveFilters)

        const updatedFilters = { ...filters }
        const updatedTempFilters = { ...tempFilters }

        if (filter.startsWith("Status:")) {
            updatedFilters.status = ""
            updatedTempFilters.status = ""
        }

        setFilters(updatedFilters)
        setTempFilters(updatedTempFilters)
        setCurrentPage(1) // Reset to first page when a filter is removed
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Owners</h1>
                    <p className="text-muted-foreground">Manage your real estate owners</p>
                </div>
                <Button asChild>
                    <Link href="/owners/new">
                        <PlusCircle className="mr-2 h-4 w-4"/>
                        Add Owner
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Owners</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pagination?.total || 0}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Active Owners</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{owners.filter((owner) => owner.status === "ACTIVE").length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$19.7M</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>Owner List</CardTitle>
                    <CardDescription>View and manage all your real estate owners.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                            <Input
                                type="search"
                                placeholder="Search owners..."
                                className="w-full pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        h1.classname
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
                                        <Label htmlFor="status-filter">Status</Label>
                                        <Select
                                            value={tempFilters.status}
                                            onValueChange={(value) => setTempFilters({...tempFilters, status: value})}
                                        >
                                            <SelectTrigger id="status-filter">
                                                <SelectValue placeholder="Any status"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Any status</SelectItem>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                                <SelectItem value="banned">Banned</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <Button variant="outline" size="sm" onClick={resetFilters}>
                                            Reset
                                        </Button>
                                        <Button size="sm" onClick={applyFilters}>
                                            Apply Filters
                                        </Button>
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {activeFilters.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {activeFilters.map((filter, index) => (
                                <Badge key={index} variant="outline" className="flex items-center gap-1">
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
                            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={clearAllFilters}>
                                Clear all
                            </Button>
                        </div>
                    )}

                    {/* Results count */}
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-muted-foreground">
                            {isLoading ? "Loading..." : `${pagination?.total || 0} owners found`}
                        </p>
                    </div>

                    {isLoading ? (
                        <OwnersTableSkeleton />
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Owner</TableHead>
                                        <TableHead>Properties</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {owners.length > 0 ? (
                                        owners.map((owner) => (
                                            <TableRow key={owner.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarImage
                                                                src={"/placeholder.svg"}
                                                                alt={`${owner.firstName} ${owner.lastName}`}
                                                            />
                                                            <AvatarFallback>
                                                                {owner.firstName[0]}
                                                                {owner.lastName[0]}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">
                                                                {owner.firstName} {owner.lastName}
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">{owner.email}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">0</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={owner.status.toLowerCase() === "active" ? "default" : "secondary"}
                                                        className={owner.status === "ACTIVE" ? "bg-green-500" : ""}
                                                    >
                                                        {owner.status}
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
                                                                <Link href={`/owners/${owner.id}`}>View Details</Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>Edit Owner</DropdownMenuItem>
                                                            <DropdownMenuSeparator/>
                                                            <DropdownMenuItem className="text-destructive">
                                                                Deactivate Owner
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-24 text-center">
                                                No owners found matching your filters.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {/* Pagination */}
                    {!isLoading && pagination && (
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
                                        <SelectItem value="50">50 per page</SelectItem>
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
                </CardContent>
            </Card>
        </div>
    )
}
