import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "@/lib/api";
import {CreatePropertyInput} from "@/lib/validators/property.validation";
import {useToast} from "@/hooks/use-toast";

export const useCreateProperty = () => {
    const queryClient = useQueryClient();
    const {toast} = useToast();

    return useMutation({
        mutationFn: async (data: CreatePropertyInput) => {
            const formData = new FormData();

            formData.append("title", String(data.title || ""));
            formData.append("type", String(data.type || ""));
            formData.append("status", String(data.status || ""));
            formData.append("yearBuilt", String(data.yearBuilt || 0));
            formData.append("currency", String(data.currency || ""));
            formData.append("price", String(data.price || 0));
            formData.append("bedrooms", String(data.bedrooms || 0));
            formData.append("bathrooms", String(data.bathrooms || 0));
            formData.append("area", String(data.area || 0));
            formData.append("address", String(data.address || ""));
            formData.append("description", String(data.description || ""));

            if (data.images && Array.isArray(data.images)) {
                data.images.forEach((file) => {
                    if (file instanceof File) {
                        formData.append("images", file);
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
                variant: "success",
                description: `Property ${newProperty.title} created successfully`,
            });
            queryClient.invalidateQueries({queryKey: ["properties"]});
        },
        onError: (error: any) => {
            console.error("Failed to create property:", error?.response?.data || error.message);
            toast({
                variant: "error",
                description:
                    error?.response?.data?.message || "An error occurred while creating the property.",
            });
        },
    });
};
