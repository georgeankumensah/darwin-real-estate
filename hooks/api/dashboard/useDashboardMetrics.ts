import {api} from "@/lib/api";
import {useQuery} from "@tanstack/react-query";

type DashboardTransaction = {
    id: string;
    refNumber: string;
    transactionType: string;
    amount: number;
    currency: string;
    transactionDate: string | Date;
    status: string;
    paymentMethod: string;
    propertyTitle: string;
    propertyAddress: string;
    customerFirstName: string;
    customerLastName: string;
    customerEmail: string;
};

type DashboardResponse = {
    totalProperties: number;
    totalUsers: number;
    totalCustomers: number;
    propertyStats: Record<string, number>;
    recentTransactions: DashboardTransaction[];
};

export const useDashboardMetrics = () => {
    return useQuery<DashboardResponse>({
        queryKey: ["dashboard"],
        queryFn: async () => {
            const response = await api.get<DashboardResponse>(`/dashboard`);

            // Transform date strings to Date objects
            return {
                ...response.data,
                recentTransactions: response.data.recentTransactions.map(txn => ({
                    ...txn,
                    transactionDate: new Date(txn.transactionDate),
                }))
            };
        },
        staleTime: 5 * 60 * 1000,
    });
};