"use client";

import { useState } from "react";
import Link from "next/link";
import { Grid, List, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Sample properties data
const properties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    address: "123 Luxury Lane, Beverly Hills, CA",
    price: "$2,450,000",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2850,
    image: "/placeholder.svg?height=400&width=600",
    type: "For Sale",
    category: "Luxury",
    yearBuilt: 2020,
    parking: 2,
  },
  {
    id: 2,
    title: "Downtown Apartment",
    address: "456 Urban Street, New York, NY",
    price: "$850,000",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    image: "/placeholder.svg?height=400&width=600",
    type: "For Sale",
    category: "Residential",
    yearBuilt: 2018,
    parking: 1,
  },
  {
    id: 3,
    title: "Beachfront Condo",
    address: "789 Ocean Drive, Miami, FL",
    price: "$3,500/month",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    image: "/placeholder.svg?height=400&width=600",
    type: "For Rent",
    category: "Luxury",
    yearBuilt: 2019,
    parking: 1,
  },
  {
    id: 4,
    title: "Suburban Family Home",
    address: "101 Maple Street, Seattle, WA",
    price: "$1,250,000",
    bedrooms: 5,
    bathrooms: 3,
    sqft: 3200,
    image: "/placeholder.svg?height=400&width=600",
    type: "For Sale",
    category: "Residential",
    yearBuilt: 2015,
    parking: 2,
  },
  {
    id: 5,
    title: "City Loft",
    address: "321 Industrial Ave, Portland, OR",
    price: "$2,200/month",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 900,
    image: "/placeholder.svg?height=400&width=600",
    type: "For Rent",
    category: "Residential",
    yearBuilt: 2017,
    parking: 0,
  },
  {
    id: 6,
    title: "Mountain Retreat",
    address: "555 Pine Ridge, Aspen, CO",
    price: "$4,200,000",
    bedrooms: 6,
    bathrooms: 5,
    sqft: 4500,
    image: "/placeholder.svg?height=400&width=600",
    type: "For Sale",
    category: "Luxury",
    yearBuilt: 2021,
    parking: 3,
  },
];

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price-low");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // Filter and sort properties
  const filteredProperties = properties
    .filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        filterType === "all" ||
        property.type.toLowerCase().includes(filterType.toLowerCase());
      const matchesCategory =
        filterCategory === "all" ||
        property.category.toLowerCase() === filterCategory.toLowerCase();

      return matchesSearch && matchesType && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (
            Number.parseFloat(a.price.replace(/[$,/month]/g, "")) -
            Number.parseFloat(b.price.replace(/[$,/month]/g, ""))
          );
        case "price-high":
          return (
            Number.parseFloat(b.price.replace(/[$,/month]/g, "")) -
            Number.parseFloat(a.price.replace(/[$,/month]/g, ""))
          );
        case "sqft-low":
          return a.sqft - b.sqft;
        case "sqft-high":
          return b.sqft - a.sqft;
        case "newest":
          return b.yearBuilt - a.yearBuilt;
        default:
          return 0;
      }
    });

  return (
    <div className="flex-1">
        
      {/* Hero Section */}
      <section className="bg-gray-50 py-12 ">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Find Your Perfect Property
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Browse our extensive collection of properties for sale and rent
          </p>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by location, property type, or keywords..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="sale">For Sale</SelectItem>
                  <SelectItem value="rent">For Rent</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full lg:w-auto">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {filteredProperties.length} Properties Found
              </h2>
              <div className="flex flex-wrap gap-2">
                {filterType !== "all" && (
                  <Badge variant="secondary" className="capitalize">
                    {filterType}
                    <button
                      onClick={() => setFilterType("all")}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {filterCategory !== "all" && (
                  <Badge variant="secondary" className="capitalize">
                    {filterCategory}
                    <button
                      onClick={() => setFilterCategory("all")}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="sqft-low">Size: Small to Large</SelectItem>
                  <SelectItem value="sqft-high">
                    Size: Large to Small
                  </SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Properties Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <Link
                  href={`/properties/${property.id}`}
                  key={property.id}
                  className="group"
                >
                  <Card className="overflow-hidden h-full rounded-none transition-all hover:shadow-md">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded-none">
                        {property.type}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg line-clamp-1">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-muted-foreground mt-1">
                        <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                        <span className="text-sm line-clamp-1">
                          {property.address}
                        </span>
                      </div>
                      <div className="mt-3 text-lg font-bold">
                        {property.price}
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                        <div>{property.bedrooms} Beds</div>
                        <div>{property.bathrooms} Baths</div>
                        <div>{property.sqft.toLocaleString()} sqft</div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-6 flex flex-col ">
              {filteredProperties.map((property) => (
                <Link
                  href={`/properties/${property.id}`}
                  key={property.id}
                  className="group"
                >
                  <Card className="overflow-hidden transition-all hover:shadow-md rounded-none">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 aspect-[4/3] md:aspect-auto relative overflow-hidden">
                        <img
                          src={property.image || "/placeholder.svg"}
                          alt={property.title}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-2 right-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded-none">
                          {property.type}
                        </div>
                      </div>
                      <CardContent className="md:w-2/3 p-6">
                        <div className="flex flex-col h-full">
                          <h3 className="font-semibold text-xl mb-2">
                            {property.title}
                          </h3>
                          <div className="flex items-center text-muted-foreground mb-3">
                            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span>{property.address}</span>
                          </div>
                          <div className="text-2xl font-bold mb-4">
                            {property.price}
                          </div>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                            <div>{property.bedrooms} Bedrooms</div>
                            <div>{property.bathrooms} Bathrooms</div>
                            <div>{property.sqft.toLocaleString()} sqft</div>
                            <div>Built {property.yearBuilt}</div>
                            {property.parking > 0 && (
                              <div>{property.parking} Parking</div>
                            )}
                          </div>
                          <div className="mt-auto">
                            <Badge variant="outline" className="capitalize">
                              {property.category}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">
                No properties found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters to find more
                properties.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("all");
                  setFilterCategory("all");
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
