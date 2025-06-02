"use client";

import Link from "next/link";
import {MapPin, Plus} from "lucide-react";
import {useAllProperties} from "@/hooks/api/properties/useAllProperties";
import { formatPrice } from "@/lib/helpers/formatPrice";

export default function PropertiesPage() {
    const {data, isLoading, isError} = useAllProperties();

    const properties = data?.properties || [];

    return (
        <div className="p-6 space-y-4 ">
            <div className=" flex items-center justify-between space-y-1 w-full  border-b pb-4 ">
                <div>
                    <h1 className="text-2xl font-medium">Properties</h1>
                    <p className="text-muted-foreground text-sm">
                        Luxury homes and apartments
                    </p>
                </div>
                <Link
                    href="/properties/new"
                    className="flex items-center gap-2 bg-primary text-sm rounded-[6px] text-white px-4 py-2  hover:bg-primary/90 transition-colors"
                >
                    <Plus className="h-6 w-6 text-white"/>
                    <span>Add Property</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                {properties.map((property) => (
                    <Link
                        href={`/properties/${property.id}`}
                        key={property.id}
                        className="group flex flex-col overflow-hidden  border bg-card shadow-sm transition-all hover:shadow-md"
                    >
                        <div className="aspect-[4/3] relative overflow-hidden">
                            <img
                                src={property.images[0] || "/placeholder.svg"}
                                alt={property.title}
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col p-4 flex-1">
                            <div className="space-y-2 flex-1">
                                <div className="text-xs text-muted-foreground">
                                    {property.status}
                                </div>
                                <div className="flex items-center justify-between ">
                                    <h3 className="font-medium text-lg">{property.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {formatPrice(property.price, property.currency as "USD" || "GHS")}
                                    </p>
                                </div>
                                <div className="flex items-center text-muted-foreground">
                                    <MapPin className="h-4 w-4 mr-1"/>
                                    <span className="text-xs">{property.address}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4 pt-4 border-t">
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {property.description}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}

                {/* <Link
          href="/properties/new"
          className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-background p-6 text-center hover:border-primary hover:bg-muted transition-colors h-full min-h-[300px]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed">
            <Plus className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">Create a New Property</h3>
        </Link> */}
            </div>
        </div>
    );
}
