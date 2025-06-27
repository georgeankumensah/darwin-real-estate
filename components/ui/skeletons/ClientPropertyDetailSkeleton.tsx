import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function ClientPropertyDetailSkeleton() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header Skeleton */}
            <div className="border-b bg-white sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-9 w-9"/>
                            <div>
                                <Skeleton className="h-6 w-48 mb-2"/>
                                <div className="flex items-center">
                                    <Skeleton className="h-4 w-4 mr-1"/>
                                    <Skeleton className="h-4 w-32"/>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-9 w-9"/>
                            <Skeleton className="h-9 w-9"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="container mx-auto px-4 py-6">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Carousel Skeleton */}
                    <div className="space-y-4">
                        <Skeleton className="h-[400px] w-full rounded-lg"/>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {[...Array(4)].map((_, index) => (
                                <Skeleton key={index} className="h-16 w-16 rounded flex-shrink-0"/>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Details Skeleton */}
                    <div className="space-y-6">
                        {/* Price Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-8 w-32"/>
                                <Skeleton className="h-6 w-20"/>
                            </div>
                            <div className="flex items-center">
                                <Skeleton className="h-5 w-5 mr-2"/>
                                <Skeleton className="h-4 w-48"/>
                            </div>
                        </div>

                        {/* Features Card */}
                        <Card>
                            <CardContent className="p-6">
                                <Skeleton className="h-6 w-32 mb-4"/>
                                <div className="grid grid-cols-2 gap-4">
                                    {[...Array(5)].map((_, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <Skeleton className="h-5 w-5"/>
                                            <div>
                                                <Skeleton className="h-3 w-16 mb-1"/>
                                                <Skeleton className="h-4 w-12"/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Description Card */}
                        <Card>
                            <CardContent className="p-6">
                                <Skeleton className="h-6 w-24 mb-4"/>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full"/>
                                    <Skeleton className="h-4 w-full"/>
                                    <Skeleton className="h-4 w-3/4"/>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Card */}
                        <Card>
                            <CardContent className="p-6">
                                <Skeleton className="h-6 w-48 mb-4"/>
                                <div className="space-y-3">
                                    <Skeleton className="h-11 w-full"/>
                                    <Skeleton className="h-11 w-full"/>
                                    <Skeleton className="h-11 w-full"/>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}