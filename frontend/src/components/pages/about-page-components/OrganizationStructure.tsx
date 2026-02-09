// src/data/sampleSectorNodes.ts
"use client";

import HierarchyD3Tree from "@/utils/hierarchyD3";

export const sampleSectorNodes = [
    { sector_node_id: "1", parent_id: null, name: "Minister of Mines" },

    /* ───────────── Top Leadership ───────────── */
    { sector_node_id: "2", parent_id: "1", name: "State Minister" },
    { sector_node_id: "3", parent_id: "1", name: "Chief of Staff" },
    { sector_node_id: "4", parent_id: "1", name: "Internal Audit" },
    { sector_node_id: "5", parent_id: "1", name: "Legal Affairs Directorate" },

    /* ───────────── Under State Minister ───────────── */
    { sector_node_id: "6", parent_id: "2", name: "Mining Regulation Directorate" },
    { sector_node_id: "7", parent_id: "2", name: "Investment Promotion Directorate" },
    { sector_node_id: "8", parent_id: "2", name: "Geological Survey Directorate" },
    { sector_node_id: "9", parent_id: "2", name: "Mineral Development Directorate" },

    /* ───────────── Mining Regulation Directorate ───────────── */
    { sector_node_id: "10", parent_id: "6", name: "Licensing Department" },
    { sector_node_id: "11", parent_id: "6", name: "Compliance & Inspection Department" },
    { sector_node_id: "12", parent_id: "6", name: "Environmental & Social Safeguards Unit" },

    /* ───────────── Investment Promotion Directorate ───────────── */
    { sector_node_id: "13", parent_id: "7", name: "Domestic Investment Desk" },
    { sector_node_id: "14", parent_id: "7", name: "Foreign Investment Desk" },
    { sector_node_id: "15", parent_id: "7", name: "Investor Aftercare Services" },

    /* ───────────── Geological Survey Directorate ───────────── */
    { sector_node_id: "16", parent_id: "8", name: "Geological Mapping Department" },
    { sector_node_id: "17", parent_id: "8", name: "Mineral Exploration Department" },
    { sector_node_id: "18", parent_id: "8", name: "Geodata & Research Unit" },

    /* ───────────── Mineral Development Directorate ───────────── */
    { sector_node_id: "19", parent_id: "9", name: "Artisanal & Small-Scale Mining Department" },
    { sector_node_id: "20", parent_id: "9", name: "Large-Scale Mining Projects Unit" },
    { sector_node_id: "21", parent_id: "9", name: "Mine Closure & Rehabilitation Unit" },

    /* ───────────── Chief of Staff Branch ───────────── */
    { sector_node_id: "22", parent_id: "3", name: "Human Resource Directorate" },
    { sector_node_id: "23", parent_id: "3", name: "Finance & Procurement Directorate" },
    { sector_node_id: "24", parent_id: "3", name: "ICT & Digital Transformation Directorate" },
    { sector_node_id: "25", parent_id: "3", name: "Planning, Monitoring & Evaluation" },

    /* ───────────── HR Directorate ───────────── */
    { sector_node_id: "26", parent_id: "22", name: "Recruitment & Placement Unit" },
    { sector_node_id: "27", parent_id: "22", name: "Training & Capacity Building Unit" },

    /* ───────────── Finance & Procurement ───────────── */
    { sector_node_id: "28", parent_id: "23", name: "Budget & Accounts Department" },
    { sector_node_id: "29", parent_id: "23", name: "Procurement & Asset Management" },
];



export default function SectorHierarchyPage() {
    return (
        <HierarchyD3Tree
            data={sampleSectorNodes}
            isLoading={false}
        />
    );
}
