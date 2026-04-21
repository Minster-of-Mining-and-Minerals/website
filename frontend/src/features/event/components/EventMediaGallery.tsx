import React, { useState } from 'react';
import { extractAllHeadlineAttachments } from '@/utils/newsMapper';
import { toast } from 'sonner';
import { Share2 } from 'lucide-react';

interface Attachment {
    category: string;
    attachment: {
        attachment_id: string;
        file_name: string;
        file_path: string;
    };
}

interface EventMediaGalleryProps {
    attachments: Attachment[];
    title: string;
}

const EventMediaGallery: React.FC<EventMediaGalleryProps> = ({
    attachments,
    title,
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showShareMenu, setShowShareMenu] = useState(false);

    // Reuse extraction logic but no reaction logic
    const headlineMedia = extractAllHeadlineAttachments(attachments);

    const handleShare = async () => {
        const url = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    url: url
                });
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    fallbackCopyToClipboard(url);
                }
            }
        } else {
            fallbackCopyToClipboard(url);
        }
        setShowShareMenu(false);
    };

    const fallbackCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Link copied to clipboard!');
        }).catch(() => {
            toast.error('Failed to copy link');
        });
    };

    if (headlineMedia.length === 0) return null;

    return (
        <div className="space-y-4">
            {/* Main Media Display */}
            <div className="relative h-96 w-full rounded-lg overflow-hidden bg-gray-100">
                {headlineMedia[activeIndex]?.type === 'image' && (
                    <img
                        src={headlineMedia[activeIndex].url}
                        alt={title}
                        className="object-cover h-full w-full"
                        onError={(e) => {
                            e.currentTarget.src = '/placeholder-image.jpg';
                        }}
                    />
                )}
                {headlineMedia[activeIndex]?.type === 'video' && (
                    <video
                        src={headlineMedia[activeIndex].url}
                        className="h-full w-full object-cover"
                        controls
                        loop
                        playsInline
                    />
                )}

                {/* Navigation buttons */}
                {headlineMedia.length > 1 && (
                    <>
                        <button
                            onClick={() => setActiveIndex(prev =>
                                prev === 0 ? headlineMedia.length - 1 : prev - 1
                            )}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all"
                            aria-label="Previous media"
                        >
                            ←
                        </button>
                        <button
                            onClick={() => setActiveIndex(prev =>
                                prev === headlineMedia.length - 1 ? 0 : prev + 1
                            )}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all"
                            aria-label="Next media"
                        >
                            →
                        </button>
                    </>
                )}

                {/* Media counter */}
                {headlineMedia.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                        {activeIndex + 1} / {headlineMedia.length}
                    </div>
                )}
            </div>

            {/* Interaction Bar - Below the main media */}
            <div className="flex items-center justify-end px-4">
                <div className="flex items-center gap-4">
                    {/* Share Button with dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowShareMenu(!showShareMenu)}
                            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <Share2 className="w-5 h-5" />
                            <span className="text-sm font-medium">Share</span>
                        </button>

                        {/* Share Menu */}
                        {showShareMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowShareMenu(false)}
                                />
                                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border py-1 min-w-[120px] z-50">
                                    <button
                                        onClick={handleShare}
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                                    >
                                        Share via...
                                    </button>
                                    <button
                                        onClick={() => {
                                            fallbackCopyToClipboard(window.location.href);
                                            setShowShareMenu(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                                    >
                                        Copy link
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Thumbnails */}
            {headlineMedia.length > 1 && (
                <div className="flex gap-2 overflow-x-auto p-3">
                    {headlineMedia.map((media, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`flex-shrink-0 h-20 w-28 rounded-lg overflow-hidden border-2 transition-all ${idx === activeIndex
                                ? 'border-golden-dark scale-105'
                                : 'border-transparent opacity-70 hover:opacity-100'
                                }`}
                        >
                            {media.type === 'image' ? (
                                <img
                                    src={media.url}
                                    alt={`Thumbnail ${idx + 1}`}
                                    className="object-cover h-full w-full"
                                />
                            ) : (
                                <video
                                    src={media.url}
                                    className="object-cover h-full w-full"
                                    muted
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventMediaGallery;
