import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "@/lib/api";
import {useToast} from "@/hooks/use-toast";
import {createTransactionType} from "@/lib/validators/transaction.validation";

export const useCreateTransaction = () => {
    const queryClient = useQueryClient();
    const {toast} = useToast();

    return useMutation({
        mutationFn: async (data: createTransactionType) => {
            const response = await api.post("/transactions", data);
            return response.data;
        },
        onSuccess: (transaction) => {
            toast({
                variant: "success",
                description: `Transaction ${transaction.refNumber} created successfully`,
            });
            queryClient.invalidateQueries({queryKey: ["transactions"]});
        },
        onError: (error: any) => {
            console.error("Failed to create transaction:", error?.response?.data || error.message);
            toast({
                variant: "error",
                description:
                    error?.response?.data?.message || "An error occurred while adding the transaction.",
            });
        },
    });
};
