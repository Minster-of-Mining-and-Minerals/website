import { extractExcerpt, extractHeadlineImage } from "./newsMapper";

export const mapRelatedNews = (relatedNews: any) => {
    return (relatedNews || []).map((item: any) => {
        // extract first headline image
        console.log("item", item)
        const headlineMedia = extractHeadlineImage(item.attachments);

        console.log("headlineMedia", headlineMedia)
        // extract description from content using utility
        const description = extractExcerpt(item.content, 150);

        // extract first tag or fallback
        const category = item.tag_links?.[0]?.tag?.name || "General";

        // format date
        const date = new Date(item.created_at).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

        return {
            id: item.news_id,
            title: item.title,
            description,
            media: headlineMedia,
            date,
            category,
        };
    });
};