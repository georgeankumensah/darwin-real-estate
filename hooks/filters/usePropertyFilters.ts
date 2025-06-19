import { useMemo } from "react";
import { Property } from "@/app/generated/prisma";
import {FilterState} from "@/components/ui/filters-panel";

export function usePropertyFilters(properties: Property[], filters: FilterState) {
    const filteredProperties = useMemo(() => {
        if (!properties.length) return [];

        return properties.filter((property) => {
            // Property Type filter
            if (filters.propertyType && filters.propertyType !== "all" && property.propertyType !== filters.propertyType) {
                return false;
            }

            // Status filter
            if (filters.status && filters.status !== "all" && property.status !== filters.status) {
                return false;
            }

            // Bedrooms filter
            if (filters.bedrooms && filters.bedrooms !== "any") {
                if (filters.bedrooms === "5+") {
                    if (property.bedrooms < 5) return false;
                } else {
                    if (property.bedrooms !== Number.parseInt(filters.bedrooms)) return false;
                }
            }

            // Bathrooms filter
            if (filters.bathrooms && filters.bathrooms !== "any") {
                if (filters.bathrooms === "5+") {
                    if (property.bathrooms < 5) return false;
                } else {
                    if (property.bathrooms !== Number.parseInt(filters.bathrooms)) return false;
                }
            }

            // Price range filter
            if (filters.minPrice && property.price < Number.parseFloat(filters.minPrice)) {
                return false;
            }
            if (filters.maxPrice && property.price > Number.parseFloat(filters.maxPrice)) {
                return false;
            }

            // Area range filter
            if (filters.minArea && property.area < Number.parseInt(filters.minArea)) {
                return false;
            }
            if (filters.maxArea && property.area > Number.parseInt(filters.maxArea)) {
                return false;
            }

            // Year built filter
            if (filters.minYear && property.yearBuilt < Number.parseInt(filters.minYear)) {
                return false;
            }
            if (filters.maxYear && property.yearBuilt > Number.parseInt(filters.maxYear)) {
                return false;
            }

            return true;
        });
    }, [properties, filters]);

    return { filteredProperties };
}
