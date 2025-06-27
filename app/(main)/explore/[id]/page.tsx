"use client"

import {
    ArrowLeft,
    Building,
    Building2,
    Calendar,
    MapPin,
    Ruler,
    Users,
    Phone,
    Mail,
    Heart,
    Share2,
} from "lucide-react"
import {Button} from "@/components/ui/button"
import MediaCarousel from "@/components/ui/image-carousel"
import {usePropertyById} from "@/hooks/api/properties/usePropertyById"
import {useParams, useRouter} from "next/navigation"
import {formatPrice} from "@/lib/helpers/formatPrice"
import {Skeleton} from "@/components/ui/skeleton"
import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {ClientPropertyDetailSkeleton} from "@/components/ui/skeletons/ClientPropertyDetailSkeleton";
import {toast} from "@/hooks/use-toast";

const page = () => {
    const params = useParams()
    const propertyId = (params?.id as string) || "1" // Default to "1" if no ID is provided
    const router = useRouter()
    const {data: property, isLoading, isError} = usePropertyById(propertyId)

    if (isLoading) {
        return <ClientPropertyDetailSkeleton/>
    }

    if (isError || !property) {
        toast({
            variant: "destructive",
            title: "Error loading property",
            description: "Could not fetch property details. Please try again.",
        });
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardContent className="p-6 text-center">
                        <h2 className="text-xl font-semibold mb-2">Property Not Found</h2>
                        <p className="text-muted-foreground mb-4">
                            The property you're looking for doesn't exist or has been removed.
                        </p>
                        <Button onClick={() => router.push("/properties")}>Browse Properties</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b bg-white sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="icon" onClick={() => router.back()}>
                                <ArrowLeft className="h-4 w-4"/>
                            </Button>
                            <div>
                                <h1 className="text-xl font-semibold">{property.title}</h1>
                                <div className="flex items-center text-muted-foreground">
                                    <MapPin className="h-4 w-4 mr-1"/>
                                    <span className="text-sm">{property.address}</span>
                                </div>
                            </div>
                        </div>
                        {/*<div className="flex items-center gap-2">*/}
                        {/*    <Button variant="outline" size="icon">*/}
                        {/*        <Heart className="h-4 w-4"/>*/}
                        {/*    </Button>*/}
                        {/*    <Button variant="outline" size="icon">*/}
                        {/*        <Share2 className="h-4 w-4"/>*/}
                        {/*    </Button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Media Carousel */}
                    <div className="space-y-4">
                        <MediaCarousel
                            media={
                                property.media?.map((mediaItem, idx) => ({
                                    src: mediaItem.url,
                                    alt: `Property image ${idx + 1}`,
                                })) || []
                            }
                            showThumbnails
                            showPagination={false}
                        />
                    </div>

                    {/* Right Column - Property Details */}
                    <div className="space-y-6">
                        {/* Price and Basic Info */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h1 className="text-3xl font-bold">
                                    {formatPrice(property.price, property.currency as "USD" | "GHS")}
                                    {property.propertyType === "Rent" &&
                                        <span className="text-lg font-normal">/month</span>}
                                </h1>
                                <Badge variant="secondary" className="text-sm">
                                    {(property.status).replace("_", " ") || "Sale"}
                                </Badge>
                            </div>

                            <div className="flex items-center text-muted-foreground">
                                <MapPin className="h-5 w-5 mr-2"/>
                                <span>{property.address}</span>
                            </div>
                        </div>

                        {/* Property Features */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Property Features</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <Building2 className="h-5 w-5 text-muted-foreground"/>
                                        <div>
                                            <span className="text-sm text-muted-foreground">Type</span>
                                            <p className="font-medium">{property.propertyType}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Users className="h-5 w-5 text-muted-foreground"/>
                                        <div>
                                            <span className="text-sm text-muted-foreground">Bedrooms</span>
                                            <p className="font-medium">{property.bedrooms}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Building className="h-5 w-5 text-muted-foreground"/>
                                        <div>
                                            <span className="text-sm text-muted-foreground">Bathrooms</span>
                                            <p className="font-medium">{property.bathrooms}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Ruler className="h-5 w-5 text-muted-foreground"/>
                                        <div>
                                            <span className="text-sm text-muted-foreground">Area</span>
                                            <p className="font-medium">{property.area.toLocaleString()} sq ft</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-muted-foreground"/>
                                        <div>
                                            <span className="text-sm text-muted-foreground">Year Built</span>
                                            <p className="font-medium">{property.yearBuilt}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Description */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Description</h3>
                                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                            </CardContent>
                        </Card>

                        {/* Contact Actions */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Interested in this property?</h3>
                                <div className="space-y-3">
                                    <Button className="w-full" size="lg">
                                        <Phone className="h-4 w-4 mr-2"/>
                                        Call Agent
                                    </Button>
                                    <Button variant="outline" className="w-full" size="lg">
                                        <Mail className="h-4 w-4 mr-2"/>
                                        Send Message
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default page