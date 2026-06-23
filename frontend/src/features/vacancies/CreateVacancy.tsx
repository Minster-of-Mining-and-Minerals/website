"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateVacancyMutation } from "@/redux/api/vacancyApi";
import VacancyForm from "./VacancyForm";

export default function CreateVacancy() {
  const router = useRouter();
  const [createVacancy, { isLoading }] = useCreateVacancyMutation();

  const handleSubmit = async (data: any) => {
    const loadingToast = toast.loading("Creating vacancy...");
    try {
      await createVacancy(data).unwrap();
      toast.dismiss(loadingToast);
      toast.success("Vacancy created successfully!");
      router.push("/admin/vacancies");
    } catch (err: any) {
      toast.dismiss(loadingToast);
      toast.error(err?.data?.message || "Failed to create vacancy");
    }
  };

  return (
    <VacancyForm
      title="Create New Vacancy"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}
