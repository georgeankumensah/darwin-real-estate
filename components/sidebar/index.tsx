"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Building,
  LayoutDashboard,
  Users,
  CreditCard,
  UserCircle,
  Bell,
  MessageSquare,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function DashboardSidebar() {
  const pathname = usePathname();

  const navigation = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Properties",
      href: "/properties",
      icon: Building,
    },
    {
      title: "Customers",
      href: "/customers",
      icon: Users,
    },
    {
      title: "Transactions",
      href: "/transactions",
      icon: CreditCard,
    },
    {
      title: "Agents",
      href: "/agents",
      icon: UserCircle,
    },
    {
      title: "Notifications",
      href: "/notifications",
      icon: Bell,
      badge: 2,
    },
    {
      title: "Chat",
      href: "/chat",
      icon: MessageSquare,
    },
  ];

  return (
    <Sidebar className="border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3">
      <SidebarHeader className="px-2 py-4">
        <Link href="/dashboard" className="flex items-center gap-2 px-4">
         
          <span className="font-semibold tracking-tight">Admin</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2 mt-[30px]">
        <SidebarMenu className=" gap-y-[15px]">
          {navigation.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className={`relative flex h-10 w-full items-center gap-3 rounded-[30px] px-3 ${
                  pathname === item.href
                    ? "bg-primary dark:bg-primary/20 text-white font-medium"
                    : "hover:bg-muted"
                }`}
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="ml-auto h-6 w-6 aspect-square rounded-full bg-green-500 hover:bg-green-500 text-[10px] text-white text-center"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto border-t p-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <Avatar className="h-12 w-12 border-2 border-muted">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Alex Morgan</span>
            <span className="text-xs text-muted-foreground">
              morgan@realestate.com
            </span>
          </div>
          <div className="absolute -right-1 bottom-1 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-white" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
