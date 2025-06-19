import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {PropertyWithMedia} from "@/hooks/api/properties/useAllProperties";

export const usePropertyById = (id?: string) => {
    return useQuery<PropertyWithMedia>({
        queryKey: ["properties", id],
        queryFn: async () => {
            const response = await api.get<PropertyWithMedia>(`/properties/${id}`);
            return response.data;
        },
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
};
