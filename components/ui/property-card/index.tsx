"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { formatPrice } from "@/lib/helpers/formatPrice";
import { Skeleton } from "@/components/ui/skeleton";
import {PropertyWithMedia} from "@/hooks/api/properties/useAllProperties";

type PropertyCardProps = {
    property: PropertyWithMedia
};

export function PropertyCard({property}:PropertyCardProps) {
    return (
        <Link
            href={`/properties/${property.id}`}
            className="group flex flex-col overflow-hidden border bg-card shadow-sm transition-all hover:shadow-md"
        >
            <div className="aspect-[4/3] relative overflow-hidden">
                <img
                    src={property.media[0].url || "/placeholder.svg"}
                    alt={property.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="flex flex-col p-4 flex-1">
                <div className="space-y-2 flex-1">
                    <div className="text-xs text-muted-foreground">
                        {property.status.replace("_", " ")}
                    </div>
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium text-lg">{property.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                            {formatPrice(property.price, (property.currency as "USD") || "GHS")}
                        </p>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-xs">{property.address}</span>
                    </div>
                    {/* Property details */}
                    {(property.bedrooms || property.bathrooms || property.area) && (
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {property.bedrooms && <span>{property.bedrooms} bed</span>}
                            {property.bathrooms && <span>{property.bathrooms} bath</span>}
                            {property.area && <span>{property.area} sq ft</span>}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {property.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export function PropertyCardSkeleton() {
    return (
        <div className="group flex flex-col overflow-hidden border bg-card shadow-sm">
            <div className="aspect-[4/3] relative overflow-hidden">
                <Skeleton className="h-full w-full" />
            </div>
            <div className="flex flex-col p-4 flex-1">
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-16" />
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex items-center">
                        <Skeleton className="h-4 w-4 mr-1" />
                        <Skeleton className="h-4 w-40" />
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4 mt-1" />
                </div>
            </div>
        </div>
    );
}