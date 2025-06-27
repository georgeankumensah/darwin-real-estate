"use client";

import Link from "next/link";
import {Plus, Filter, X, ChevronLeft, ChevronRight} from "lucide-react";
import {useState} from "react";
import {useAllProperties} from "@/hooks/api/properties/useAllProperties";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {usePropertyFilters} from "@/hooks/filters/usePropertyFilters";
import {FilterPanel, FilterState, initialFilters} from "@/components/ui/filters-panel";
import {clearSpecificFilter, getActiveFilterBadges, getActiveFiltersCount} from "@/lib/utils/filterBadges";
import {PropertyCard} from "@/components/ui/property-card";
import {PropertyCardSkeleton} from "@/components/ui/skeletons/PropertyCardSkeleton";

export default function PropertiesPage() {
    const [filters, setFilters] = useState<FilterState>(initialFilters);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Create pagination filters object
    const paginationFilters = {
        ...filters,
        minPrice: filters.minPrice ? Number.parseFloat(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? Number.parseFloat(filters.maxPrice) : undefined,
        minArea: filters.minArea ? Number.parseInt(filters.minArea) : undefined,
        maxArea: filters.maxArea ? Number.parseInt(filters.maxArea) : undefined,
        minYear: filters.minYear ? Number.parseInt(filters.minYear) : undefined,
        maxYear: filters.maxYear ? Number.parseInt(filters.maxYear) : undefined,
        bedrooms: filters.bedrooms ? Number.parseInt(filters.bedrooms) : undefined,
        bathrooms: filters.bathrooms ? Number.parseInt(filters.bathrooms) : undefined,
        page: currentPage,
        limit: itemsPerPage,
    };

    const {data, isLoading, isError} = useAllProperties(paginationFilters);
    const resetFilters = () => {
        setFilters(initialFilters);
        setCurrentPage(1); // Reset to first page when filters are cleared
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (value: string) => {
        setItemsPerPage(Number.parseInt(value));
        setCurrentPage(1); // Reset to first page when items per page changes
    };

    const activeFiltersCount = getActiveFiltersCount(filters);
    const activeFilterBadges = getActiveFilterBadges(filters);

    const handleClearSpecificFilter = (key: string) => {
        setFilters(clearSpecificFilter(filters, key));
        setCurrentPage(1); // Reset to first page when a filter is cleared
    };

    if (isError) {
        return (
            <div className="p-6 text-center">
                <p className="text-red-500">Error loading properties. Please try again.</p>
            </div>
        );
    }

    const properties = data?.properties || [];
    const pagination = data?.pagination;

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
                    {isLoading ? "Loading..." : `${pagination?.total || 0} properties found`}
                </p>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                {isLoading ? (
                    // Loading skeletons
                    Array(8).fill(0).map((_, index) => (
                        <PropertyCardSkeleton key={index}/>
                    ))
                ) : properties.length > 0 ? (
                    // Property cards
                    properties.map((property) => (
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
    );
}
