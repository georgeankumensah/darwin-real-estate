import Link from "next/link";
import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Sample property data
const properties = [
  {
    id: 1,
    title: "Modern",
    image: "/placeholder.png?height=400&width=600",
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
    <div className="p-6 space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Properties</h1>
        <p className="text-muted-foreground">Luxury homes and apartments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {properties.map((property) => (
          <div
            key={property.id}
            className="group flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
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
                <h3 className="font-medium text-lg">{property.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {property.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <Link
                  href={`/properties/${property.id}`}
                  className="text-xs rounded-full px-4"
                >
                  <Button variant="outline" size="sm" className="text-xs rounded-full px-4">
                  VIEW ALL
                  </Button>
                </Link>
                <div className="flex -space-x-2">
                  {property.agents.map((agent, index) => (
                    <Avatar
                      key={index}
                      className="h-6 w-6 border-2 border-background"
                    >
                      <AvatarImage
                        src={agent.image || "/placeholder.svg"}
                        alt={agent.name}
                      />
                      <AvatarFallback className="text-[10px]">
                        {agent.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <Link
          href="/properties/new"
          className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-background p-6 text-center hover:border-primary hover:bg-muted transition-colors h-full min-h-[300px]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed">
            <Plus className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">Create a New Property</h3>
        </Link>
      </div>
    </div>
  );
}
