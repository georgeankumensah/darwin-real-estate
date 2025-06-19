import {Card, CardContent} from "../card";

export const PropertyCardSkeleton = () => (
    <Card className="overflow-hidden h-full">
        <div className="aspect-[4/3] relative overflow-hidden bg-gray-200 animate-pulse" />
        <CardContent className="p-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-3" />
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2 mb-3" />
            <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
            </div>
        </CardContent>
    </Card>
)