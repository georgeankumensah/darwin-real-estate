"use client";

import {usePathname} from "next/navigation";
import Link from "next/link";

import {cn} from "@/lib/utils";
import {logout} from "@/app/actions/logout";

export function DashboardSidebar() {
    const pathname = usePathname();

    const navigation = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: "/home.svg",
        },
        {
            title: "Properties",
            href: "/properties",
            icon: "/properties.svg",
        },
        {
            title: "Tenants",
            href: "/tenants",
            icon: "/tenants.svg",
        },
        {
            title: "Transactions",
            href: "/transactions",
            icon: "/transactions.svg",
        },
        {
            title: "Owners",
            href: "/owners",
            icon: "/owner.svg",
        },
        // {
        //   title: "Notifications",
        //   href: "/notifications",
        //   icon: Bell,
        //   badge: 2,
        // },
        // {
        //   title: "Chat",
        //   href: "/chat",
        //   icon: MessageSquare,
        // },
    ];

    return (
        <aside className="w-full max-w-[300px] h-screen border-r flex flex-col  bg-[#435468] p-[18px] pt-[30px]">
            <div className="flex items-center justify-start gap-2">
                <img
                    src="/darwin.png"
                    alt="Darwin"
                    className="w-[50px] aspect-square rounded-[6px]  "
                />
                <div className="flex flex-col">
                    <span className="text-white text-[16px] font-semibold">Darwin</span>
                    <span className="text-[#90b6e1] text-[12px]">
            Property Management
          </span>
                </div>
            </div>
            <div className="flex flex-col  gap-y-[10px] mt-[40px]">
                {navigation.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-2 p-4 text-[#98C0EE] rounded-[6px] hover:bg-[#536a85]  text-[14px] transition-colors",
                            pathname.startsWith(item.href) ? "bg-[#4C6077]  text-white" : ""
                        )}
                    >
                        <img
                            src={item.icon}
                            alt={item.title}
                            className={cn(
                                "h-[25] aspect-auto mix-blend-overlay ",
                                pathname.startsWith(item.href) ? "mix-blend-normal " : ""
                            )}
                        />
                        <span>{item.title}</span>
                    </Link>
                ))}
            </div>
            <div className="flex flex-col bg-[#4C6077] p-4 rounded-[6px] mt-auto">
                <div className="flex items-center gap-3">
                    <img
                        src="/owner.svg"
                        alt="admin"
                        className="w-[50px] aspect-square bg-[#98C0EE] p-[10px] rounded-[6px] "
                    />
                    <div className="flex flex-col">
                        <span className="text-white text-[16px] font-[400]">Admin</span>
                        <span className="text-[#90b6e1] text-[12px]">Administrator</span>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="bg-red-500 text-white text-[14px] px-4 py-2 rounded-[6px] mt-4 hover:bg-red-600 transition-colors">
                    Log Out
                </button>
            </div>
        </aside>
    );
}
