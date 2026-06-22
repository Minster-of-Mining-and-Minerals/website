"use client";

import { useState } from "react";
import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Eye, Heart } from "lucide-react";
import type { NewsInteractionData } from "@/redux/api/dashboardApi";

interface NewsInteractionsTableProps {
  data: NewsInteractionData[];
}

const columns: ColumnDef<NewsInteractionData>[] = [
  {
    accessorKey: "title",
    header: "Article Title",
    cell: ({ row }) => (
      <div className="font-medium max-w-[400px] truncate" title={row.original.title}>
        {row.original.title}
      </div>
    ),
  },
  {
    accessorKey: "views",
    header: () => (
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4" /> Views
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.original.views.toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "reactions",
    header: () => (
      <div className="flex items-center gap-2">
        <Heart className="h-4 w-4" /> Reactions
      </div>
    ),
    cell: ({ row }) => (
      <Badge variant="secondary" className="font-mono">
        {row.original.reactions.toLocaleString()}
      </Badge>
    ),
  },
  {
    id: "engagement",
    header: "Engagement Rate",
    cell: ({ row }) => {
      const views = row.original.views || 1;
      const reactions = row.original.reactions;
      const rate = ((reactions / views) * 100).toFixed(1);
      return (
        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
          <TrendingUp className="h-3 w-3" />
          {rate}%
        </div>
      );
    },
  },
];

export function NewsInteractionsTable({ data }: NewsInteractionsTableProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const handlePagination = (index: number, size: number) => {
    setPageIndex(index);
    setPageSize(size);
  };

  const paginatedData = data.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  return (
    <TableLayout
      title="News Performance"
      description="Detailed interaction metrics for top news articles"
      filterColumnsPerRow={1}
    >
      <DataTable
        columns={columns}
        data={paginatedData}
        totalPageCount={Math.ceil(data.length / pageSize)}
        handlePagination={handlePagination}
        tablePageSize={pageSize}
        currentIndex={pageIndex}
      />
    </TableLayout>
  );
}
