"use client"

import type React from "react"
import {useState} from "react"
import {useParams} from "next/navigation"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    User,
    Mail,
    Phone,
    Building2,
    DoorOpen,
    Calendar as CalendarIcon,
    UserPlus,
    Activity,
} from "lucide-react"
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {cn} from "@/lib/utils"
import {format} from "date-fns"
import {useCreateCustomer} from "@/hooks/api/customers/useCreateCustomer"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {createTenantInput} from "@/lib/validators/tenant.validation";

export default function AddTenantForm() {
    const params = useParams()
    const propertyId = typeof params?.id === "string" ? params.id : null

    const [isOpen, setIsOpen] = useState(false)
    const [form, setForm] = useState<createTenantInput>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        startDate: new Date(),
        endDate: new Date(),
        status: "ACTIVE",
        propertyId: propertyId!,
        floorNumber: "",
        roomNumber: "",
    })

    const {mutate: createTenant, isPending} = useCreateCustomer()

    const handleChange = (field: keyof createTenantInput, value: string | Date | null) => {
        setForm(prev => ({...prev, [field]: value}))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (
            form.firstName &&
            form.lastName &&
            form.email &&
            form.phoneNumber &&
            form.startDate &&
            propertyId
        ) {
            const payload = {...form, propertyId}
            createTenant(payload)
            setForm({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                startDate: new Date(),
                endDate: new Date(),
                status: "ACTIVE",
                propertyId,
                floorNumber: "",
                roomNumber: ""
            })
            setIsOpen(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    <UserPlus className="h-4 w-4 mr-2"/>
                    Add Tenant
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Tenant</DialogTitle>
                    <DialogDescription>Enter the tenant's details to add them to this property.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="firstName"
                                    value={form.firstName}
                                    onChange={(e) => handleChange("firstName", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="lastName"
                                    value={form.lastName}
                                    onChange={(e) => handleChange("lastName", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="phoneNumber"
                                    value={form.phoneNumber}
                                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="floorNumber">Floor Number</Label>
                            <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="floorNumber"
                                    value={form.floorNumber}
                                    onChange={(e) => handleChange("floorNumber", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="roomNumber">Room Number</Label>
                            <div className="flex items-center gap-2">
                                <DoorOpen className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="roomNumber"
                                    value={form.roomNumber}
                                    onChange={(e) => handleChange("roomNumber", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="startDate">Move-in Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="startDate"
                                        variant="outline"
                                        className={cn("w-full justify-start text-left font-normal", !form.startDate && "text-muted-foreground")}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                        {form.startDate ? format(form.startDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={form.startDate}
                                        onSelect={(date) => date && handleChange("startDate", date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="endDate">Move-out Date (optional)</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="endDate"
                                        variant="outline"
                                        className={cn("w-full justify-start text-left font-normal", !form.endDate && "text-muted-foreground")}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                        {form.endDate ? format(form.endDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={form.endDate}
                                        onSelect={(date) => date && handleChange("endDate", date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={form.status}
                                onValueChange={(value) => handleChange("status", value)}
                            >
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select status"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ACTIVE">Active</SelectItem>
                                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <input type="hidden" value={propertyId ?? ""} readOnly/>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={!propertyId || isPending}>
                            {isPending ? "Adding..." : "Add Tenant"}
                        </Button>

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
