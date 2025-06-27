import { Skeleton } from "@/components/ui/skeleton";

export function PropertyCardSkeleton() {
    return (
        <div className="group flex flex-col overflow-hidden border bg-card shadow-sm">
            <div className="aspect-[4/3] relative overflow-hidden">
                <Skeleton className="h-full w-full"/>
            </div>
            <div className="flex flex-col p-4 flex-1">
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-16"/>
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-32"/>
                        <Skeleton className="h-4 w-20"/>
                    </div>
                    <div className="flex items-center">
                        <Skeleton className="h-4 w-4 mr-1"/>
                        <Skeleton className="h-4 w-40"/>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                    <Skeleton className="h-4 w-full"/>
                    <Skeleton className="h-4 w-3/4 mt-1"/>
                </div>
            </div>
        </div>
    );
}