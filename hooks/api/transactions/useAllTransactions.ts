import {api} from "@/lib/api";
import {useQuery} from "@tanstack/react-query";
import {Transaction} from "@/app/generated/prisma";
import {Pagination} from "@/lib/types/pagination";

export type TransactionWithProperty = Transaction & {
    property: {
        title: string;
        images: string[];
        address: string;
    };
};

export type TransactionsResponse = {
    transactions: TransactionWithProperty[];
    pagination: Pagination;
};

export type TransactionFilters = {
    search?: string;
    status?: string;
    properties?: string;
    page?: number;
    limit?: number;
};

export const useAllTransactions = (filters: TransactionFilters = {}) => {

    return useQuery({
        queryKey: ["transactions", filters],
        queryFn: async () => {
            const params = new URLSearchParams();

            if (filters.search) params.append("search", filters.search);
            if (filters.status) params.append("status", filters.status);
            if (filters.properties) params.append("properties", filters.properties);
            if (filters.page) params.append("page", filters.page.toString());
            if (filters.limit) params.append("limit", filters.limit.toString());

            const response = await api.get<TransactionsResponse>(
                `/transactions/?${params.toString()}`
            );

            return response.data;
        },

        staleTime: 5 * 60 * 1000,
        // cacheTime: 10 * 60 * 1000,
    });
};