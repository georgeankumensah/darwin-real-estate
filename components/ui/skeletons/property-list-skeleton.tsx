import {Card, CardContent} from "@/components/ui/card";

export const PropertyListSkeleton = () => (
    <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 aspect-[4/3] md:aspect-auto relative overflow-hidden bg-gray-200 animate-pulse"/>
            <CardContent className="md:w-2/3 p-6">
                <div className="flex flex-col h-full">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"/>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-3"/>
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2 mb-4"/>
                    <div className="flex gap-6 mb-4">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"/>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"/>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"/>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"/>
                    </div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-24"/>
                </div>
            </CardContent>
        </div>
    </Card>
)