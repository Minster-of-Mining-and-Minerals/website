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
import { Tender, TenderStatus, CreateTenderPayload } from "@/redux/types/tender";

interface TenderFormProps {
  initialData?: Tender;
  onSubmit: (data: CreateTenderPayload) => Promise<void>;
  isLoading?: boolean;
  title: string;
}

export default function TenderForm({
  initialData,
  onSubmit,
  isLoading,
  title,
}: TenderFormProps) {
  const router = useRouter();

  const [formTitle, setFormTitle] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [description, setDescription] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [status, setStatus] = useState<TenderStatus>("draft");
  const [attachmentIds, setAttachmentIds] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormTitle(initialData.title || "");
      setReferenceNumber(initialData.reference_number || "");
      setDescription(initialData.description || "");
      setPublishedDate(initialData.published_date?.split("T")[0] || "");
      setClosingDate(initialData.closing_date?.split("T")[0] || "");
      setStatus(initialData.status || "draft");
      setAttachmentIds(
        initialData.attachment_id ? [initialData.attachment_id] : [],
      );
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!description.trim() || description === "<p><br></p>") {
      toast.error("Description is required");
      return;
    }
    if (!publishedDate) {
      toast.error("Published date is required");
      return;
    }
    if (!closingDate) {
      toast.error("Closing date is required");
      return;
    }
    if (new Date(closingDate) < new Date(publishedDate)) {
      toast.error("Closing date cannot be earlier than published date");
      return;
    }

    await onSubmit({
      title: formTitle.trim(),
      reference_number: referenceNumber.trim() || null,
      description,
      published_date: publishedDate,
      closing_date: closingDate,
      attachment_id: attachmentIds[0] || null,
      status,
    });
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.push("/admin/tenders")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Tenders
      </Button>

      <h1 className="text-2xl font-bold mb-6">{title}</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg border p-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Tender title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reference">Reference Number</Label>
          <Input
            id="reference"
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
            placeholder="Optional reference number"
          />
        </div>

        <RichTextEditorField
          id="description"
          label="Description"
          value={description}
          onChange={setDescription}
          required
          minHeight="250px"
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
            <Label htmlFor="closing_date">Closing Date *</Label>
            <Input
              id="closing_date"
              type="date"
              value={closingDate}
              onChange={(e) => setClosingDate(e.target.value)}
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
            onChange={(e) => setStatus(e.target.value as TenderStatus)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <EditFileUpload
          id="tender-attachment"
          label="Attachment (PDF or document)"
          value={attachmentIds}
          onChange={(ids) => setAttachmentIds(ids.slice(0, 1))}
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          multiple={false}
          showPreview={true}
        />

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/tenders")}
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
                <Save className="h-4 w-4 mr-2" /> Save Tender
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
