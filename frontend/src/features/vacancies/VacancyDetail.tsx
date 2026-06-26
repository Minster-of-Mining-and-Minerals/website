"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Download, MapPin, Users } from "lucide-react";
import { TenderVacancyDetailSkeleton } from "@/components/skeletons";
import { useGetVacancyByIdQuery } from "@/redux/api/vacancyApi";
import { OpportunityStatusBadge } from "@/components/common/OpportunityStatusBadge";
import NewsContentRenderer from "@/features/components/NewsContentRenderer";
import { EMPLOYMENT_TYPE_LABELS } from "@/redux/types/vacancy";
import { formatDateOnly } from "@/utils/datetime";
import { getFileUrl } from "@/utils/fileUrl";
import { Button } from "@/components/ui/button";

export default function VacancyDetail() {
  const params = useParams();
  const vacancyId = params.vacancyId as string;

  const { data: vacancy, isLoading, isError } = useGetVacancyByIdQuery(
    { id: vacancyId },
    { skip: !vacancyId },
  );

  if (isLoading) {
    return <TenderVacancyDetailSkeleton />;
  }

  if (isError || !vacancy) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Vacancy Not Found</h1>
        <p className="text-gray-600 mb-4">
          This vacancy is not available or has been removed.
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

  const attachmentUrl = vacancy.attachment?.file_path
    ? getFileUrl(vacancy.attachment.file_path)
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
        <OpportunityStatusBadge displayStatus={vacancy.display_status} />

        <h1 className="text-2xl md:text-3xl font-bold text-golden-dark">
          {vacancy.job_title}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {vacancy.department && (
            <span>Department: {vacancy.department}</span>
          )}
          {vacancy.location && (
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {vacancy.location}
            </span>
          )}
          <span>{EMPLOYMENT_TYPE_LABELS[vacancy.employment_type]}</span>
          {vacancy.positions != null && (
            <span className="flex items-center gap-1">
              <Users size={14} /> {vacancy.positions} position
              {vacancy.positions !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-gray-600 border-b pb-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-golden-dark" />
            Published: {formatDateOnly(vacancy.published_date)}
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-golden-dark" />
            Deadline: {formatDateOnly(vacancy.application_deadline)}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-golden-dark mb-3">
            Job Description
          </h2>
          <div className="rich-text-content not-prose">
            <NewsContentRenderer content={vacancy.description} />
          </div>
        </div>

        {vacancy.requirements && (
          <div>
            <h2 className="text-lg font-semibold text-golden-dark mb-3">
              Requirements
            </h2>
            <div className="rich-text-content not-prose">
              <NewsContentRenderer content={vacancy.requirements} />
            </div>
          </div>
        )}

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
