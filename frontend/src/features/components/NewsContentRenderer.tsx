"use client";

import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

interface Props {
    content: any;
}

const NewsContentRenderer = ({ content }: Props) => {
    if (!content) return null;

    let delta;

    // ✅ Handle both string and object from DB
    if (typeof content === "string") {
        try {
            delta = JSON.parse(content);
        } catch (error) {
            console.error("Invalid JSON content:", error);
            return null;
        }
    } else {
        delta = content;
    }

    if (!delta?.ops) return null;

    const converter = new QuillDeltaToHtmlConverter(delta.ops, {
        paragraphTag: "p",
    });

    const html = converter.convert();

    return (
        <div
            className="prose max-w-full break-words"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};

export default NewsContentRenderer;