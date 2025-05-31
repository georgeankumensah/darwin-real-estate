import {api} from "@/lib/api";
import {useQuery} from "@tanstack/react-query";

export type Tenant = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    location: string;
    status: string;
    properties: string[];
    image: string;
    createdAt: string;
};

export type Pagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};


export type TenantsResponse = {
    tenants: Tenant[];
    pagination: Pagination;
};


export type TenantFilters = {
    search?: string;
    status?: string;
    properties?: string;
    page?: number;
    limit?: number;
};

export const useAllTenants = (filters: TenantFilters = {}) => {

    return useQuery({
        queryKey: ["tenants", filters],
        queryFn: async () => {
            const params = new URLSearchParams();

            if (filters.search) params.append("search", filters.search);
            if (filters.status) params.append("status", filters.status);
            if (filters.properties) params.append("properties", filters.properties);
            if (filters.page) params.append("page", filters.page.toString());
            if (filters.limit) params.append("limit", filters.limit.toString());

            const response = await api.get<TenantsResponse>(
                `/tenants/?${params.toString()}`
            );

            return response.data;
        },

        staleTime: 5 * 60 * 1000,
        // cacheTime: 10 * 60 * 1000,
    });
};