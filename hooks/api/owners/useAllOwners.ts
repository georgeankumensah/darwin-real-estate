import {api} from "@/lib/api";
import {useQuery} from "@tanstack/react-query";
import {User} from "@/app/generated/prisma";

export type Pagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};


export type OwnersResponse = {
    owners: User[];
    pagination: Pagination;
};

export type OwnerFilters = {
    search?: string;
    status?: string;
    properties?: string;
    page?: number;
    limit?: number;
};

export const useAllOwners = (filters: OwnerFilters = {}) => {

    return useQuery({
        queryKey: ["owners", filters],
        queryFn: async () => {
            const params = new URLSearchParams();

            if (filters.search) params.append("search", filters.search);
            if (filters.status) params.append("status", filters.status);
            if (filters.properties) params.append("properties", filters.properties);
            if (filters.page) params.append("page", filters.page.toString());
            if (filters.limit) params.append("limit", filters.limit.toString());

            const response = await api.get<OwnersResponse>(
                `/owners/?${params.toString()}`
            );

            return response.data;
        },

        staleTime: 5 * 60 * 1000,
    });
};