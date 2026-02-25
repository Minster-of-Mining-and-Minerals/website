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
import {
    Plus,
    Trash2,
    ChevronDown,
    ChevronUp,
    Upload,
    Image as ImageIcon,
} from "lucide-react";

/* =====================================================
   TYPES
===================================================== */

export type LeaderNode = {
    id: string;
    level: number;
    name: string;
    title: string;
    image: string;
    shortDescription?: string;
    fullDescription: string;
    children?: LeaderNode[];
};

/* =====================================================
   DEFAULT DATA
===================================================== */

const defaultTree: LeaderNode = {
    id: "minister-habtamu",
    level: 0,
    name: "H.E. Engineer Habtamu Tegegn",
    title: "Minister of Mines",
    image: "/habtamu-tegegn-profile.jpg",
    shortDescription:
        "Senior public servant with extensive leadership experience.",
    fullDescription:
        "H.E. Engineer Habtamu Tegegn is the current Minister of Mines...",
    children: [],
};

/* =====================================================
   MAIN PAGE COMPONENT
===================================================== */

export default function LeadershipAdminPage() {
    const [tree, setTree] = useState<LeaderNode | null>(null);

    const generateId = () =>
        `leader-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    /* LOAD */
    useEffect(() => {
        const saved = localStorage.getItem("leadershipTree");
        if (saved) {
            try {
                setTree(JSON.parse(saved));
            } catch {
                setTree(defaultTree);
            }
        } else {
            setTree(defaultTree);
        }
    }, []);

    /* SAVE */
    useEffect(() => {
        if (tree) {
            localStorage.setItem("leadershipTree", JSON.stringify(tree));
        }
    }, [tree]);

    if (!tree) return null;

    /* UPDATE NODE */
    const updateNode = (
        node: LeaderNode,
        id: string,
        updatedFields: Partial<LeaderNode>
    ): LeaderNode => {
        if (node.id === id) {
            return { ...node, ...updatedFields };
        }

        return {
            ...node,
            children: node.children?.map((child) =>
                updateNode(child, id, updatedFields)
            ),
        };
    };

    /* ADD CHILD */
    const addChild = (parentId: string) => {
        const addRecursively = (node: LeaderNode): LeaderNode => {
            if (node.id === parentId) {
                const newNode: LeaderNode = {
                    id: generateId(),
                    level: node.level + 1,
                    name: "New Leader",
                    title: "New Title",
                    image: "",
                    fullDescription: "",
                    children: [],
                };

                return {
                    ...node,
                    children: [...(node.children || []), newNode],
                };
            }

            return {
                ...node,
                children: node.children?.map(addRecursively),
            };
        };

        setTree(addRecursively(tree));
    };

    /* DELETE NODE */
    const deleteNode = (id: string) => {
        const deleteRecursively = (node: LeaderNode): LeaderNode => ({
            ...node,
            children: node.children
                ?.filter((child) => child.id !== id)
                .map(deleteRecursively),
        });

        setTree(deleteRecursively(tree));
    };

    return (
        <div className="py-6 mx-auto">


            <NodeEditor
                node={tree}
                tree={tree}
                setTree={setTree}
                updateNode={updateNode}
                addChild={addChild}
                deleteNode={deleteNode}
            />
        </div>
    );
}

/* =====================================================
   NODE EDITOR (Recursive)
===================================================== */


type NodeEditorProps = {
    node: LeaderNode;
    tree: LeaderNode;
    setTree: React.Dispatch<React.SetStateAction<LeaderNode | null>>;
    updateNode: any;
    addChild: (id: string) => void;
    deleteNode: (id: string) => void;
};

function NodeEditor({
    node,
    tree,
    setTree,
    updateNode,
    addChild,
    deleteNode,
}: NodeEditorProps) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="w-full">
            <Card className="overflow-hidden w-full py-0">
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <NodeHeader
                        node={node}
                        isOpen={isOpen}
                        addChild={addChild}
                        deleteNode={deleteNode}
                    />

                    <CollapsibleContent>
                        <CardContent className="px-4 space-y-6 bg-white py-6">
                            <NodeBasicInfo
                                node={node}
                                tree={tree}
                                setTree={setTree}
                                updateNode={updateNode}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <NodeImageUpload
                                    node={node}
                                    tree={tree}
                                    setTree={setTree}
                                    updateNode={updateNode}
                                />

                                <NodeDescription
                                    node={node}
                                    tree={tree}
                                    setTree={setTree}
                                    updateNode={updateNode}
                                />
                            </div>
                        </CardContent>
                    </CollapsibleContent>
                </Collapsible>
            </Card>

            <TreeChildren
                node={node}
                tree={tree}
                setTree={setTree}
                updateNode={updateNode}
                addChild={addChild}
                deleteNode={deleteNode}
            />
        </div>
    );
}

/* =====================================================
   NODE HEADER
===================================================== */

function NodeHeader({ node, isOpen, addChild, deleteNode }: any) {
    return (
        <CardHeader className="bg-golden-dark20 py-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                            {isOpen ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </Button>
                    </CollapsibleTrigger>

                    <div>
                        <CardTitle className="text-base font-semibold text-[#073954]">
                            {node.name || "Unnamed Leader"}
                        </CardTitle>
                        <p className="text-xs text-gray-500">
                            {node.title || "No Title"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 bg-golden-dark text-white hover:bg-golden-darkHover hover:text-white"
                        onClick={() => addChild(node.id)}
                    >
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        Add Child
                    </Button>

                    {node.level !== 0 && (
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteNode(node.id)}
                        >
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Delete
                        </Button>
                    )}
                </div>
            </div>
        </CardHeader>
    );
}

/* =====================================================
   BASIC INFO
===================================================== */

function NodeBasicInfo({ node, tree, setTree, updateNode }: any) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
                <Label>Name</Label>
                <Input
                    value={node.name}
                    onChange={(e) =>
                        setTree(updateNode(tree, node.id, { name: e.target.value }))
                    }
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label>Title</Label>
                <Input
                    value={node.title}
                    onChange={(e) =>
                        setTree(updateNode(tree, node.id, { title: e.target.value }))
                    }
                />
            </div>
        </div>
    );
}

/* =====================================================
   IMAGE UPLOAD
===================================================== */

function NodeImageUpload({ node, tree, setTree, updateNode }: any) {
    const handleImageUpload = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setTree(updateNode(tree, node.id, { image: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="md:col-span-1 space-y-2">
            <Label>Profile Image</Label>

            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50 group hover:border-gray-300 transition-colors">

                {/* IMAGE PREVIEW */}
                {node.image ? (
                    <div className="relative w-full aspect-square max-w-[150px] overflow-hidden rounded-md border shadow-sm">
                        <img
                            src={node.image}
                            alt={node.name}
                            className="w-full h-full object-cover"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="h-8 text-xs"
                                onClick={() =>
                                    document
                                        .getElementById(`file-${node.id}`)
                                        ?.click()
                                }
                            >
                                Change
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 py-4">
                        <ImageIcon className="h-10 w-10 text-gray-400" />
                        <p className="text-xs text-gray-500">
                            No image uploaded
                        </p>
                    </div>
                )}

                {/* Hidden File Input */}
                <input
                    id={`file-${node.id}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            handleImageUpload(e.target.files[0]);
                        }
                    }}
                />

                {/* Upload Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 h-8 text-xs gap-1"
                    onClick={() =>
                        document
                            .getElementById(`file-${node.id}`)
                            ?.click()
                    }
                >
                    <Upload className="h-3.5 w-3.5" />
                    Upload Image
                </Button>
            </div>
        </div>
    );
}

/* =====================================================
   DESCRIPTION
===================================================== */

function NodeDescription({ node, tree, setTree, updateNode }: any) {
    return (
        <div className="md:col-span-2 space-y-2">
            <Label>Full Description</Label>
            <Textarea
                value={node.fullDescription}
                onChange={(e) =>
                    setTree(
                        updateNode(tree, node.id, {
                            fullDescription: e.target.value,
                        })
                    )
                }
                className="min-h-[160px]"
            />
        </div>
    );
}

/* =====================================================
   CHILDREN (Recursive Renderer)
===================================================== */

function TreeChildren({
    node,
    tree,
    setTree,
    updateNode,
    addChild,
    deleteNode,
}: any) {
    if (!node.children || node.children.length === 0) return null;

    return (
        <div className="ml-8 mt-4 border-l-2 border-gray-100 pl-6">
            {node.children.map((child: LeaderNode) => (
                <NodeEditor
                    key={child.id}
                    node={child}
                    tree={tree}
                    setTree={setTree}
                    updateNode={updateNode}
                    addChild={addChild}
                    deleteNode={deleteNode}
                />
            ))}
        </div>
    );
}