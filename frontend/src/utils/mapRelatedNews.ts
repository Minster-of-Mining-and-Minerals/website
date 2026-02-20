import { extractHeadlineImage } from "./newsMapper";

export const mapRelatedNews = (relatedNews) => {
    return relatedNews.map((item) => {
        // extract first headline image
        console.log("item", item)
        const headlineMedia = extractHeadlineImage(item.attachments);

        console.log("headlineMedia", headlineMedia)
        // extract description from content.ops
        const description = item.content?.ops
            ?.map(op => op.insert)
            .join(" ")
            .slice(0, 150) || "";

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