"use client"

import { useState } from "react"
import { PlusCircle, Search, SlidersHorizontal, X } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample owners data based on the User model
const allOwners = [
  {
    id: "agt_001",
    firstName: "Robert",
    lastName: "Chen",
    email: "robert.chen@realestate.com",
    phoneNumber: "+1 (555) 111-2233",
    phoneNumber2: null,
    image: "/placeholder.svg?height=40&width=40",
    role: "OWNER",
    location: "San Francisco, CA",
    createdAt: "2022-03-10T08:30:00Z",
    updatedAt: "2023-11-05T14:20:00Z",
    properties: 12,
    status: "Active",
    sales: "$4.2M",
  },
  {
    id: "agt_002",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@realestate.com",
    phoneNumber: "+1 (555) 222-3344",
    phoneNumber2: "+1 (555) 333-4455",
    image: "/placeholder.svg?height=40&width=40",
    role: "OWNER",
    location: "New York, NY",
    createdAt: "2022-05-15T10:45:00Z",
    updatedAt: "2023-10-20T09:15:00Z",
    properties: 8,
    status: "Active",
    sales: "$3.7M",
  },
  {
    id: "agt_003",
    firstName: "James",
    lastName: "Wilson",
    email: "james.wilson@realestate.com",
    phoneNumber: "+1 (555) 444-5566",
    phoneNumber2: null,
    image: "/placeholder.svg?height=40&width=40",
    role: "OWNER",
    location: "Miami, FL",
    createdAt: "2022-07-22T14:30:00Z",
    updatedAt: "2023-09-18T11:40:00Z",
    properties: 15,
    status: "Active",
    sales: "$5.1M",
  },
  {
    id: "agt_004",
    firstName: "Maria",
    lastName: "Garcia",
    email: "maria.garcia@realestate.com",
    phoneNumber: "+1 (555) 555-6677",
    phoneNumber2: null,
    image: "/placeholder.svg?height=40&width=40",
    role: "OWNER",
    location: "Los Angeles, CA",
    createdAt: "2022-09-05T09:20:00Z",
    updatedAt: "2023-11-10T16:25:00Z",
    properties: 10,
    status: "On Leave",
    sales: "$3.9M",
  },
  {
    id: "agt_005",
    firstName: "David",
    lastName: "Kim",
    email: "david.kim@realestate.com",
    phoneNumber: "+1 (555) 666-7788",
    phoneNumber2: "+1 (555) 777-8899",
    image: "/placeholder.svg?height=40&width=40",
    role: "OWNER",
    location: "Chicago, IL",
    createdAt: "2022-11-18T11:15:00Z",
    updatedAt: "2023-10-30T13:50:00Z",
    properties: 7,
    status: "Active",
    sales: "$2.8M",
  },
]

type Filter = {
  status: string
  location: string
  properties: string
}

