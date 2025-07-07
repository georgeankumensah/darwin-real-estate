"use client"

import React, {useState, useEffect} from "react"
import {useRouter} from "next/navigation"
import {
    ArrowLeft,
    ArrowRight,
    Loader2,
} from "lucide-react"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Form} from "@/components/ui/form"
import {BasicInfoStep} from "@/components/ui/transaction/BasicInfoStep";
import {PropertyStep} from "@/components/ui/transaction/PropertyStep";
import {PartiesStep} from "@/components/ui/transaction/PartiesStep";
import {PaymentStep} from "@/components/ui/transaction/PaymentStep";

import {cn} from "@/lib/utils"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {useCreateTransaction} from "@/hooks/api/transactions/useCreateTransaction";
import {CreateTransactionSchema, createTransactionType} from "@/lib/validators/transaction.validation";

export default function NewTransactionForm() {
    const [step, setStep] = useState(1);
    const router = useRouter();

    const {mutateAsync: createTransaction, isPending} = useCreateTransaction()

    // Initialize form
    const form = useForm<createTransactionType>({
        resolver: zodResolver(CreateTransactionSchema),
        defaultValues: {
            transactionType: "",
            currency: "GHS",
            amount: 0,
            transactionDate: new Date(),
            status: "",
            refNumber: "",
            description: "",
            propertyId: "",
            customerFirstName: "",
            customerLastName: "",
            customerEmail: "",
            customerPhoneNumber: "",
            customerStartDate: new Date(),
            customerEndDate: new Date(),
            paymentMethod: "",
            fees: undefined,
            contract: "",
            receipt: "",
            roomNumber: "",
            floorNumber: "",
        },
    })

    // Check for saved form state on component mount
    useEffect(() => {
        const savedFormState = localStorage.getItem('transactionFormState');
        const savedStep = localStorage.getItem('transactionFormStep');

        if (savedFormState) {
            try {
                const parsedState = JSON.parse(savedFormState);
                form.reset(parsedState);

                if (savedStep) {
                    setStep(parseInt(savedStep));
                }

                // Clear the saved state
                localStorage.removeItem('transactionFormState');
                localStorage.removeItem('transactionFormStep');
            } catch (error) {
                console.error('Error restoring form state:', error);
            }
        }
    }, [form, setStep]);

    // Handle form submission
    const onSubmit = async (values: createTransactionType) => {
        await createTransaction(values)
        router.push("/transactions")
    }

    // Navigate between steps
    const nextStep = async () => {
        let fieldsToValidate: string[] = []

        console.log("Form errors:", form.formState.errors);

        switch (step) {
            case 1:
                fieldsToValidate = ["transactionType", "amount", "transactionDate", "status"]
                break
            case 2:
                fieldsToValidate = ["propertyId"]
                break
            case 3:
                // Parties are optional, so no validation needed
                setStep(step + 1)
                return
            case 4:
                fieldsToValidate = ["paymentMethod"]
                break
        }

        const result = await form.trigger(fieldsToValidate as any)
        if (result) {
            setStep(step + 1)
        }
    }

    const prevStep = () => {
        setStep(step - 1)
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/transactions">
                        <ArrowLeft className="h-4 w-4"/>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-semibold">Add New Transaction</h1>
                    <p className="text-muted-foreground">Create a new financial transaction record</p>
                </div>
            </div>

            <div className="flex justify-between mb-8">
                <div className="flex gap-2">
                    {[1, 2, 3, 4].map((stepNumber) => (
                        <div
                            key={stepNumber}
                            className={cn("flex items-center justify-center w-8 h-8 rounded-full border text-sm font-medium",
                                step === stepNumber
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : step > stepNumber
                                        ? "border-primary bg-primary/20 text-primary"
                                        : "border-muted-foreground/30 text-muted-foreground")}>
                            {stepNumber}
                        </div>
                    ))}
                </div>
                <div className="text-sm text-muted-foreground">
                    Step {step} of 4:{" "}
                    {step === 1 ? "Basic Information" : step === 2 ? "Property" : step === 3 ? "Parties" : "Payment"}
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {step === 1 ? "Transaction Details" : step === 2 ? "Property Information" : step === 3 ? "Parties Involved" : "Payment Details"}
                            </CardTitle>
                            <CardDescription>
                                {step === 1 ? "Enter the basic information about this transaction" : step === 2 ? "Select the property associated with this transaction" : step === 3 ? "Enter the details of the tenant/tenant involved in this transaction" : "Enter payment information for this transaction"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {step === 1 && <BasicInfoStep form={form} />}
                            {step === 2 && <PropertyStep form={form} />}
                            {step === 3 && <PartiesStep form={form} />}
                            {step === 4 && <PaymentStep form={form} />}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
                                <ArrowLeft className="mr-2 h-4 w-4"/>
                                Previous
                            </Button>
                            {step < 4 && (
                                <Button type="button" onClick={nextStep}>
                                    Next Step
                                    <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            )}
                            {step === 4 && (
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                            Creating...
                                        </>
                                    ) : (
                                        "Create Transaction"
                                    )}
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    )
}