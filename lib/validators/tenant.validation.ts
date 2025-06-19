import {z} from "zod";

export const CreateTenantSchema = z.object({
    email: z.string().email("Invalid email address"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phoneNumber: z.string().min(7, "Phone number is too short"),
    startDate: z.coerce.date({
        required_error: "Start date is required",
        invalid_type_error: "Invalid date format",
    }).refine(
        (date) => !isNaN(date.getTime()),
        {message: "Start date must be a valid date"}
    ),
    endDate: z.coerce.date({
        required_error: "End date is required",
        invalid_type_error: "Invalid date format",
    }).refine(
        (date) => !isNaN(date.getTime()),
        {message: "End date must be a valid date"}
    ),
    propertyId: z.string().min(1, "Property ID is required"),
    status: z.enum(["ACTIVE", "INACTIVE", "TERMINATED"]),
    floorNumber: z.string().optional(),
    roomNumber: z.string().optional(),
});

export const UpdateTenantSchema = z.object({
    email: z.string().email("Invalid email address"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phoneNumber: z.string().min(7, "Phone number is too short"),
    altPhoneNumber: z.string().optional(),
    location: z.string().min(1, "Location is required"),
});

export type createTenantInput = z.infer<typeof CreateTenantSchema>;
export type updateTenantInput = z.infer<typeof UpdateTenantSchema>;