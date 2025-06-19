import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Prisma } from "@/app/generated/prisma";

const ownerWithPropsAndTransactions = Prisma.validator<Prisma.UserInclude>()({
    ownedProperties: {
        include: {
            media: true,
            transactions: {
                orderBy: {
                    transactionDate: 'desc'
                }
            }
        }
    }
});

type OwnerWithPropertiesAndTransactions = Prisma.UserGetPayload<{
    include: typeof ownerWithPropsAndTransactions;
}> & {
    transactions: Prisma.TransactionGetPayload<{}>[];
};

export const useOwnerById = (id?: string) => {
    return useQuery<OwnerWithPropertiesAndTransactions>({
        queryKey: ["owner", id],
        queryFn: async () => {
            const response = await api.get<OwnerWithPropertiesAndTransactions>(`/owners/${id}`);
            return response.data;
        },
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
};
