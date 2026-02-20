// utils/newsMapper.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE;
export const extractExcerpt = (content: any, maxLength = 160) => {
    if (!content?.ops) return "";

    const text = content.ops
        .map((op: any) => (typeof op.insert === "string" ? op.insert : ""))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

    return text.slice(0, maxLength) + (text.length > maxLength ? "..." : "");
};

export function extractHeadlineImage(attachments: any[]) {
    if (!attachments || attachments.length === 0) return null;

    const headline = attachments.find(
        (a) => a.category === "headline" && a.attachment?.file_path
    );

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
    const headlines = attachments.filter(
        (a) => a.category === "headline" && a.attachment?.file_path
    );

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