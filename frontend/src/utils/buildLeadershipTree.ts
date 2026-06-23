import { Leadership } from "@/redux/types/leadership";
import { getImageUrl } from "@/utils/fileUrl";

export interface LeadershipNode {
    id: string;
    name: string;
    title: string;
    description?: string;
    image?: string;
    children: LeadershipNode[];
}

export function buildLeadershipTree(data: Leadership[]): LeadershipNode | null {
    const map = new Map<string, LeadershipNode>();

    // Step 1: create nodes
    data.forEach(item => {
        const attachment = item.attachments?.attachment;

        map.set(item.leadership_id, {
            id: item.leadership_id,
            name: item.name,
            title: item.title,
            description: item.description,
            image: attachment?.file_path
                ? getImageUrl(attachment, "thumb")
                : undefined,
            children: [],
        });
    });

    let root: LeadershipNode | null = null;

    // Step 2: assign children
    data.forEach(item => {
        const node = map.get(item.leadership_id)!;

        if (item.parent_id) {
            const parent = map.get(item.parent_id);
            parent?.children.push(node);
        } else {
            root = node; // top-level (Minister)
        }
    });

    return root;
}