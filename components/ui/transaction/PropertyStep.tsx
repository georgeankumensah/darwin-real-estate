"use client";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import React from "react";
import {UseFormReturn} from "react-hook-form";
import {createTransactionType} from "@/lib/validators/transaction.validation";
import {useAllProperties} from "@/hooks/api/properties/useAllProperties";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";

import {useDebounce} from "@/hooks/useDebounce";

interface PropertyStepProps {
    form: UseFormReturn<createTransactionType>;
}

export function PropertyStep({form}: PropertyStepProps) {
    const [search, setSearch] = React.useState("");
    const debouncedSearch = useDebounce(search, 500);

    const {data: propertiesData, isLoading: isLoadingProperties} = useAllProperties({search: debouncedSearch});
    const properties = propertiesData?.properties || [];
    const selectedProperty = properties.find((p) => p?.id?.toString() === form.watch("propertyId"));

    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="propertyId"
                render={({field}) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Property</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                                    >
                                        {field.value
                                            ? properties.find((property) => property.id.toString() === field.value)?.title
                                            : "Select property"}
                                        <ChevronsUpDown
                                            className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[400px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search properties..." onValueChange={setSearch}/>
                                    <CommandEmpty>No property found.</CommandEmpty>
                                    <CommandList>
                                        <CommandGroup>
                                            {properties.map((property) => (
                                                <CommandItem
                                                    key={property.id}
                                                    value={property.title}
                                                    onSelect={() => {
                                                        form.setValue("propertyId", property.id.toString())
                                                    }}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="h-10 w-10 rounded-md overflow-hidden">
                                                            <img
                                                                src={property.media[0]?.url || "/placeholder.svg"}
                                                                alt={property.title}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium">{property.title}</p>
                                                            <p className="text-xs text-muted-foreground">{property.address}</p>
                                                        </div>
                                                    </div>
                                                    <Check
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            property.id.toString() === field.value ? "opacity-100" : "opacity-0",
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

            {selectedProperty && (
                <div className="mt-4 p-4 border rounded-md">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-24 rounded-md overflow-hidden">
                            <img
                                src={selectedProperty.media[0]?.url || "/placeholder.svg"}
                                alt={selectedProperty.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="font-medium">{selectedProperty.title}</h3>
                            <p className="text-sm text-muted-foreground">{selectedProperty.address}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">ID: {selectedProperty.id}</Badge>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/properties/${selectedProperty.id}`}>
                                        View Property
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
