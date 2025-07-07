"use client";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {Upload} from "lucide-react";
import {Button} from "@/components/ui/button";
import React from "react";
import {UseFormReturn} from "react-hook-form";
import {createTransactionType} from "@/lib/validators/transaction.validation";

interface PaymentStepProps {
    form: UseFormReturn<createTransactionType>;
}

export function PaymentStep({form}: PaymentStepProps) {
    const amount = Number(form.watch("amount")) || 0;
    const fees = Number(form.watch("fees")) || 0;
    const total = amount + fees;

    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="paymentMethod"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select payment method"/>
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                <SelectItem value="credit_card">Credit Card</SelectItem>
                                <SelectItem value="cash">Cash</SelectItem>
                                <SelectItem value="check">Check</SelectItem>
                                <SelectItem value="wire_transfer">Wire Transfer</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="fees"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Fees</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="0.00" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>

            <Separator/>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">Subtotal</div>
                    <div
                        className="font-medium">{form.watch("currency")} {amount.toLocaleString()}</div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">Fees</div>
                    <div
                        className="font-medium">{form.watch("currency")} {fees.toLocaleString()}</div>
                </div>
                <Separator/>
                <div className="flex justify-between items-center pt-2">
                    <div className="text-sm font-medium">Total Amount</div>
                    <div
                        className="text-xl font-bold">{form.watch("currency")} {total.toLocaleString()}</div>
                </div>
            </div>

            <div className="border rounded-md p-4">
                <div className="flex items-center mb-4">
                    <Upload className="h-5 w-5 mr-2 text-muted-foreground"/>
                    <h3 className="font-medium">Upload Documents (Optional)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-dashed rounded-md p-4 text-center">
                        <div className="flex flex-col items-center justify-center gap-1">
                            <div className="text-muted-foreground">
                                <p className="text-sm">Upload Receipt</p>
                                <p className="text-xs">PDF, JPG, PNG (max 5MB)</p>
                            </div>
                            <Button variant="outline" size="sm" className="mt-2">
                                Choose File
                            </Button>
                        </div>
                    </div>
                    <div className="border border-dashed rounded-md p-4 text-center">
                        <div className="flex flex-col items-center justify-center gap-1">
                            <div className="text-muted-foreground">
                                <p className="text-sm">Upload Contract</p>
                                <p className="text-xs">PDF (max 10MB)</p>
                            </div>
                            <Button variant="outline" size="sm" className="mt-2">
                                Choose File
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
