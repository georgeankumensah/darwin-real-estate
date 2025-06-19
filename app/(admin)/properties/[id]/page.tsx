"use client"

import {
    ArrowLeft,
    Building,
    Building2,
    Calendar,
    MapPin,
    Ruler,
    Users,
} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import MediaCarousel from "@/components/ui/image-carousel";
import {usePropertyById} from "@/hooks/api/properties/usePropertyById";
import {useParams, useRouter} from "next/navigation";
import {formatPrice} from "@/lib/helpers/formatPrice";
import {Skeleton} from "@/components/ui/skeleton";
import TenantManagement from "@/components/ui/tenant/tenant-management";

export default function PropertyDetailPage() {
    const propertyId = useParams().id;
    const router = useRouter();

    if (!propertyId) {
        return <div>Property not found</div>;
    }

    const {data: property, isLoading, isError} = usePropertyById(propertyId as string);

    if (isLoading) {
        return <PropertyDetailSkeleton />;
    }

    if (isError || !property) {
        return <div>Error loading property</div>;
    }

    return (
        <div className="p-6 space-y-6 overflow-y-scroll h-screen  ">
            <div className="flex  items-center justify-between w-full border-b pb-4 shrink-0">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4"/>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-semibold">{property.title}</h1>
                        <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1"/>
                            <span className="text-sm">{property.address}</span>
                        </div>
                    </div>
                </div>
                <Button variant="outline" asChild>
                    <Link href={`/properties/${propertyId}/edit`} className="text-sm">Edit Property</Link>
                </Button>
            </div>

            <div className={"flex w-full gap-x-3"}>
                <div className={"w-full"}>
                <div className="max-w-[800px]">
                    <MediaCarousel
                        media={property.media.map(
                            (mediaItem, idx) => (
                                {
                                    src: mediaItem.url,
                                    alt: `Property image ${idx + 1}`,
                                }
                            )
                        )}
                        showThumbnails
                        showPagination={false}
                    />
                </div>

                <div className=" space-y-6 ">
                    <div className="flex items-center justify-between max-w-[800px]">
                        <div>
                            <h1 className="text-2xl font-semibold">{property.title}</h1>
                            <div className="flex items-center text-muted-foreground">
                                <MapPin className="h-4 w-4 mr-1"/>
                                <span className="text-sm">{property.address}</span>
                            </div>
                        </div>
                        <h1 className="text-2xl font-semibold">{formatPrice(property.price, property.currency as 'USD' | 'GHS')}</h1>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 max-w-[800px] ">
                        <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                            <Building2 className="h-5 w-5 mb-1 text-muted-foreground"/>
                            <span className="text-sm text-muted-foreground">Type</span>
                            <span className="font-medium">{property.propertyType}</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                            <Users className="h-5 w-5 mb-1 text-muted-foreground"/>
                            <span className="text-sm text-muted-foreground">Bedrooms</span>
                            <span className="font-medium">{property.bedrooms}</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                            <Building className="h-5 w-5 mb-1 text-muted-foreground"/>
                            <span className="text-sm text-muted-foreground">Bathrooms</span>
                            <span className="font-medium">{property.bathrooms}</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                            <Ruler className="h-5 w-5 mb-1 text-muted-foreground"/>
                            <span className="text-sm text-muted-foreground">Area</span>
                            <span className="font-medium">{property.area.toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                            <Calendar className="h-5 w-5 mb-1 text-muted-foreground"/>
                            <span className="text-sm text-muted-foreground">Year Built</span>
                            <span className="font-medium">{property.yearBuilt}</span>
                        </div>
                    </div>

                    <h2 className="text-xl font-medium mb-2">Description</h2>
                    <p className="text-muted-foreground text-wrap max-w-[800px]">{property.description}</p>
                </div>
                </div>
            <TenantManagement/>
            </div>
        </div>
    );
}

function PropertyDetailSkeleton() {
    return (
        <div className="p-6 space-y-6 overflow-y-scroll h-screen">
            {/* Header skeleton */}
            <div className="flex items-center justify-between w-full border-b pb-4 shrink-0">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-9 w-9" /> {/* Back button */}
                    <div>
                        <Skeleton className="h-8 w-64 mb-2" /> {/* Title */}
                        <div className="flex items-center">
                            <Skeleton className="h-4 w-4 mr-1" /> {/* Icon */}
                            <Skeleton className="h-4 w-48" /> {/* Address */}
                        </div>
                    </div>
                </div>
                <Skeleton className="h-9 w-28" /> {/* Edit button */}
            </div>

            {/* Image carousel skeleton */}
            <div className="max-w-[800px]">
                <Skeleton className="h-[400px] w-full" />
            </div>

            {/* Property details skeleton */}
            <div className="space-y-6">
                <div className="flex items-center justify-between max-w-[800px]">
                    <div>
                        <Skeleton className="h-8 w-64 mb-2" /> {/* Title */}
                        <div className="flex items-center">
                            <Skeleton className="h-4 w-4 mr-1" /> {/* Icon */}
                            <Skeleton className="h-4 w-48" /> {/* Address */}
                        </div>
                    </div>
                    <Skeleton className="h-8 w-32" /> {/* Price */}
                </div>

                {/* Property features grid skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 max-w-[800px]">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex flex-col items-center p-3 bg-muted rounded-lg">
                            <Skeleton className="h-5 w-5 mb-1" /> {/* Icon */}
                            <Skeleton className="h-4 w-16 mb-1" /> {/* Label */}
                            <Skeleton className="h-5 w-8" /> {/* Value */}
                        </div>
                    ))}
                </div>

                {/* Description skeleton */}
                <Skeleton className="h-6 w-32 mb-2" /> {/* Description title */}
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    );
}
