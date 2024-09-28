import { ProjectsType } from "@/types/api-types";
import React, { useEffect, useState } from "react";

type Props = {
  projectType: ProjectsType;
};

export default function InspectionData({ projectType }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // fetch all projects with answers by type. this will come from project_audit table
  async function fetchAllInpectionData(type: ProjectsType) {
    setIsLoading(prev => !prev)
  }

  useEffect(() => {
    fetchAllInpectionData(projectType);
  }, []);

  return (
    <div className="bg-[#f3f4f6] p-6 md:w-full flex justify-between gap-10 h-screen">
      <p>Inspection data</p>
    </div>
  );
}
