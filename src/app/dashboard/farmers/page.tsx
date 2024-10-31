"use client";
import { columnsListOfFarmers } from "@/components/atoms/colums-of-tables/list-of-famers";
import { DataTable } from "@/components/molecules/projectsTable";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { FarmType } from "@/types/api-types";
import React, { useState } from "react";

type Props = {};

export default function Home({}: Props) {
  const [farmer, setFarmer] = useState<FarmType>();
  return (
    <LayoutDashboardTemplate title="FARMERS">
      <div className=" pb-4 pt-2 px-6">
        <DataTable
          incomingColumns={columnsListOfFarmers}
          incomingData={[]}
          onSelecteItem={(selectedFarmer) => {
            setFarmer(selectedFarmer as unknown as FarmType);
          }}
          isLoading={false}
          inputPlaceholder="Filter by famer name..."
        />
      </div>
    </LayoutDashboardTemplate>
  );
}
