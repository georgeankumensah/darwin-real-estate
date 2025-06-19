"use client"

import {useState} from "react"
import {PlusCircle, Search, SlidersHorizontal, X} from "lucide-react"
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
import {Skeleton} from "@/components/ui/skeleton";

function OwnersTableSkeleton() {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Owner</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Properties</TableHead>
                        <TableHead>Sales</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array(5).fill(0).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <div>
                                        <Skeleton className="h-5 w-32 mb-1" />
                                        <Skeleton className="h-4 w-40" />
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                            <TableCell><Skeleton className="h-6 w-12" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                            <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                            <TableCell className="text-right">
                                <Skeleton className="h-8 w-20 ml-auto" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

type Filter = {
    status?: string
}

export default function OwnersClientPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const debouncedSearchQuery = useDebounce(searchQuery, 300)
    const [filters, setFilters] = useState<Filter>({})
    const [tempFilters, setTempFilters] = useState<Filter>({})
    const [activeFilters, setActiveFilters] = useState<string[]>([])

    const {data, isLoading, isError, error} = useAllOwners({
        search: debouncedSearchQuery,
        status: filters.status && filters.status !== "all" ? filters.status : undefined,
        page: 1,
        limit: 10
    })
    const owners = data?.owners || []

    // Apply filters to the owners list
    const filteredOwners = owners.filter((owner) => {
        // Search filter
        const searchString = `${owner.firstName} ${owner.lastName} ${owner.email} ${owner.phoneNumber}`.toLowerCase()
        const matchesSearch = searchQuery === "" || searchString.includes(searchQuery.toLowerCase())

        // Status filter
        const matchesStatus =
            !filters.status || filters.status === "" ||
            (filters.status === "active" && owner.status === "ACTIVE") ||
            (filters.status === "inactive" && owner.status === "INACTIVE") ||
            (filters.status === "pending" && owner.status === "PENDING")

        return matchesSearch && matchesStatus
    })

    const applyFilters = () => {
        const newFilters = { ...tempFilters }

        // Normalize "all" to empty strings so they don't interfere with logic
        if (newFilters.status === "all") newFilters.status = ""

        setFilters(newFilters)

        const newActiveFilters: string[] = []

        if (newFilters.status) {
            newActiveFilters.push(`Status: ${newFilters.status === "active" ? "Active" : "On Leave"}`)
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
                        <div className="text-2xl font-bold">{owners.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Active Owners</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="text-2xl font-bold">{owners.filter((owner) => owner.status === "Active").length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div
                            // className="text-2xl font-bold">{owners.reduce((sum, owner) => sum + owner.properties.length, 0)}</div>
                        className="text-2xl font-bold">0</div>
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
                                                <SelectItem value="on-leave">On Leave</SelectItem>
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
                                    {filteredOwners.length > 0 ? (
                                        filteredOwners.map((owner) => (
                                            <TableRow key={owner.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarImage
                                                                src={owner.image || "/placeholder.svg"}
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
                                                            <div
                                                                className="text-sm text-muted-foreground">{owner.email}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                  <Badge variant="outline">{owner.properties}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                  <Badge
                                                      variant={owner.status.toLowerCase() === "active" ? "default" : "secondary"}
                                                      className={owner.status === "Active" ? "bg-green-500" : ""}
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
                                                            <DropdownMenuItem className="text-destructive">Deactivate
                                                                Owner</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-24 text-center">
                                                No owners found matching your filters.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
