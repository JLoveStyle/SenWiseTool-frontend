"use client";
import React, { useEffect, useState } from "react";
import ProjectSummary from "../molecules/projectSummary";
import { Project } from "@/types/gestion";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProjectType } from "@/types/api-types";

type Props = {
  projectDetails: ProjectType;
};

export default function ProjectDetails({ projectDetails }: Props) {
  const router = useRouter()
  const [summaryActive, setSummaryActive] = useState<boolean>(true);
  const [formActive, setFormActive] = useState<boolean>(false);
  const [dataActive, setDataActive] = useState<boolean>(false);
  const [settingsActive, setSettingsActive] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();

  let id: string | undefined | null = "";

  const showDataFuntionFromChild = (val: boolean) => {
    setDataActive(val);
    // setSettingsActive(false)
    // setFormActive(false)
    setSummaryActive(false);
  };

  return (
    <div className="">
      <div onClick={() => router.back()} className="active:translate-y-1 flex gap-2 items-baseline underline hover:cursor-pointer absolute font-semibold pl-6">
        <MoveLeft size={15} />
        <span className="">
          Back
        </span>
      </div>
      {/* NAVIGATION FOR A SINGLE PROJECT */}
      <div className="flex justify-between md:w-[400px] mx-auto">
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
          {summaryActive ? <div className="w-full h-1 bg-tertiary"></div> : ""}
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
          {settingsActive ? <div className="w-full h-1 bg-tertiary"></div> : ""}
        </div>
      </div>
      {summaryActive && (
        <ProjectSummary
          showData={showDataFuntionFromChild}
          projectObject={projectDetails ? projectDetails : undefined}
        />
      )}
      {dataActive && <p>Show collected data</p>}
      {formActive && <p>Show form sample</p>}
      {settingsActive && <p>Show settings</p>}
    </div>
  );
}
