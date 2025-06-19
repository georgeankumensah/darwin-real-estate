import { z } from "zod";

const MediaFileOrUrl = z.union([z.instanceof(File), z.string()]);

export const CreatePropertySchema = z.object({
    title: z.string().min(1, "Title is required"),
    currency: z.string().min(1, "Currency is required"),
    price: z.coerce.number().min(1, "Price must be greater than 0"),
    propertyType: z.string().min(1, "Property type is required"),
    status: z.enum(["FOR_SALE", "FOR_RENT", "SOLD", "RENTED"]),
    bedrooms: z.coerce.number().int().min(0, "Bedrooms must be a positive integer").optional(),
    bathrooms: z.coerce.number().int().min(0, "Bathrooms must be a positive integer"),
    area: z.coerce.number().int().min(1, "Area is required"),
    yearBuilt: z.coerce.number().int().min(1800, "Year built must be realistic"),
    address: z.string().min(1, "Address is required"),
    description: z.string().min(1, "Description is required"),
    ownerId: z.string().optional(),

    media: z.array(MediaFileOrUrl).optional(),
});

export const UpdatePropertySchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    currency: z.string().min(1, "Currency is required").optional(),
    price: z.coerce.number().min(1, "Price must be greater than 0").optional(),
    propertyType: z.string().min(1, "Property type is required").optional(),
    status: z.enum(["FOR_SALE", "FOR_RENT", "SOLD", "RENTED"]).optional(),
    bedrooms: z.coerce.number().int().min(0, "Bedrooms must be a positive integer").optional(),
    bathrooms: z.coerce.number().int().min(0, "Bathrooms must be a positive integer").optional(),
    area: z.coerce.number().int().min(1, "Area is required").optional(),
    yearBuilt: z.coerce.number().int().min(1800, "Year built must be realistic").optional(),
    address: z.string().min(1, "Address is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    ownerId: z.string().optional(),

    // For new files to upload
    media: z.array(MediaFileOrUrl).optional(),

    // For existing media to delete (publicIds)
    removeMedia: z.array(z.string()).optional(),

    // Alternative names used in your component (for backward compatibility)
    images: z.array(z.instanceof(File)).optional(),
    mediaToDelete: z.array(z.string()).optional(),
});

export type CreatePropertyInput = z.infer<typeof CreatePropertySchema>;
export type UpdatePropertyInput = z.infer<typeof UpdatePropertySchema>;
