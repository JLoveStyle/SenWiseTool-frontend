import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";
import React, { useRef } from "react";
import { PiPrinterFill } from "react-icons/pi";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const PrintContent: React.FC<Props> = (props) => {
  const formRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const element = formRef.current;

    if (element) {
      html2pdf().from(element).save();
    }
  };

  return (
    <div className={props.className}>
      <div ref={formRef}>{props.children}</div>
      <div className="pt-24 pb-10 flex items-center justify-center">
        <Button
          size="sm"
          className="flex gap-1 items-center bg-black hover:bg-black hover:rounded-full"
          onClick={handlePrint}
        >
          <PiPrinterFill /> Imprimer en PDF
        </Button>
      </div>
    </div>
  );
};

export default PrintContent;
