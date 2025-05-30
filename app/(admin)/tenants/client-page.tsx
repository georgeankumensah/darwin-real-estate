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
import TenantsTable from "@/components/ui/tables/Tenants";

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

export default function TenantsClientPage() {
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
    <div className="p-6 flex-1 min-h-screen  space-y-4">
        <div className="flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-semibold">Tenants</h1>
          <p className="text-muted-foreground">
            Manage your tenant relationships
          </p>
        </div>
        <Button asChild>
          <Link href="/tenants/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Tenant
          </Link>
        </Button>
        </div>
        <TenantsTable/>
    
    </div>
  );
}
