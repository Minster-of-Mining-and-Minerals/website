"use client";

import { useState } from "react";
import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Power, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ComponentGuard } from "@/components/auth/ComponentGuard";

import {
  useGetRoutesQuery,
  useUpdateRouteLabelsMutation,
  useToggleRouteStatusMutation,
} from "@/redux/api/routeApi";
import type { Route, UpdateRouteLabelsPayload } from "@/redux/types/route";

export default function RouteList() {
  const { data: routes = [], isLoading } = useGetRoutesQuery();
  const [updateRouteLabels, { isLoading: isUpdatingLabels }] = useUpdateRouteLabelsMutation();
  const [toggleRouteStatus] = useToggleRouteStatusMutation();

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Filtering
  const [statusFilter, setStatusFilter] = useState("");

  // Modal State
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [enLabel, setEnLabel] = useState("");
  const [amLabel, setAmLabel] = useState("");

  const handlePagination = (index: number, size: number) => {
    setPageIndex(index);
    setPageSize(size);
  };

  const handleEditLabels = (route: Route) => {
    setEditingRoute(route);
    const en = route.translations?.find((t) => t.language_code === "en")?.label || "";
    const am = route.translations?.find((t) => t.language_code === "am")?.label || "";
    setEnLabel(en);
    setAmLabel(am);
  };

  const submitLabels = async () => {
    if (!editingRoute) return;
    try {
      const payload: UpdateRouteLabelsPayload = {
        translations: [
          { language_code: "en", label: enLabel },
          { language_code: "am", label: amLabel },
        ].filter(t => t.label.trim() !== ""),
      };

      if (payload.translations.length === 0) {
        toast.error("Please provide at least one label translation.");
        return;
      }

      await updateRouteLabels({ id: editingRoute.route_id, data: payload }).unwrap();
      toast.success("Labels updated successfully!");
      setEditingRoute(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update labels.");
    }
  };

  const handleToggleStatus = async (route: Route) => {
    try {
      await toggleRouteStatus({
        id: route.route_id,
        data: { is_active: !route.is_active },
      }).unwrap();
      toast.success(`Route ${!route.is_active ? "activated" : "deactivated"} successfully!`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to toggle route status.");
    }
  };

  const columns: ColumnDef<Route>[] = [
    {
      accessorKey: "path",
      header: "Route Path",
      cell: ({ row }) => (
        <span className="font-mono text-sm text-gray-600">{row.getValue("path") || "/"}</span>
      ),
    },
    {
      id: "label",
      header: "Label (EN)",
      cell: ({ row }) => {
        const enLabel = row.original.translations?.find((t) => t.language_code === "en")?.label;
        return <span className="font-medium text-golden-dark">{enLabel || "N/A"}</span>;
      },
    },
    {
      id: "label",
      header: "Label (AM)",
      cell: ({ row }) => {
        const amLabel = row.original.translations?.find((t) => t.language_code === "am")?.label;
        return <span className="font-medium text-golden-dark">{amLabel || "N/A"}</span>;
      },
    },
    {
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.getValue("is_active") as boolean;
        return (
          <Badge variant={isActive ? "default" : "secondary"} className={isActive ? "bg-green-600" : ""}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const route = row.original;
        return (
          <ComponentGuard anyPermissions={["ROUTES:UPDATE"]}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleEditLabels(route)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Labels
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleToggleStatus(route)}>
                  <Power className="mr-2 h-4 w-4" />
                  {route.is_active ? "Deactivate" : "Activate"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ComponentGuard>
        );
      },
    },
  ];

  const filters = [
    {
      key: "status",
      label: "Status",
      type: "multiselect" as const,
      placeholder: "Select status",
      value: statusFilter,
      onChange: setStatusFilter,
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ];

  const actions = [
    {
      label: "Export",
      icon: <Download className="h-4 w-4" />,
      variant: "outline" as const,
      onClick: () => console.log("Export clicked"),
    },
  ];

  const filteredData = routes.filter((route) => {
    if (statusFilter === "active") return route.is_active === true;
    if (statusFilter === "inactive") return route.is_active === false;
    return true;
  });

  const paginatedData = filteredData.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  return (
    <>
      <TableLayout
        title="Route Management"
        description="Manage system routes, labels, and visibility"
        actions={actions}
        filters={filters}
        filterColumnsPerRow={2}
      >
        <DataTable
          columns={columns}
          data={paginatedData}
          totalPageCount={Math.ceil(filteredData.length / pageSize)}
          handlePagination={handlePagination}
          tablePageSize={pageSize}
          currentIndex={pageIndex}
        />
      </TableLayout>

      <Dialog open={!!editingRoute} onOpenChange={(open) => !open && setEditingRoute(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Route Labels</DialogTitle>
            <DialogDescription>
              Update the multi-language labels for the route: <span className="font-mono">{editingRoute?.path}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="en" className="text-right">
                English (en)
              </Label>
              <Input
                id="en"
                value={enLabel}
                onChange={(e) => setEnLabel(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="am" className="text-right">
                Amharic (am)
              </Label>
              <Input
                id="am"
                value={amLabel}
                onChange={(e) => setAmLabel(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingRoute(null)}>
              Cancel
            </Button>
            <Button onClick={submitLabels} disabled={isUpdatingLabels}>
              {isUpdatingLabels ? "Saving..." : "Save Labels"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
