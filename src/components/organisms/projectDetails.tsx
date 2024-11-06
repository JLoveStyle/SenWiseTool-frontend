"use client";
import React, { useEffect, useState } from "react";
import ProjectSummary from "../molecules/projectSummary";
import { Project } from "@/types/gestion";
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
  const [settingsActive, setSettingsActive] = useState<boolean>(false);

  let id: string | undefined | null = "";

  const showDataFuntionFromChild = (val: boolean) => {
    setDataActive(val);
    // setSettingsActive(false)
    setFormActive(false);
    setSummaryActive(false);
  };

  const showFormFromChild = (val: boolean) => {
    setFormActive(val);
    setSummaryActive(false);
    setDataActive(false);
    // setSettingsActive(false)
  };

  return (
    <div className="">
      <div className="border-b">
        <div
          onClick={() => router.back()}
          className="active:translate-y-1 flex gap-2 items-baseline underline hover:cursor-pointer absolute font-semibold pl-6"
        >
          <MoveLeft size={15} />
          <span className="">Back</span>
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
                setSettingsActive(false);
              }}
            >
              Summary
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
                setSettingsActive(false);
              }}
            >
              Form
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
                setSettingsActive(false);
              }}
            >
              Data
            </h1>
            {dataActive ? <div className="w-full h-1 bg-tertiary"></div> : ""}
          </div>
          <div className="flex flex-col gap-2">
            <h1
              className={
                settingsActive
                  ? "uppercase hover:cursor-pointer font-bold"
                  : "uppercase text-gray-500 hover:cursor-pointer "
              }
              onClick={() => {
                setFormActive(false);
                setSummaryActive(false);
                setDataActive(false);
                setSettingsActive((prev) => !prev);
              }}
            >
              Settings
            </h1>
            {settingsActive ? (
              <div className="w-full h-1 bg-tertiary"></div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className=" max-h-[600px] overflow-y-auto scrool-bar-hidden relative">
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
        ) : // <p>sdivosidvsd</p>
        formActive ? (
          <ProjectForm
            projectObject={projectDetails ? projectDetails : undefined}
          />
        ) : (
          ""
        )}
        {settingsActive && <p>Show settings</p>}
      </div>
    </div>
  );
}
