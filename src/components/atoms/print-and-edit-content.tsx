import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
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
    <div>
      <div ref={formRef}>{props.children}</div>
      <div className="flex justify-center mx-auto gap-4 pb-10">
        <Button className="px-10" onClick={props.onClick}>
          Edit
        </Button>
        <Button
          className=""
          onClick={handlePrint}
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default PrintContent;
