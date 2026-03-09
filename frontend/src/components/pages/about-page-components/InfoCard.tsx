"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function InfoCard({
    icon,
    title,
    children,
    center = false,
}: {
    icon: string;
    title: string;
    children: React.ReactNode;
    center?: boolean;
}) {
    console.log("image: ", icon)
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`p-6
        ${"text-center"}`}
        >
            <div className={`flex items-center md:gap-6 md:mb-4 mb-2 ${center ? "justify-center" : ""}`}>
                <div className="w-full rounded-full bg-golden-light flex items-center justify-center flex-col gap-2">
                    <img
                        src={icon}
                        alt={title}
                        width={150}
                        height={150}
                        className="object-cover md:w-28 w-24"
                    />
                    <h2 className="text-2xl font-bold text-teal-900">{title}</h2>
                </div>

            </div>

            <div className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {children}
            </div>
        </motion.div>
    );
}
