import {
  Archive,
  ArrowDownAZ,
  ArrowUpAZ,
  Trash2,
  UserPlus,
} from "lucide-react";

import React from "react";
import CustomHoverCard from "./hoverCard";
import { tableRaw } from "@/utiles/services/constants";
import { DataTable } from "../molecules/data-table";
import { columnListProjects } from "../atoms/columnsProject";

type Props = {};

export default function InspectionInterne({}: Props) {
  return (
    <>
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Internal inspections projects</h1>
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
          onSelecteItem={() => console.log("hello")}
          incomingColumns={columnListProjects}
          incomingData={tableRaw}
        />
      </div>
    </>
  );
}
