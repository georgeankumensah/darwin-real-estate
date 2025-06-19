"use client"

import React, {useState, useEffect} from "react"
import {useRouter} from "next/navigation"
import {
    ArrowLeft,
    ArrowRight,
    Building,
    Calendar,
    CalendarIcon,
    Check,
    ChevronsUpDown,
    Loader2,
    Upload
} from "lucide-react"
import Link from "next/link"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Calendar as CalendarComponent} from "@/components/ui/calendar"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Separator} from "@/components/ui/separator"
import {Textarea} from "@/components/ui/textarea"

import {cn} from "@/lib/utils"
import {zodResolver} from "@hookform/resolvers/zod"
import {format} from "date-fns"
import {useForm} from "react-hook-form"
import {useCreateTransaction} from "@/hooks/api/transactions/useCreateTransaction";
import {CreateTransactionSchema, createTransactionType} from "@/lib/validators/transaction.validation";
import {useAllProperties} from "@/hooks/api/properties/useAllProperties"

export default function NewTransactionForm() {
    const [step, setStep] = useState(1);
    const router = useRouter();

    const {mutateAsync: createTransaction, isPending} = useCreateTransaction()
    const {data: propertiesData, isLoading: isLoadingProperties} = useAllProperties();

    const properties = propertiesData?.properties || [];

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

    // Watch form values for calculations
    const amount = Number(form.watch("amount")) || 0;
    const fees = Number(form.watch("fees")) || 0;

    const total = amount + fees;

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

    // Get selected property
    const selectedProperty = properties.find((p) =>
        p?.id?.toString() === form.watch("propertyId")
    );

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
                    {/* Step 1: Basic Information */}
                    {step === 1 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Transaction Details</CardTitle>
                                <CardDescription>Enter the basic information about this transaction</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="transactionType"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Transaction Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select transaction type"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="sale">Sale</SelectItem>
                                                        <SelectItem value="deposit">Deposit</SelectItem>
                                                        <SelectItem value="commission">Commission</SelectItem>
                                                        <SelectItem value="rental">Rental</SelectItem>
                                                        <SelectItem value="refund">Refund</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>The type of financial transaction being
                                                    recorded</FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="currency"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Currency</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select currency"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="USD">USD</SelectItem>
                                                        <SelectItem value="GHS">GHS</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>The currency of the transaction</FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="amount"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Amount</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="0.00" {...field} />
                                                </FormControl>
                                                <FormDescription>The total amount of the transaction</FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="transactionDate"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Transaction Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground",
                                                                )}
                                                            >
                                                                {field.value ? format(field.value, "PPP") :
                                                                    <span>Pick a date</span>}
                                                                <Calendar className="ml-auto h-4 w-4 opacity-50"/>
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <CalendarComponent
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormDescription>The date when the transaction
                                                    occurred</FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select status"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="completed">Completed</SelectItem>
                                                        <SelectItem value="pending">Pending</SelectItem>
                                                        <SelectItem value="failed">Failed</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>The current status of this
                                                    transaction</FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="refNumber"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Reference Number (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., INV-12345" {...field} />
                                            </FormControl>
                                            <FormDescription>A reference number for this transaction</FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Description (Optional)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Enter details about this transaction"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>Additional details about this transaction</FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button type="button" onClick={nextStep}>
                                    Next Step
                                    <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </CardFooter>
                        </Card>
                    )}

                    {/* Step 2: Property Information */}
                    {step === 2 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Property Information</CardTitle>
                                <CardDescription>Select the property associated with this transaction</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="propertyId"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Property</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                                                        >
                                                            {field.value
                                                                ? properties.find((property) => property.id.toString() === field.value)?.title
                                                                : "Select property"}
                                                            <ChevronsUpDown
                                                                className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[400px] p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search properties..."/>
                                                        <CommandEmpty>No property found.</CommandEmpty>
                                                        <CommandList>
                                                            <CommandGroup>
                                                                {properties.map((property) => (
                                                                    <CommandItem
                                                                        key={property.id}
                                                                        value={property.title}
                                                                        onSelect={() => {
                                                                            form.setValue("propertyId", property.id.toString())
                                                                        }}
                                                                    >
                                                                        <div className="flex items-center gap-3">
                                                                            <div
                                                                                className="h-10 w-10 rounded-md overflow-hidden">
                                                                                <img
                                                                                    src={property.media[0].url || "/placeholder.svg"}
                                                                                    alt={property.title}
                                                                                    className="h-full w-full object-cover"
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-sm font-medium">{property.title}</p>
                                                                                <p className="text-xs text-muted-foreground">{property.address}</p>
                                                                            </div>
                                                                        </div>
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto h-4 w-4",
                                                                                property.id.toString() === field.value ? "opacity-100" : "opacity-0",
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormDescription>The property associated with this
                                                transaction</FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {selectedProperty && (
                                    <div className="mt-4 p-4 border rounded-md">
                                        <div className="flex items-center gap-4">
                                            <div className="h-16 w-24 rounded-md overflow-hidden">
                                                <img
                                                    src={selectedProperty.media[0].url || "/placeholder.svg"}
                                                    alt={selectedProperty.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{selectedProperty.title}</h3>
                                                <p className="text-sm text-muted-foreground">{selectedProperty.address}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant="outline">ID: {selectedProperty.id}</Badge>
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <Link href={`/properties/${selectedProperty.id}`}>
                                                            <Building className="mr-2 h-4 w-4"/>
                                                            View Property
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button type="button" variant="outline" onClick={prevStep}>
                                    <ArrowLeft className="mr-2 h-4 w-4"/>
                                    Previous
                                </Button>
                                <Button type="button" onClick={nextStep}>
                                    Next Step
                                    <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </CardFooter>
                        </Card>
                    )}

                    {/* Step 3: Parties Involved */}
                    {step === 3 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Parties Involved</CardTitle>
                                <CardDescription>
                                    Enter the details of the tenant/tenant involved in this transaction
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="customerFirstName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter first name" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="customerLastName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter last name" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="customerEmail"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="Enter email address" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="customerPhoneNumber"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter phone number" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="customerStartDate"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Move-in Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? format(field.value, "PPP") : "Pick a date"}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <CalendarComponent
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={(date) => field.onChange(date ?? new Date())}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="customerEndDate"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Move-out Date (optional)</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? format(field.value, "PPP") : "Pick a date"}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <CalendarComponent
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button type="button" variant="outline" onClick={prevStep}>
                                    <ArrowLeft className="mr-2 h-4 w-4"/>
                                    Previous
                                </Button>
                                <Button type="button" onClick={nextStep}>
                                    Next Step
                                    <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </CardFooter>
                        </Card>
                    )}

                    {/* Step 4: Payment Details */}
                    {step === 4 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Details</CardTitle>
                                <CardDescription>Enter payment information for this transaction</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="paymentMethod"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Payment Method</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select payment method"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                                    <SelectItem value="credit_card">Credit Card</SelectItem>
                                                    <SelectItem value="cash">Cash</SelectItem>
                                                    <SelectItem value="check">Check</SelectItem>
                                                    <SelectItem value="wire_transfer">Wire Transfer</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>The method used for this payment</FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="fees"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Fees</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="0.00" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Any additional fees associated with this transaction
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <Separator/>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm font-medium">Subtotal</div>
                                        <div
                                            className="font-medium">{form.watch("currency")} {amount.toLocaleString()}</div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm font-medium">Fees</div>
                                        <div
                                            className="font-medium">{form.watch("currency")} {fees.toLocaleString()}</div>
                                    </div>
                                    <Separator/>
                                    <div className="flex justify-between items-center pt-2">
                                        <div className="text-sm font-medium">Total Amount</div>
                                        <div
                                            className="text-xl font-bold">{form.watch("currency")} {total.toLocaleString()}</div>
                                    </div>
                                </div>

                                <div className="border rounded-md p-4">
                                    <div className="flex items-center mb-4">
                                        <Upload className="h-5 w-5 mr-2 text-muted-foreground"/>
                                        <h3 className="font-medium">Upload Documents (Optional)</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="border border-dashed rounded-md p-4 text-center">
                                            <div className="flex flex-col items-center justify-center gap-1">
                                                <div className="text-muted-foreground">
                                                    <p className="text-sm">Upload Receipt</p>
                                                    <p className="text-xs">PDF, JPG, PNG (max 5MB)</p>
                                                </div>
                                                <Button variant="outline" size="sm" className="mt-2">
                                                    Choose File
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="border border-dashed rounded-md p-4 text-center">
                                            <div className="flex flex-col items-center justify-center gap-1">
                                                <div className="text-muted-foreground">
                                                    <p className="text-sm">Upload Contract</p>
                                                    <p className="text-xs">PDF (max 10MB)</p>
                                                </div>
                                                <Button variant="outline" size="sm" className="mt-2">
                                                    Choose File
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button type="button" variant="outline" onClick={prevStep}>
                                    <ArrowLeft className="mr-2 h-4 w-4"/>
                                    Previous
                                </Button>
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
                            </CardFooter>
                        </Card>
                    )}
                </form>
            </Form>
        </div>
    )
}
