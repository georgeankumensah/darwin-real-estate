"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useDebounce} from "@/hooks/useDebounce";
import {useAllCustomers} from "@/hooks/api/customers/useAllCustomers";
import { Skeleton } from "@/components/ui/skeleton";

function TenantsTableSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tenant</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Lease Term</TableHead>
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
              <TableCell>
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell><Skeleton className="h-4 w-40" /></TableCell>
              <TableCell><Skeleton className="h-4 w-24" /></TableCell>
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
  status?: string;
};

export default function TenantsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const [filters, setFilters] = useState<Filter>({})
  const [tempFilters, setTempFilters] = useState<Filter>({})
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const {data, isLoading, isError, error} = useAllCustomers({
    search: debouncedSearchQuery,
    page: 1,
    limit: 10
  })
  const tenants = data?.tenants || []

  // Apply filters to the tenant list
  const filteredTenants = tenants.filter((tenant) => {
    // Search filter
    const searchString =
        `${tenant.firstName} ${tenant.lastName} ${tenant.email} ${tenant.phoneNumber}`.toLowerCase();
    const matchesSearch =
        searchQuery === "" || searchString.includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus =
        !filters.status || filters.status === "all" ||
        (filters.status === "active" && tenant.status === "ACTIVE") ||
        (filters.status === "inactive" && tenant.status === "INACTIVE") ||
        (filters.status === "pending" && tenant.status === "PENDING");

    return matchesSearch && matchesStatus;
  });

  const applyFilters = () => {
    setFilters(tempFilters);

    // Update active filters
    const newActiveFilters: string[] = [];

    if (tempFilters.status && tempFilters.status !== "all") {
      const statusLabel =
          tempFilters.status === "active"
              ? "ACTIVE"
              : tempFilters.status === "inactive"
                  ? "INACTIVE"
                  : tempFilters.status === "pending"
                      ? "PENDING"
                      : "";
      newActiveFilters.push(`Status: ${statusLabel}`);
    }

    setActiveFilters(newActiveFilters);
  };

  const resetFilters = () => {
    setTempFilters({
      status: "all",
    });
  };

  const clearAllFilters = () => {
    setFilters({
      status: "all",
    });
    setTempFilters({
      status: "all",
    });
    setActiveFilters([]);
  };

  const removeFilter = (filter: string) => {
    const newActiveFilters = activeFilters.filter((f) => f !== filter);
    setActiveFilters(newActiveFilters);

    // Update the actual filters
    if (filter.startsWith("Status:")) {
      setFilters({ ...filters, status: "all" });
      setTempFilters({ ...tempFilters, status: "all" });
    }
  };

  return (
      <div className=" space-y-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search tenants..."
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
                      value={tempFilters.status || "all"}
                      onValueChange={(value) =>
                          setTempFilters({ ...tempFilters, status: value })
                      }
                  >
                    <SelectTrigger id="status-filter">
                      <SelectValue placeholder="Any status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
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
                      <X className="h-3 w-3" />
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

        {isLoading ? (
          <TenantsTableSkeleton />
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Properties</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.length > 0 ? (
                    filteredTenants.map((tenant) => (
                        <TableRow key={tenant.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage
                                    src={tenant.image || "/placeholder.svg"}
                                    alt={`${tenant.firstName} ${tenant.lastName}`}
                                />
                                <AvatarFallback>
                                  {tenant.firstName[0]}
                                  {tenant.lastName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {tenant.firstName} {tenant.lastName}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {tenant.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{tenant.phoneNumber}</TableCell>
                          <TableCell>
                            {tenant.properties?.length > 0 ? (
                                <Badge variant="outline">{tenant.properties}</Badge>
                            ) : (
                                <span className="text-muted-foreground">None</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                                variant={tenant.status === "Active" ? "default" : "secondary"}
                                className={tenant.status === "Active" ? "bg-green-500" : ""}
                            >
                              {tenant.status || "Unknown"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(tenant.createdAt).toLocaleDateString()}
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
                                  <Link href={`/tenants/${tenant.id}`}>
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Edit Tenant</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  Delete Tenant
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No tenants found matching your filters.
                      </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

      </div>
  );
}
