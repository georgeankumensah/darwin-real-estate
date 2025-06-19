"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface FilterState {
    propertyType: string;
    status: string;
    bedrooms: string;
    bathrooms: string;
    minPrice: string;
    maxPrice: string;
    minArea: string;
    maxArea: string;
    minYear: string;
    maxYear: string;
}

export const initialFilters: FilterState = {
    propertyType: "",
    status: "",
    bedrooms: "",
    bathrooms: "",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
    minYear: "",
    maxYear: "",
};

const propertyTypes = ["House", "Apartment", "Condo", "Townhouse", "Villa", "Studio", "Duplex", "Penthouse"];

const statusOptions = [
    { value: "FOR_SALE", label: "For Sale" },
    { value: "FOR_RENT", label: "For Rent" },
    { value: "SOLD", label: "Sold" },
    { value: "RENTED", label: "Rented" },
];

const bedroomOptions = ["1", "2", "3", "4", "5+"];
const bathroomOptions = ["1", "2", "3", "4", "5+"];

interface FilterPanelProps {
    filters: FilterState;
    setFilters: (filters: FilterState) => void;
    onReset: () => void;
}

export function FilterPanel({ filters, setFilters, onReset }: FilterPanelProps) {
    const updateFilter = (key: keyof FilterState, value: string) => {
        setFilters({ ...filters, [key]: value });
    };

    const activeFiltersCount = Object.values(filters).filter((value) => value !== "").length;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Filters</h3>
                {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={onReset}>
                        <X className="h-4 w-4 mr-1" />
                        Clear All
                    </Button>
                )}
            </div>

            <div className="space-y-4">
                <div>
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select value={filters.propertyType} onValueChange={(value) => updateFilter("propertyType", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="All types" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All types</SelectItem>
                            {propertyTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={filters.status} onValueChange={(value) => updateFilter("status", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="All statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All statuses</SelectItem>
                            {statusOptions.map((status) => (
                                <SelectItem key={status.value} value={status.value}>
                                    {status.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="bedrooms">Bedrooms</Label>
                        <Select value={filters.bedrooms} onValueChange={(value) => updateFilter("bedrooms", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Any" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Any</SelectItem>
                                {bedroomOptions.map((bed) => (
                                    <SelectItem key={bed} value={bed}>
                                        {bed}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="bathrooms">Bathrooms</Label>
                        <Select value={filters.bathrooms} onValueChange={(value) => updateFilter("bathrooms", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Any" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Any</SelectItem>
                                {bathroomOptions.map((bath) => (
                                    <SelectItem key={bath} value={bath}>
                                        {bath}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div>
                    <Label>Price Range</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                        <Input
                            placeholder="Min price"
                            type="number"
                            value={filters.minPrice}
                            onChange={(e) => updateFilter("minPrice", e.target.value)}
                        />
                        <Input
                            placeholder="Max price"
                            type="number"
                            value={filters.maxPrice}
                            onChange={(e) => updateFilter("maxPrice", e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <Label>Area Range (sq ft)</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                        <Input
                            placeholder="Min area"
                            type="number"
                            value={filters.minArea}
                            onChange={(e) => updateFilter("minArea", e.target.value)}
                        />
                        <Input
                            placeholder="Max area"
                            type="number"
                            value={filters.maxArea}
                            onChange={(e) => updateFilter("maxArea", e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <Label>Year Built</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                        <Input
                            placeholder="From year"
                            type="number"
                            value={filters.minYear}
                            onChange={(e) => updateFilter("minYear", e.target.value)}
                        />
                        <Input
                            placeholder="To year"
                            type="number"
                            value={filters.maxYear}
                            onChange={(e) => updateFilter("maxYear", e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
