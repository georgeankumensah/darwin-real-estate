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
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageCarousel from "@/components/image-carousel";
import { Separator } from "@/components/ui/separator";

export default function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // In a real app, you would fetch the property data based on the ID
  const propertyId = Number.parseInt(params.id);

  // Sample property data
  const property = {
    id: propertyId,
    propertyType: "Residential",
    title:
      propertyId === 1
        ? "Modern Luxury Villa"
        : propertyId === 2
        ? "Scandinavian Apartment"
        : "Minimalist Townhouse",
    address: "123 Luxury Lane, Beverly Hills, CA 90210",
    price: "$2,450,000",
    bedrooms: 4,
    bathrooms: 3,
    area: "2,850 sq ft",
    yearBuilt: "2022",
    description:
      "This stunning property features an open floor plan with high ceilings, floor-to-ceiling windows, and premium finishes throughout. The gourmet kitchen includes top-of-the-line appliances, custom cabinetry, and a large center island. The primary suite offers a spa-like bathroom and walk-in closet. Additional features include a home office, media room, and expansive outdoor living space with a pool and outdoor kitchen.",
    images: [
      "/placeholder.png?height=600&width=800",
      "/placeholder2.png?height=600&width=800",
      "/placeholder3.png?height=600&width=800",
    ],
    agents: [
      {
        name: "Alex Morgan",
        image: "/placeholder.svg?height=40&width=40",
        role: "Lead Agent",
      },
      {
        name: "Sarah Lee",
        image: "/placeholder.svg?height=40&width=40",
        role: "Co-Agent",
      },
    ],
  };

  return (
    <div className="p-6 space-y-6 w-full">
      <div className="flex  items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/properties">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">{property.title}</h1>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.address}</span>
            </div>
          </div>
        </div>
        <Button variant="outline" asChild>
          <span className="text-sm">Edit Property</span>
        </Button>
      </div>

      <div className=" max-w-[800px]">
        <ImageCarousel showThumbnails showPagination={false} />
      </div>

      <div className="">
        <div className=" space-y-6 max-w-[800px]">
          <div className="flex items-center justify-between max-w-[800px]">
            <div>
              <h1 className="text-2xl font-semibold">{property.title}</h1>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.address}</span>
              </div>
            </div>
            <h1 className="text-2xl font-semibold">{property.price}</h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 max-w-[800px] ">
            <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
              <Building2 className="h-5 w-5 mb-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Type</span>
              <span className="font-medium">{property.propertyType}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
              <Users className="h-5 w-5 mb-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Bedrooms</span>
              <span className="font-medium">{property.bedrooms}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
              <Building className="h-5 w-5 mb-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Bathrooms</span>
              <span className="font-medium">{property.bathrooms}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
              <Ruler className="h-5 w-5 mb-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Area</span>
              <span className="font-medium">{property.area}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
              <Calendar className="h-5 w-5 mb-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Year Built</span>
              <span className="font-medium">{property.yearBuilt}</span>
            </div>
          </div>
        
          <h2 className="text-xl font-medium mb-2">Description</h2>
          <p className="text-muted-foreground ">{property.description}</p>
        </div>
      </div>
    </div>
  );
}
