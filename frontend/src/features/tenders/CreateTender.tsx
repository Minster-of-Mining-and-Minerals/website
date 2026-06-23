"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateTenderMutation } from "@/redux/api/tenderApi";
import TenderForm from "./TenderForm";

export default function CreateTender() {
  const router = useRouter();
  const [createTender, { isLoading }] = useCreateTenderMutation();

  const handleSubmit = async (data: any) => {
    const loadingToast = toast.loading("Creating tender...");
    try {
      await createTender(data).unwrap();
      toast.dismiss(loadingToast);
      toast.success("Tender created successfully!");
      router.push("/admin/tenders");
    } catch (err: any) {
      toast.dismiss(loadingToast);
      toast.error(err?.data?.message || "Failed to create tender");
    }
  };

  return (
    <TenderForm
      title="Create New Tender"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}
