"use client";

import {ArrowLeft, Upload, Video, X, ImageIcon} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useUpdateProperty} from "@/hooks/api/properties/useUpdateProperty";
import {UpdatePropertyInput} from "@/lib/validators/property.validation";
import {usePropertyById} from "@/hooks/api/properties/usePropertyById";
import {LoadingIndicator} from "@/components/ui/loading-indicator";
import { Media } from "@/app/generated/prisma";

export default function EditPropertyPage() {
    const router = useRouter();
    const {id: propertyId} = useParams();
    const [formData, setFormData] = useState<UpdatePropertyInput>({});

    // Media management state
    const [existingMedia, setExistingMedia] = useState<Media[]>([]);
    const [mediaToDelete, setMediaToDelete] = useState<string[]>([]);
    const [newFiles, setNewFiles] = useState<File[]>([]);

    const {data: property, isLoading, isError} = usePropertyById(propertyId as string);
    const {mutate: updateProperty, isPending: isUpdating} = useUpdateProperty(propertyId as string);

    useEffect(() => {
        if (property) {
            setFormData({
                title: property.title,
                propertyType: property.propertyType,
                currency: property.currency,
                price: property.price,
                status: property.status,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                area: property.area,
                yearBuilt: property.yearBuilt,
                address: property.address,
                description: property.description,
            });

            // Set existing media if available
            if (property.media) {
                setExistingMedia(property.media);
            }
        }
    }, [property]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setNewFiles(prev => [...prev, ...files]);
    };

    const toggleMediaForDeletion = (mediaId: string) => {
        setMediaToDelete(prev =>
            prev.includes(mediaId)
                ? prev.filter(id => id !== mediaId)
                : [...prev, mediaId]
        );
    };

    const removeNewFile = (index: number) => {
        setNewFiles(prev => prev.filter((_, i) => i !== index));
    };

    const isVideo = (filename: string): boolean => {
        const videoExtensions = ['.mp4', '.mov', '.avi', '.wmv'];
        return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
    };

    const getFilePreview = (file: File): string | null => {
        if (file.type.startsWith('image/')) {
            return URL.createObjectURL(file);
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Get publicIds for media to delete
            const mediaPublicIdsToDelete = existingMedia
                .filter(media => mediaToDelete.includes(media.id))
                .map(media => media.publicId);

            const updateData: UpdatePropertyInput = {
                ...formData,
                media: newFiles, // Use 'media' to match the updated schema
                removeMedia: mediaPublicIdsToDelete // Use 'removeMedia' to match the updated schema
            };

            await updateProperty(updateData);
            router.push(`/properties/${propertyId}`);
        } catch (error) {
            console.error('Error updating property:', error);
            // You might want to show a toast notification here
        }
    };

    if (isLoading) {
        return (
            <div className="p-6">
                <LoadingIndicator text="Loading property data..."/>
            </div>
        );
    }

    if (isError || !property) {
        return <div className="p-6">Error loading property</div>;
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href={`/properties/${propertyId}`}>
                        <ArrowLeft className="h-4 w-4"/>
                    </Link>
                </Button>
                <h1 className="text-2xl font-semibold">Edit Property</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Property Information</CardTitle>
                    <CardDescription>
                        Update the details of the property listing.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Property Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="Enter property title"
                                    value={formData.title || ""}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="propertyType">Property Type *</Label>
                                <Select
                                    value={formData.propertyType || ""}
                                    onValueChange={(value) => handleInputChange('propertyType', value)}
                                >
                                    <SelectTrigger id="propertyType">
                                        <SelectValue placeholder="Select property type"/>
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
                                <Label htmlFor="price">Price *</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    placeholder="Enter price"
                                    value={formData.price || ""}
                                    onChange={(e) => handleInputChange('price', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="currency">Currency *</Label>
                                <Select
                                    value={formData.currency || ""}
                                    onValueChange={(value) => handleInputChange('currency', value)}
                                >
                                    <SelectTrigger id="currency">
                                        <SelectValue placeholder="Select currency"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USD">USD</SelectItem>
                                        <SelectItem value="GHS">GHS</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status *</Label>
                                <Select
                                    value={formData.status || ""}
                                    onValueChange={(value) => handleInputChange('status', value)}
                                >
                                    <SelectTrigger id="status">
                                        <SelectValue placeholder="Select status"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="FOR_SALE">For Sale</SelectItem>
                                        <SelectItem value="FOR_RENT">For Rent</SelectItem>
                                        <SelectItem value="SOLD">Sold</SelectItem>
                                        <SelectItem value="RENTED">Rented</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bedrooms">Bedrooms</Label>
                                <Input
                                    id="bedrooms"
                                    type="number"
                                    min="0"
                                    placeholder="Number of bedrooms"
                                    value={formData.bedrooms || ""}
                                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bathrooms">Bathrooms</Label>
                                <Input
                                    id="bathrooms"
                                    type="number"
                                    min="0"
                                    placeholder="Number of bathrooms"
                                    value={formData.bathrooms || ""}
                                    onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="area">Area (sq ft)</Label>
                                <Input
                                    id="area"
                                    type="number"
                                    min="0"
                                    placeholder="Property area"
                                    value={formData.area || ""}
                                    onChange={(e) => handleInputChange('area', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="yearBuilt">Year Built</Label>
                                <Input
                                    id="yearBuilt"
                                    type="number"
                                    min="1800"
                                    max={new Date().getFullYear()}
                                    placeholder="Year built"
                                    value={formData.yearBuilt || ""}
                                    onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Address *</Label>
                            <Input
                                id="address"
                                placeholder="Enter property address"
                                value={formData.address || ""}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Enter property description"
                                rows={5}
                                value={formData.description || ""}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                            />
                        </div>

                        {/* Enhanced Media Management Section */}
                        <div className="space-y-4">
                            <Label className="text-lg font-semibold">Media Management</Label>

                            {/* Existing Media */}
                            {existingMedia.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="text-sm font-medium">Current Media
                                        ({existingMedia.length} items)</h4>
                                    <div
                                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                                        {existingMedia.map((media) => (
                                            <div
                                                key={media.id}
                                                className={`relative group border-2 rounded-lg overflow-hidden transition-all cursor-pointer ${
                                                    mediaToDelete.includes(media.id)
                                                        ? "border-red-500 opacity-50"
                                                        : "border-gray-200 hover:border-gray-300"
                                                }`}
                                                onClick={() => toggleMediaForDeletion(media.id)}
                                            >
                                                {media.type === "image" ? (
                                                    <Image
                                                        src={media.url || "/placeholder.svg"}
                                                        alt={""}
                                                        width={300}
                                                        height={200}
                                                        className="w-full h-32 object-cover"
                                                    />
                                                ) : (
                                                    <div
                                                        className="w-full h-32 bg-gray-100 flex items-center justify-center">
                                                        <Video className="h-8 w-8 text-gray-400"/>
                                                    </div>
                                                )}

                                                <div
                                                    className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                                                    <div
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
                                                        <p className="text-xs font-medium">
                                                            {mediaToDelete.includes(media.id) ? "Click to Restore" : "Click to Delete"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div
                                                    className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-2 truncate">
                                                    {""}
                                                </div>

                                                {mediaToDelete.includes(media.id) && (
                                                    <div
                                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
                                                        <X className="h-3 w-3"/>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {mediaToDelete.length > 0 && (
                                        <div
                                            className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                                            <strong>{mediaToDelete.length}</strong> item(s) marked for deletion. They
                                            will be removed when you save the property.
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* New Files Preview */}
                            {newFiles.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="text-sm font-medium text-green-600">New Files to Upload
                                        ({newFiles.length} items)</h4>
                                    <div
                                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                                        {newFiles.map((file, index) => (
                                            <div key={index}
                                                 className="relative group border-2 border-green-200 rounded-lg overflow-hidden">
                                                {isVideo(file.name) ? (
                                                    <div
                                                        className="w-full h-32 bg-green-50 flex items-center justify-center">
                                                        <Video className="h-8 w-8 text-green-500"/>
                                                    </div>
                                                ) : (
                                                    <Image
                                                        src={getFilePreview(file) || "/placeholder.svg"}
                                                        alt={file.name}
                                                        width={300}
                                                        height={200}
                                                        className="w-full h-32 object-cover"
                                                    />
                                                )}

                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                                                    onClick={() => removeNewFile(index)}
                                                >
                                                    <X className="h-3 w-3"/>
                                                </Button>

                                                <div
                                                    className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-2 truncate">
                                                    {file.name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Upload New Media */}
                            <div
                                className="border border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                                <div className="mx-auto flex flex-col items-center justify-center gap-3">
                                    <Upload className="h-10 w-10 text-gray-400"/>
                                    <div className="text-muted-foreground">
                                        <p className="text-lg font-medium">Add New Media</p>
                                        <p className="text-sm">Drag and drop your files here or click to browse</p>
                                        <p className="text-xs mt-1">Supported: JPEG, PNG, WebP, MP4, MOV</p>
                                    </div>
                                    <Input
                                        id="new-media"
                                        type="file"
                                        multiple
                                        accept="image/jpeg,image/png,image/webp,video/mp4,video/mov"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    <Button
                                        variant="outline"
                                        type="button"
                                        onClick={() => document.getElementById("new-media")?.click()}
                                        className="flex items-center gap-2"
                                    >
                                        <ImageIcon className="h-4 w-4"/>
                                        Choose Files
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" type="button" asChild>
                                <Link href={`/properties/${propertyId}`}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={isUpdating}>
                                {isUpdating ? "Updating..." : "Update Property"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}