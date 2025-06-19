import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export const useRemoveCustomer = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async (customerId: string) => {
            await api.delete(`/customers/${customerId}`);
            return customerId;
        },
        onSuccess: (customerId) => {
            toast({
                variant: "success",
                description: `Tenant removed successfully`,
            });
            queryClient.invalidateQueries({ queryKey: ["customers"] });
            queryClient.invalidateQueries({ queryKey: ["customers", customerId] });
        },
        onError: (error: any) => {
            console.error("Failed to remove tenant:", error?.response?.data || error.message);
            toast({
                variant: "error",
                description:
                    error?.response?.data?.message || "An error occurred while removing the tenant.",
            });
        },
    });
};
