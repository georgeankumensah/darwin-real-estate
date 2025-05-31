import { z } from "zod";

export const CreateUserSchema = z.object({
    email: z.string().email("Invalid email address"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phoneNumber: z.string().min(7, "Phone number is too short"),
    altPhoneNumber: z.string().optional(),
    location: z.string().min(1, "Location is required"),
});

export const UpdateOwnerSchema = z.object({
    email: z.string().email("Invalid email address"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phoneNumber: z.string().min(7, "Phone number is too short"),
    altPhoneNumber: z.string().optional(),
    location: z.string().min(1, "Location is required"),
});