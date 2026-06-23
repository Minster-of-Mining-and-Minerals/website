"use client";

import { useState, useMemo } from "react";
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
  useGetVacanciesQuery,
  useDeleteVacancyMutation,
  usePublishVacancyMutation,
  useUnpublishVacancyMutation,
  useCloseVacancyMutation,
} from "@/redux/api/vacancyApi";
import { Vacancy, EMPLOYMENT_TYPE_LABELS } from "@/redux/types/vacancy";
import { formatDateOnly } from "@/utils/datetime";

export default function VacancyList() {
  const router = useRouter();
  const { data = [], isLoading, isError } = useGetVacanciesQuery({ isAdmin: true });
  const [deleteVacancy] = useDeleteVacancyMutation();
  const [publishVacancy] = usePublishVacancyMutation();
  const [unpublishVacancy] = useUnpublishVacancyMutation();
  const [closeVacancy] = useCloseVacancyMutation();

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
      placeholder: "Search job title or department",
      value: search,
      onChange: setSearch,
    },
  ];

  const filteredData = useMemo(() => {
    return data.filter((item: Vacancy) => {
      const matchesStatus = !statusFilter || item.status === statusFilter;
      const matchesSearch =
        !search ||
        item.job_title?.toLowerCase().includes(search.toLowerCase()) ||
        item.department?.toLowerCase().includes(search.toLowerCase());
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

  const columns: ColumnDef<Vacancy>[] = [
    {
      accessorKey: "job_title",
      header: "Job Title",
      cell: ({ row }) => (
        <div className="font-medium truncate max-w-[220px]">
          {row.original.job_title}
        </div>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => row.original.department || "—",
    },
    {
      accessorKey: "employment_type",
      header: "Type",
      cell: ({ row }) =>
        EMPLOYMENT_TYPE_LABELS[row.original.employment_type] ||
        row.original.employment_type,
    },
    {
      accessorKey: "published_date",
      header: "Published",
      cell: ({ row }) => formatDateOnly(row.original.published_date),
    },
    {
      accessorKey: "application_deadline",
      header: "Deadline",
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {formatDateOnly(row.original.application_deadline)}
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
        const id = row.original.vacancy_id;
        const status = row.original.status;

        return (
          <div className="flex items-center gap-1 flex-wrap">
            <ComponentGuard anyPermissions={["VACANCIES:UPDATE"]}>
              <Button
                variant="ghost"
                size="icon"
                title="View / Edit"
                onClick={() => router.push(`/admin/vacancies/${id}`)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </ComponentGuard>

            <ComponentGuard anyPermissions={["VACANCIES:PUBLISH"]}>
              {status === "draft" && (
                <Button
                  variant="ghost"
                  size="icon"
                  title="Publish"
                  onClick={() =>
                    handleAction(
                      () => publishVacancy(id).unwrap(),
                      "Vacancy published",
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
                      () => unpublishVacancy(id).unwrap(),
                      "Vacancy unpublished",
                    )
                  }
                >
                  <FileX className="h-4 w-4" />
                </Button>
              )}
            </ComponentGuard>

            <ComponentGuard anyPermissions={["VACANCIES:UPDATE"]}>
              {status !== "closed" && (
                <Button
                  variant="ghost"
                  size="icon"
                  title="Close"
                  onClick={() =>
                    handleAction(
                      () => closeVacancy(id).unwrap(),
                      "Vacancy closed",
                    )
                  }
                >
                  <Ban className="h-4 w-4 text-amber-600" />
                </Button>
              )}
            </ComponentGuard>

            <ComponentGuard anyPermissions={["VACANCIES:DELETE"]}>
              <Button
                variant="ghost"
                size="icon"
                title="Delete"
                onClick={() => {
                  if (
                    confirm("Are you sure you want to delete this vacancy?")
                  ) {
                    handleAction(
                      () => deleteVacancy(id).unwrap(),
                      "Vacancy deleted",
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
      label: "Create Vacancy",
      icon: <Plus className="h-4 w-4" />,
      variant: "default",
      onClick: () => router.push("/admin/vacancies/create"),
      permissions: ["VACANCIES:CREATE"],
    },
  ];

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading vacancies...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-destructive">
        Failed to load vacancies.
      </div>
    );
  }

  return (
    <TableLayout
      title="Vacancy Management"
      description="Create, publish, and manage job vacancies"
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
