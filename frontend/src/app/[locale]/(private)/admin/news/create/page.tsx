"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FileIcon } from "lucide-react";

// Dynamic import for Next.js
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const CreateNews = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [tags, setTags] = useState("");
    const [content, setContent] = useState("");

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
    const [documentFiles, setDocumentFiles] = useState<File[]>([]);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    const totalMedia = imagePreviews.length + videoPreviews.length;

    // Handle image uploads
    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const urls = Array.from(files).map((file) => URL.createObjectURL(file));
            setImagePreviews(urls);
            setCurrentMediaIndex(0);
        }
    };

    // Handle video uploads
    const handleVideosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const urls = Array.from(files).map((file) => URL.createObjectURL(file));
            setVideoPreviews(urls);
            setCurrentMediaIndex(0);
        }
    };

    // Handle document uploads
    const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setDocumentFiles(Array.from(files));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !author || !content) {
            alert("Please fill required fields");
            return;
        }

        const newsData = {
            title,
            author,
            tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
            content,
            images: imagePreviews,
            videos: videoPreviews,
            documents: documentFiles,
            date: new Date().toISOString(),
        };

        console.log(newsData);
        alert("News Created!");
    };

    // Quill toolbar configuration
    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["blockquote", "code-block"],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    // Determine current media type for carousel
    const getCurrentMedia = () => {
        if (currentMediaIndex < imagePreviews.length) {
            return { type: "image", url: imagePreviews[currentMediaIndex] };
        } else {
            const videoIndex = currentMediaIndex - imagePreviews.length;
            return { type: "video", url: videoPreviews[videoIndex] };
        }
    };

    const currentMedia = totalMedia > 0 ? getCurrentMedia() : null;

    return (
        <div className="min-h-screen w-full grid grid-cols-2 gap-10">
            {/* Form Section */}
            <div className="bg-white p-6 rounded-lg shadow overflow-y-auto">
                <h1 className="text-2xl font-bold mb-6 text-[#073954]">Create News</h1>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Title */}
                    <div>
                        <label className="block mb-2">Title *</label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="News title"
                        />
                    </div>

                    {/* Author */}
                    <div>
                        <label className="block mb-2">Author *</label>
                        <Input
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Author name"
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block mb-2">Tags</label>
                        <Input
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="mining, Ethiopia, policy"
                        />
                    </div>

                    {/* Images Upload */}
                    <div>
                        <label className="block mb-2">Images</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImagesChange}
                        />
                    </div>

                    {/* Videos Upload */}
                    <div>
                        <label className="block mb-2">Videos</label>
                        <input
                            type="file"
                            accept="video/*"
                            multiple
                            onChange={handleVideosChange}
                        />
                    </div>

                    {/* Documents Upload */}
                    <div>
                        <label className="block mb-2">Documents (PDF, DOCX)</label>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            multiple
                            onChange={handleDocumentsChange}
                        />
                    </div>

                    {/* Quill Editor */}
                    <div>
                        <label className="block mb-2">Content *</label>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={modules}
                            className="bg-white"
                        />
                    </div>

                    <Button type="submit">Create News</Button>
                </form>
            </div>

            {/* Preview Section */}
            <div className="bg-white p-6 rounded-lg shadow overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Live Preview</h2>

                {/* Title */}
                <h1 className="text-3xl font-bold mb-3">
                    {title || "News Title Preview"}
                </h1>

                {/* Author & Date */}
                <div className="text-sm text-gray-500 mb-4">
                    {author ? `By ${author}` : "By Author Name"} •{" "}
                    {new Date().toLocaleDateString()}
                </div>

                {/* Media Carousel */}
                {currentMedia && (
                    <div className="relative w-full mb-4">
                        {currentMedia.type === "image" && (
                            <div className="relative w-full h-72">
                                <Image
                                    src={currentMedia.url}
                                    alt="Preview Media"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        )}

                        {currentMedia.type === "video" && (
                            <video controls className="w-full h-72 rounded-lg">
                                <source src={currentMedia.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}

                        {/* Navigation buttons */}
                        {totalMedia > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setCurrentMediaIndex(
                                            (prev) => (prev === 0 ? totalMedia - 1 : prev - 1)
                                        )
                                    }
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2"
                                >
                                    &#8592;
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setCurrentMediaIndex(
                                            (prev) => (prev === totalMedia - 1 ? 0 : prev + 1)
                                        )
                                    }
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2"
                                >
                                    &#8594;
                                </button>
                            </>
                        )}
                    </div>
                )}

                {/* Tags */}
                {tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags
                            .split(",")
                            .map((tag) => tag.trim())
                            .filter(Boolean)
                            .map((tag, index) => (
                                <span
                                    key={index}
                                    className="text-xs bg-gray-200 px-3 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                    </div>
                )}

                {/* Content Preview */}
                <div
                    className="prose max-w-full break-words whitespace-pre-wrap mb-4"
                    dangerouslySetInnerHTML={{
                        __html:
                            content || "<p>News content preview will appear here...</p>",
                    }}
                />

                {/* Documents Preview */}
                {documentFiles.length > 0 && (
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Attached Documents:</h3>
                        <ul className="list-disc list-inside">
                            {documentFiles.map((doc, idx) => (
                                <li key={idx} className="border w-fit list-none py-2 px-3 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <FileIcon className="w-4 h-4" />
                                        <a
                                            href={URL.createObjectURL(doc)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className=" "
                                        >
                                            {doc.name}
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateNews;