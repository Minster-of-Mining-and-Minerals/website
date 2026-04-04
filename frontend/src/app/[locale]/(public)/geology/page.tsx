"use client";
import { useGetSnapshotsQuery } from "@/redux/api/snapshotApi";
import { getFileUrl } from "@/utils/fileUrl";
import { Loader2 } from "lucide-react";

const GeothermalPage = () => {
    const { data: snapshots = [], isLoading } = useGetSnapshotsQuery({ sector: "geothermal", publishedOnly: true });

    // Use the first published snapshot found for this sector
    const snapshot = snapshots[0];

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4 min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-golden-dark" />
                <p className="text-gray-500 animate-pulse">Loading geothermal sector data...</p>
            </div>
        );
    }

    if (!snapshot) {
        // Fallback to static content if no snapshot exists in DB
        return (
            <div className='w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-7 gap-8 px-4'>
                No snapshot found
            </div>
        );
    }

    const imageUrl = snapshot.attachment?.file_path ? getFileUrl(snapshot.attachment.file_path) : "/home-2.jpg";

    return (
        <div className='w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-7 gap-10 px-4'>
            {/* Left Content Column */}
            <div className="col-span-1 md:col-span-2 prose max-w-none flex flex-col gap-4 text-gray-600">
                <p className='text-gray-900'>
                    {snapshot.description_one}
                </p>
                <p className='text-gray-500'>
                    {snapshot.description_two}
                </p>
            </div>

            {/* Central Hex/Image Column */}
            <div className="col-span-1 md:col-span-3 flex flex-col gap-6">
                <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                    <img
                        src={imageUrl}
                        alt={snapshot.title}
                        className="object-cover h-auto w-full group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
                {snapshot.attachment_description && (
                    <p className='text-gray-900 font-medium border-l-4 border-golden-dark pl-4'>
                        {snapshot.attachment_description}
                    </p>

                )}
            </div>

            {/* Right Mandates Column */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-8">
                {snapshot.sections?.map((section, idx) => (
                    <div key={section.section_id || idx} className="flex flex-col gap-3 group">
                        <h2 className="text-lg font-bold text-golden-dark flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                            <span className="h-2 w-2 rounded-full bg-golden-dark" />
                            {section.title}
                        </h2>
                        <div
                            className="bg-gray-50/50 p-4 rounded-xl border border-transparent group-hover:border-golden-dark/10 group-hover:bg-white transition-all text-sm text-gray-600 leading-relaxed"
                        >
                            {section.content}
                        </div>
                    </div>
                ))}
                {(!snapshot.sections || snapshot.sections.length === 0) && (
                    <div className="text-gray-400 italic text-sm py-4 border-t border-gray-100">
                        No strategic details available.
                    </div>
                )}
            </div>
        </div>
    );
};

export default GeothermalPage;