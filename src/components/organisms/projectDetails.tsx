"use client";
import React, { useEffect, useState } from "react";
import ProjectSummary from "../molecules/projectSummary";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { Project } from "@/types/gestion";
import { tableRaw } from "@/utiles/services/constants";

type Props = {};

export default function ProjectDetails({}: Props) {
  const [summaryActive, setSummaryActive] = useState<boolean>(true);
  const [formActive, setFormActive] = useState<boolean>(false);
  const [dataActive, setDataActive] = useState<boolean>(false);
  const [settingsActive, setSettingsActive] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>()

  let id: string | undefined | null = "";

  useEffect(() => {
    id = LOCAL_STORAGE.get("projectId");
   setSelectedProject( tableRaw.find((item) => item.id === id));
    
  }, []);

  return (
    <div className="">
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
      {summaryActive && <ProjectSummary projectObject={selectedProject} />}
      {dataActive && <p>Show collected data</p>}
      {formActive && <p>Show form sample</p>}
      {settingsActive && <p>Show settings</p>}
    </div>
  );
}
