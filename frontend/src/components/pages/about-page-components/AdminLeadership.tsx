"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Plus, Trash2, ChevronDown, ChevronUp, Upload, Image as ImageIcon } from "lucide-react";
import {
    useGetLeadershipsQuery,
    useCreateLeadershipMutation,
    useUpdateLeadershipMutation,
    useDeleteLeadershipMutation,
} from "@/redux/api/leadershipApi";
import { ImageUploadField, UploadedFileInfo } from "@/components/common/ImageUploadField";

export type LeaderNode = {
    id: string;
    level: number;
    name: string;
    title: string;
    fullDescription: string;
    header?: string;
    children?: LeaderNode[];
    parent_id?: string | null;
    leadership_id?: string;
    attachment_id?: string; // store uploaded image ID
    image?: string;         // store previewUrl
};

export default function LeadershipAdminPage() {
    const { data: leaderships, isLoading } = useGetLeadershipsQuery();
    const [createLeadership] = useCreateLeadershipMutation();
    const [updateLeadership] = useUpdateLeadershipMutation();
    const [deleteLeadership] = useDeleteLeadershipMutation();

    const [tree, setTree] = useState<LeaderNode | null>(null);
    const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
    const [draftNode, setDraftNode] = useState<LeaderNode | null>(null);

    const generateId = () => `leader-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    useEffect(() => {
        if (!isLoading && leaderships) {
            if (leaderships.length === 0) {
                setTree({
                    id: generateId(),
                    level: 1,
                    name: "",
                    title: "",
                    image: "",
                    fullDescription: "",
                    children: [],
                });
            } else {
                const mapNode = (item: any): LeaderNode => {
                    const attachment = item.attachments?.attachment;

                    return {
                        id: item.leadership_id,
                        leadership_id: item.leadership_id,
                        parent_id: item.parent_id,
                        level: item.level,
                        name: item.name,
                        title: item.title,
                        fullDescription: item.description || "",
                        header: item.header,
                        children: [],

                        // ✅ THIS IS THE FIX
                        attachment_id: attachment?.attachment_id || undefined,
                    };
                };

                const nodeMap: Record<string, LeaderNode> = {};
                leaderships.forEach((l: any) => { nodeMap[l.leadership_id] = mapNode(l); });

                const roots: LeaderNode[] = [];
                leaderships.forEach((l: any) => {
                    if (l.parent_id && nodeMap[l.parent_id]) {
                        nodeMap[l.parent_id].children = nodeMap[l.parent_id].children || [];
                        nodeMap[l.parent_id].children.push(nodeMap[l.leadership_id]);
                    } else {
                        roots.push(nodeMap[l.leadership_id]);
                    }
                });

                setTree(roots[0] || null);
            }
        }
    }, [leaderships, isLoading]);

    if (!tree) return <div>Loading...</div>;

    const findNodeById = (node: LeaderNode, id: string): LeaderNode | null => {
        if (node.id === id) return node;
        for (const child of node.children || []) {
            const found = findNodeById(child, id);
            if (found) return found;
        }
        return null;
    };

    const addChildNode = (parentId: string) => {
        const parent = findNodeById(tree!, parentId);
        if (!parent) return;

        const newNode: LeaderNode = {
            id: generateId(),
            level: parent.level + 1,
            name: "",
            title: "",
            fullDescription: "",
            parent_id: parentId,
            children: [],
        };

        setTree(prev => addNodeRecursively(prev!, parentId, newNode));
    };

    const addNodeRecursively = (node: LeaderNode, parentId: string, newNode: LeaderNode): LeaderNode => {
        if (node.id === parentId) {
            return { ...node, children: [...(node.children || []), newNode] };
        }
        return {
            ...node,
            children: node.children?.map(child => addNodeRecursively(child, parentId, newNode)),
        };
    };

    const deleteNode = async (nodeId: string) => {
        const nodeToDelete = findNodeById(tree!, nodeId);

        if (nodeToDelete?.leadership_id) {
            await deleteLeadership(nodeToDelete.leadership_id);
        }

        setTree(prev => deleteNodeRecursively(prev!, nodeId));
    };

    const deleteNodeRecursively = (node: LeaderNode, nodeId: string): LeaderNode | null => {
        if (node.id === nodeId) return null;
        return {
            ...node,
            children: node.children?.map(child => deleteNodeRecursively(child, nodeId)).filter(Boolean) as LeaderNode[],
        };
    };

    const createNode = async (node: LeaderNode) => {
        const created = await createLeadership({
            name: node.name,
            title: node.title,
            description: node.fullDescription,
            parent_id: node.parent_id || null,
            header: node.header || "Minister of Mines",
            level: node.level,
            attachments: node.attachment_id ? [{ attachment_id: node.attachment_id }] : [],
        });

        const updatedNode: LeaderNode = { ...node, leadership_id: created.leadership_id };
        setTree(prev => updateNodeRecursively(prev!, node.id, { leadership_id: updatedNode.leadership_id }));
    };

    const updateNode = async (node: LeaderNode, updatedFields: Partial<LeaderNode>) => {
        const updatedNode = { ...node, ...updatedFields };

        setTree(prev => updateNodeRecursively(prev!, node.id, updatedFields));
        if (!node.leadership_id) return;

        await updateLeadership({
            id: node.leadership_id,
            data: {
                name: updatedNode.name,
                title: updatedNode.title,
                description: updatedNode.fullDescription,
                parent_id: updatedNode.parent_id,
                header: updatedNode.header,
                attachments: updatedNode.attachment_id
                    ? [{ attachment_id: updatedNode.attachment_id }]
                    : [],
            },
        });
    };

    const updateNodeRecursively = (node: LeaderNode, nodeId: string, updatedFields: Partial<LeaderNode>): LeaderNode => {
        if (node.id === nodeId) return { ...node, ...updatedFields };
        return { ...node, children: node.children?.map(child => updateNodeRecursively(child, nodeId, updatedFields)) };
    };

    return (
        <div className="py-6 mx-auto">
            <NodeEditor
                node={tree}
                addChildNode={addChildNode}
                deleteNode={deleteNode}
                updateNode={updateNode}
                createNode={createNode}
            />
        </div>
    );
}

/* =====================================================
   NODE EDITOR
===================================================== */
type NodeEditorProps = {
    node: LeaderNode;
    addChildNode: (id: string) => void;
    deleteNode: (id: string) => void;
    updateNode: (node: LeaderNode, fields: Partial<LeaderNode>) => void;
    createNode: (node: LeaderNode) => void;
};

function NodeEditor({ node, addChildNode, deleteNode, updateNode, createNode }: NodeEditorProps) {
    const [isOpen, setIsOpen] = useState(true);
    const isNew = !node.leadership_id;

    return (
        <div className="w-full">
            <Card className="overflow-hidden w-full py-0">
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <NodeHeader
                        node={node}
                        isOpen={isOpen}
                        addChildNode={addChildNode}
                        deleteNode={deleteNode}
                        createNode={createNode}
                        isNew={isNew}
                    />
                    <CollapsibleContent>
                        <CardContent className="px-4 space-y-6 bg-white py-6">
                            <NodeBasicInfo node={node} updateNode={updateNode} />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <NodeImageUpload node={node} updateNode={updateNode} />
                                <NodeDescription node={node} updateNode={updateNode} />
                            </div>
                        </CardContent>
                    </CollapsibleContent>
                </Collapsible>
            </Card>

            {node.children?.length > 0 && (
                <div className="ml-8 mt-4 border-l-2 border-gray-100 pl-6">
                    {node.children.map(child => (
                        <NodeEditor
                            key={child.id}
                            node={child}
                            addChildNode={addChildNode}
                            deleteNode={deleteNode}
                            updateNode={updateNode}
                            createNode={createNode}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

/* =====================================================
   NODE HEADER
===================================================== */
function NodeHeader({ node, isOpen, addChildNode, deleteNode, createNode, isNew }: any) {
    return (
        <CardHeader className="bg-golden-dark20 py-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                    </CollapsibleTrigger>

                    <div>
                        <CardTitle className="text-base font-semibold text-[#073954]">
                            {node.name || "New Leader"}
                        </CardTitle>
                        <p className="text-xs text-gray-500">{node.title || "No Title"}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {isNew ? (
                        <>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => createNode(node)}
                            >
                                Create
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNode(node.id)}
                            >
                                Cancel
                            </Button></>

                    ) : (
                        <>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 bg-golden-dark text-white hover:bg-golden-darkHover hover:text-white"
                                onClick={() => addChildNode(node.id)}
                            >
                                <Plus className="h-3.5 w-3.5 mr-1" />
                                Add Child
                            </Button>
                            {node.level !== 0 && (
                                <Button variant="destructive" size="sm" onClick={() => deleteNode(node.id)}>
                                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                                    Delete
                                </Button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </CardHeader>
    );
}

/* =====================================================
   BASIC INFO / IMAGE / DESCRIPTION
===================================================== */
function NodeBasicInfo({ node, updateNode }: any) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
                <Label>Name</Label>
                <Input value={node.name} onChange={(e) => updateNode(node, { name: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Title</Label>
                <Input value={node.title} onChange={(e) => updateNode(node, { title: e.target.value })} />
            </div>
        </div>
    );
}

/* =====================================================
   IMAGE UPLOAD
===================================================== */
function NodeImageUpload({ node, updateNode }: any) {
    const handleChange = (ids: string[], files?: UploadedFileInfo[]) => {
        const fileInfo = files?.[0]; // single image only
        updateNode(node, {
            attachment_id: fileInfo?.attachment_id || undefined,
        });
    };

    return (
        <div className="md:col-span-1">
            <ImageUploadField
                id={`node-image-${node.id}`}
                label="Profile Image"
                value={node.attachment_id ? [node.attachment_id] : []}
                onChange={handleChange}
                category="profile"
            />
        </div>
    );
}

function NodeDescription({ node, updateNode }: any) {
    return (
        <div className="md:col-span-2 space-y-2">
            <Label>Full Description</Label>
            <Textarea value={node.fullDescription} onChange={(e) => updateNode(node, { fullDescription: e.target.value })} className="min-h-[160px]" />
        </div>
    );
}