"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {User} from "lucide-react"
import TenantCard from "@/components/ui/tenant/tenant-card";
import AddTenantForm from "@/components/ui/tenant/add-tenant-form";
import {useCustomersByProperty} from "@/hooks/api/customers/useCustomersByProperty";
import {Skeleton} from "@/components/ui/skeleton";
import {toast} from "@/hooks/use-toast";

export default function TenantManagement() {
    const {data, isLoading, isError} = useCustomersByProperty();
    const tenants = data ?? [];

    React.useEffect(() => {
        if (isError) {
            toast({
                variant: "destructive",
                title: "Error loading tenants",
                description: "Could not fetch tenant data. Please try again.",
            });
        }
    }, [isError]);

    return (
        <Card className="h-full w-full">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2"/>
                    Tenants
                </CardTitle>
                <CardDescription>Manage tenants for this property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <AddTenantForm/>

                <div className="mt-4 space-y-2">
                    {isLoading ? (
                        <>
                            <Skeleton className="h-20 w-full rounded-md"/>
                            <Skeleton className="h-20 w-full rounded-md"/>
                            <Skeleton className="h-20 w-full rounded-md"/>
                        </>
                    ) : tenants.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground">No tenants added yet</div>
                    ) : (
                        tenants.map((tenant) => (
                            <TenantCard
                                key={tenant.id}
                                {...tenant}
                            />
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
