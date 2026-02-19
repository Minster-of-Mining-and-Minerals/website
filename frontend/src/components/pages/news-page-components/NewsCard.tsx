"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type NewsCardProps = {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    category: string;
    tags: string[];
    readingTime: (text: string) => number;
};

const NewsCard = ({ id, title, excerpt, image, date, category, tags, readingTime }: NewsCardProps) => {
    return (

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group bg-white rounded-2xl shadow-md overflow-hidden"
        >
            <Link
                href={`/news/${id}`}
            >
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden">
                    <motion.div whileHover={{ scale: 1.05 }} className="relative h-full w-full">
                        <Image src={image} alt={title} fill className="object-cover" />
                    </motion.div>

                    {/* Date badge */}
                    <span className="absolute top-3 left-3 bg-white/90 text-xs font-semibold px-3 py-1 rounded-full">
                        {date}
                    </span>
                </div>

                {/* Content */}
                <div className="p-5">
                    <p className="text-xs font-semibold text-blue-600 mb-1">
                        {category} • {readingTime(excerpt)} min read
                    </p>

                    <h3 className="font-bold text-base text-gray-900 mb-2 line-clamp-2">{title}</h3>

                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">{excerpt}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {tags.map((tag) => (
                            <span key={tag} className="text-xs bg-gray-200 dark:bg-neutral-800 px-2 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <Link
                        href={`/news/${id}`}
                        className="inline-flex items-center text-sm font-semibold text-golden-dark hover:gap-2 transition-all"
                    >
                        Read More
                        <span className="ml-1">→</span>
                    </Link>
                </div>
            </Link>
        </motion.div>
    );
};

export default NewsCard;