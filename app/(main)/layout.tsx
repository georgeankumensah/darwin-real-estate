import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />
      <section className="flex-1">{children}</section>
      <Footer />
    </section>
  );
}
