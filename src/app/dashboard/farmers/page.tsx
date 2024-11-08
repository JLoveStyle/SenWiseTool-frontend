"use client";
import { columnsListOfFarmers } from "@/components/atoms/colums-of-tables/list-of-famers";
import { DataTable } from "@/components/molecules/projectsTable";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { Route } from "@/lib/route";
import { ApiDataResponse, FarmerType, FarmType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
import React, { useEffect, useState } from "react";

type Props = {};

export default function Home({}: Props) {
  const [farmer, setFarmer] = useState<FarmerType>();

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const result = await fetchApiData<ApiDataResponse<FarmerType>>(
          Route.famerRequest,
          "?company_id=cm2qjm4mg000dshwofqj1uplx"
        );
        console.log("farmers =>", result);
        setFarmer(result.data)
      } catch (error) {
        console.log(error);
      }
    };
    console.log("into useEffect");
    fetchFarmers();
  }, []);

  return (
    <LayoutDashboardTemplate title="FARMERS">
      <div className=" pb-4 pt-2 px-6">
        <DataTable
          incomingColumns={columnsListOfFarmers}
          incomingData={farmer as unknown as FarmerType[] ?? []}
          onSelecteItem={(selectedFarmer) => {
            setFarmer(selectedFarmer as unknown as FarmerType);
          }}
          isLoading={false}
          inputPlaceholder="Filter by famer name..."
        />
      </div>
    </LayoutDashboardTemplate>
  );
}
