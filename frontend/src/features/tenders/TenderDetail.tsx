"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Download } from "lucide-react";
import { TenderVacancyDetailSkeleton } from "@/components/skeletons";
import { useGetTenderByIdQuery } from "@/redux/api/tenderApi";
import { OpportunityStatusBadge } from "@/components/common/OpportunityStatusBadge";
import NewsContentRenderer from "@/features/components/NewsContentRenderer";
import { formatDateOnly } from "@/utils/datetime";
import { getFileUrl } from "@/utils/fileUrl";
import { Button } from "@/components/ui/button";

export default function TenderDetail() {
  const params = useParams();
  const tenderId = params.tenderId as string;

  const { data: tender, isLoading, isError } = useGetTenderByIdQuery(
    { id: tenderId },
    { skip: !tenderId },
  );

  if (isLoading) {
    return <TenderVacancyDetailSkeleton />;
  }

  if (isError || !tender) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Tender Not Found</h1>
        <p className="text-gray-600 mb-4">
          This tender is not available or has been removed.
        </p>
        <Link
          href="/contact/tenders-and-vacancies"
          className="text-golden-dark hover:underline"
        >
          Back to Tenders & Vacancies
        </Link>
      </div>
    );
  }

  const attachmentUrl = tender.attachment?.file_path
    ? getFileUrl(tender.attachment.file_path)
    : null;

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/contact/tenders-and-vacancies"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-golden-dark mb-6"
      >
        <ArrowLeft size={14} /> Back to Tenders & Vacancies
      </Link>

      <div className="bg-white rounded-2xl border shadow-sm p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <OpportunityStatusBadge displayStatus={tender.display_status} />
          {tender.reference_number && (
            <span className="text-sm text-gray-500">
              Ref: {tender.reference_number}
            </span>
          )}
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-golden-dark">
          {tender.title}
        </h1>

        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-golden-dark" />
            Published: {formatDateOnly(tender.published_date)}
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-golden-dark" />
            Closing: {formatDateOnly(tender.closing_date)}
          </div>
        </div>

        <div className="rich-text-content not-prose border-t pt-6">
          <NewsContentRenderer content={tender.description} />
        </div>

        {attachmentUrl && (
          <div className="border-t pt-6">
            <Button asChild variant="outline">
              <a href={attachmentUrl} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4 mr-2" />
                Download Attachment
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
