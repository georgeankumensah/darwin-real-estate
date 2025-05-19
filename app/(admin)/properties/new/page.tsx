import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function NewPropertyPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/properties">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Add New Property</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property Information</CardTitle>
          <CardDescription>
            Enter the details of the new property listing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Property Title</Label>
                <Input id="title" placeholder="Enter property title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Property Type</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" type="number" placeholder="Enter price" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="for-sale">For Sale</SelectItem>
                    <SelectItem value="for-rent">For Rent</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  placeholder="Number of bedrooms"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  placeholder="Number of bathrooms"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Area (sq ft)</Label>
                <Input id="area" type="number" placeholder="Property area" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year Built</Label>
                <Input id="year" type="number" placeholder="Year built" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Enter property address" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter property description"
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Images</Label>
              <div className="border border-dashed rounded-lg p-8 text-center">
                <div className="mx-auto flex flex-col items-center justify-center gap-1">
                  <div className="text-muted-foreground">
                    <p>Drag and drop your images here or click to browse</p>
                    <p className="text-xs">
                      Supported formats: JPEG, PNG, WebP
                    </p>
                  </div>
                  <Input id="images" type="file" multiple className="hidden" />
                  <Button variant="outline" size="sm" className="mt-2">
                    Upload Images
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" asChild>
                <Link href="/properties">Cancel</Link>
              </Button>
              <Button>Create Property</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
