"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import Tree, { RawNodeDatum } from "react-d3-tree";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectItem,
    SelectContent,
    SelectValue,
} from "@/components/ui/select";
import { buildSectorTree } from "@/utils/buildSectorTree";
import { SectorNode } from "@/redux/types/sectorNode";
import { D3TreeNode, HierarchyD3TreeProps } from "@/types/d3treeNode";
import { Maximize2, Minimize2 } from "lucide-react";
import { shortenText } from "@/utils/shortenText";

/* Convert SectorNode → react-d3-tree format */
function convertToD3Tree(node: SectorNode): D3TreeNode {
    return {
        name: node.name || "Unnamed",
        attributes: {
            sector_node_id: node.sector_node_id,
            description: node.description || "",
            parent_id: node.parent_id ?? null,
            level: node.level,
            is_active: node.is_active,
        },
        children: node.children?.length
            ? node.children.map(convertToD3Tree)
            : undefined,
    };
}

/* Read-only Custom Node */
const CustomNode = ({
    nodeDatum,
    toggleNode,
}: {
    nodeDatum: D3TreeNode & { __rd3t?: { collapsed?: boolean } };
    toggleNode: () => void;
}) => {
    const hasChildren = !!nodeDatum.children?.length;
    const isCollapsed = nodeDatum.__rd3t?.collapsed ?? false;
    const isActive = nodeDatum.attributes.is_active;

    return (
        <g>
            {hasChildren && (
                <g transform="translate(-160, -70)">
                    <foreignObject x={-10} y={-10} width={20} height={20}>
                        <button
                            onClick={toggleNode}
                            className="w-5 h-5 rounded-full bg-golden-dark text-white text-sm font-bold flex items-center justify-center cursor-pointer"
                        >
                            {isCollapsed ? "+" : "−"}
                        </button>
                    </foreignObject>
                </g>
            )}

            <foreignObject x={-150} y={-90} width={300} height={140}>
                <div className="w-full h-full bg-white rounded-2xl border border-gray-200 shadow-md p-5 flex flex-col justify-between">
                    <div className="flex justify-center items-center">
                        <h3 className="text-golden-dark text-center font-semibold text-lg line-clamp-2">
                            {nodeDatum.name}
                        </h3>

                    </div>
                    {nodeDatum.attributes.description && (
                        <p className="text-sm text-gray-600 text-center mt-2 line-clamp-2">
                            {shortenText(nodeDatum.attributes.description, 40)}
                        </p>
                    )}
                </div>
            </foreignObject>
        </g>
    );
};

/* Hierarchy Tree with proper full-screen toggle */
const HierarchyD3Tree: React.FC<HierarchyD3TreeProps> = ({
    data,
    isLoading = false,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [selectedRootId, setSelectedRootId] = useState("");
    const [isFullScreen, setIsFullScreen] = useState(false);

    const rootNodes = useMemo(() => buildSectorTree(data), [data]);
    const d3TreeData = useMemo(
        () => rootNodes.map(convertToD3Tree),
        [rootNodes]
    );
    const rootOptions = rootNodes.map((n) => ({
        value: n.sector_node_id,
        label: n.name,
    }));

    useEffect(() => {
        if (rootOptions.length && !selectedRootId) {
            setSelectedRootId(rootOptions[0].value);
        }
    }, [rootOptions, selectedRootId]);

    const selectedTree = useMemo(() => {
        const node = d3TreeData.find(
            (n) => n.attributes.sector_node_id === selectedRootId
        );
        return node ? [node] : null;
    }, [d3TreeData, selectedRootId]);

    useEffect(() => {
        const update = () => {
            if (!containerRef.current) return;
            const { width, height } =
                containerRef.current.getBoundingClientRect();
            setDimensions({ width, height });
            setTranslate({ x: width / 2, y: 80 });
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [selectedTree, isFullScreen]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                Loading hierarchy…
            </div>
        );
    }

    if (!selectedTree) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                No hierarchy data
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={`${isFullScreen
                ? "fixed top-0 left-0 z-[9999] w-screen h-screen rounded-none"
                : "relative w-full rounded-lg"
                } bg-[#F9FBFC] border border-gray-200 overflow-hidden transition-all duration-300`}
        >
            {/* Full-screen toggle */}
            <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="absolute top-4 right-4 z-50 p-2 rounded-md bg-white border shadow hover:bg-gray-100"
            >
                {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>

            {/* Root Selector */}
            {rootOptions.length > 1 && (
                <div className="w-[350px] p-4 z-40 relative">
                    <Label className="text-sm font-medium">Select Root Node</Label>
                    <Select value={selectedRootId} onValueChange={setSelectedRootId}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select root" />
                        </SelectTrigger>
                        <SelectContent>
                            {rootOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            <style>{`.rd3t-link { stroke: #94A3B8; stroke-width: 2.5px; }`}</style>

            <div
                className="w-full h-full"
                style={{ height: dimensions.height || 600 }}
            >
                <Tree
                    data={selectedTree as unknown as RawNodeDatum[]}
                    translate={translate}
                    orientation="vertical"
                    pathFunc="step"
                    nodeSize={{ x: 220, y: 250 }}
                    separation={{ siblings: 1.5, nonSiblings: 1.5 }}
                    zoom={0.8}
                    scaleExtent={{ min: 0.1, max: 1 }}
                    enableLegacyTransitions={true}
                    renderCustomNodeElement={(props) => (
                        <CustomNode
                            nodeDatum={props.nodeDatum as any}
                            toggleNode={props.toggleNode}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default HierarchyD3Tree;
