"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import { useCreateCustomer } from "@/hooks/api/customers/useCreateCustomer"
import {$Enums} from "@/app/generated/prisma";
import UserStatus = $Enums.UserStatus;

export default function NewTenantPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    startDate: new Date(),
    endDate: new Date(),
    propertyId: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const {mutateAsync: createTenant, isPending} = useCreateCustomer()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const submitData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      startDate: formData.startDate,
      endDate: formData.endDate,
      propertyId: formData.propertyId,
      status: UserStatus.ACTIVE
    }

    await createTenant(submitData)

    // Check if we came from the transaction form
    const transactionFormState = localStorage.getItem('transactionFormState')
    const transactionFormStep = localStorage.getItem('transactionFormStep')

    if (transactionFormState && transactionFormStep) {
      // Redirect back to the transaction form
      router.push('/transactions/new')
    } else {
      // Normal flow - redirect to tenants list
      router.push('/tenants')
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Add New Tenant</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tenant Information</CardTitle>
          <CardDescription>Enter the details of the new tenant.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                    id="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                    id="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                    id="phoneNumber"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    required
                />
              </div>
              {/*<div className="space-y-2">*/}
              {/*  <Label htmlFor="phoneNumber2">Alternative Phone (Optional)</Label>*/}
              {/*  <Input*/}
              {/*      id="phoneNumber2"*/}
              {/*      placeholder="Enter alternative phone"*/}
              {/*      value={formData.startDate}*/}
              {/*      onChange={(e) => handleInputChange('phoneNumber2', e.target.value)}*/}
              {/*  />*/}
              {/*</div>*/}
              {/*<div className="space-y-2">*/}
              {/*  <Label htmlFor="location">Location</Label>*/}
              {/*  <Input*/}
              {/*      id="location"*/}
              {/*      placeholder="Enter location"*/}
              {/*      value={formData.endDate}*/}
              {/*      onChange={(e) => handleInputChange('location', e.target.value)}*/}
              {/*  />*/}
              {/*</div>*/}
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select defaultValue="TENANT">
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TENANT">Tenant</SelectItem>
                    <SelectItem value="AGENT">Agent</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Profile Image</Label>
              <div className="border border-dashed rounded-lg p-8 text-center">
                <div className="mx-auto flex flex-col items-center justify-center gap-1">
                  <div className="text-muted-foreground">
                    <p>Drag and drop an image here or click to browse</p>
                    <p className="text-xs">Supported formats: JPEG, PNG, WebP</p>
                  </div>
                  <Input id="image" type="file" className="hidden" />
                  <Button variant="outline" size="sm" className="mt-2">
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" asChild>
                <Link href="/tenants">Cancel</Link>
              </Button>
              <Button>Create Tenant</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
