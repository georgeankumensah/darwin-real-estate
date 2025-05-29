"use client";

import { useState } from "react";
import { PlusCircle, Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

// Sample tenant data based on the User model
const allTenants = [
  {
    id: "cus_001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1 (555) 123-4567",
    phoneNumber2: null,
    image: "/placeholder.svg?height=40&width=40",
    role: "TENANT",
    location: "New York, NY",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-15T10:30:00Z",
    properties: 2,
  },
  {
    id: "cus_002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phoneNumber: "+1 (555) 987-6543",
    phoneNumber2: "+1 (555) 456-7890",
    image: "/placeholder.svg?height=40&width=40",
    role: "TENANT",
    location: "Los Angeles, CA",
    createdAt: "2023-06-20T14:45:00Z",
    updatedAt: "2023-06-20T14:45:00Z",
    properties: 1,
  },
  {
    id: "cus_003",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    phoneNumber: "+1 (555) 234-5678",
    phoneNumber2: null,
    image: "/placeholder.svg?height=40&width=40",
    role: "TENANT",
    location: "Chicago, IL",
    createdAt: "2023-07-10T09:15:00Z",
    updatedAt: "2023-07-10T09:15:00Z",
    properties: 3,
  },
  {
    id: "cus_004",
    firstName: "Emily",
    lastName: "Williams",
    email: "emily.williams@example.com",
    phoneNumber: "+1 (555) 345-6789",
    phoneNumber2: null,
    image: "/placeholder.svg?height=40&width=40",
    role: "TENANT",
    location: "Miami, FL",
    createdAt: "2023-08-05T16:20:00Z",
    updatedAt: "2023-08-05T16:20:00Z",
    properties: 0,
  },
  {
    id: "cus_005",
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@example.com",
    phoneNumber: "+1 (555) 456-7890",
    phoneNumber2: "+1 (555) 567-8901",
    image: "/placeholder.svg?height=40&width=40",
    role: "TENANT",
    location: "Seattle, WA",
    createdAt: "2023-09-12T11:30:00Z",
    updatedAt: "2023-09-12T11:30:00Z",
    properties: 1,
  },
];

type Filter = {
  location: string;
  properties: string;
};

export default function TenantsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filter>({
    location: "all",
    properties: "all",
  });
  const [tempFilters, setTempFilters] = useState<Filter>({
    location: "all",
    properties: "all",
  });
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Apply filters to the tenant list
  const filteredTenants = allTenants.filter((tenant) => {
    // Search filter
    const searchString =
      `${tenant.firstName} ${tenant.lastName} ${tenant.email} ${tenant.phoneNumber}`.toLowerCase();
    const matchesSearch =
      searchQuery === "" || searchString.includes(searchQuery.toLowerCase());

    // Location filter
    const matchesLocation =
      filters.location === "all" ||
      tenant.location.includes(
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

    // Properties filter
    const matchesProperties =
      filters.properties === "all" ||
      (filters.properties === "0" && tenant.properties === 0) ||
      (filters.properties === "1-2" &&
        tenant.properties >= 1 &&
        tenant.properties <= 2) ||
      (filters.properties === "3+" && tenant.properties >= 3);

    return matchesSearch && matchesLocation && matchesProperties;
  });

  const applyFilters = () => {
    setFilters(tempFilters);

    // Update active filters
    const newActiveFilters: string[] = [];

    if (tempFilters.location !== "all") {
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

    if (tempFilters.properties !== "all") {
      const propertiesLabel =
        tempFilters.properties === "0"
          ? "None"
          : tempFilters.properties === "1-2"
          ? "1-2 properties"
          : tempFilters.properties === "3+"
          ? "3+ properties"
          : "";
      newActiveFilters.push(`Properties: ${propertiesLabel}`);
    }

    setActiveFilters(newActiveFilters);
  };

  const resetFilters = () => {
    setTempFilters({
      location: "all",
      properties: "all",
    });
  };

  const clearAllFilters = () => {
    setFilters({
      location: "all",
      properties: "all",
    });
    setTempFilters({
      location: "all",
      properties: "all",
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
    } else if (filter.startsWith("Properties:")) {
      setFilters({ ...filters, properties: "all" });
      setTempFilters({ ...tempFilters, properties: "all" });
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
                      value={tempFilters.location}
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
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="properties-filter">Properties</Label>
                    <Select
                      value={tempFilters.properties}
                      onValueChange={(value) =>
                        setTempFilters({ ...tempFilters, properties: value })
                      }
                    >
                      <SelectTrigger id="properties-filter">
                        <SelectValue placeholder="Any number" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any number</SelectItem>
                        <SelectItem value="0">None</SelectItem>
                        <SelectItem value="1-2">1-2 properties</SelectItem>
                        <SelectItem value="3+">3+ properties</SelectItem>
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
