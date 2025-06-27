import { Skeleton } from "@/components/ui/skeleton";
import { Building, Building2, Calendar, MapPin, Ruler, Users } from "lucide-react";

export function PropertyDetailSkeleton() {
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