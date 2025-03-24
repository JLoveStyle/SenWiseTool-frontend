"use client";
import React, { useState } from "react";
import ProjectSummary from "../molecules/projectSummary";
import { MoveLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ProjectType } from "@/types/api-types";
import MappingProjectSummary from "../molecules/mappingProjectSummary";
import InspectionData from "../molecules/collectedData/inspectionData";
import MappingData from "../molecules/collectedData/mappingData";
import MappingForm from "./mapping/mappingForm";
import ProjectForm from "./projectForm";

type Props = {
  projectDetails: ProjectType;
  isDataLoading?: boolean;
};

export default function ProjectDetails({
  projectDetails,
  isDataLoading,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [summaryActive, setSummaryActive] = useState<boolean>(true);
  const [formActive, setFormActive] = useState<boolean>(false);
  const [dataActive, setDataActive] = useState<boolean>(false);

  const showDataFuntionFromChild = (val: boolean) => {
    setDataActive(val);
    setFormActive(false);
    setSummaryActive(false);
  };

  const showFormFromChild = (val: boolean) => {
    setFormActive(val);
    setSummaryActive(false);
    setDataActive(false);
  };

  return (
    <div className="">
      <div className="border-b">
        <div
          onClick={() => router.back()}
          className="active:translate-y-1 flex gap-2 items-baseline underline hover:cursor-pointer absolute font-semibold pl-6"
        >
          <MoveLeft size={15} />
          <span className="">Retour</span>
        </div>
        {/* NAVIGATION FOR A SINGLE PROJECT */}
        <div className="flex justify-between md:w-[400px] mx-auto ">
          <div className="flex flex-col gap-2">
            <h1
              className={
                summaryActive
                  ? "uppercase hover:cursor-pointer font-bold"
                  : "uppercase text-gray-500 hover:cursor-pointer "
              }
              onClick={() => {
                setFormActive(false);
                setSummaryActive((prev) => !prev);
                setDataActive(false);
              
              }}
            >
              Sommaire
            </h1>
            {summaryActive ? (
              <div className="w-full h-1 bg-tertiary"></div>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h1
              className={
                formActive
                  ? "uppercase hover:cursor-pointer font-bold"
                  : "uppercase text-gray-500 hover:cursor-pointer "
              }
              onClick={() => {
                setFormActive((prev) => !prev);
                setSummaryActive(false);
                setDataActive(false);
              }}
            >
              Formulaire
            </h1>
            {formActive ? <div className="w-full h-1 bg-tertiary"></div> : ""}
          </div>
          <div className="flex flex-col gap-2">
            <h1
              className={
                dataActive
                  ? "uppercase hover:cursor-pointer font-bold"
                  : "uppercase text-gray-500 hover:cursor-pointer "
              }
              onClick={() => {
                setFormActive(false);
                setSummaryActive(false);
                setDataActive((prev) => !prev);
              }}
            >
              Données
            </h1>
            {dataActive ? <div className="w-full h-1 bg-tertiary"></div> : ""}
          </div>
        </div>
      </div>
      <div className="max-h-[cal(100vh - 400px)] overflow-y-auto scrool-bar-hidden ">
        {summaryActive && pathname.includes("/mapping/") ? (
          <MappingProjectSummary
            showForm={showFormFromChild}
            showData={showDataFuntionFromChild}
            projectObject={projectDetails ? projectDetails : undefined}
          />
        ) : summaryActive ? (
          <ProjectSummary
            isDataLoading={isDataLoading}
            showForm={showFormFromChild}
            showData={showDataFuntionFromChild}
            projectObject={projectDetails ? projectDetails : undefined}
          />
        ) : (
          ""
        )}
        {dataActive && pathname.includes("/mapping/") ? (
          <MappingData project_id={projectDetails?.id as string} />
        ) : dataActive ? (
          <InspectionData
            projectName={projectDetails?.title}
            project_id={projectDetails?.id as string}
          />
        ) : (
          ""
        )}
        {formActive && pathname.includes("/mapping/") ? (
          <MappingForm />
        ) : 
        formActive ? (
          <ProjectForm
            projectObject={projectDetails as ProjectType}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
