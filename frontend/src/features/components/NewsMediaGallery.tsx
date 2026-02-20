// components/news/NewsMediaGallery.tsx
import React, { useState } from 'react';
import { extractAllHeadlineAttachments } from '@/utils/newsMapper';

interface Attachment {
    category: string;
    attachment: {
        attachment_id: string;
        file_name: string;
        file_path: string;
    };
}

interface NewsMediaGalleryProps {
    attachments: Attachment[];
    title: string;
}

const NewsMediaGallery: React.FC<NewsMediaGalleryProps> = ({ attachments, title }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Filter headline attachments
    const headlineMedia = extractAllHeadlineAttachments(attachments)


    if (headlineMedia.length === 0) return null;

    return (
        <div className="space-y-4">
            <div className="relative h-96 w-full rounded-lg overflow-hidden bg-gray-100">
                {/* Main display */}
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
                        muted
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

            {/* Thumbnails */}
            {headlineMedia.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {headlineMedia.map((media, idx) => (
                        <button
                            key={media.id}
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

export default NewsMediaGallery;