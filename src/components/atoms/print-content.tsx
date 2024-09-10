import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
=======
import html2pdf from "html2pdf.js";
import React, { useRef } from "react";

interface Props {
  children: React.ReactNode;
>>>>>>> e317a321f98d45a3a2860b203cf7f54370c4fe06
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
<<<<<<< HEAD
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
=======
      <Button onClick={handlePrint}>Imprimer en PDF</Button>
>>>>>>> e317a321f98d45a3a2860b203cf7f54370c4fe06
    </div>
  );
};

export default PrintContent;
