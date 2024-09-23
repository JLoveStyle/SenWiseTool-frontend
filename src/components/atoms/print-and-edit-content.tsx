"use client";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import { Route } from "@/lib/route";
import { useParams, useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  deployProject: () => void;
  filename: string;
  handleExitPage?: () => void
}

const PrintContent: React.FC<Props> = (props) => {
  const formRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const element = formRef.current;
    let options = {
      margin: 0,
      filename: props.filename + ".pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
    };
    if (element) {
      html2pdf().set(options).from(element).save();
    }
  };

  return (
    <div>
      <div ref={formRef}>{props.children}</div>
      <div className="flex justify-center mx-auto gap-4 pb-10 ">
        <Button
          className="bg-[#e7e9ee] font-semibold text-black hover:bg-[#e7e9ee] hover:shadow active:transition-y-1"
          onClick={props.handleExitPage}
        >
          BACK
        </Button>
        <Button className="px-10" onClick={props.onClick}>
          Edit
        </Button>
        <Button className="" onClick={handlePrint}>
          Download
        </Button>
        <Button className="" onClick={props.deployProject}>
          Deploy
        </Button>
      </div>
    </div>
  );
};

export default PrintContent;