export default function OwnersClientPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<Filter>({
    status: "all",
    location: "all",
    properties: "all",
  })
  const [tempFilters, setTempFilters] = useState<Filter>({
    status: "all",
    location: "all",
    properties: "all",
  })
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Apply filters to the owners list
  const filteredOwners = allOwners.filter((owner) => {
    // Search filter
    const searchString = `${owner.firstName} ${owner.lastName} ${owner.email} ${owner.phoneNumber}`.toLowerCase()
    const matchesSearch = searchQuery === "" || searchString.includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus =
      filters.status === "all" ||
      (filters.status === "active" && owner.status === "Active") ||
      (filters.status === "on-leave" && owner.status === "On Leave")

    // Location filter
    const matchesLocation =
      filters.location === "all" ||
      owner.location.includes(
        filters.location === "san-francisco"
          ? "San Francisco"
          : filters.location === "new-york"
            ? "New York"
            : filters.location === "miami"
              ? "Miami"
              : filters.location === "los-angeles"
                ? "Los Angeles"
                : filters.location === "chicago"
                  ? "Chicago"
                  : "",
      )

    // Properties filter
    const matchesProperties =
      filters.properties === "all" ||
      (filters.properties === "0-5" && owner.properties >= 0 && owner.properties <= 5) ||
      (filters.properties === "6-10" && owner.properties >= 6 && owner.properties <= 10) ||
      (filters.properties === "11+" && owner.properties >= 11)

    return matchesSearch && matchesStatus && matchesLocation && matchesProperties
  })

  const applyFilters = () => {
    setFilters(tempFilters)

    // Update active filters
    const newActiveFilters: string[] = []

    if (tempFilters.status !== "all") {
      const statusLabel = tempFilters.status === "active" ? "Active" : "On Leave"
      newActiveFilters.push(`Status: ${statusLabel}`)
    }

    if (tempFilters.location !== "all") {
      const locationLabel =
        tempFilters.location === "san-francisco"
          ? "San Francisco"
          : tempFilters.location === "new-york"
            ? "New York"
            : tempFilters.location === "miami"
              ? "Miami"
              : tempFilters.location === "los-angeles"
                ? "Los Angeles"
                : tempFilters.location === "chicago"
                  ? "Chicago"
                  : ""
      newActiveFilters.push(`Location: ${locationLabel}`)
    }

    if (tempFilters.properties !== "all") {
      const propertiesLabel =
        tempFilters.properties === "0-5"
          ? "0-5 properties"
          : tempFilters.properties === "6-10"
            ? "6-10 properties"
            : tempFilters.properties === "11+"
              ? "11+ properties"
              : ""
      newActiveFilters.push(`Properties: ${propertiesLabel}`)
    }

    setActiveFilters(newActiveFilters)
  }

  const resetFilters = () => {
    setTempFilters({
      status: "all",
      location: "all",
      properties: "all",
    })
  }

  const clearAllFilters = () => {
    setFilters({
      status: "all",
      location: "all",
      properties: "all",
    })
    setTempFilters({
      status: "all",
      location: "all",
      properties: "all",
    })
    setActiveFilters([])
  }

  const removeFilter = (filter: string) => {
    const newActiveFilters = activeFilters.filter((f) => f !== filter)
    setActiveFilters(newActiveFilters)

    // Update the actual filters
    if (filter.startsWith("Status:")) {
      setFilters({ ...filters, status: "all" })
      setTempFilters({ ...tempFilters, status: "all" })
    } else if (filter.startsWith("Location:")) {
      setFilters({ ...filters, location: "all" })
      setTempFilters({ ...tempFilters, location: "all" })
    } else if (filter.startsWith("Properties:")) {
      setFilters({ ...filters, properties: "all" })
      setTempFilters({ ...tempFilters, properties: "all" })
    }
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
            <PlusCircle className="mr-2 h-4 w-4" />
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
            <div className="text-2xl font-bold">{allOwners.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Owners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allOwners.filter((owner) => owner.status === "Active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allOwners.reduce((sum, owner) => sum + owner.properties, 0)}</div>
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
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <div className="space-y-2">
                    <Label htmlFor="status-filter">Status</Label>
                    <Select
                      value={tempFilters.status}
                      onValueChange={(value) => setTempFilters({ ...tempFilters, status: value })}
                    >
                      <SelectTrigger id="status-filter">
                        <SelectValue placeholder="Any status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="on-leave">On Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="location-filter">Location</Label>
                    <Select
                      value={tempFilters.location}
                      onValueChange={(value) => setTempFilters({ ...tempFilters, location: value })}
                    >
                      <SelectTrigger id="location-filter">
                        <SelectValue placeholder="Any location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any location</SelectItem>
                        <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
                        <SelectItem value="new-york">New York, NY</SelectItem>
                        <SelectItem value="miami">Miami, FL</SelectItem>
                        <SelectItem value="los-angeles">Los Angeles, CA</SelectItem>
                        <SelectItem value="chicago">Chicago, IL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="properties-filter">Properties</Label>
                    <Select
                      value={tempFilters.properties}
                      onValueChange={(value) => setTempFilters({ ...tempFilters, properties: value })}
                    >
                      <SelectTrigger id="properties-filter">
                        <SelectValue placeholder="Any number" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any number</SelectItem>
                        <SelectItem value="0-5">0-5 properties</SelectItem>
                        <SelectItem value="6-10">6-10 properties</SelectItem>
                        <SelectItem value="11+">11+ properties</SelectItem>
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
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={clearAllFilters}>
                Clear all
              </Button>
            </div>
          )}

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
                            <div className="text-sm text-muted-foreground">{owner.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{owner.location}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{owner.properties}</Badge>
                      </TableCell>
                      <TableCell>{owner.sales}</TableCell>
                      <TableCell>
                        <Badge
                          variant={owner.status === "Active" ? "default" : "secondary"}
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Deactivate Owner</DropdownMenuItem>
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
        </CardContent>
      </Card>
    </div>
  )
}
