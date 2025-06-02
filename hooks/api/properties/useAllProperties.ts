import {api} from "@/lib/api";
import {useQuery} from "@tanstack/react-query";

export type Property = {
    id: string;
    propertyType: string;
    status: string;
    title: string;
    images: string[];
    address: string;
    currency: string;
    price: string;
    description: string;
};

export type Pagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};


export type PropertiesResponse = {
    properties: Property[];
    pagination: Pagination;
};


export type PropertyFilters = {
    search?: string;
    status?: string;
    properties?: string;
    page?: number;
    limit?: number;
};

export const useAllProperties = (filters: PropertyFilters = {}) => {

    return useQuery({
        queryKey: ["properties", filters],
        queryFn: async () => {
            const params = new URLSearchParams();

            const response = await api.get<PropertiesResponse>(
                `/properties/?${params.toString()}`
            );

            return response.data;
        },

        staleTime: 5 * 60 * 1000,
        // cacheTime: 10 * 60 * 1000,
    });
};