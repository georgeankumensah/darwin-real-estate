import {
  ArrowLeft,
  Building,
  Calendar,
  MapPin,
  Ruler,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <div className="h-full overflow-y-scrollp-6 space-y-6">
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

      <div className="grid grid-cols-3 gap-4 h-[400px]">
        <div className="col-span-2 rounded-lg overflow-hidden">
          <img
            src={property.images[0] || "/placeholder.svg"}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-rows-2 gap-4">
          <div className="rounded-lg overflow-hidden">
            <img
              src={property.images[1] || "/placeholder.svg"}
              alt={`${property.title} - Image 2`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <img
              src={property.images[2] || "/placeholder.svg"}
              alt={`${property.title} - Image 3`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 pt-4">
              <div>
                <h2 className="text-xl font-medium mb-2">Description</h2>
                <p className="text-muted-foreground">{property.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-medium mb-2">Features</h2>
                <ul className="grid grid-cols-2 gap-2">
                  <li className="flex items-center">
                    <span className="bg-primary/10 p-1.5 rounded-full mr-2">
                      <Building className="h-4 w-4 text-primary" />
                    </span>
                    <span className="text-sm">Modern Architecture</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 p-1.5 rounded-full mr-2">
                      <Ruler className="h-4 w-4 text-primary" />
                    </span>
                    <span className="text-sm">Open Floor Plan</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 p-1.5 rounded-full mr-2">
                      <Calendar className="h-4 w-4 text-primary" />
                    </span>
                    <span className="text-sm">
                      Built in {property.yearBuilt}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 p-1.5 rounded-full mr-2">
                      <Users className="h-4 w-4 text-primary" />
                    </span>
                    <span className="text-sm">Family Friendly</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="details">
              <div className="pt-4">
                <h2 className="text-xl font-medium mb-4">Property Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Property ID</p>
                    <p className="font-medium">#{property.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Property Type
                    </p>
                    <p className="font-medium">Residential</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Property Status
                    </p>
                    <p className="font-medium">For Sale</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Year Built</p>
                    <p className="font-medium">{property.yearBuilt}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="documents">
              <div className="pt-4">
                <h2 className="text-xl font-medium mb-4">Property Documents</h2>
                <p className="text-muted-foreground">
                  No documents available for this property.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">Price</span>
                <span className="font-semibold text-lg">{property.price}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Bedrooms</p>
                  <p className="font-medium">{property.bedrooms}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Bathrooms</p>
                  <p className="font-medium">{property.bathrooms}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Area</p>
                  <p className="font-medium">{property.area}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Year Built</p>
                  <p className="font-medium">{property.yearBuilt}</p>
                </div>
              </div>
              <Button className="w-full">Schedule Viewing</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Listing Agents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {property.agents.map((agent, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={agent.image || "/placeholder.svg"}
                      alt={agent.name}
                    />
                    <AvatarFallback>
                      {agent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{agent.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {agent.role}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
