"use client";
import { motion, AnimatePresence } from "framer-motion";
import LeadershipCard from "./LeadershipCard";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function HierarchyNode({ node }: any) {
    const [expanded] = useState(true);

    return (
        <div className="flex flex-col items-center">
            <LeadershipCard person={node} />

            <AnimatePresence>
                {expanded && node.children && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-px h-8 bg-gray-300" />

                        {/* MOBILE: vertical | DESKTOP: horizontal */}
                        <div className="flex flex-col md:flex-row md:gap-40 gap-10">
                            {node.children.map((child: any) => (
                                <div key={child.id} className="flex flex-col items-center">
                                    <HierarchyNode node={child} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
