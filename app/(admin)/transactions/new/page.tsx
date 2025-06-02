"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Building, Calendar, Check, ChevronsUpDown, Loader2, Upload } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"

// Sample data for properties
const properties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    address: "123 Luxury Lane, Beverly Hills, CA",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    title: "Downtown Apartment",
    address: "456 Urban Street, New York, NY",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    title: "Beachfront Condo",
    address: "789 Ocean Drive, Miami, FL",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    title: "City View Loft",
    address: "101 Downtown Ave, Chicago, IL",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    title: "Suburban Family Home",
    address: "202 Maple Street, Seattle, WA",
    image: "/placeholder.svg?height=40&width=40",
  },
]

// Sample data for customers
const customers = [
  {
    id: "cus_001",
    name: "John Doe",
    email: "john.doe@example.com",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "cus_002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "cus_003",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "cus_004",
    name: "Emily Williams",
    email: "emily.williams@example.com",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "cus_005",
    name: "David Brown",
    email: "david.brown@example.com",
    image: "/placeholder.svg?height=40&width=40",
  },
]

// Sample data for agents
const agents = [
  {
    id: "agt_001",
    name: "Robert Chen",
    email: "robert.chen@realestate.com",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "agt_002",
    name: "Sarah Johnson",
    email: "sarah.johnson@realestate.com",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "agt_003",
    name: "James Wilson",
    email: "james.wilson@realestate.com",
    image: "/placeholder.svg?height=40&width=40",
  },
]

// Form validation schema
const formSchema = z.object({
  // Step 1: Basic Information
  type: z.string({
    required_error: "Please select a transaction type",
  }),
  amount: z.string().min(1, "Amount is required"),
  date: z.date({
    required_error: "Please select a date",
  }),
  status: z.string({
    required_error: "Please select a status",
  }),
  reference: z.string().optional(),
  description: z.string().optional(),

  // Step 2: Property Information
  propertyId: z.string({
    required_error: "Please select a property",
  }),

  // Step 3: Parties Involved
  buyerId: z.string().optional(),
  sellerId: z.string().optional(),
  agentId: z.string().optional(),

  // Step 4: Payment Details
  paymentMethod: z.string({
    required_error: "Please select a payment method",
  }),
  fees: z.string().optional(),
  taxes: z.string().optional(),
})

