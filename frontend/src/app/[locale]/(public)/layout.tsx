import type { Metadata } from "next";
import PublicNavbar from "@/components/public-layout/nav-bar";
import Footer from "@/components/public-layout/footer";

export const metadata: Metadata = {
    title: "Minister of Mining",
    description: "Minister of Mining",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative bg-[#f7f9fc] w-full">
            <PublicNavbar />
            <div className="">
                {children}
            </div>
            <Footer />
        </div>
    );
}
