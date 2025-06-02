"use client";

import { useState } from "react";
import {
  Calendar,
  CreditCard,
  Download,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

// Sample transaction data
const allTransactions = [
  {
    id: "TRX-001",
    type: "Sale",
    property: {
      id: 1,
      title: "Modern Luxury Villa",
      address: "123 Luxury Lane, Beverly Hills, CA",
      image: "/placeholder.svg?height=40&width=40",
    },
    amount: 2450000,
    date: "2023-05-15T10:30:00Z",
    status: "Completed",
    parties: {
      buyer: {
        id: "cus_001",
        name: "John Doe",
        image: "/placeholder.svg?height=40&width=40",
      },
      seller: {
        id: "cus_002",
        name: "Jane Smith",
        image: "/placeholder.svg?height=40&width=40",
      },
      agent: {
        id: "agt_001",
        name: "Robert Chen",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    paymentMethod: "Bank Transfer",
    reference: "REF123456",
  },
  {
    id: "TRX-002",
    type: "Deposit",
    property: {
      id: 2,
      title: "Downtown Apartment",
      address: "456 Urban Street, New York, NY",
      image: "/placeholder.svg?height=40&width=40",
    },
    amount: 85000,
    date: "2023-05-12T14:45:00Z",
    status: "Pending",
    parties: {
      buyer: {
        id: "cus_003",
        name: "Michael Johnson",
        image: "/placeholder.svg?height=40&width=40",
      },
      seller: {
        id: "cus_004",
        name: "Emily Williams",
        image: "/placeholder.svg?height=40&width=40",
      },
      agent: {
        id: "agt_002",
        name: "Sarah Johnson",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    paymentMethod: "Credit Card",
    reference: "REF789012",
  },
  {
    id: "TRX-003",
    type: "Commission",
    property: {
      id: 3,
      title: "Beachfront Condo",
      address: "789 Ocean Drive, Miami, FL",
      image: "/placeholder.svg?height=40&width=40",
    },
    amount: 37500,
    date: "2023-05-10T09:15:00Z",
    status: "Completed",
    parties: {
      agent: {
        id: "agt_003",
        name: "James Wilson",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    paymentMethod: "Direct Deposit",
    reference: "REF345678",
  },
  {
    id: "TRX-004",
    type: "Rental",
    property: {
      id: 4,
      title: "City View Loft",
      address: "101 Downtown Ave, Chicago, IL",
      image: "/placeholder.svg?height=40&width=40",
    },
    amount: 2500,
    date: "2023-05-08T16:20:00Z",
    status: "Completed",
    parties: {
      tenant: {
        id: "cus_005",
        name: "David Brown",
        image: "/placeholder.svg?height=40&width=40",
      },
      landlord: {
        id: "cus_006",
        name: "Sophia Martinez",
        image: "/placeholder.svg?height=40&width=40",
      },
      agent: {
        id: "agt_004",
        name: "Maria Garcia",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    paymentMethod: "Bank Transfer",
    reference: "REF901234",
  },
  {
    id: "TRX-005",
    type: "Refund",
    property: {
      id: 5,
      title: "Suburban Family Home",
      address: "202 Maple Street, Seattle, WA",
      image: "/placeholder.svg?height=40&width=40",
    },
    amount: 1500,
    date: "2023-05-05T11:30:00Z",
    status: "Completed",
    parties: {
      customer: {
        id: "cus_007",
        name: "Daniel Lee",
        image: "/placeholder.svg?height=40&width=40",
      },
      agent: {
        id: "agt_005",
        name: "David Kim",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    paymentMethod: "Credit Card",
    reference: "REF567890",
  },
  {
    id: "TRX-006",
    type: "Sale",
    property: {
      id: 6,
      title: "Mountain Retreat",
      address: "303 Alpine Road, Aspen, CO",
      image: "/placeholder.svg?height=40&width=40",
    },
    amount: 3750000,
    date: "2023-05-03T13:45:00Z",
    status: "Failed",
    parties: {
      buyer: {
        id: "cus_008",
        name: "Olivia Wilson",
        image: "/placeholder.svg?height=40&width=40",
      },
      seller: {
        id: "cus_009",
        name: "William Taylor",
        image: "/placeholder.svg?height=40&width=40",
      },
      agent: {
        id: "agt_001",
        name: "Robert Chen",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    paymentMethod: "Wire Transfer",
    reference: "REF123789",
  },
  {
    id: "TRX-007",
    type: "Deposit",
    property: {
      id: 7,
      title: "Lakefront Property",
      address: "404 Lake View Drive, Austin, TX",
      image: "/placeholder.svg?height=40&width=40",
    },
    amount: 50000,
    date: "2023-05-01T10:00:00Z",
    status: "Pending",
    parties: {
      buyer: {
        id: "cus_010",
        name: "James Anderson",
        image: "/placeholder.svg?height=40&width=40",
      },
      seller: {
        id: "cus_011",
        name: "Emma Davis",
        image: "/placeholder.svg?height=40&width=40",
      },
      agent: {
        id: "agt_002",
        name: "Sarah Johnson",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    paymentMethod: "Bank Transfer",
    reference: "REF456123",
  },
];

type Filter = {
  type: string;
  status: string;
  amount: string;
};

export default function TransactionsClientPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filter>({
    type: "all",
    status: "all",
    amount: "all",
  });
  const [tempFilters, setTempFilters] = useState<Filter>({
    type: "all",
    status: "all",
    amount: "all",
  });
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  // Apply filters to the transactions list
  const filteredTransactions = allTransactions
    .filter((transaction) => {
      // Tab filter
      if (activeTab !== "all" && transaction.type.toLowerCase() !== activeTab) {
        return false;
      }

      // Search filter
      const searchString = `${transaction.id} ${transaction.property.title} ${
        transaction.property.address
      } ${transaction.reference} ${Object.values(transaction.parties)
        .map((party) => party.name)
        .join(" ")}`.toLowerCase();
      const matchesSearch =
        searchQuery === "" || searchString.includes(searchQuery.toLowerCase());

      // Type filter
      const matchesType =
        filters.type === "all" ||
        (filters.type === "sale" && transaction.type === "Sale") ||
        (filters.type === "deposit" && transaction.type === "Deposit") ||
        (filters.type === "commission" && transaction.type === "Commission") ||
        (filters.type === "rental" && transaction.type === "Rental") ||
        (filters.type === "refund" && transaction.type === "Refund");

      // Status filter
      const matchesStatus =
        filters.status === "all" ||
        (filters.status === "completed" &&
          transaction.status === "Completed") ||
        (filters.status === "pending" && transaction.status === "Pending") ||
        (filters.status === "failed" && transaction.status === "Failed");

      // Amount filter
      const matchesAmount =
        filters.amount === "all" ||
        (filters.amount === "small" && transaction.amount < 10000) ||
        (filters.amount === "medium" &&
          transaction.amount >= 10000 &&
          transaction.amount < 100000) ||
        (filters.amount === "large" &&
          transaction.amount >= 100000 &&
          transaction.amount < 1000000) ||
        (filters.amount === "xlarge" && transaction.amount >= 1000000);

      return matchesSearch && matchesType && matchesStatus && matchesAmount;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const applyFilters = () => {
    setFilters(tempFilters);

    // Update active filters
    const newActiveFilters: string[] = [];

    if (tempFilters.type !== "all") {
      const typeLabel =
        tempFilters.type === "sale"
          ? "Sale"
          : tempFilters.type === "deposit"
          ? "Deposit"
          : tempFilters.type === "commission"
          ? "Commission"
          : tempFilters.type === "rental"
          ? "Rental"
          : tempFilters.type === "refund"
          ? "Refund"
          : "";
      newActiveFilters.push(`Type: ${typeLabel}`);
    }

    if (tempFilters.status !== "all") {
      const statusLabel =
        tempFilters.status === "completed"
          ? "Completed"
          : tempFilters.status === "pending"
          ? "Pending"
          : tempFilters.status === "failed"
          ? "Failed"
          : "";
      newActiveFilters.push(`Status: ${statusLabel}`);
    }

    if (tempFilters.amount !== "all") {
      const amountLabel =
        tempFilters.amount === "small"
          ? "< $10,000"
          : tempFilters.amount === "medium"
          ? "$10,000 - $99,999"
          : tempFilters.amount === "large"
          ? "$100,000 - $999,999"
          : tempFilters.amount === "xlarge"
          ? "$1,000,000+"
          : "";
      newActiveFilters.push(`Amount: ${amountLabel}`);
    }

    setActiveFilters(newActiveFilters);
  };

  const resetFilters = () => {
    setTempFilters({
      type: "all",
      status: "all",
      amount: "all",
    });
  };

  const clearAllFilters = () => {
    setFilters({
      type: "all",
      status: "all",
      amount: "all",
    });
    setTempFilters({
      type: "all",
      status: "all",
      amount: "all",
    });
    setActiveFilters([]);
  };

  const removeFilter = (filter: string) => {
    const newActiveFilters = activeFilters.filter((f) => f !== filter);
    setActiveFilters(newActiveFilters);

    // Update the actual filters
    if (filter.startsWith("Type:")) {
      setFilters({ ...filters, type: "all" });
      setTempFilters({ ...tempFilters, type: "all" });
    } else if (filter.startsWith("Status:")) {
      setFilters({ ...filters, status: "all" });
      setTempFilters({ ...tempFilters, status: "all" });
    } else if (filter.startsWith("Amount:")) {
      setFilters({ ...filters, amount: "all" });
      setTempFilters({ ...tempFilters, amount: "all" });
    }
  };

  // Calculate summary statistics
  const totalTransactions = filteredTransactions.length;
  const totalAmount = filteredTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const completedTransactions = filteredTransactions.filter(
    (t) => t.status === "Completed"
  ).length;
  const pendingTransactions = filteredTransactions.filter(
    (t) => t.status === "Pending"
  ).length;
  const failedTransactions = filteredTransactions.filter(
    (t) => t.status === "Failed"
  ).length;

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Transactions
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-muted-foreground">
              {completedTransactions} completed, {pendingTransactions} pending,{" "}
              {failedTransactions} failed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(totalAmount / 1000000).toFixed(2)}M
            </div>
            <p className="text-xs text-muted-foreground">
              Avg. ${(totalAmount / totalTransactions / 1000).toFixed(1)}K per
              transaction
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalTransactions > 0
                ? ((completedTransactions / totalTransactions) * 100).toFixed(1)
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              {completedTransactions} of {totalTransactions} transactions
              successful
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Date Range</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <DatePickerWithRange className="w-full" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            View and manage all your financial transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-x-[10px]">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <div className="space-y-2">
                      <Label htmlFor="type-filter">Type</Label>
                      <Select
                        value={tempFilters.type}
                        onValueChange={(value) =>
                          setTempFilters({ ...tempFilters, type: value })
                        }
                      >
                        <SelectTrigger id="type-filter">
                          <SelectValue placeholder="Any type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any type</SelectItem>
                          <SelectItem value="sale">Sale</SelectItem>
                          <SelectItem value="deposit">Deposit</SelectItem>
                          <SelectItem value="commission">Commission</SelectItem>
                          <SelectItem value="rental">Rental</SelectItem>
                          <SelectItem value="refund">Refund</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="status-filter">Status</Label>
                      <Select
                        value={tempFilters.status}
                        onValueChange={(value) =>
                          setTempFilters({ ...tempFilters, status: value })
                        }
                      >
                        <SelectTrigger id="status-filter">
                          <SelectValue placeholder="Any status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any status</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="amount-filter">Amount</Label>
                      <Select
                        value={tempFilters.amount}
                        onValueChange={(value) =>
                          setTempFilters({ ...tempFilters, amount: value })
                        }
                      >
                        <SelectTrigger id="amount-filter">
                          <SelectValue placeholder="Any amount" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any amount</SelectItem>
                          <SelectItem value="small">
                            Less than $10,000
                          </SelectItem>
                          <SelectItem value="medium">
                            $10,000 - $99,999
                          </SelectItem>
                          <SelectItem value="large">
                            $100,000 - $999,999
                          </SelectItem>
                          <SelectItem value="xlarge">$1,000,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetFilters}
                      >
                        Reset
                      </Button>
                      <Button size="sm" onClick={applyFilters}>
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFilters.map((filter, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  {filter}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeFilter(filter)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={clearAllFilters}
              >
                Clear all
              </Button>
            </div>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md overflow-hidden">
                            <img
                              src={
                                transaction.property.image || "/placeholder.svg"
                              }
                              alt={transaction.property.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {transaction.property.title}
                            </p>
                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {transaction.property.address}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>
                        ${transaction.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.status === "Completed"
                              ? "default"
                              : transaction.status === "Pending"
                              ? "outline"
                              : "secondary"
                          }
                          className={
                            transaction.status === "Completed"
                              ? "bg-green-500"
                              : transaction.status === "Failed"
                              ? "bg-red-500"
                              : ""
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/transactions/${transaction.id}`}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Edit Transaction
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Download Receipt
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Void Transaction
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No transactions found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
