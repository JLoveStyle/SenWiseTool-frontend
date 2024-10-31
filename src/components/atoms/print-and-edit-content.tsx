"use client";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import { Route } from "@/lib/route";
import { useParams, usePathname, useRouter } from "next/navigation";
import { PiPrinterFill } from "react-icons/pi";
import { Spinner } from "./spinner/spinner";
import { Rocket } from "lucide-react";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  deployProject: () => void;
  filename: string;
  handleExitPage?: () => void;
  isDeploying: boolean;
}

const PrintContent: React.FC<Props> = (props) => {
  const formRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

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
        orientation: "landscape",
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
        <div
          className={pathname.includes("/mapping") ? "hidden" : "flex gap-4"}
        >
          <Button
            className="bg-[#e7e9ee] font-semibold text-black hover:bg-[#e7e9ee] hover:shadow active:transition-y-1 hover:rounded-full"
            onClick={props.handleExitPage}
          >
            BACK
          </Button>
          <Button className="px-10 hover:rounded-full" onClick={props.onClick}>
            Edit
          </Button>

          {props.isDeploying ? (
            <Button
            className="hover:rounded-full hover:bg-green-400 bg-green-500"
            onClick={props.deployProject}
          >
            <Spinner />
          </Button>
          ) : (
            <Button
            className="hover:rounded-full hover:bg-green-400 bg-green-500"
            onClick={props.deployProject}
          >
            <Rocket /> Deploy
          </Button>
          )}
        </div>
        <Button
          className="flex gap-1 items-center bg-black hover:bg-black hover:rounded-full"
          onClick={handlePrint}
        >
          <PiPrinterFill />
          Print to PDF
        </Button>
      </div>
    </div>
  );
};

export default PrintContent;
