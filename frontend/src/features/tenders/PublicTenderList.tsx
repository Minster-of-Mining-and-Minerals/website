"use client";

import Link from "next/link";
import { Calendar, FileText, ExternalLink, Loader2 } from "lucide-react";
import PublicEmptyState from "@/components/common/PublicEmptyState";
import { OpportunityStatusBadge } from "@/components/common/OpportunityStatusBadge";
import { useGetTendersQuery } from "@/redux/api/tenderApi";
import { formatDateOnly } from "@/utils/datetime";
import { useTranslations } from "next-intl";

export default function PublicTenderList() {
  const { data = [], isLoading, isError } = useGetTendersQuery();
  const t = useTranslations("empty_state");

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-golden-dark" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-600">
        Failed to load tenders. Please try again later.
      </div>
    );
  }

  if (data.length === 0) {
    return <PublicEmptyState title={t("tenders_title")} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((item) => (
        <div
          key={item.tender_id}
          className="border border-gray-200 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <h2 className="text-lg font-semibold text-golden-dark flex items-center gap-2">
              <FileText size={18} className="shrink-0" />
              <span>{item.title}</span>
            </h2>
            <OpportunityStatusBadge displayStatus={item.display_status} />
          </div>

          {item.reference_number && (
            <p className="text-sm text-gray-500 mb-2">
              Ref: {item.reference_number}
            </p>
          )}

          <p className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Calendar size={16} /> Published:{" "}
            {formatDateOnly(item.published_date)}
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Calendar size={16} /> Closing: {formatDateOnly(item.closing_date)}
          </p>

          <Link
            href={`/contact/tenders-and-vacancies/tenders/${item.tender_id}`}
            className="inline-flex items-center gap-2 text-golden-dark font-medium hover:underline"
          >
            View Details <ExternalLink size={14} />
          </Link>
        </div>
      ))}
    </div>
  );
}
