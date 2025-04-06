"use client";
import { Archive, Trash2, UserPlus } from "lucide-react";
import CustomHoverCard from "../hoverCard";

import { DataTable } from "@/components/molecules/projectsTable";
import { ColumnDef } from "@tanstack/react-table";
import { ProjectType } from "@/types/api-types";

type User = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  projects: ProjectType[];
};

export default function HomeProjectLayout({ projects }: Props) {
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
          incomingColumns={[]}
          incomingData={[]}
          onSelecteItem={() => {}}
        />
      </div>
    </>
  );
}
