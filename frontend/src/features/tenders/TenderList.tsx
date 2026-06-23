"use client";

import { useState, useEffect, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Plus, Trash, Calendar, Send, Ban, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import type { FilterField, ActionButton } from "@/types/tableLayout";
import { ComponentGuard } from "@/components/auth/ComponentGuard";
import { OpportunityStatusBadge } from "@/components/common/OpportunityStatusBadge";

import {
  useGetTendersQuery,
  useDeleteTenderMutation,
  usePublishTenderMutation,
  useUnpublishTenderMutation,
  useCloseTenderMutation,
} from "@/redux/api/tenderApi";
import { Tender } from "@/redux/types/tender";
import { formatDateOnly } from "@/utils/datetime";

export default function TenderList() {
  const router = useRouter();
  const { data = [], isLoading, isError } = useGetTendersQuery({ isAdmin: true });
  const [deleteTender] = useDeleteTenderMutation();
  const [publishTender] = usePublishTenderMutation();
  const [unpublishTender] = useUnpublishTenderMutation();
  const [closeTender] = useCloseTenderMutation();

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  const handlePagination = (index: number, size: number) => {
    setPageIndex(index);
    setPageSize(size);
  };

  const filters: FilterField[] = [
    {
      key: "status",
      label: "Status",
      type: "select",
      placeholder: "All statuses",
      value: statusFilter,
      onChange: setStatusFilter,
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Closed", value: "closed" },
      ],
    },
    {
      key: "search",
      label: "Search",
      type: "text",
      placeholder: "Search title or reference",
      value: search,
      onChange: setSearch,
    },
  ];

  const filteredData = useMemo(() => {
    return data.filter((item: Tender) => {
      const matchesStatus = !statusFilter || item.status === statusFilter;
      const matchesSearch =
        !search ||
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.reference_number?.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [data, statusFilter, search]);

  const paginatedData = filteredData.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize,
  );

  const handleAction = async (
    action: () => Promise<unknown>,
    successMsg: string,
  ) => {
    try {
      await action();
      toast.success(successMsg);
    } catch (err: any) {
      toast.error(err?.data?.message || "Action failed");
    }
  };

  const columns: ColumnDef<Tender>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="font-medium truncate max-w-[220px]">
          {row.original.title}
        </div>
      ),
    },
    {
      accessorKey: "reference_number",
      header: "Reference",
      cell: ({ row }) => row.original.reference_number || "—",
    },
    {
      accessorKey: "published_date",
      header: "Published",
      cell: ({ row }) => formatDateOnly(row.original.published_date),
    },
    {
      accessorKey: "closing_date",
      header: "Closing",
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {formatDateOnly(row.original.closing_date)}
        </div>
      ),
    },
    {
      id: "display_status",
      header: "Status",
      cell: ({ row }) => (
        <OpportunityStatusBadge
          displayStatus={row.original.display_status}
          dbStatus={row.original.status}
        />
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const id = row.original.tender_id;
        const status = row.original.status;

        return (
          <div className="flex items-center gap-1 flex-wrap">
            <ComponentGuard anyPermissions={["TENDERS:UPDATE"]}>
              <Button
                variant="ghost"
                size="icon"
                title="View / Edit"
                onClick={() => router.push(`/admin/tenders/${id}`)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </ComponentGuard>

            <ComponentGuard anyPermissions={["TENDERS:PUBLISH"]}>
              {status === "draft" && (
                <Button
                  variant="ghost"
                  size="icon"
                  title="Publish"
                  onClick={() =>
                    handleAction(
                      () => publishTender(id).unwrap(),
                      "Tender published",
                    )
                  }
                >
                  <Send className="h-4 w-4 text-green-600" />
                </Button>
              )}
              {status === "published" && (
                <Button
                  variant="ghost"
                  size="icon"
                  title="Unpublish"
                  onClick={() =>
                    handleAction(
                      () => unpublishTender(id).unwrap(),
                      "Tender unpublished",
                    )
                  }
                >
                  <FileX className="h-4 w-4" />
                </Button>
              )}
            </ComponentGuard>

            <ComponentGuard anyPermissions={["TENDERS:UPDATE"]}>
              {status !== "closed" && (
                <Button
                  variant="ghost"
                  size="icon"
                  title="Close"
                  onClick={() =>
                    handleAction(
                      () => closeTender(id).unwrap(),
                      "Tender closed",
                    )
                  }
                >
                  <Ban className="h-4 w-4 text-amber-600" />
                </Button>
              )}
            </ComponentGuard>

            <ComponentGuard anyPermissions={["TENDERS:DELETE"]}>
              <Button
                variant="ghost"
                size="icon"
                title="Delete"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this tender?")) {
                    handleAction(
                      () => deleteTender(id).unwrap(),
                      "Tender deleted",
                    );
                  }
                }}
              >
                <Trash className="h-4 w-4 text-destructive" />
              </Button>
            </ComponentGuard>
          </div>
        );
      },
    },
  ];

  const actions: ActionButton[] = [
    {
      label: "Create Tender",
      icon: <Plus className="h-4 w-4" />,
      variant: "default",
      onClick: () => router.push("/admin/tenders/create"),
      permissions: ["TENDERS:CREATE"],
    },
  ];

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading tenders...</div>;
  }

  if (isError) {
    return <div className="p-8 text-center text-destructive">Failed to load tenders.</div>;
  }

  return (
    <TableLayout
      title="Tender Management"
      description="Create, publish, and manage ministry tenders"
      actions={actions}
      filters={filters}
      filterColumnsPerRow={2}
    >
      <DataTable
        columns={columns}
        data={paginatedData}
        totalPageCount={Math.ceil(filteredData.length / pageSize) || 1}
        handlePagination={handlePagination}
        tablePageSize={pageSize}
        currentIndex={pageIndex}
      />
    </TableLayout>
  );
}
