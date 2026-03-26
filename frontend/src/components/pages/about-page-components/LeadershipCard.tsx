"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LeadershipCard({ person }: any) {
    const router = useRouter();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className={`max-w-[500px] p-2 flex flex-col items-center justify-center text-center cursor-pointer`}
        // onClick={() => router.push(`/leadership/${person.id}`)}
        >
            <div className="relative mx-auto mb-3">
                <img
                    src={person.image}
                    alt={person.name}
                    width={300}
                    height={300}
                    className="rounded-2xl object-cover shadow-2xl"
                />
            </div>

            <h3 className="font-bold text-gray-800">{person.name}</h3>
            <p className="text-sm font-semibold text-gray-600">{person.title}</p>

            <p className="text-sm text-gray-500 mt-2">
                {person.description}
            </p>
        </motion.div>
    );
}
