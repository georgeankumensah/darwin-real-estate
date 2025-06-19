import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { UpdatePropertyInput } from "@/lib/validators/property.validation";
import { useToast } from "@/hooks/use-toast";

export const useUpdateProperty = (propertyId: string) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async (data: UpdatePropertyInput) => {
            const formData = new FormData();

            // Basic property fields
            if (data.title) formData.append("title", String(data.title));
            if (data.propertyType) formData.append("propertyType", String(data.propertyType));
            if (data.currency) formData.append("currency", String(data.currency));
            if (data.price !== undefined) formData.append("price", String(data.price));
            if (data.status) formData.append("status", String(data.status));
            if (data.bedrooms !== undefined) formData.append("bedrooms", String(data.bedrooms));
            if (data.bathrooms !== undefined) formData.append("bathrooms", String(data.bathrooms));
            if (data.area !== undefined) formData.append("area", String(data.area));
            if (data.yearBuilt !== undefined) formData.append("yearBuilt", String(data.yearBuilt));
            if (data.address) formData.append("address", String(data.address));
            if (data.description) formData.append("description", String(data.description));

            // Upload new media files - backend expects 'addMedia'
            if (data.media && Array.isArray(data.media)) {
                data.media.forEach((file) => {
                    if (file instanceof File) {
                        formData.append("addMedia", file);
                    }
                });
            }

            // Remove existing media - backend expects 'removeMedia' with publicIds
            if (data.removeMedia && Array.isArray(data.removeMedia)) {
                formData.append("removeMedia", JSON.stringify(data.removeMedia));
            }

            const response = await api.patch(`/properties/${propertyId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data;
        },
        onSuccess: (updated) => {
            toast({
                variant: "success",
                description: `Property updated successfully`,
            });
            queryClient.invalidateQueries({ queryKey: ["properties"] });
            queryClient.invalidateQueries({ queryKey: ["properties", propertyId] });
        },
        onError: (error: any) => {
            console.error("Failed to update property:", error?.response?.data || error.message);
            toast({
                variant: "error",
                description:
                    error?.response?.data?.error || "An error occurred while updating the property.",
            });
        },
    });
};
