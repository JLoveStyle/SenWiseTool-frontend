"use client";
import { columnsListOfFarmers } from "@/components/atoms/colums-of-tables/list-of-famers";
import { DataTable } from "@/components/molecules/projectsTable";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { Route } from "@/lib/route";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { ApiDataResponse, FarmerType, FarmType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {};

export default function Home({}: Props) {
  const [farmer, setFarmer] = useState<FarmerType>();
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const company = useCompanyStore((state) => state.company)

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const result = await fetchApiData<ApiDataResponse<FarmerType>>(
          Route.famerRequest,
          `?company_id=${company?.id}`
          // "?company_id=cm2qjm4mg000dshwofqj1uplx"
        );
        console.log("farmers =>", result);
        if (result.status === 200) {
          setFarmer(result.data)
          setIsLoading(false)
          return
        }
        if (result.status === 404) {
          toast.error("You don't have farmers yet")
          setIsLoading(false)
          return
        }
      } catch (error) {
        console.log(error);
      }
    };
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
          isLoading={isLoading}
          inputPlaceholder="Filter by famer name..."
        />
      </div>
    </LayoutDashboardTemplate>
  );
}
