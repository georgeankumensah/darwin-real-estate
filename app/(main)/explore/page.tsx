"use client"

import {useState, useMemo, ChangeEvent} from "react"
import Link from "next/link"
import {Grid, List, MapPin, Search, SlidersHorizontal, X, ChevronDown, ChevronUp} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Badge} from "@/components/ui/badge"
import {Slider} from "@/components/ui/slider"
import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Separator} from "@/components/ui/separator"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
import {useAllProperties} from "@/hooks/api/properties/useAllProperties";
import {formatPrice} from "@/lib/helpers/formatPrice";
import {PropertyCardSkeleton} from "@/components/ui/skeletons/property-card-skeleton";
import {PropertyListSkeleton} from "@/components/ui/skeletons/property-list-skeleton";

export default function PropertiesPage() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("price-low")
    const [showFilters, setShowFilters] = useState(false)

    // Filter states
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [selectedCurrency, setSelectedCurrency] = useState<"USD" | "GHS" | "ALL">("ALL")
    const [bedroomRange, setBedroomRange] = useState([1, 6])
    const [bathroomRange, setBathroomRange] = useState([1, 5])
    const [priceRange, setPriceRange] = useState([0, 5000000])

    // Collapsible states
    const [priceOpen, setPriceOpen] = useState(true)
    const [typeOpen, setTypeOpen] = useState(true)
    const [bedroomOpen, setBedroomOpen] = useState(false)
    const [bathroomOpen, setBathroomOpen] = useState(false)

    const {data, isLoading} = useAllProperties()

    const properties = data?.properties || []

    // Get price ranges - handle undefined properties
    const maxSalePrice = useMemo(() => {
        if (!properties || properties.length === 0) return 5000000
        return Math.max(
            ...properties.filter((p) => p.status === "FOR_SALE").map((p) => p.price),
            0
        )
    }, [properties])

    const maxRentPrice = useMemo(() => {
        if (!properties || properties.length === 0) return 10000
        return Math.max(
            ...properties.filter((p) => p.status === "FOR_RENT").map((p) => p.price),
            0
        )
    }, [properties])

    const maxPrice = Math.max(maxSalePrice, maxRentPrice)

    // Filter and sort properties
    const filteredProperties = useMemo(() => {
        return properties.filter((property) => {
            // Search filter
            if (searchTerm.trim()) {
                const searchLower = searchTerm.toLowerCase()
                const matchesSearch =
                    property.title?.toLowerCase().includes(searchLower) ||
                    property.address?.toLowerCase().includes(searchLower) ||
                    property.propertyType?.toLowerCase().includes(searchLower) ||
                    property.description?.toLowerCase().includes(searchLower)

                if (!matchesSearch) return false
            }

            // Currency filter
            if (selectedCurrency !== "ALL" && property.currency !== selectedCurrency) return false

            // Type filter
            if (selectedTypes.length > 0 && !selectedTypes.includes(property.propertyType)) return false

            if (selectedTypes.length > 0) {
                if (property.status === "FOR_RENT") {
                    if (!selectedTypes.includes("Apartment") && !selectedTypes.includes("Room")) return false
                }
                if (property.status === "FOR_SALE") {
                    if (!selectedTypes.includes("House")) return false
                }
            }

            // Bedroom filter
            if (bedroomRange[0] !== 1 || bedroomRange[1] !== 6) {
                if (property.bedrooms < bedroomRange[0] || property.bedrooms > bedroomRange[1]) return false
            }

            // Bathroom filter
            if (bathroomRange[0] !== 1 || bathroomRange[1] !== 5) {
                if (property.bathrooms < bathroomRange[0] || property.bathrooms > bathroomRange[1]) return false
            }

            // Price filter
            if (priceRange[0] !== 0 || priceRange[1] !== maxPrice) {
                if (property.price < priceRange[0] || property.price > priceRange[1]) return false
            }

            return true
        })
    }, [properties, searchTerm, selectedCurrency, selectedTypes, bedroomRange, bathroomRange, priceRange, maxPrice])

    const sortedProperties = useMemo(() => {
        return [...filteredProperties].sort((a, b) => {
            switch (sortBy) {
                case "price-low":
                    return a.price - b.price
                case "price-high":
                    return b.price - a.price
                case "newest":
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                default:
                    return 0
            }
        })
    }, [filteredProperties, sortBy])

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const handleTypeChange = (type: string, checked: boolean) => {
        if (checked) {
            setSelectedTypes([...selectedTypes, type])
        } else {
            setSelectedTypes(selectedTypes.filter((t) => t !== type))
        }
    }

    const handlePriceRangeChange = (value: number[]) => {
        setPriceRange(value)
    }

    const clearAllFilters = () => {
        setSelectedTypes([])
        setBedroomRange([1, 6])
        setBathroomRange([1, 5])
        setPriceRange([0, maxPrice])
        setSearchTerm("")
        setSelectedCurrency("ALL")
    }

    const activeFiltersCount =
        selectedTypes.length +
        (bedroomRange[0] !== 1 || bedroomRange[1] !== 6 ? 1 : 0) +
        (bathroomRange[0] !== 1 || bathroomRange[1] !== 5 ? 1 : 0) +
        (priceRange[0] !== 0 || priceRange[1] !== maxPrice ? 1 : 0) +
        (searchTerm.trim() ? 1 : 0) +
        (selectedCurrency !== "ALL" ? 1 : 0)

    // Get unique property types from data
    const propertyTypes = useMemo(() => {
        if (!properties || properties.length === 0) return ["For Sale", "For Rent"]
        const types = [...new Set(properties.map(p => p.propertyType))].filter(Boolean)
        return types.length > 0 ? types : ["For Sale", "For Rent"]
    }, [properties])

    return (
        <div className="flex-1">
            {/* Hero Section */}
            <section className="bg-gray-50 py-8 md:py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">Find Your Perfect Property</h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">
                        Browse our extensive collection of properties for sale and rent
                    </p>

                    {/* Search Bar */}
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                                <Input
                                    placeholder="Search by location, property type, or keywords..."
                                    className="pl-9"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <SlidersHorizontal className="h-4 w-4 mr-2"/>
                                Filters
                                {activeFiltersCount > 0 && (
                                    <Badge variant="secondary" className="ml-2">
                                        {activeFiltersCount}
                                    </Badge>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-6 md:py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                        {/* Filters Sidebar */}
                        {showFilters && (
                            <div className="w-full lg:w-80 lg:flex-shrink-0">
                                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm lg:sticky lg:top-4">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-semibold">Filters</h3>
                                        <div className="flex items-center gap-2">
                                            {activeFiltersCount > 0 && (
                                                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                                                    Clear All
                                                </Button>
                                            )}
                                            <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                                                <X className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Currency Filter */}
                                        <Collapsible open={true}>
                                            <CollapsibleTrigger className="flex items-center justify-between w-full">
                                                <Label className="text-base font-medium">Currency</Label>
                                                <ChevronDown className="h-4 w-4"/>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="space-y-3 mt-4">
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroup
                                                        value={selectedCurrency}
                                                        onValueChange={(value) => setSelectedCurrency(value as "USD" | "GHS" | "ALL")}
                                                        className="space-y-2"
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="ALL" id="currency-all" />
                                                            <Label htmlFor="currency-all" className="text-sm font-normal">
                                                                All Currencies
                                                            </Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="USD" id="currency-usd" />
                                                            <Label htmlFor="currency-usd" className="text-sm font-normal">
                                                                USD
                                                            </Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="GHS" id="currency-ghs" />
                                                            <Label htmlFor="currency-ghs" className="text-sm font-normal">
                                                                GHS
                                                            </Label>
                                                        </div>
                                                    </RadioGroup>
                                                </div>
                                            </CollapsibleContent>
                                        </Collapsible>
                                        <Separator />

                                        {/* Price Range */}
                                        <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
                                            <CollapsibleTrigger className="flex items-center justify-between w-full">
                                                <Label className="text-base font-medium">Price Range</Label>
                                                {priceOpen ? <ChevronUp className="h-4 w-4"/> :
                                                    <ChevronDown className="h-4 w-4"/>}
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="space-y-4 mt-4">
                                                <Slider
                                                    defaultValue={[0, maxPrice]}
                                                    value={[priceRange[0], priceRange[1]]}
                                                    onValueChange={handlePriceRangeChange}
                                                    max={maxPrice}
                                                    min={0}
                                                    step={1000}
                                                    className="w-full"
                                                />
                                                <div
                                                    className="flex items-center justify-between text-sm text-muted-foreground">
                                                    <span>${priceRange[0].toLocaleString()}</span>
                                                    <span>${priceRange[1].toLocaleString()}</span>
                                                </div>
                                            </CollapsibleContent>
                                        </Collapsible>

                                        <Separator/>

                                        {/* Property Type */}
                                        <Collapsible open={typeOpen} onOpenChange={setTypeOpen}>
                                            <CollapsibleTrigger className="flex items-center justify-between w-full">
                                                <Label className="text-base font-medium">Property Type</Label>
                                                {typeOpen ? <ChevronUp className="h-4 w-4"/> :
                                                    <ChevronDown className="h-4 w-4"/>}
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="space-y-3 mt-4">
                                                {propertyTypes.map((type) => (
                                                    <div key={type} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={type}
                                                            checked={selectedTypes.includes(type)}
                                                            onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
                                                        />
                                                        <Label htmlFor={type} className="text-sm font-normal">
                                                            {type}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </CollapsibleContent>
                                        </Collapsible>

                                        <Separator/>

                                        {/* Bedrooms */}
                                        <Collapsible open={bedroomOpen} onOpenChange={setBedroomOpen}>
                                            <CollapsibleTrigger className="flex items-center justify-between w-full">
                                                <Label className="text-base font-medium">Bedrooms</Label>
                                                {bedroomOpen ? <ChevronUp className="h-4 w-4"/> :
                                                    <ChevronDown className="h-4 w-4"/>}
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="space-y-4 mt-4">
                                                <Slider
                                                    defaultValue={[0, 10]}
                                                    value={bedroomRange}
                                                    onValueChange={setBedroomRange}
                                                    max={6}
                                                    min={1}
                                                    step={1}
                                                    className="w-full"
                                                />
                                                <div
                                                    className="flex items-center justify-between text-sm text-muted-foreground">
                                                    <span>
                                                        {bedroomRange[0]} bed{bedroomRange[0] !== 1 ? "s" : ""}
                                                    </span>
                                                    <span>
                                                        {bedroomRange[1]} bed{bedroomRange[1] !== 1 ? "s" : ""}
                                                    </span>
                                                </div>
                                            </CollapsibleContent>
                                        </Collapsible>

                                        <Separator/>

                                        {/* Bathrooms */}
                                        <Collapsible open={bathroomOpen} onOpenChange={setBathroomOpen}>
                                            <CollapsibleTrigger className="flex items-center justify-between w-full">
                                                <Label className="text-base font-medium">Bathrooms</Label>
                                                {bathroomOpen ? <ChevronUp className="h-4 w-4"/> :
                                                    <ChevronDown className="h-4 w-4"/>}
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="space-y-4 mt-4">
                                                <Slider
                                                    defaultValue={[0, 10]}
                                                    value={bathroomRange}
                                                    onValueChange={setBathroomRange}
                                                    max={5}
                                                    min={1}
                                                    step={1}
                                                    className="w-full"
                                                />
                                                <div
                                                    className="flex items-center justify-between text-sm text-muted-foreground">
                                                    <span>
                                                        {bathroomRange[0]} bath{bathroomRange[0] !== 1 ? "s" : ""}
                                                    </span>
                                                    <span>
                                                        {bathroomRange[1]} bath{bathroomRange[1] !== 1 ? "s" : ""}
                                                    </span>
                                                </div>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Results */}
                        <div className="flex-1 min-w-0">
                            {/* Results Header */}
                            <div
                                className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <div>
                                    <h2 className="text-xl md:text-2xl font-semibold">
                                        {isLoading ? "Loading..." : `${sortedProperties.length} Properties Found`}
                                    </h2>
                                </div>

                                <div
                                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                                    <Select value={sortBy} onValueChange={setSortBy} disabled={isLoading}>
                                        <SelectTrigger className="w-full sm:w-[180px]">
                                            <SelectValue placeholder="Sort by"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                                            <SelectItem value="newest">Newest First</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <div className="flex border rounded-md w-full sm:w-auto">
                                        <Button
                                            variant={viewMode === "grid" ? "default" : "ghost"}
                                            size="sm"
                                            onClick={() => setViewMode("grid")}
                                            className="rounded-r-none flex-1 sm:flex-none"
                                            disabled={isLoading}
                                        >
                                            <Grid className="h-4 w-4"/>
                                        </Button>
                                        <Button
                                            variant={viewMode === "list" ? "default" : "ghost"}
                                            size="sm"
                                            onClick={() => setViewMode("list")}
                                            className="rounded-l-none flex-1 sm:flex-none"
                                            disabled={isLoading}
                                        >
                                            <List className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Loading State */}
                            {isLoading && (
                                <>
                                    {viewMode === "grid" ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                                            {Array(8).fill(0).map((_, index) => (
                                                <PropertyCardSkeleton key={index}/>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-4 md:space-y-6">
                                            {Array(5).fill(0).map((_, index) => (
                                                <PropertyListSkeleton key={index}/>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Properties Grid/List */}
                            {!isLoading && sortedProperties.length > 0 && (
                                <>
                                    {viewMode === "grid" ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                                            {sortedProperties.map((property) => (
                                                <Link href={`/explore/${property.id}`} key={property.id}
                                                      className="group">
                                                    <Card
                                                        className="overflow-hidden h-full transition-all hover:shadow-md">
                                                        <div className="aspect-[4/3] relative overflow-hidden">
                                                            <img
                                                                src={property.media[0]?.url || "/placeholder.svg"}
                                                                alt={property.title}
                                                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                                            />
                                                            <div
                                                                className="absolute top-2 right-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded">
                                                                {property.propertyType}
                                                            </div>
                                                        </div>
                                                        <CardContent className="p-4">
                                                            <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                                                            <div
                                                                className="flex items-center text-muted-foreground mt-1">
                                                                <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0"/>
                                                                <span
                                                                    className="text-sm line-clamp-1">{property.address}</span>
                                                            </div>
                                                            <div className="mt-3 text-lg font-bold">
                                                                {formatPrice(property.price, property.currency as 'USD' | 'GHS')}
                                                            </div>
                                                            <div
                                                                className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                                                                <div>{property.bedrooms} Beds</div>
                                                                <div>{property.bathrooms} Baths</div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-4 md:space-y-6">
                                            {sortedProperties.map((property) => (
                                                <Link href={`/explore/${property.id}`} key={property.id}
                                                      className="group">
                                                    <Card className="overflow-hidden transition-all hover:shadow-md">
                                                        <div className="flex flex-col md:flex-row">
                                                            <div
                                                                className="md:w-1/3 aspect-[4/3] md:aspect-auto relative overflow-hidden">
                                                                <img
                                                                    src={property.media[0]?.url || "/placeholder.svg"}
                                                                    alt={property.title}
                                                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                                                />
                                                                <div
                                                                    className="absolute top-2 right-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded">
                                                                    {property.propertyType}
                                                                </div>
                                                            </div>
                                                            <CardContent className="md:w-2/3 p-4 md:p-6">
                                                                <div className="flex flex-col h-full">
                                                                    <h3 className="font-semibold text-xl mb-2">{property.title}</h3>
                                                                    <div
                                                                        className="flex items-center text-muted-foreground mb-3">
                                                                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0"/>
                                                                        <span
                                                                            className="line-clamp-1">{property.address}</span>
                                                                    </div>
                                                                    <div className="text-xl md:text-2xl font-bold mb-4">
                                                                        {formatPrice(property.price, property.currency as 'USD' | 'GHS')}
                                                                    </div>
                                                                    <div
                                                                        className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground">
                                                                        <div>{property.bedrooms} Bedrooms</div>
                                                                        <div>{property.bathrooms} Bathrooms</div>
                                                                        {property.yearBuilt &&
                                                                            <div>Built {property.yearBuilt}</div>}
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </div>
                                                    </Card>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}

                            {/* No Results */}
                            {!isLoading && sortedProperties.length === 0 && properties && properties.length > 0 && (
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-semibold mb-2">No properties found</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Try adjusting your search criteria or filters to find more properties.
                                    </p>
                                    <Button onClick={clearAllFilters}>Clear All Filters</Button>
                                </div>
                            )}

                            {/* No Properties at All */}
                            {!isLoading && properties.length === 0 && (
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-semibold mb-2">No properties available</h3>
                                    <p className="text-muted-foreground">
                                        Check back later for new property listings.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
