"use client";

import { AttachedFiles } from "@/components/atoms/attached-files";
import { Button } from "@/components/ui/button";
import { AttachedFilesProps } from "@/types/formData";
import Image from "next/image";

export default function RiskAssessmentTools() {
  const trigger = <Button>Ajouter</Button>;

  const onSubmit = (formData: AttachedFilesProps) => {
    console.log("formData :::::::: ");
  };

  return (
    <div>
      <div className="flex justify-between py-3">
        <span className="text-xl font-semibold">
          Outils d'évaluation de risque
        </span>

        <AttachedFiles trigger={trigger} onSubmit={onSubmit} />
      </div>
      <div>
        <div className="flex items-center justify-center mt-28">
          <Image
            src="/svg/empty.svg"
            height={250}
            width={350}
            alt="Empty illustation"
            className="animate-empty-image"
          />
        </div>
      </div>
    </div>
  );
}
