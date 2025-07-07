import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { CreatePropertyInput } from "@/lib/validators/property.validation";
import { useToast } from "@/hooks/use-toast";

export const useCreateProperty = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async (data: CreatePropertyInput) => {
            const formData = new FormData();

            // Add all property fields
            formData.append("title", data.title || "");
            formData.append("propertyType", data.propertyType || "");
            formData.append("status", data.status || "");
            formData.append("currency", data.currency || "");
            formData.append("price", String(data.price || 0));
            formData.append("bedrooms", String(data.bedrooms || 0));
            formData.append("bathrooms", String(data.bathrooms || 0));
            formData.append("area", String(data.area || 0));
            formData.append("yearBuilt", String(data.yearBuilt || new Date().getFullYear()));
            formData.append("address", data.address || "");
            formData.append("description", data.description || "");

            // Add ownerId if provided
            if (data.ownerId) {
                formData.append("ownerId", data.ownerId);
            }

            // Handle media files - your backend expects 'media' field name
            if (Array.isArray(data.media)) {
                data.media.forEach((file) => {
                    if (file instanceof File) {
                        formData.append("media", file); // Changed from "images" to "media"
                    }
                });
            }

            const response = await api.post("/properties", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data;
        },

        onSuccess: (newProperty) => {
            toast({
                variant: "default", // Changed from "success" to "default" - check your toast component
                description: `Property "${newProperty.property?.title || 'New Property'}" created successfully.`,
            });
            queryClient.invalidateQueries({ queryKey: ["properties"] });
        },

        onError: (error: any) => {
            console.error("Property creation failed:", error?.response?.data || error.message);
            toast({
                variant: "destructive",
                title: "Error creating property",
                description:
                    error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    error?.message ||
                    "An unexpected error occurred while creating the property.",
            });
        },
    });
};
