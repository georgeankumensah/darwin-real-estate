import { z } from "zod";

// Helper to validate and normalize enum strings
const enumString = (field: string) =>
    z
        .string()
        .min(1, `${field} is required`)
        .transform(val => val.toUpperCase());

export const CreateTransactionSchema = z.object({
    transactionType: enumString("Transaction type"),
    currency: z.string().min(1, "Currency is required"),
    amount: z.coerce.number().gt(0, "Amount must be greater than zero"),
    transactionDate: z.coerce
        .date({
            required_error: "Transaction date is required",
            invalid_type_error: "Invalid date format",
        })
        .refine(date => !isNaN(date.getTime()), {
            message: "Transaction date must be a valid date",
        }),
    status: enumString("Status"),
    refNumber: z.string().min(1, "Reference number is required"),
    description: z.string().optional(),
    propertyId: z.string().min(1, "Property ID is required"),

    // Snapshot customer fields
    customerFirstName: z.string().min(1, "First name is required"),
    customerLastName: z.string().min(1, "Last name is required"),
    customerPhoneNumber: z.string().min(7, "Phone number is too short"),
    customerEmail: z.string().email("Invalid email address").optional(),
    customerStartDate: z.coerce
        .date({
            required_error: "Start date is required",
            invalid_type_error: "Invalid date format",
        })
        .refine(date => !isNaN(date.getTime()), {
            message: "Start date must be a valid date",
        }),
    customerEndDate: z.coerce
        .date({
            required_error: "End date is required",
            invalid_type_error: "Invalid date format",
        })
        .refine(date => !isNaN(date.getTime()), {
            message: "End date must be a valid date",
        }),

    roomNumber: z.string().optional(),
    floorNumber: z.string().optional(),

    paymentMethod: enumString("Payment method"),
    fees: z.coerce.number().nonnegative("Fees must be non-negative").optional(),
    contract: z.string().optional(),
    receipt: z.string().optional(),
});

export type createTransactionType = z.infer<typeof CreateTransactionSchema>;
