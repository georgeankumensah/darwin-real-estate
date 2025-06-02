import {api} from "@/lib/api";
import {useQuery} from "@tanstack/react-query";

export type Property = {
    id: string;
    propertyType: string;
    title: string;
    images: string[];
    address: string;
    currency: string;
    price: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    yearBuilt: number;
    status: string;
    description: string;
};

export const usePropertyById = (id: string | Array<string>) => {

    return useQuery({
        queryKey: ["properties", id],
        queryFn: async () => {

            const response = await api.get<Property>(
                `/properties/${id}`
            );

            return response.data;
        },

        staleTime: 5 * 60 * 1000,
        // cacheTime: 10 * 60 * 1000,
    });
};