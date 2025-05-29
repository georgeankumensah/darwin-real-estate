import { TableCell } from "@/components/ui/table"
import { TableBody } from "@/components/ui/table"
import { TableHead } from "@/components/ui/table"
import { TableRow } from "@/components/ui/table"
import { TableHeader } from "@/components/ui/table"
import { Table } from "@/components/ui/table"
import { ArrowLeft, Mail, MapPin, Phone, User } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OwnerDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the owner data based on the ID
  const ownerId = params.id

  // Sample owner data
  const owner = {
    id: ownerId,
    firstName: "Robert",
    lastName: "Chen",
    email: "robert.chen@realestate.com",
    phoneNumber: "+1 (555) 111-2233",
    phoneNumber2: null,
    image: "/placeholder.svg?height=100&width=100",
    role: "OWNER",
    location: "San Francisco, CA",
    createdAt: "2022-03-10T08:30:00Z",
    updatedAt: "2023-11-05T14:20:00Z",
    bio: "Robert is a top-performing real estate owner with over 10 years of experience in the San Francisco Bay Area. Specializing in luxury properties and investment opportunities, he has consistently exceeded client expectations with his market knowledge and negotiation skills.",
    specialties: ["Luxury Homes", "Investment Properties", "First-time Buyers"],
    stats: {
      properties: 12,
      sales: "$4.2M",
      clients: 24,
      rating: 4.8,
      target: 85,
    },
    properties: [
      {
        id: 1,
        title: "Luxury Waterfront Villa",
        address: "123 Ocean Drive, San Francisco, CA",
        price: "$3,850,000",
        status: "For Sale",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 2,
        title: "Modern Downtown Condo",
        address: "456 Market Street, San Francisco, CA",
        price: "$1,250,000",
        status: "For Sale",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 3,
        title: "Spacious Family Home",
        address: "789 Golden Gate Ave, San Francisco, CA",
        price: "$2,450,000",
        status: "Under Contract",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    recentSales: [
      {
        id: 1,
        property: "Hillside Retreat",
        client: "James & Emily Wilson",
        date: "2023-10-15",
        amount: "$2,750,000",
      },
      {
        id: 2,
        property: "Sunset Apartment",
        client: "Michael Brown",
        date: "2023-09-22",
        amount: "$950,000",
      },
      {
        id: 3,
        property: "Bay View Penthouse",
        client: "Sarah Johnson",
        date: "2023-08-10",
        amount: "$3,200,000",
      },
    ],
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/owners">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Owner Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={owner.image || "/placeholder.svg"} alt={`${owner.firstName} ${owner.lastName}`} />
                <AvatarFallback className="text-2xl">
                  {owner.firstName[0]}
                  {owner.lastName[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>
              {owner.firstName} {owner.lastName}
            </CardTitle>
            <CardDescription>Real Estate Owner</CardDescription>
            <div className="mt-2">
              <Badge className="bg-green-500">Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{owner.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{owner.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{owner.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Owner since {new Date(owner.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {owner.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Bio</h3>
                <p className="text-sm text-muted-foreground">{owner.bio}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-4">
              <Button>
                <Phone className="mr-2 h-4 w-4" />
                Contact Owner
              </Button>
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{owner.stats.properties}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{owner.stats.sales}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{owner.stats.clients}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{owner.stats.rating}/5</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>Current performance against quarterly targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sales Target</span>
                  <span className="text-sm text-muted-foreground">{owner.stats.target}%</span>
                </div>
                <Progress value={owner.stats.target} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="properties">
            <TabsList>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="sales">Recent Sales</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
            </TabsList>
            <TabsContent value="properties" className="space-y-4 pt-4">
              <h2 className="text-xl font-medium">Owner Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {owner.properties.map((property) => (
                  <Card key={property.id}>
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{property.title}</h3>
                          <p className="text-sm text-muted-foreground">{property.address}</p>
                        </div>
                        <div className="text-sm font-medium">{property.price}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={property.status === "For Sale" ? "default" : "secondary"}
                          className={property.status === "For Sale" ? "bg-green-500" : ""}
                        >
                          {property.status}
                        </Badge>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/properties/${property.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="sales" className="pt-4">
              <h2 className="text-xl font-medium mb-4">Recent Sales</h2>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {owner.recentSales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell className="font-medium">{sale.property}</TableCell>
                        <TableCell>{sale.client}</TableCell>
                        <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                        <TableCell>{sale.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="clients" className="pt-4">
              <div className="text-center p-8 border rounded-lg">
                <h3 className="mt-4 text-lg font-medium">Client Information</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Client information is private and only visible to authorized personnel.
                </p>
                <Button className="mt-4">Request Access</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
