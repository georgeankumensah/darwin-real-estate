"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {useAllTenants} from "@/hooks/api/tenants/useAllTenants";

type Filter = {
  location?: string;
};

export default function TenantsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const [filters, setFilters] = useState<Filter>({})
  const [tempFilters, setTempFilters] = useState<Filter>({})
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const {data, isLoading, isError, error} = useAllTenants({
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

    // Location filter
    const matchesLocation =
        !filters.location || filters.location === "all" ||
        tenant.location?.includes(
            filters.location === "new-york"
                ? "New York"
                : filters.location === "los-angeles"
                    ? "Los Angeles"
                    : filters.location === "chicago"
                        ? "Chicago"
                        : filters.location === "miami"
                            ? "Miami"
                            : filters.location === "seattle"
                                ? "Seattle"
                                : ""
        );

    return matchesSearch && matchesLocation;
  });

  const applyFilters = () => {
    setFilters(tempFilters);

    // Update active filters
    const newActiveFilters: string[] = [];

    if (tempFilters.location && tempFilters.location !== "all") {
      const locationLabel =
          tempFilters.location === "new-york"
              ? "New York"
              : tempFilters.location === "los-angeles"
                  ? "Los Angeles"
                  : tempFilters.location === "chicago"
                      ? "Chicago"
                      : tempFilters.location === "miami"
                          ? "Miami"
                          : tempFilters.location === "seattle"
                              ? "Seattle"
                              : "";
      newActiveFilters.push(`Location: ${locationLabel}`);
    }

    setActiveFilters(newActiveFilters);
  };

  const resetFilters = () => {
    setTempFilters({
      location: "all",
    });
  };

  const clearAllFilters = () => {
    setFilters({
      location: "all",
    });
    setTempFilters({
      location: "all",
    });
    setActiveFilters([]);
  };

  const removeFilter = (filter: string) => {
    const newActiveFilters = activeFilters.filter((f) => f !== filter);
    setActiveFilters(newActiveFilters);

    // Update the actual filters
    if (filter.startsWith("Location:")) {
      setFilters({ ...filters, location: "all" });
      setTempFilters({ ...tempFilters, location: "all" });
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
                  <Label htmlFor="location-filter">Location</Label>
                  <Select
                      value={tempFilters.location || "all"}
                      onValueChange={(value) =>
                          setTempFilters({ ...tempFilters, location: value })
                      }
                  >
                    <SelectTrigger id="location-filter">
                      <SelectValue placeholder="Any location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any location</SelectItem>
                      <SelectItem value="new-york">New York, NY</SelectItem>
                      <SelectItem value="los-angeles">
                        Los Angeles, CA
                      </SelectItem>
                      <SelectItem value="chicago">Chicago, IL</SelectItem>
                      <SelectItem value="miami">Miami, FL</SelectItem>
                      <SelectItem value="seattle">Seattle, WA</SelectItem>
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

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Properties</TableHead>
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
                        <TableCell>{tenant.location || "—"}</TableCell>
                        <TableCell>{tenant.phoneNumber}</TableCell>
                        <TableCell>
                          {tenant.properties > 0 ? (
                              <Badge variant="outline">{tenant.properties}</Badge>
                          ) : (
                              <span className="text-muted-foreground">None</span>
                          )}
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

      </div>
  );
}