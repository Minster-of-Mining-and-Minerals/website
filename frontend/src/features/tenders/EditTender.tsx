"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  useGetTenderByIdQuery,
  useUpdateTenderMutation,
} from "@/redux/api/tenderApi";
import TenderForm from "./TenderForm";

export default function EditTender() {
  const params = useParams();
  const router = useRouter();
  const tenderId = params.tenderId as string;

  const { data, isLoading, isError } = useGetTenderByIdQuery({
    id: tenderId,
    isAdmin: true,
  });
  const [updateTender, { isLoading: isSaving }] = useUpdateTenderMutation();

  const handleSubmit = async (formData: any) => {
    const loadingToast = toast.loading("Updating tender...");
    try {
      await updateTender({ id: tenderId, data: formData }).unwrap();
      toast.dismiss(loadingToast);
      toast.success("Tender updated successfully!");
      router.push("/admin/tenders");
    } catch (err: any) {
      toast.dismiss(loadingToast);
      toast.error(err?.data?.message || "Failed to update tender");
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading tender...</div>;
  }

  if (isError || !data) {
    return <div className="p-8 text-center text-destructive">Tender not found.</div>;
  }

  return (
    <TenderForm
      title="Edit Tender"
      initialData={data}
      onSubmit={handleSubmit}
      isLoading={isSaving}
    />
  );
}
