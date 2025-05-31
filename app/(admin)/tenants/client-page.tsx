"use client";

import {PlusCircle} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import TenantsTable from "@/components/ui/tables/Tenants";

export default function TenantsClientPage() {
    return (
        <div className="p-6 flex-1 min-h-screen  space-y-4">
            <div className="flex justify-between items-center">

                <div>
                    <h1 className="text-2xl font-semibold">Tenants</h1>
                    <p className="text-muted-foreground">
                        Manage your tenant relationships
                    </p>
                </div>
                <Button asChild>
                    <Link href="/tenants/new">
                        <PlusCircle className="mr-2 h-4 w-4"/>
                        Add Tenant
                    </Link>
                </Button>
            </div>
            <TenantsTable/>

        </div>
    );
}
