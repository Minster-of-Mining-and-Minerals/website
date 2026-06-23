"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  useGetVacancyByIdQuery,
  useUpdateVacancyMutation,
} from "@/redux/api/vacancyApi";
import VacancyForm from "./VacancyForm";

export default function EditVacancy() {
  const params = useParams();
  const router = useRouter();
  const vacancyId = params.vacancyId as string;

  const { data, isLoading, isError } = useGetVacancyByIdQuery({
    id: vacancyId,
    isAdmin: true,
  });
  const [updateVacancy, { isLoading: isSaving }] = useUpdateVacancyMutation();

  const handleSubmit = async (formData: any) => {
    const loadingToast = toast.loading("Updating vacancy...");
    try {
      await updateVacancy({ id: vacancyId, data: formData }).unwrap();
      toast.dismiss(loadingToast);
      toast.success("Vacancy updated successfully!");
      router.push("/admin/vacancies");
    } catch (err: any) {
      toast.dismiss(loadingToast);
      toast.error(err?.data?.message || "Failed to update vacancy");
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading vacancy...</div>;
  }

  if (isError || !data) {
    return (
      <div className="p-8 text-center text-destructive">Vacancy not found.</div>
    );
  }

  return (
    <VacancyForm
      title="Edit Vacancy"
      initialData={data}
      onSubmit={handleSubmit}
      isLoading={isSaving}
    />
  );
}
