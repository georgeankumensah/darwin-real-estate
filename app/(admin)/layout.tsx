import type { Metadata } from "next";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/sidebar";


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
    <div>
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-screen">
            <DashboardSidebar />
            <SidebarInset className="flex-1">
              <main className="flex-1">{children}</main>
            </SidebarInset>
          </div>
        </SidebarProvider>
    </div>
  );
}
