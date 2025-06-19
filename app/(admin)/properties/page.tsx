"use client";

import Link from "next/link";
import {Plus, Filter, X} from "lucide-react";
import {useState} from "react";
import {useAllProperties} from "@/hooks/api/properties/useAllProperties";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {usePropertyFilters} from "@/hooks/filters/usePropertyFilters";
import {FilterPanel, FilterState, initialFilters} from "@/components/ui/filters-panel";
import {clearSpecificFilter, getActiveFilterBadges, getActiveFiltersCount} from "@/lib/utils/filterBadges";
import {PropertyCard, PropertyCardSkeleton} from "@/components/ui/property-card";

export default function PropertiesPage() {
    const {data, isLoading, isError} = useAllProperties();
    const [filters, setFilters] = useState<FilterState>(initialFilters);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const properties = data?.properties || [];
    const {filteredProperties} = usePropertyFilters(properties, filters);

    const resetFilters = () => {
        setFilters(initialFilters);
    };

    const activeFiltersCount = getActiveFiltersCount(filters);
    const activeFilterBadges = getActiveFilterBadges(filters);

    const handleClearSpecificFilter = (key: string) => {
        setFilters(clearSpecificFilter(filters, key));
    };

    if (isError) {
        return (
            <div className="p-6 text-center">
                <p className="text-red-500">Error loading properties. Please try again.</p>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between space-y-1 w-full border-b pb-4">
                <div>
                    <h1 className="text-2xl font-medium">Properties</h1>
                    <p className="text-muted-foreground text-sm">
                        Luxury homes and apartments
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="sm" className="relative">
                                <Filter className="h-4 w-4 mr-2"/>
                                Filters
                                {activeFiltersCount > 0 && (
                                    <Badge variant="secondary"
                                           className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                                        {activeFiltersCount}
                                    </Badge>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-80">
                            <SheetHeader>
                                <SheetTitle>Filter Properties</SheetTitle>
                                <SheetDescription>
                                    Narrow down your search with these filters
                                </SheetDescription>
                            </SheetHeader>
                            <div className="mt-6">
                                <FilterPanel
                                    filters={filters}
                                    setFilters={setFilters}
                                    onReset={resetFilters}
                                />
                            </div>
                        </SheetContent>
                    </Sheet>

                    <Link
                        href="/properties/new"
                        className="flex items-center gap-2 bg-primary text-sm rounded-[6px] text-white px-4 py-2 hover:bg-primary/90 transition-colors"
                    >
                        <Plus className="h-6 w-6 text-white"/>
                        <span>Add Property</span>
                    </Link>
                </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    {activeFilterBadges.map((badge) => (
                        <Badge key={badge.key} variant="secondary" className="flex items-center gap-1">
                            {badge.label}
                            <X
                                className="h-3 w-3 cursor-pointer hover:text-destructive"
                                onClick={() => handleClearSpecificFilter(badge.key)}
                            />
                        </Badge>
                    ))}
                    <Button variant="ghost" size="sm" onClick={resetFilters}>
                        Clear all
                    </Button>
                </div>
            )}

            {/* Results count */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    {isLoading ? "Loading..." : `${filteredProperties.length} properties found`}
                </p>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                {isLoading ? (
                    // Loading skeletons
                    Array(8).fill(0).map((_, index) => (
                        <PropertyCardSkeleton key={index}/>
                    ))
                ) : filteredProperties.length > 0 ? (
                    // Property cards
                    filteredProperties.map((property) => (
                        <PropertyCard key={property.id} property={property}/>
                    ))
                ) : (
                    // Empty state
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                        <div className="text-muted-foreground mb-4">
                            <Filter className="h-12 w-12 mx-auto mb-4 opacity-50"/>
                            <h3 className="text-lg font-medium mb-2">No properties found</h3>
                            <p className="text-sm">Try adjusting your filters to see more results</p>
                        </div>
                        <Button variant="outline" onClick={resetFilters}>
                            Clear all filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
