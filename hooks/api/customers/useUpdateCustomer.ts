import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { updateTenantInput } from "@/lib/validators/tenant.validation";

export const useUpdateCustomer = (customerId: string) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async (data: updateTenantInput) => {
            const response = await api.put(`/customers/${customerId}`, data);
            return response.data;
        },
        onSuccess: (updatedTenant) => {
            toast({
                variant: "success",
                description: `Tenant ${updatedTenant.firstName} ${updatedTenant.lastName} updated successfully`,
            });
            queryClient.invalidateQueries({ queryKey: ["customers"] });
            queryClient.invalidateQueries({ queryKey: ["customers", customerId] });
        },
        onError: (error: any) => {
            console.error("Failed to update tenant:", error?.response?.data || error.message);
            toast({
                variant: "error",
                description:
                    error?.response?.data?.message || "An error occurred while updating the tenant.",
            });
        },
    });
};
