"use client";
import { columnsListOfFarmers } from "@/components/atoms/colums-of-tables/list-of-famers";
import { DataTable } from "@/components/molecules/projectsTable";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { Route } from "@/lib/route";
import { FarmType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
import React, { useEffect, useState } from "react";

type Props = {};

export default function Home({}: Props) {
  const [farmer, setFarmer] = useState<FarmType>();

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const result = await fetchApiData(Route.famerRequest, "")
        console.log('farmers =>', result)
      } catch (error) {
        console.log(error)
      }
    };
    console.log('into useEffect')
    fetchFarmers();
  }, []);

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
