"use client";

import {ArrowLeft} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {MediaUpload} from "@/components/ui/property/MediaUpload";
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
import {CreatePropertyInput, CreatePropertySchema} from "@/lib/validators/property.validation";
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
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

import {useDebounce} from "@/hooks/useDebounce";

export default function NewPropertyPage() {
    const router = useRouter();
    const [mediaFiles, setMediaFiles] = useState<File[]>([]);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const {data: ownersData, isLoading: isLoadingOwners} = useAllOwners({search: debouncedSearch});
    const owners = ownersData?.owners || [];

    const form = useForm<CreatePropertyInput>({
        resolver: zodResolver(CreatePropertySchema),
        defaultValues: {
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
        },
    });

    const {mutate: createProperty, isPending} = useCreateProperty();

    const ownerId = form.watch("ownerId");
    const selectedOwner = owners.find((o) => o.id === ownerId);

    useEffect(() => {
        const savedFormState = localStorage.getItem('propertyFormState');
        if (savedFormState) {
            try {
                const parsedState = JSON.parse(savedFormState);
                form.reset(parsedState);
                localStorage.removeItem('propertyFormState');
            } catch (error) {
                console.error('Error restoring form state:', error);
            }
        }
    }, [form]);

    const onSubmit = async (data: CreatePropertyInput) => {
        const submitData = {
            ...data,
            media: mediaFiles,
        };
        await createProperty(submitData);
        router.push('/properties');
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
                    <Form {...form}>
                        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Property Title *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter property title" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="propertyType"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Property Type *</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select property type"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="house">House</SelectItem>
                                                    <SelectItem value="apartment">Apartment</SelectItem>
                                                    <SelectItem value="condo">Condo</SelectItem>
                                                    <SelectItem value="townhouse">Townhouse</SelectItem>
                                                    <SelectItem value="land">Land</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="currency"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Currency *</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select currency"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="USD">USD</SelectItem>
                                                    <SelectItem value="GHS">GHS</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Price *</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Enter price" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Status *</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select status"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="FOR_SALE">For Sale</SelectItem>
                                                    <SelectItem value="FOR_RENT">For Rent</SelectItem>
                                                    <SelectItem value="SOLD">Sold</SelectItem>
                                                    <SelectItem value="RENTED">Rented</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="bedrooms"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Bedrooms</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Number of bedrooms" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="bathrooms"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Bathrooms</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Number of bathrooms" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="area"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Area (sq ft)</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Property area" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="yearBuilt"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Year Built</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Year built" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="address"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Address *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter property address" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="ownerId"
                                render={({field}) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Owner (Optional)</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                                                    >
                                                        {field.value
                                                            ? owners.find((owner) => owner.id === field.value)?.firstName + " " + owners.find((owner) => owner.id === field.value)?.lastName
                                                            : "Select owner"}
                                                        <ChevronsUpDown
                                                            className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[400px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search owners..." onValueChange={setSearch}/>
                                                    <CommandEmpty>No owner found.</CommandEmpty>
                                                    <CommandList>
                                                        <CommandGroup>
                                                            {owners.map((owner) => (
                                                                <CommandItem
                                                                    key={owner.id}
                                                                    value={owner.firstName}
                                                                    onSelect={() => {
                                                                        form.setValue("ownerId", owner.id)
                                                                    }}
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <Avatar>
                                                                            <AvatarImage
                                                                                src={"/placeholder.svg"}
                                                                                alt={owner.firstName}/>
                                                                            <AvatarFallback>
                                                                                {owner.firstName
                                                                                    .split(" ")
                                                                                    .map((n) => n[0])
                                                                                    .join("")}
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
                                                                            owner.id === field.value ? "opacity-100" : "opacity-0",
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="mt-2 flex justify-between">
                                <div className="text-sm text-muted-foreground">
                                    Can't find your owner?
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        localStorage.setItem('propertyFormState', JSON.stringify(form.getValues()));
                                        router.push('/owners/new');
                                    }}
                                >
                                    + Add New Owner
                                </Button>
                            </div>

                            {selectedOwner && (
                                <div className="mt-4 p-4 border rounded-md">
                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage
                                                src={"/placeholder.svg"}
                                                alt={selectedOwner.firstName}/>
                                            <AvatarFallback>
                                                {selectedOwner.firstName
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
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

                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter property description"
                                                rows={5}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <MediaUpload mediaFiles={mediaFiles} setMediaFiles={setMediaFiles} form={form} />

                            <div className="flex justify-end gap-2">
                                <Button variant="outline" type="button" asChild>
                                    <Link href="/properties">Cancel</Link>
                                </Button>
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? 'Creating Property...' : 'Create Property'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}