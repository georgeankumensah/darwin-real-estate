import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps {
  title: string;
  href: string;
}

const navLink = ({ title, href }: NavLinkProps) => {
  const path = usePathname();

  const isActive = path.startsWith(href);
  return <Link href={href} className={cn("text-[14px] hover:underline",{isActive: ""})}>{title}</Link>;
};

export default navLink; 
