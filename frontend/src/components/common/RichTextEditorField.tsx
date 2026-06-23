"use client";

import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";
import "quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

interface RichTextEditorFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  minHeight?: string;
}

export function RichTextEditorField({
  id,
  label,
  value,
  onChange,
  required,
  minHeight = "200px",
}: RichTextEditorFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className="quill-container custom-quill border rounded-md overflow-hidden">
        <ReactQuill
          id={id}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          style={{ minHeight }}
        />
      </div>
    </div>
  );
}
