import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {Customer} from "@/app/generated/prisma";

export const useCustomerById = (id: string) => {
    return useQuery({
        queryKey: ["customers", id],
        queryFn: async () => {
            const response = await api.get<Customer>(`/customers/${id}`);
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
    });
};
