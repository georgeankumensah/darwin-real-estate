import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="p-6 space-y-4 ">
      <div className=" flex items-center justify-between space-y-1 w-full  border-b pb-4 ">
        <div>
          <h1 className="text-2xl font-medium">Transactions</h1>
          <p className="text-muted-foreground text-sm">
           Track all your transactions in one place. View, manage, and analyze your financial activities with ease.
          </p>
        </div>
        <Link
          href="/transactions/new"
          className="flex items-center gap-2 bg-primary text-sm rounded-[6px] text-white px-4 py-2  hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-6 w-6 text-white" />
          <span>Add Transaction</span>
        </Link>
      </div>
    </div>
  );
};

export default page;
