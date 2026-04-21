// utils/newsMapper.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE;
export const extractExcerpt = (content: any, maxLength = 160) => {
    if (!content) return "";

    let text = "";

    // Handle Quill Delta
    if (content?.ops) {
        text = content.ops
            .map((op: any) => (typeof op.insert === "string" ? op.insert : ""))
            .join(" ")
            .replace(/\s+/g, " ")
            .trim();
    }
    // Handle HTML or plain text string
    else if (typeof content === "string") {
        text = content
            .replace(/<[^>]*>/g, " ") // Strip HTML tags
            .replace(/&nbsp;/g, " ")  // Replace non-breaking spaces
            .replace(/&amp;/g, "&")   // Replace ampersands
            .replace(/&lt;/g, "<")    // Replace less-than
            .replace(/&gt;/g, ">")    // Replace greater-than
            .replace(/&quot;/g, '"')  // Replace quotes
            .replace(/&#39;/g, "'")   // Replace single quotes
            .replace(/\s+/g, " ")     // Normalize whitespace
            .trim();
    }

    if (!text) return "";

    return text.slice(0, maxLength) + (text.length > maxLength ? "..." : "");
};

export function extractHeadlineImage(attachments: any[]) {
    if (!attachments || attachments.length === 0) return null;

    let headline = attachments.find(
        (a) => a.category === "headline" && a.attachment?.file_path
    );

    // Fallback for events that don't have category='headline'
    if (!headline) {
        headline = attachments.find((a) => a.attachment?.file_path);
    }

    if (!headline) return null;

    const rawPath = headline.attachment.file_path;

    // 🔥 IMPORTANT FIX
    const normalizedPath = rawPath.replace(/\\/g, "/");

    const url = `${API_BASE_URL}/${normalizedPath}`;

    const ext = normalizedPath.split(".").pop()?.toLowerCase();

    return {
        url,
        type: ext === "mp4" || ext === "webm" || ext === "ogg" ? "video" : "image",
    };
}

export function extractAllHeadlineAttachments(attachments: any[]) {
    if (!attachments || attachments.length === 0) return [];

    // Filter only headline attachments that have a valid file path
    let headlines = attachments.filter(
        (a) => a.category === "headline" && a.attachment?.file_path
    );

    // Fallback for events where attachments lack category
    if (headlines.length === 0) {
        headlines = attachments.filter((a) => a.attachment?.file_path);
    }

    return headlines.map((att) => {
        const rawPath = att.attachment.file_path;
        const normalizedPath = rawPath.replace(/\\/g, "/");
        const url = `${API_BASE_URL}/${normalizedPath}`;
        const ext = normalizedPath.split(".").pop()?.toLowerCase();

        return {
            url,
            type: ext === "mp4" || ext === "webm" || ext === "ogg" ? "video" : "image",
        };
    });
}

export const extractTags = (tagLinks: any[]) =>
    tagLinks?.map(t => t.tag?.name).filter(Boolean) || [];

export const calculateReadingTime = (text: string) =>
    Math.max(1, Math.ceil(text.split(" ").length / 200));