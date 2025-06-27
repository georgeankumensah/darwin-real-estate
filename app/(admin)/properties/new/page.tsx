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
import {useRouter} from "next/navigation";
import React, {useState, useEffect} from "react";
import {useCreateProperty} from "@/hooks/api/properties/useCreateProperty";
import {CreatePropertyInput} from "@/lib/validators/property.validation";
import {useAllOwners} from "@/hooks/api/owners/useAllOwners";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Check, ChevronsUpDown} from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {toast} from "@/hooks/use-toast";

export default function NewPropertyPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<CreatePropertyInput>({
        title: '',
        propertyType: '',
        currency: 'USD',
        price: 0,
        status: 'FOR_RENT',
        bedrooms: 0,
        bathrooms: 0,
        area: 0,
        yearBuilt: 0,
        address: '',
        description: '',
        ownerId: '',
        media: []
    });

    // Separate state for media files
    const [mediaFiles, setMediaFiles] = useState<File[]>([]);
    const [isOwnerPopoverOpen, setIsOwnerPopoverOpen] = useState(false);
    const [previewUrls, setPreviewUrls] = useState<{[key: number]: string}>({});

    const {data: ownersData, isLoading: isLoadingOwners} = useAllOwners();
    const owners = ownersData?.owners || [];

    // Get selected owner
    const selectedOwner = owners.find((o) => o.id === formData.ownerId);

    // Clean up preview URLs on unmount
    useEffect(() => {
        return () => {
            Object.values(previewUrls).forEach(url => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [previewUrls]);

    // Check for saved form state on component mount
    useEffect(() => {
        const savedFormState = localStorage.getItem('propertyFormState');

        if (savedFormState) {
            try {
                const parsedState = JSON.parse(savedFormState);
                setFormData(parsedState);

                // Clear the saved state
                localStorage.removeItem('propertyFormState');
            } catch (error) {
                console.error('Error restoring form state:', error);
            }
        }
    }, []);

    const handleInputChange = (field: string, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: field === 'price' || field === 'bedrooms' || field === 'bathrooms' ||
            field === 'area' || field === 'yearBuilt'
                ? Number(value) || 0
                : value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        // Validate file types and sizes
        const validFiles: File[] = [];
        const invalidFiles: string[] = [];

        files.forEach(file => {
            const isValidImage = file.type.startsWith('image/') &&
                ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
            const isValidVideo = file.type.startsWith('video/') &&
                ['video/mp4', 'video/mov', 'video/avi', 'video/wmv', 'video/webm'].includes(file.type);
            const isValidSize = file.size <= 100 * 1024 * 1024; // 100MB limit

            if (!isValidImage && !isValidVideo) {
                invalidFiles.push(`${file.name} - Invalid file type`);
                return;
            }

            if (!isValidSize) {
                invalidFiles.push(`${file.name} - File too large (max 100MB)`);
                return;
            }

            validFiles.push(file);
        });

        // Show toast for invalid files
        if (invalidFiles.length > 0) {
            toast({
                variant: "destructive",
                title: "Some files were not added",
                description: invalidFiles.join(', ')
            });
        }

        // Create preview URLs for valid image files
        const newPreviewUrls: {[key: number]: string} = {};
        validFiles.forEach((file, index) => {
            if (file.type.startsWith('image/')) {
                const currentIndex = mediaFiles.length + index;
                newPreviewUrls[currentIndex] = URL.createObjectURL(file);
            }
        });

        setPreviewUrls(prev => ({...prev, ...newPreviewUrls}));
        setMediaFiles(prev => [...prev, ...validFiles]);

        // Update formData
        setFormData(prev => ({
            ...prev,
            media: [...(prev.media || []), ...validFiles]
        }));

        // Clear the input
        e.target.value = '';
    };

    const removeMediaFile = (index: number) => {
        // Clean up preview URL
        if (previewUrls[index]) {
            URL.revokeObjectURL(previewUrls[index]);
            setPreviewUrls(prev => {
                const updated = {...prev};
                delete updated[index];

                // Reindex remaining URLs
                const reindexed: {[key: number]: string} = {};
                Object.entries(updated).forEach(([key, value]) => {
                    const oldIndex = parseInt(key);
                    const newIndex = oldIndex > index ? oldIndex - 1 : oldIndex;
                    reindexed[newIndex] = value;
                });

                return reindexed;
            });
        }

        setMediaFiles(prev => prev.filter((_, i) => i !== index));
        setFormData(prev => ({
            ...prev,
            media: prev.media?.filter((_, i) => i !== index) || []
        }));
    };

    const isVideo = (file: File): boolean => {
        return file.type.startsWith('video/');
    };

    const getFilePreview = (file: File, index: number): string | null => {
        if (file.type.startsWith('image/')) {
            return previewUrls[index] || null;
        }
        return null;
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const {mutate: createProperty, isPending} = useCreateProperty();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.title.trim()) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Property title is required"
            });
            return;
        }

        if (!formData.description.trim()) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Property description is required"
            });
            return;
        }

        if (!formData.propertyType) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Property type is required"
            });
            return;
        }

        if (!formData.address.trim()) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Property address is required"
            });
            return;
        }

        if (formData.price <= 0) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Property price must be greater than 0"
            });
            return;
        }

        const submitData: CreatePropertyInput = {
            ...formData,
            title: formData.title.trim(),
            description: formData.description.trim(),
            address: formData.address.trim(),
            price: Number(formData.price),
            bedrooms: Number(formData.bedrooms),
            bathrooms: Number(formData.bathrooms),
            area: Number(formData.area),
            yearBuilt: Number(formData.yearBuilt),
            ownerId: formData.ownerId || undefined,
            media: mediaFiles
        };

        createProperty(submitData, {
            onSuccess: () => {
                toast({
                    variant: "success",
                    title: "Property created successfully",
                });
                // Clean up preview URLs
                Object.values(previewUrls).forEach(url => {
                    if (url.startsWith('blob:')) {
                        URL.revokeObjectURL(url);
                    }
                });
                router.push('/properties');
            },
            onError: (error) => {
                toast({
                    variant: "destructive",
                    title: "Error creating property",
                    description: error.message,
                });
            }
        });
    };

    const handleOwnerSelect = (ownerId: string) => {
        handleInputChange('ownerId', ownerId);
        setIsOwnerPopoverOpen(false);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/properties">
                        <ArrowLeft className="h-4 w-4"/>
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
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Property Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="Enter property title"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="propertyType">Property Type *</Label>
                                <Select value={formData.propertyType}
                                        onValueChange={(value) => handleInputChange('propertyType', value)}>
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
                                <Label htmlFor="currency">Currency *</Label>
                                <Select value={formData.currency}
                                        onValueChange={(value) => handleInputChange('currency', value)}>
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
                                <Label htmlFor="price">Price *</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="Enter price"
                                    value={formData.price || ''}
                                    onChange={(e) => handleInputChange('price', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status *</Label>
                                <Select value={formData.status}
                                        onValueChange={(value) => handleInputChange('status', value)}>
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
                                    value={formData.bedrooms || ''}
                                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bathrooms">Bathrooms</Label>
                                <Input
                                    id="bathrooms"
                                    type="number"
                                    min="0"
                                    step="0.5"
                                    placeholder="Number of bathrooms"
                                    value={formData.bathrooms || ''}
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
                                    value={formData.area || ''}
                                    onChange={(e) => handleInputChange('area', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="year">Year Built</Label>
                                <Input
                                    id="year"
                                    type="number"
                                    min="1800"
                                    max={new Date().getFullYear()}
                                    placeholder="Year built"
                                    value={formData.yearBuilt || ''}
                                    onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Address *</Label>
                            <Input
                                id="address"
                                placeholder="Enter property address"
                                value={formData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="owner">Owner (Optional)</Label>
                            <Popover open={isOwnerPopoverOpen} onOpenChange={setIsOwnerPopoverOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={isOwnerPopoverOpen}
                                        className={cn("w-full justify-between", !formData.ownerId && "text-muted-foreground")}
                                        disabled={isLoadingOwners}
                                    >
                                        {formData.ownerId && selectedOwner
                                            ? `${selectedOwner.firstName} ${selectedOwner.lastName}`
                                            : isLoadingOwners
                                                ? "Loading owners..."
                                                : "Select owner"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[400px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search owners..."/>
                                        <CommandEmpty>No owner found.</CommandEmpty>
                                        <CommandList>
                                            <CommandGroup>
                                                {owners.map((owner) => (
                                                    <CommandItem
                                                        key={owner.id}
                                                        value={`${owner.firstName} ${owner.lastName}`}
                                                        onSelect={() => handleOwnerSelect(owner.id)}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <Avatar>
                                                                <AvatarImage
                                                                    src={"/placeholder.svg"}
                                                                    alt={owner.firstName}/>
                                                                <AvatarFallback>
                                                                    {owner.firstName[0]}{owner.lastName?.[0] || ''}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <p className="text-sm font-medium">{owner.firstName} {owner.lastName}</p>
                                                                <p className="text-xs text-muted-foreground">{owner.email}</p>
                                                            </div>
                                                        </div>
                                                        <Check
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                owner.id === formData.ownerId ? "opacity-100" : "opacity-0",
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <div className="mt-2 flex justify-between">
                                <div className="text-sm text-muted-foreground">
                                    Can't find your owner?
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        // Store current form state in localStorage
                                        localStorage.setItem('propertyFormState', JSON.stringify(formData));
                                        router.push('/owners/new');
                                    }}
                                >
                                    + Add New Owner
                                </Button>
                            </div>
                        </div>

                        {selectedOwner && (
                            <div className="mt-4 p-4 border rounded-md bg-muted/20">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage
                                            src={"/placeholder.svg"}
                                            alt={selectedOwner.firstName}/>
                                        <AvatarFallback>
                                            {selectedOwner.firstName[0]}{selectedOwner.lastName?.[0] || ''}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-medium">{selectedOwner.firstName} {selectedOwner.lastName}</h3>
                                        <p className="text-sm text-muted-foreground">{selectedOwner.email}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant="outline">ID: {selectedOwner.id}</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                placeholder="Enter property description"
                                rows={5}
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                required
                            />
                        </div>

                        {/* Enhanced Media Upload Section */}
                        <div className="space-y-4">
                            <Label className="text-lg font-semibold">Media Upload</Label>

                            {/* Media Preview */}
                            {mediaFiles.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="text-sm font-medium">Selected Files ({mediaFiles.length} items)</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                                        {mediaFiles.map((file, index) => (
                                            <div key={`${file.name}-${index}`} className="relative group border-2 border-gray-200 rounded-lg overflow-hidden">
                                                {isVideo(file) ? (
                                                    <div className="w-full h-32 bg-gray-100 flex flex-col items-center justify-center">
                                                        <Video className="h-8 w-8 text-gray-400 mb-1"/>
                                                        <span className="text-xs text-gray-500">
                                                            {formatFileSize(file.size)}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <Image
                                                        src={getFilePreview(file, index) || "/placeholder.svg"}
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
                                                    onClick={() => removeMediaFile(index)}
                                                >
                                                    <X className="h-3 w-3"/>
                                                </Button>

                                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-2 truncate">
                                                    {file.name}
                                                </div>

                                                {/* File type indicator */}
                                                <div className="absolute top-2 left-2">
                                                    <Badge variant={isVideo(file) ? "default" : "secondary"} className="text-xs">
                                                        {isVideo(file) ? "VIDEO" : "IMAGE"}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Upload Area */}
                            <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                                <div className="mx-auto flex flex-col items-center justify-center gap-3">
                                    <Upload className="h-10 w-10 text-gray-400"/>
                                    <div className="text-muted-foreground">
                                        <p className="text-lg font-medium">Upload Media Files</p>
                                        <p className="text-sm">Drag and drop your images and videos here or click to browse</p>
                                        <p className="text-xs mt-1">
                                            Supported: JPEG, PNG, WebP, MP4, MOV, AVI, WMV, WebM
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Max file size: 100MB per file
                                        </p>
                                    </div>
                                    <Input
                                        id="media-upload"
                                        type="file"
                                        multiple
                                        accept="image/jpeg,image/png,image/webp,video/mp4,video/mov,video/avi,video/wmv,video/webm"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    <Button
                                        variant="outline"
                                        type="button"
                                        onClick={() => document.getElementById('media-upload')?.click()}
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
                                <Link href="/properties">Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? 'Creating Property...' : 'Create Property'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}