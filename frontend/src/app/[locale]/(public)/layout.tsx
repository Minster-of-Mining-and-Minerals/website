import type { Metadata } from "next";
import PublicNavbar from "@/components/public-layout/nav-bar";

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
        <html lang="en">
            <body
                className=""
            >
                <div className="relative  w-full">
                    <PublicNavbar />
                    <div className="">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
