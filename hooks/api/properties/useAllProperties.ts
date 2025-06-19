import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "@/lib/types/pagination";
import {Prisma} from "@/app/generated/prisma";

export type PropertyWithMedia = Prisma.PropertyGetPayload<{
    include: { media: true }
}>;

export type PropertiesResponse = {
    properties: PropertyWithMedia[];
    pagination: Pagination;
};

export type PropertyFilters = {
    search?: string;
    status?: string;
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    minArea?: number;
    maxArea?: number;
    minYear?: number;
    maxYear?: number;
    page?: number;
    limit?: number;
};

export const useAllProperties = (filters: PropertyFilters = {}) => {
    return useQuery({
        queryKey: ["properties", filters],
        queryFn: async () => {
            const params = new URLSearchParams();

            // Basic filters
            if (filters.search) params.set("search", filters.search);
            if (filters.status && filters.status !== "all") params.set("status", filters.status);
            if (filters.propertyType && filters.propertyType !== "all") params.set("propertyType", filters.propertyType);

            // Numeric filters
            if (filters.minPrice) params.set("minPrice", filters.minPrice.toString());
            if (filters.maxPrice) params.set("maxPrice", filters.maxPrice.toString());
            if (filters.bedrooms) params.set("bedrooms", filters.bedrooms.toString());
            if (filters.bathrooms) params.set("bathrooms", filters.bathrooms.toString());
            if (filters.minArea) params.set("minArea", filters.minArea.toString());
            if (filters.maxArea) params.set("maxArea", filters.maxArea.toString());
            if (filters.minYear) params.set("minYear", filters.minYear.toString());
            if (filters.maxYear) params.set("maxYear", filters.maxYear.toString());

            // Pagination
            if (filters.page) params.set("page", filters.page.toString());
            if (filters.limit) params.set("limit", filters.limit.toString());

            const response = await api.get<PropertiesResponse>(
                `/properties?${params.toString()}`
            );

            return response.data;
        },
        staleTime: 5 * 60 * 1000,
    });
};
