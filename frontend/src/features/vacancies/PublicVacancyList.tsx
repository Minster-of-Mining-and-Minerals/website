"use client";

import Link from "next/link";
import { Calendar, Briefcase, ExternalLink } from "lucide-react";
import { TenderVacancyListSkeleton } from "@/components/skeletons";
import PublicEmptyState from "@/components/common/PublicEmptyState";
import { OpportunityStatusBadge } from "@/components/common/OpportunityStatusBadge";
import { useGetVacanciesQuery } from "@/redux/api/vacancyApi";
import { EMPLOYMENT_TYPE_LABELS } from "@/redux/types/vacancy";
import { formatDateOnly } from "@/utils/datetime";
import { useTranslations } from "next-intl";

export default function PublicVacancyList() {
  const { data = [], isLoading, isError } = useGetVacanciesQuery();
  const t = useTranslations("empty_state");

  if (isLoading) {
    return <TenderVacancyListSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-600">
        Failed to load vacancies. Please try again later.
      </div>
    );
  }

  if (data.length === 0) {
    return <PublicEmptyState title={t("vacancies_title")} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((item) => (
        <div
          key={item.vacancy_id}
          className="border border-gray-200 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <h2 className="text-lg font-semibold text-golden-dark flex items-center gap-2">
              <Briefcase size={18} className="shrink-0" />
              <span>{item.job_title}</span>
            </h2>
            <OpportunityStatusBadge displayStatus={item.display_status} />
          </div>

          {item.department && (
            <p className="text-sm text-gray-600 mb-2">
              Department: {item.department}
            </p>
          )}

          <p className="text-sm text-gray-500 mb-1">
            {EMPLOYMENT_TYPE_LABELS[item.employment_type]}
          </p>

          <p className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Calendar size={16} /> Published:{" "}
            {formatDateOnly(item.published_date)}
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Calendar size={16} /> Deadline:{" "}
            {formatDateOnly(item.application_deadline)}
          </p>

          <Link
            href={`/contact/tenders-and-vacancies/vacancies/${item.vacancy_id}`}
            className="inline-flex items-center gap-2 text-golden-dark font-medium hover:underline"
          >
            View Details <ExternalLink size={14} />
          </Link>
        </div>
      ))}
    </div>
  );
}
