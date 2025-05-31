import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/provider/QueryProvider";
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Darwin Real Estate",
    description: "Find your dream home with Darwin Real Estate",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <QueryProvider>
            <main className="flex-1 ">{children}</main>
            <Toaster/>
        </QueryProvider>
        </body>
        </html>
    );
}
