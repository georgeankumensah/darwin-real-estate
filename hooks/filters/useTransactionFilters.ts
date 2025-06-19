import { useMemo, useState } from "react";
import { TransactionWithProperty } from "../api/transactions/useAllTransactions";

type Filter = {
    type: string;
    status: string;
    amount: string;
};

export function useTransactionFilters(transactions: TransactionWithProperty[] ) {
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

    const filteredTransactions = useMemo(() => {
        return transactions
            .filter((transaction) => {
                // Tab filter
                if (activeTab !== "all" && transaction.transactionType.toLowerCase() !== activeTab) {
                    return false;
                }

                // Search filter
                const searchString = `${transaction.id} ${transaction.property.title} ${transaction.property.address} ${transaction.refNumber}`.toLowerCase();
                const matchesSearch = searchQuery === "" || searchString.includes(searchQuery.toLowerCase());

                // Type filter
                const matchesType =
                    filters.type === "all" || transaction.transactionType === filters.type;

                // Status filter
                const matchesStatus =
                    filters.status === "all" || transaction.status === filters.status;

                // Amount filter
                const matchesAmount =
                    filters.amount === "all" ||
                    (filters.amount === "small" && transaction.amount < 10000) ||
                    (filters.amount === "medium" && transaction.amount >= 10000 && transaction.amount < 100000) ||
                    (filters.amount === "large" && transaction.amount >= 100000 && transaction.amount < 1000000) ||
                    (filters.amount === "xlarge" && transaction.amount >= 1000000);

                return matchesSearch && matchesType && matchesStatus && matchesAmount;
            })
            .sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime());
    }, [transactions, filters, searchQuery, activeTab]);

    const applyFilters = () => {
        setFilters(tempFilters);

        const newActiveFilters: string[] = [];

        if (tempFilters.type !== "all") {
            newActiveFilters.push(`Type: ${tempFilters.type}`);
        }
        if (tempFilters.status !== "all") {
            newActiveFilters.push(`Status: ${tempFilters.status}`);
        }
        if (tempFilters.amount !== "all") {
            const amountLabel =
                tempFilters.amount === "small"
                    ? "< $10,000"
                    : tempFilters.amount === "medium"
                        ? "$10,000 - $99,999"
                        : tempFilters.amount === "large"
                            ? "$100,000 - $999,999"
                            : "$1,000,000+";
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

        if (filter.startsWith("Type:")) {
            setFilters((f) => ({ ...f, type: "all" }));
            setTempFilters((f) => ({ ...f, type: "all" }));
        } else if (filter.startsWith("Status:")) {
            setFilters((f) => ({ ...f, status: "all" }));
            setTempFilters((f) => ({ ...f, status: "all" }));
        } else if (filter.startsWith("Amount:")) {
            setFilters((f) => ({ ...f, amount: "all" }));
            setTempFilters((f) => ({ ...f, amount: "all" }));
        }
    };

    // Summary stats
    const totalTransactions = filteredTransactions.length;
    const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
    const completedTransactions = filteredTransactions.filter(t => t.status === "COMPLETED").length;
    const pendingTransactions = filteredTransactions.filter(t => t.status === "PENDING").length;
    const failedTransactions = filteredTransactions.filter(t => t.status === "FAILED").length;

    return {
        filteredTransactions,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        tempFilters,
        setTempFilters,
        activeFilters,
        setActiveFilters,
        activeTab,
        setActiveTab,
        applyFilters,
        resetFilters,
        clearAllFilters,
        removeFilter,
        totalTransactions,
        totalAmount,
        completedTransactions,
        pendingTransactions,
        failedTransactions,
    };
}
