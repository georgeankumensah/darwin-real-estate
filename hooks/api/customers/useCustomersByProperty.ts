"use client"

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {useParams} from "next/navigation";
import {Customer} from "@/app/generated/prisma";

// export type TenantsResponse = {
//     customers: Tenant[];
//     pagination: Pagination;
// };

export type TenantFilters = {
    search?: string;
    status?: string;
    propertyId?: string;
    page?: number;
    limit?: number;
};

export const useCustomersByProperty = (filters: TenantFilters = {}) => {
    const {propertyId} = useParams()

    return useQuery({
        queryKey: ["tenants", filters, propertyId],
        queryFn: async () => {
            const params = new URLSearchParams();

            if (filters.search) params.append("search", filters.search);
            if (filters.status) params.append("status", filters.status);
            if (filters.page) params.append("page", filters.page.toString());
            if (filters.limit) params.append("limit", filters.limit.toString());

            const response = await api.get<Customer[]>(`/customers?id=${propertyId}&${params.toString()}`);
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
    });
};
