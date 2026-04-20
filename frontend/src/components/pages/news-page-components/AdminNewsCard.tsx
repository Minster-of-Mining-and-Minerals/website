"use client";

import { motion } from "framer-motion";
<<<<<<< HEAD
import Link from "next/link";
import { useUpdateNewsMutation } from "@/redux/api/newsApi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Archive, EyeOff, Send } from "lucide-react";
import { useState } from "react";
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
=======
import Image from "next/image";
import Link from "next/link";
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674

type Media =
    | { url: string; type: "image" }
    | { url: string; type: "video" }
    | null;

type NewsCardProps = {
    id: string;
    title: string;
    excerpt: string;
    media: Media;
<<<<<<< HEAD
    tags: string[];
    status: "draft" | "published" | "archived";
    publishedAt?: string;
    category: string;
=======
    date: string;
    category: string;
    tags: string[];
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
    readingTime: (text: string) => number;
};

const AdminNewsCard = ({
    id,
    title,
    excerpt,
    media,
<<<<<<< HEAD
    status,
    publishedAt,
=======
    date,
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
    category,
    tags,
    readingTime,
}: NewsCardProps) => {
<<<<<<< HEAD
=======
    console.log("media: ", media);
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group bg-white rounded-2xl shadow-md overflow-hidden"
        >
<<<<<<< HEAD
            <div className="block cursor-default">
=======
            <Link href={`/admin/news/${id}`}>
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
                {/* Media */}
                <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative h-full w-full"
                    >
                        {/* IMAGE */}
                        {media?.type === "image" && (
                            <img
                                src={media.url}
                                alt={title}
                                className="object-cover h-full w-full"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        )}

                        {/* VIDEO */}
                        {media?.type === "video" && (
                            <video
                                src={media.url}
                                className="h-full w-full object-cover"
                                muted
                                loop
                                playsInline
                            />
                        )}

                        {/* FALLBACK */}
                        {!media && (
                            <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                                No media
                            </div>
                        )}
                    </motion.div>

<<<<<<< HEAD
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <Badge variant={status === "published" ? "default" : status === "archived" ? "secondary" : "destructive"}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Badge>
                        {publishedAt && (
                            <span className="bg-white/90 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(publishedAt).toLocaleString()}
                            </span>
                        )}
                    </div>
=======
                    {/* Date badge */}
                    <span className="absolute top-3 left-3 bg-white/90 text-xs font-semibold px-3 py-1 rounded-full">
                        {date}
                    </span>
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
                </div>

                {/* Content */}
                <div className="p-5">
                    <p className="text-xs font-semibold text-blue-600 mb-1">
                        {category} • {readingTime(excerpt)} min read
                    </p>

                    <h3 className="font-bold text-base text-gray-900 mb-2 line-clamp-2">
                        {title}
                    </h3>

                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                        {excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs bg-gray-200 px-2 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

<<<<<<< HEAD
                    <div className="flex items-center justify-between border-t pt-4 mt-4">
                        <Link href={`/admin/news/${id}`} className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">
                            Edit News <span>→</span>
                        </Link>
                        
                        <NewsActions id={id} status={status} />
                    </div>
                </div>
            </div>
=======
                    <span className="inline-flex items-center text-sm font-semibold text-golden-dark group-hover:gap-2 transition-all">
                        Edit News <span className="ml-1">→</span>
                    </span>
                </div>
            </Link>
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
        </motion.div>
    );
};

<<<<<<< HEAD
const NewsActions = ({ id, status }: { id: string; status: string }) => {
    const [updateNews, { isLoading }] = useUpdateNewsMutation();
    const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
    const [publishDate, setPublishDate] = useState(new Date().toISOString().slice(0, 16));

    const handleStatusUpdate = async (newStatus: string, published_at?: string) => {
        try {
            await updateNews({ 
                id, 
                data: { status: newStatus as any, published_at } as any 
            }).unwrap();
            toast.success(`News ${newStatus} successfully`);
            setIsPublishDialogOpen(false);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    return (
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            {status === "draft" && (
                <Button 
                    size="sm" 
                    variant="default" 
                    className="h-8 gap-1"
                    onClick={() => setIsPublishDialogOpen(true)}
                >
                    <Send className="h-3.5 w-3.5" /> Publish
                </Button>
            )}

            {status === "published" && (
                <>
                    <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 gap-1"
                        onClick={() => handleStatusUpdate("draft")}
                    >
                        <EyeOff className="h-3.5 w-3.5" /> Unpublish
                    </Button>
                    <Button 
                        size="sm" 
                        variant="secondary" 
                        className="h-8 gap-1"
                        onClick={() => handleStatusUpdate("archived")}
                    >
                        <Archive className="h-3.5 w-3.5" /> Archive
                    </Button>
                </>
            )}

            {status === "archived" && (
                <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-8 gap-1"
                    onClick={() => handleStatusUpdate("draft")}
                >
                    Restore to Draft
                </Button>
            )}

            <Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Publish News</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="publish-date">Publish Date & Time</Label>
                            <Input 
                                id="publish-date"
                                type="datetime-local" 
                                value={publishDate}
                                onChange={(e) => setPublishDate(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                                Leave it as now to publish immediately, or choose a future date to schedule.
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPublishDialogOpen(false)}>Cancel</Button>
                        <Button onClick={() => handleStatusUpdate("published", new Date(publishDate).toISOString())} disabled={isLoading}>
                            Confirm Publish
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

=======
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
export default AdminNewsCard;