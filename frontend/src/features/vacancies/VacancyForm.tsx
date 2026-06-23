"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { RichTextEditorField } from "@/components/common/RichTextEditorField";
import { EditFileUpload } from "@/components/common/EditFileUpload";
import {
  Vacancy,
  VacancyStatus,
  EmploymentType,
  CreateVacancyPayload,
  EMPLOYMENT_TYPE_LABELS,
} from "@/redux/types/vacancy";

interface VacancyFormProps {
  initialData?: Vacancy;
  onSubmit: (data: CreateVacancyPayload) => Promise<void>;
  isLoading?: boolean;
  title: string;
}

export default function VacancyForm({
  initialData,
  onSubmit,
  isLoading,
  title,
}: VacancyFormProps) {
  const router = useRouter();

  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] =
    useState<EmploymentType>("full_time");
  const [positions, setPositions] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [status, setStatus] = useState<VacancyStatus>("draft");
  const [attachmentIds, setAttachmentIds] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setJobTitle(initialData.job_title || "");
      setDepartment(initialData.department || "");
      setLocation(initialData.location || "");
      setEmploymentType(initialData.employment_type || "full_time");
      setPositions(
        initialData.positions != null ? String(initialData.positions) : "",
      );
      setDescription(initialData.description || "");
      setRequirements(initialData.requirements || "");
      setPublishedDate(initialData.published_date?.split("T")[0] || "");
      setApplicationDeadline(
        initialData.application_deadline?.split("T")[0] || "",
      );
      setStatus(initialData.status || "draft");
      setAttachmentIds(
        initialData.attachment_id ? [initialData.attachment_id] : [],
      );
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobTitle.trim()) {
      toast.error("Job title is required");
      return;
    }
    if (!description.trim() || description === "<p><br></p>") {
      toast.error("Job description is required");
      return;
    }
    if (!publishedDate) {
      toast.error("Published date is required");
      return;
    }
    if (!applicationDeadline) {
      toast.error("Application deadline is required");
      return;
    }
    if (new Date(applicationDeadline) < new Date(publishedDate)) {
      toast.error("Application deadline cannot be earlier than published date");
      return;
    }

    await onSubmit({
      job_title: jobTitle.trim(),
      department: department.trim() || null,
      location: location.trim() || null,
      employment_type: employmentType,
      positions: positions ? parseInt(positions, 10) : null,
      description,
      requirements: requirements.trim() || null,
      published_date: publishedDate,
      application_deadline: applicationDeadline,
      attachment_id: attachmentIds[0] || null,
      status,
    });
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.push("/admin/vacancies")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Vacancies
      </Button>

      <h1 className="text-2xl font-bold mb-6">{title}</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg border p-6">
        <div className="space-y-2">
          <Label htmlFor="job_title">Job Title *</Label>
          <Input
            id="job_title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Position title"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Optional department"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Optional location"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="employment_type">Employment Type</Label>
            <select
              id="employment_type"
              className="w-full border rounded-md px-3 py-2 text-sm"
              value={employmentType}
              onChange={(e) =>
                setEmploymentType(e.target.value as EmploymentType)
              }
            >
              {Object.entries(EMPLOYMENT_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="positions">Number of Positions</Label>
            <Input
              id="positions"
              type="number"
              min={1}
              value={positions}
              onChange={(e) => setPositions(e.target.value)}
              placeholder="Optional"
            />
          </div>
        </div>

        <RichTextEditorField
          id="description"
          label="Job Description"
          value={description}
          onChange={setDescription}
          required
          minHeight="250px"
        />

        <RichTextEditorField
          id="requirements"
          label="Requirements"
          value={requirements}
          onChange={setRequirements}
          minHeight="180px"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="published_date">Published Date *</Label>
            <Input
              id="published_date"
              type="date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="application_deadline">Application Deadline *</Label>
            <Input
              id="application_deadline"
              type="date"
              value={applicationDeadline}
              onChange={(e) => setApplicationDeadline(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value as VacancyStatus)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <EditFileUpload
          id="vacancy-attachment"
          label="Attachment (PDF only)"
          value={attachmentIds}
          onChange={(ids) => setAttachmentIds(ids.slice(0, 1))}
          accept=".pdf,application/pdf"
          multiple={false}
          showPreview={true}
        />

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/vacancies")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" /> Save Vacancy
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