export default function NewTransactionForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      amount: "",
      date: new Date(),
      status: "pending",
      reference: "",
      description: "",
      propertyId: "",
      buyerId: "",
      sellerId: "",
      agentId: "",
      paymentMethod: "",
      fees: "0",
      taxes: "0",
    },
  })

  // Watch form values for calculations
  const amount = Number.parseFloat(form.watch("amount") || "0")
  const fees = Number.parseFloat(form.watch("fees") || "0")
  const taxes = Number.parseFloat(form.watch("taxes") || "0")
  const total = amount + fees + taxes

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Form submitted:", values)

    toast({
      title: "Transaction created",
      description: "The transaction has been successfully created.",
    })

    setIsSubmitting(false)
    router.push("/transactions")
  }

  // Navigate between steps
  const nextStep = async () => {
    let fieldsToValidate: string[] = []

    switch (step) {
      case 1:
        fieldsToValidate = ["type", "amount", "date", "status"]
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

  // Get selected property, buyer, seller, agent
  const selectedProperty = properties.find((p) => p.id.toString() === form.watch("propertyId"))
  const selectedBuyer = customers.find((c) => c.id === form.watch("buyerId"))
  const selectedSeller = customers.find((c) => c.id === form.watch("sellerId"))
  const selectedAgent = agents.find((a) => a.id === form.watch("agentId"))

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/transactions">
            <ArrowLeft className="h-4 w-4" />
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
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full border text-sm font-medium",
                step === stepNumber
                  ? "border-primary bg-primary text-primary-foreground"
                  : step > stepNumber
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-muted-foreground/30 text-muted-foreground",
              )}
            >
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
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transaction Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select transaction type" />
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
                        <FormDescription>The type of financial transaction being recorded</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormDescription>The total amount of the transaction</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
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
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <Calendar className="ml-auto h-4 w-4 opacity-50" />
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
                        <FormDescription>The date when the transaction occurred</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>The current status of this transaction</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="reference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., INV-12345" {...field} />
                      </FormControl>
                      <FormDescription>A reference number for this transaction</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="button" onClick={nextStep}>
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
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
                  render={({ field }) => (
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
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0">
                          <Command>
                            <CommandInput placeholder="Search properties..." />
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
                                      <div className="h-10 w-10 rounded-md overflow-hidden">
                                        <img
                                          src={property.image || "/placeholder.svg"}
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
                      <FormDescription>The property associated with this transaction</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedProperty && (
                  <div className="mt-4 p-4 border rounded-md">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-24 rounded-md overflow-hidden">
                        <img
                          src={selectedProperty.image || "/placeholder.svg"}
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
                              <Building className="mr-2 h-4 w-4" />
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
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button type="button" onClick={nextStep}>
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 3: Parties Involved */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Parties Involved</CardTitle>
                <CardDescription>Select the parties involved in this transaction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="buyerId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Buyer/Tenant (Optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                            >
                              {field.value
                                ? customers.find((customer) => customer.id === field.value)?.name
                                : "Select buyer/tenant"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0">
                          <Command>
                            <CommandInput placeholder="Search customers..." />
                            <CommandEmpty>No customer found.</CommandEmpty>
                            <CommandList>
                              <CommandGroup>
                                {customers.map((customer) => (
                                  <CommandItem
                                    key={customer.id}
                                    value={customer.name}
                                    onSelect={() => {
                                      form.setValue("buyerId", customer.id)
                                    }}
                                  >
                                    <div className="flex items-center gap-3">
                                      <Avatar>
                                        <AvatarImage src={customer.image || "/placeholder.svg"} alt={customer.name} />
                                        <AvatarFallback>
                                          {customer.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="text-sm font-medium">{customer.name}</p>
                                        <p className="text-xs text-muted-foreground">{customer.email}</p>
                                      </div>
                                    </div>
                                    <Check
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        customer.id === field.value ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>The person or entity purchasing or renting the property</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sellerId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Seller/Landlord (Optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                            >
                              {field.value
                                ? customers.find((customer) => customer.id === field.value)?.name
                                : "Select seller/landlord"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0">
                          <Command>
                            <CommandInput placeholder="Search customers..." />
                            <CommandEmpty>No customer found.</CommandEmpty>
                            <CommandList>
                              <CommandGroup>
                                {customers.map((customer) => (
                                  <CommandItem
                                    key={customer.id}
                                    value={customer.name}
                                    onSelect={() => {
                                      form.setValue("sellerId", customer.id)
                                    }}
                                  >
                                    <div className="flex items-center gap-3">
                                      <Avatar>
                                        <AvatarImage src={customer.image || "/placeholder.svg"} alt={customer.name} />
                                        <AvatarFallback>
                                          {customer.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="text-sm font-medium">{customer.name}</p>
                                        <p className="text-xs text-muted-foreground">{customer.email}</p>
                                      </div>
                                    </div>
                                    <Check
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        customer.id === field.value ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>The person or entity selling or renting out the property</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agentId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Agent (Optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                            >
                              {field.value ? agents.find((agent) => agent.id === field.value)?.name : "Select agent"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0">
                          <Command>
                            <CommandInput placeholder="Search agents..." />
                            <CommandEmpty>No agent found.</CommandEmpty>
                            <CommandList>
                              <CommandGroup>
                                {agents.map((agent) => (
                                  <CommandItem
                                    key={agent.id}
                                    value={agent.name}
                                    onSelect={() => {
                                      form.setValue("agentId", agent.id)
                                    }}
                                  >
                                    <div className="flex items-center gap-3">
                                      <Avatar>
                                        <AvatarImage src={agent.image || "/placeholder.svg"} alt={agent.name} />
                                        <AvatarFallback>
                                          {agent.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="text-sm font-medium">{agent.name}</p>
                                        <p className="text-xs text-muted-foreground">{agent.email}</p>
                                      </div>
                                    </div>
                                    <Check
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        agent.id === field.value ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>The real estate agent involved in this transaction</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {selectedBuyer && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Buyer/Tenant</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={selectedBuyer.image || "/placeholder.svg"} alt={selectedBuyer.name} />
                            <AvatarFallback>
                              {selectedBuyer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{selectedBuyer.name}</div>
                            <div className="text-xs text-muted-foreground">{selectedBuyer.email}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {selectedSeller && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Seller/Landlord</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={selectedSeller.image || "/placeholder.svg"} alt={selectedSeller.name} />
                            <AvatarFallback>
                              {selectedSeller.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{selectedSeller.name}</div>
                            <div className="text-xs text-muted-foreground">{selectedSeller.email}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {selectedAgent && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Agent</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={selectedAgent.image || "/placeholder.svg"} alt={selectedAgent.name} />
                            <AvatarFallback>
                              {selectedAgent.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{selectedAgent.name}</div>
                            <div className="text-xs text-muted-foreground">{selectedAgent.email}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button type="button" onClick={nextStep}>
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fees ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormDescription>Any additional fees associated with this transaction</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="taxes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taxes ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormDescription>Any taxes applicable to this transaction</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">Subtotal</div>
                    <div className="font-medium">${amount.toLocaleString()}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">Fees</div>
                    <div className="font-medium">${fees.toLocaleString()}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">Taxes</div>
                    <div className="font-medium">${taxes.toLocaleString()}</div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center pt-2">
                    <div className="text-sm font-medium">Total Amount</div>
                    <div className="text-xl font-bold">${total.toLocaleString()}</div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center mb-4">
                    <Upload className="h-5 w-5 mr-2 text-muted-foreground" />
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
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
