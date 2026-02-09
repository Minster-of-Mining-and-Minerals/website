"use client";
import { useState } from "react";

export default function ZoomContainer({ children }: any) {
    const [scale, setScale] = useState(1);

    return (
        <div className="overflow-hidden relative">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button onClick={() => setScale(s => Math.min(s + 0.1, 1.5))} className="px-3 py-1 bg-white shadow rounded">+</button>
                <button onClick={() => setScale(s => Math.max(s - 0.1, 0.6))} className="px-3 py-1 bg-white shadow rounded">−</button>
            </div>

            <div
                className="flex justify-center transition-transform duration-300"
                style={{ transform: `scale(${scale})` }}
            >
                {children}
            </div>
        </div>
    );
}
