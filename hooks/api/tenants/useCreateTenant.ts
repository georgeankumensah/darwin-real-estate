import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { CreateUserSchema } from "@/lib/validators/owner.validation";
import type { z } from "zod";
import {useToast} from "@/hooks/use-toast";

type CreateTenantInput = z.infer<typeof CreateUserSchema>;

export const useCreateTenant = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async (data: CreateTenantInput) => {
            const response = await api.post("/tenants", data);
            return response.data;
        },
        onSuccess: (newOwner) => {
            toast({
                variant: "success",
                description: `Tenant ${newOwner.firstName} ${newOwner.lastName} created successfully`,
            });
            queryClient.invalidateQueries({ queryKey: ["tenants"] });
        },
        onError: (error: any) => {
            console.error("Failed to create owner:", error?.response?.data || error.message);
            toast({
                variant: "error",
                description:
                    error?.response?.data?.message || "An error occurred while creating the owner.",
            });
        },
    });
};
