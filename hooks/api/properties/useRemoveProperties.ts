import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export const useRemoveProperty = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async (propertyId: string) => {
            const response = await api.delete(`/properties/${propertyId}`);
            return response.data;
        },
        onSuccess: (_, propertyId) => {
            toast({
                variant: "success",
                description: `Property deleted successfully.`,
            });
            queryClient.invalidateQueries({ queryKey: ["properties"] });
            queryClient.removeQueries({ queryKey: ["properties", propertyId] });
        },
        onError: (error: any) => {
            console.error("Failed to delete property:", error?.response?.data || error.message);
            toast({
                variant: "error",
                description:
                    error?.response?.data?.message || "An error occurred while deleting the property.",
            });
        },
    });
};
