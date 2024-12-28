"use client";
import { Archive, Trash2, UserPlus } from "lucide-react";

import { useState } from "react";
import CustomHoverCard from "./hoverCard";
// import { columnListProjects } from "../atoms/colums-of-tables/listOfProjects";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import ActionComponent from "../molecules/actionComponent";
import { ProjectType } from "@/types/api-types";
import { DataTable } from "../molecules/projectsTable";
import { ColumnDef } from "@tanstack/react-table";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";


type Props = {
  projects: ProjectType[];
  isLoading: boolean;
  columnListProjects: ColumnDef<ProjectType>[];
};

export default function ProjectDisplay({
  projects,
  isLoading,
  columnListProjects,
}: Props) {
  const [shareProject, setShareProject] = useState<boolean>(false);
  const [deleteProject, setDeleteProjet] = useState<boolean>(false);
  const [archiveProject, setArchiveProiect] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedProjects, setSelectedProjects] = useState<ProjectType[]>();

  // const company = useCompanyStore((state) => state.company);

  const handleSelectedProjects = (projects: ProjectType[]) => {
    setSelectedProjects(projects);
  };

  // read value form child component
  const handleCloseDialog = (val: boolean) => {
    setOpenModal(val);
  };

  return (
    <div>
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Projets</h1>
        <div className="flex gap-4 text-gray-500">
          <CustomHoverCard content="Share project">
            <UserPlus
              onClick={() => {
                if (selectedProjects?.length) {
                  setOpenModal((prev) => !prev);
                  setShareProject(true); // will be un commented latter on
                  setArchiveProiect(false);
                  setDeleteProjet(false);
                }
              }}
              className={
                selectedProjects?.length ? "hover:cursor-not-allowed " : ""
                // selectedProjects?.length
                //   ? "hover:cursor-pointer text-black"
                //   : ""
              }
            />
          </CustomHoverCard>
          <CustomHoverCard content="archive project">
            <Archive
              onClick={() => {
                if (selectedProjects?.length) {
                  setOpenModal((prev) => !prev);
                  setArchiveProiect(true);
                  setShareProject(false);
                  setDeleteProjet(false);
                }
              }}
              className={
                selectedProjects?.length
                  ? "hover:cursor-pointer text-black"
                  : ""
              }
            />
          </CustomHoverCard>
          <CustomHoverCard content="Delete Project">
            <Trash2
              onClick={() => {
                if (selectedProjects?.length) {
                  setOpenModal((prev) => !prev);
                  setDeleteProjet(true);
                  setShareProject(false);
                  setArchiveProiect(false);
                }
              }}
              className={
                selectedProjects?.length
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
            <VisuallyHidden.Root>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
            </VisuallyHidden.Root>
              <ActionComponent
                shareProject={shareProject}
                archiveProject={archiveProject}
                deleteProject={deleteProject}
                projects={
                  selectedProjects ? (selectedProjects as ProjectType[]) : []
                }
                closeDialog={handleCloseDialog}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="px-6">
        <DataTable
          isLoading={isLoading}
          incomingColumns={columnListProjects}
          incomingData={projects}
          onSelecteItem={handleSelectedProjects}
        />
      </div>
    </div>
  );
}
