export const getFileUrl = (filePath: string) => {
    const apiBase = process.env.NEXT_PUBLIC_BASE || "http://localhost:4000";
    return `${apiBase}/${filePath.replace(/\\/g, "/")}`;
};

export type ImageSize = "thumb" | "medium" | "large" | "original";

export type AttachmentLike = {
    file_path: string;
    file_path_thumb?: string | null;
    file_path_medium?: string | null;
    file_path_large?: string | null;
    mime_type?: string | null;
};

export function getImageUrl(
    attachment: AttachmentLike | null | undefined,
    size: ImageSize = "medium"
): string {
    if (!attachment?.file_path) return "";

    let path = attachment.file_path;

    if (size === "thumb" && attachment.file_path_thumb) {
        path = attachment.file_path_thumb;
    } else if (size === "medium" && attachment.file_path_medium) {
        path = attachment.file_path_medium;
    } else if (size === "large" && attachment.file_path_large) {
        path = attachment.file_path_large;
    }

    return getFileUrl(path);
}

export function isImageAttachment(attachment: AttachmentLike | null | undefined): boolean {
    if (!attachment?.file_path) return false;
    if (attachment.mime_type?.startsWith("image/")) return true;
    return /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(attachment.file_path);
}

export function getAttachmentUrl(
    attachment: AttachmentLike | null | undefined,
    imageSize: ImageSize = "medium"
): string {
    if (!attachment?.file_path) return "";
    if (isImageAttachment(attachment)) {
        return getImageUrl(attachment, imageSize);
    }
    return getFileUrl(attachment.file_path);
}

export const getFileType = (fileName: string): string => {
    const extension = fileName.toLowerCase().split(".").pop();
    if (
        ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"].includes(
            extension || ""
        )
    ) {
        return "image";
    } else if (extension === "pdf") {
        return "pdf";
    } else if (["doc", "docx", "txt", "rtf"].includes(extension || "")) {
        return "document";
    } else {
        return "other";
    }
};
