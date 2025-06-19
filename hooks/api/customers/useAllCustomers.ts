import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {Customer} from "@/app/generated/prisma";
import {Pagination} from "@/lib/types/pagination";

export type TenantsResponse = {
    customers: Customer[];
    pagination: Pagination;
};

export type TenantFilters = {
    search?: string;
    status?: string;
    propertyId?: string;
    page?: number;
    limit?: number;
};

export const useAllCustomers = (filters: TenantFilters = {}) => {
    return useQuery({
        queryKey: ["customers", filters],
        queryFn: async () => {
            const params = new URLSearchParams();

            if (filters.search) params.append("search", filters.search);
            if (filters.status) params.append("status", filters.status);
            if (filters.propertyId) params.append("propertyId", filters.propertyId);
            if (filters.page) params.append("page", filters.page.toString());
            if (filters.limit) params.append("limit", filters.limit.toString());

            const response = await api.get<TenantsResponse>(`/customers?${params.toString()}`);
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
    });
};
