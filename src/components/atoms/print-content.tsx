import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import html2pdf from "html2pdf.js"

interface Props {
  children: React.ReactNode;
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
      <Button onClick={handlePrint}>Imprimer en PDF</Button>
    </div>
  );
};

export default PrintContent;
