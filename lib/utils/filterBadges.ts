import {FilterState} from "@/components/ui/filters-panel";


const statusOptions = [
    { value: "FOR_SALE", label: "For Sale" },
    { value: "FOR_RENT", label: "For Rent" },
    { value: "SOLD", label: "Sold" },
    { value: "RENTED", label: "Rented" },
];

export interface FilterBadge {
    key: string;
    label: string;
}

export function getActiveFilterBadges(filters: FilterState): FilterBadge[] {
    const badges: FilterBadge[] = [];

    if (filters.propertyType && filters.propertyType !== "all") {
        badges.push({ key: "propertyType", label: filters.propertyType });
    }

    if (filters.status && filters.status !== "all") {
        badges.push({
            key: "status",
            label: statusOptions.find((s) => s.value === filters.status)?.label || filters.status,
        });
    }

    if (filters.bedrooms && filters.bedrooms !== "any") {
        badges.push({ key: "bedrooms", label: `${filters.bedrooms} bed` });
    }

    if (filters.bathrooms && filters.bathrooms !== "any") {
        badges.push({ key: "bathrooms", label: `${filters.bathrooms} bath` });
    }

    if (filters.minPrice || filters.maxPrice) {
        const priceLabel = `$${filters.minPrice || "0"} - $${filters.maxPrice || "∞"}`;
        badges.push({ key: "price", label: priceLabel });
    }

    if (filters.minArea || filters.maxArea) {
        const areaLabel = `${filters.minArea || "0"} - ${filters.maxArea || "∞"} sq ft`;
        badges.push({ key: "area", label: areaLabel });
    }

    if (filters.minYear || filters.maxYear) {
        const yearLabel = `${filters.minYear || "0"} - ${filters.maxYear || new Date().getFullYear()}`;
        badges.push({ key: "year", label: yearLabel });
    }

    return badges;
}

export function getActiveFiltersCount(filters: FilterState): number {
    return Object.values(filters).filter(
        (value) => value !== "" && value !== "all" && value !== "any"
    ).length;
}

export function clearSpecificFilter(filters: FilterState, key: string): FilterState {
    if (key === "price") {
        return { ...filters, minPrice: "", maxPrice: "" };
    }
    if (key === "area") {
        return { ...filters, minArea: "", maxArea: "" };
    }
    if (key === "year") {
        return { ...filters, minYear: "", maxYear: "" };
    }
    return { ...filters, [key]: "" };
}
