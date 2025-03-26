"use client";
import { DasHomePage } from "@/components/molecules/dasHomePage";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { useApiOps } from "@/lib/api-provider";
import { Route } from "@/lib/route";
import { ApiDataResponse, UserType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

type Props = {};

export default function Home({}: Props) {
  const { getToken } = useAuth();
  const { user } = useUser();
  LOCAL_STORAGE.save("username", user?.firstName);

  async function fetchData() {
    const token = await getToken();
    if (token) {
      LOCAL_STORAGE.save("token", token);
    }
  }

  // fetch user and set him to the store
  const { refetch } = useApiOps<UserType, ApiDataResponse<UserType>>({
    fn: () => fetchApiData(Route.user, "current"),
    route: Route.user,
  });


  useEffect(() => {
    fetchData();
    refetch();
  }, []);

  return (
    // <Session sessionStatus={AUTHENTICATED}>
    <LayoutDashboardTemplate title="Welcome to SENWISETOOL Dashboard">
      <DasHomePage />
    </LayoutDashboardTemplate>
    // </Session>
  );
}
