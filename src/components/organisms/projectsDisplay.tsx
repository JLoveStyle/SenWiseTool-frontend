"use client"
import { Archive, Trash2, UserPlus } from "lucide-react";

import React, { useState } from "react";
import CustomHoverCard from "./hoverCard";
import { DataTable } from "../molecules/projectsTable";
import { columnListProjects } from "../atoms/colums-of-tables/listOfProjects";
import { Project } from "@/types/gestion";

type Props = {
  projects: Project[];
};

export default function ProjectDisplay({ projects }: Props) {

  const [selectedProjects, setSelectedProjects] = useState<Project[]>()

  const handleSelectedProjects = (projects: Project[]) => {
    setSelectedProjects(projects)
  }

  return (
    <>
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Projects</h1>
        <div className="flex gap-4 text-gray-500">
          <CustomHoverCard content="archive project">
            <Archive className="hover:cursor-pointer" />
          </CustomHoverCard>
          <CustomHoverCard content="Share project">
            <UserPlus className="hover:cursor-pointer" />
          </CustomHoverCard>
          <CustomHoverCard content="Delete Project">
            <Trash2 className="hover:cursor-pointer" />
          </CustomHoverCard>
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
