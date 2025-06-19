import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {createTenantInput} from "@/lib/validators/tenant.validation";

export const useCreateCustomer = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async (data: createTenantInput) => {
            const response = await api.post("/customers", data);
            return response.data;
        },
        onSuccess: (newTenant) => {
            toast({
                variant: "success",
                description: `Tenant ${newTenant.firstName} ${newTenant.lastName} created successfully`,
            });
            queryClient.invalidateQueries({ queryKey: ["customers"] });
        },
        onError: (error: any) => {
            console.error("Failed to create tenant:", error?.response?.data || error.message);
            toast({
                variant: "error",
                description:
                    error?.response?.data?.message || "An error occurred while creating the tenant.",
            });
        },
    });
};
