import { cn } from "@/lib/utils";
import React from "react";

export default function GridBackground({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex h-[50vh] w-full items-center justify-center overflow-hidden">
            {/* Static background image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center "
                style={{
                    backgroundImage: `url('/home-4.jpg')`
                }}
            />

            {/* Grid overlay */}
            <div
                className={cn(
                    "absolute inset-0 z-10",
                    "[background-size:50px_50px]",
                    "[background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]",
                    "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                    "backdrop-blur-xl"
                )}
            />

            {/* Radial gradient for fading edges */}
            <div className="pointer-events-none absolute inset-0 z-20 bg-white/60 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black/60"></div>

            {/* Children content */}
            <div className="relative z-30">
                {children}
            </div>
        </div>
    );
}
