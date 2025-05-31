import {z} from "zod";

export const CreatePropertySchema = z.object({
    title: z.string().min(1, "Title is required"),
    type: z.string().min(1, "Property type is required"),
    currency: z.string().min(1, "Currency is required"),
    price: z.coerce.number().min(1, "Price must be greater than 0"),
    status: z.enum(["FOR_SALE", "FOR_RENT", "SOLD", "RENTED"]),
    bedrooms: z.coerce.number().int().min(0, "Bedrooms must be a positive integer").optional(),
    bathrooms: z.coerce.number().int().min(0, "Bathrooms must be a positive integer"),
    area: z.coerce.number().int().min(1, "Area is required"),
    yearBuilt: z.coerce.number().int().min(1800, "Year built must be realistic"),
    address: z.string().min(1, "Address is required"),
    description: z.string().min(1, "Description is required"),
    images: z.array(z.object({})),
});

export const UpdatePropertySchema = z.object({});

export type CreatePropertyInput = z.infer<typeof CreatePropertySchema>;