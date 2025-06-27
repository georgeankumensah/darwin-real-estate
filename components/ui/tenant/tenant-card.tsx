"use client"

import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Calendar, Mail, Phone, Trash2} from "lucide-react"
import {formatDate} from "date-fns";
import {useRemoveCustomer} from "@/hooks/api/customers/useRemoveCustomer";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {Customer} from "@/app/generated/prisma"
import {toast} from "@/hooks/use-toast";

export default function TenantCard(tenant: Customer) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const {mutate: deleteTenant, isPending} = useRemoveCustomer()

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .substring(0, 2)
    }

    const handleRemove = () => {
        deleteTenant(tenant.id, {
            onSuccess: () => {
                toast({
                    variant: "success",
                    title: "Tenant removed successfully",
                });
                setIsDeleteDialogOpen(false);
            },
            onError: (error) => {
                toast({
                    variant: "destructive",
                    title: "Error removing tenant",
                    description: error.message,
                });
            },
        });
    };

    return (
        <>
            <Card className="mb-4">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Avatar>
                            <AvatarImage src={"/placeholder.svg"} alt={tenant.firstName + " " + tenant.lastName}/>
                            <AvatarFallback>{getInitials(tenant.firstName + " " + tenant.lastName)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-medium">{tenant.firstName + " " + tenant.lastName}</h3>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => setIsDeleteDialogOpen(true)}
                    >
                        <Trash2 className="h-4 w-4"/>
                        <span className="sr-only">Remove tenant</span>
                    </Button>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                    <div className="flex items-center text-muted-foreground">
                        <Mail className="h-3.5 w-3.5 mr-2"/>
                        <span>{tenant.email}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                        <Phone className="h-3.5 w-3.5 mr-2"/>
                        <span>{tenant.phoneNumber}</span>
                    </div>
                    {tenant.floorNumber && <div className="flex items-center text-muted-foreground">
                        <Phone className="h-3.5 w-3.5 mr-2"/>
                        <span>{tenant.floorNumber}</span>
                    </div>}
                    {tenant.roomNumber && <div className="flex items-center text-muted-foreground">
                        <Phone className="h-3.5 w-3.5 mr-2"/>
                        <span>{tenant.roomNumber}</span>
                    </div>}
                    <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 mr-2"/>
                        <span>Moved in: {formatDate(tenant.startDate, "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 mr-2"/>
                        <span>Rent ends: {tenant.endDate && formatDate(tenant.endDate, "MMM d, yyyy")}</span>
                    </div>
                </CardContent>
            </Card>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Remove tenant</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to remove {tenant.firstName} from this property? This action cannot be
                            undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleRemove}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={isPending}
                        >
                            Remove
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
