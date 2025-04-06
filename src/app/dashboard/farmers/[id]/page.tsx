"use client";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { Route } from "@/lib/route";
import { ApiDataResponse, FarmerType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
import { getFamerById } from "@/utiles/services/server-actions/crudFarmers";
import dynamic from "next/dynamic";
import React, { use, useEffect, useState } from "react";
import { toast } from "react-toastify";

const FarmerDetails = dynamic(() => import("@/components/molecules/farmerDetails"), {
  ssr: false
})

type Props = Promise<{ id: string }>;

export default function Home(props: { params: Props }) {
  const params = use(props.params);
  const id = params.id;
  const [farmer, setFarmer] = useState<FarmerType>();

  async function fetchSingleFarmer(farmerId: string) {
    const result = await fetchApiData<ApiDataResponse<FarmerType>>(
      Route.famerRequest + `/${id}`,
      ""
    );
    if (result.status === 200) {
      setFarmer(result.data);
    } else {
      toast.error("Could not fetch single farmer. Please refresh")
    }
  }

  useEffect(() => {
    fetchSingleFarmer(id);
  }, []);

  return (
    <LayoutDashboardTemplate title="Farmer details">
      <FarmerDetails famerObject={farmer as FarmerType} />
    </LayoutDashboardTemplate>
  );
}
