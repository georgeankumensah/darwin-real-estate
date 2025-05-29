import Link from "next/link";
import { MapPin, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Sample property data
const properties = [
  {
    id: 1,
    title: "Modern",
    image: "/placeholder.png?height=400&width=600",
    address: "123 Luxury Lane, Beverly Hills, CA 90210",
    price: "$2,450,000",
    description:
      "Sleek design with open floor plans, clean lines, and minimalist aesthetics for urban living.",
    agents: [
      { name: "Alex M", image: "/placeholder.svg?height=40&width=40" },
      { name: "Sarah L", image: "/placeholder.svg?height=40&width=40" },
      { name: "John D", image: "/placeholder.svg?height=40&width=40" },
      { name: "Emma W", image: "/placeholder.svg?height=40&width=40" },
    ],
  },
  {
    id: 2,
    title: "Scandinavian",
    image: "/placeholder2.png?height=400&width=600",
    address: "123 Luxury Lane, Beverly Hills, CA 90210",
    price: "$2,450,000",

    description:
      "Natural materials, neutral colors, and functional design creating warm and inviting spaces.",
    agents: [
      { name: "Lisa T", image: "/placeholder.svg?height=40&width=40" },
      { name: "Mark R", image: "/placeholder.svg?height=40&width=40" },
      { name: "Kate P", image: "/placeholder.svg?height=40&width=40" },
      { name: "David S", image: "/placeholder.svg?height=40&width=40" },
    ],
  },
  {
    id: 3,
    title: "Minimalist",
    image: "/placeholder3.png?height=400&width=600",
    address: "123 Luxury Lane, Beverly Hills, CA 90210",
    price: "$2,450,000",
    description:
      "Different properties have different styles, and various types of amenities to suit every need.",
    agents: [
      { name: "Ryan K", image: "/placeholder.svg?height=40&width=40" },
      { name: "Olivia J", image: "/placeholder.svg?height=40&width=40" },
      { name: "Noah C", image: "/placeholder.svg?height=40&width=40" },
      { name: "Sophia B", image: "/placeholder.svg?height=40&width=40" },
    ],
  },
];

export default function PropertiesPage() {
  return (
    <div className="p-6 space-y-4 ">
      <div className=" flex items-center justify-between space-y-1 w-full  border-b pb-4 ">
        <div>
          <h1 className="text-2xl font-medium">Properties</h1>
          <p className="text-muted-foreground text-sm">
            Luxury homes and apartments
          </p>
        </div>
        <Link
          href="/properties/new"
          className="flex items-center gap-2 bg-primary text-sm rounded-[6px] text-white px-4 py-2  hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-6 w-6 text-white" />
          <span>Add Property</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {properties.map((property) => (
          <Link
            href={`/properties/${property.id}`}
            key={property.id}
            className="group flex flex-col overflow-hidden  border bg-card shadow-sm transition-all hover:shadow-md"
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col p-4 flex-1">
              <div className="space-y-2 flex-1">
                <div className="text-xs text-muted-foreground">
                  Property #{property.id}
                </div>
                <div className="flex items-center justify-between ">
                  <h3 className="font-medium text-lg">{property.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {property.price}
                  </p>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-xs">{property.address}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {property.description}
                </p>
              </div>
            </div>
          </Link>
        ))}

        {/* <Link
          href="/properties/new"
          className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-background p-6 text-center hover:border-primary hover:bg-muted transition-colors h-full min-h-[300px]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed">
            <Plus className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">Create a New Property</h3>
        </Link> */}
      </div>
    </div>
  );
}
