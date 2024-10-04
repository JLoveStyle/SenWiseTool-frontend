"use client"
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { PiPrinterFill } from "react-icons/pi";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  deployProject: () => void;
  fileName: string;
  handleExitPage?: () => void;
};

const Print: React.FC<Props> = (props) => {
  const formRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname()

  const handlePrint = () => {
    const input = formRef.current;
    const pages = []
    html2canvas(input as HTMLDivElement, { scale: 1 }).then((canvas) => {
      const imgData = canvas.toDataURL("imag/png");
      const pdf = new jsPDF("l", "mm", "a4"); // lanscape orientation and A4 format
      const xOffset = 10;
      const yOffset = 10;
      const imgWidth = pdf.internal.pageSize.getWidth() - 10;
      const imgHeight = pdf.internal.pageSize.getHeight() - 10;
      pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);
      console.log({imgHeight, imgWidth})
      pdf.save(`${props.fileName}.pdf`);
    });
  };

  return (
    <div className="">
      <div ref={formRef}>{props.children} </div>

      <div className="flex justify-center mx-auto gap-4 pb-10 ">
        <div className={pathname.includes('/mapping') ? "hidden" : 'flex gap-4'}>
          <Button
            className="bg-[#e7e9ee] font-semibold text-black hover:bg-[#e7e9ee] hover:shadow active:transition-y-1 hover:rounded-full"
            onClick={props.handleExitPage}
          >
            BACK
          </Button>
          <Button className="px-10 hover:rounded-full" onClick={props.onClick}>
            Edit
          </Button>

          <Button className="hover:rounded-full" onClick={props.deployProject}>
            Deploy
          </Button>
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
export default Print;
