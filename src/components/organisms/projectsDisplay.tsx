"use client";
import { Archive, Trash2, UserPlus } from "lucide-react";

import React, { useState } from "react";
import CustomHoverCard from "./hoverCard";
import { DataTable } from "../molecules/projectsTable";
// import { columnListProjects } from "../atoms/colums-of-tables/listOfProjects";
import { Project } from "@/types/gestion";
import { columnListProjects } from "../atoms/columnsProject";
import { Dialog, DialogContent } from "../ui/dialog";
import ActionComponent from "../molecules/actionComponent";

type Props = {
  projects: Project[];
};

export default function ProjectDisplay({ projects }: Props) {
  const [shareProject, setShareProject] = useState<boolean>(false);
  const [deleteProject, setDeleteProjet] = useState<boolean>(false);
  const [archiveProject, setArchiveProiect] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedProjects, setSelectedProjects] = useState<Project[]>();

  const handleSelectedProjects = (projects: Project[]) => {
    setSelectedProjects(projects);
  };

  return (
    <>
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Projects</h1>
        <div className="flex gap-4 text-gray-500">
          <CustomHoverCard content="Share project">
            <UserPlus
              onClick={() => {
                if (!selectedProjects?.length) {
                  setOpenModal((prev) => !prev);
                  setShareProject(true)
                  setArchiveProiect(false)
                  setDeleteProjet(false)
                }
              }}
              className={
                !selectedProjects?.length
                  ? "hover:cursor-pointer text-black"
                  : ""
              }
            />
          </CustomHoverCard>
          <CustomHoverCard content="archive project">
            <Archive
              onClick={() => {
                if (!selectedProjects?.length) {
                  setOpenModal((prev) => !prev);
                  setArchiveProiect(true)
                  setShareProject(false)
                  setDeleteProjet(false)
                }
              }}
              className={
                !selectedProjects?.length
                  ? "hover:cursor-pointer text-black"
                  : ""
              }
            />
          </CustomHoverCard>
          <CustomHoverCard content="Delete Project">
            <Trash2
              onClick={() => {
                if (!selectedProjects?.length) {
                  setOpenModal((prev) => !prev);
                  setDeleteProjet(true)
                  setShareProject(false)
                  setArchiveProiect(false)
                }
              }}
              className={
                !selectedProjects?.length
                  ? "hover:cursor-pointer text-black"
                  : ""
              }
            />
          </CustomHoverCard>
          <Dialog
            onOpenChange={() => setOpenModal((prev) => !prev)}
            open={openModal}
          >
            <DialogContent>
              <ActionComponent
                shareProject={shareProject}
                archiveProject={archiveProject}
                deleteProject={deleteProject}
                projectsId={[]}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="px-6">
        <DataTable
          onSelecteItem={handleSelectedProjects}
          incomingColumns={columnListProjects}
          incomingData={projects}
        />
      </div>
    </>
  );
}
