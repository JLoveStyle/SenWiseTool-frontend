"use client";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import { useApiOps } from "@/lib/api-provider";
import { Route } from "@/lib/route";
import { useUserstore } from "@/lib/stores/user-stores";
import {
  ApiDataResponse,
  CampaignType,
  CompanyType,
  UserType,
} from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect } from "react";

type Props = {};

export default function Home({ }: Props) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  LOCAL_STORAGE.save("username", user?.firstName);

  // fetch user and set him to the store
  const { refetch } = useApiOps<UserType, ApiDataResponse<UserType>>({
    fn: () => fetchApiData(Route.user, "current"),
    route: Route.user,
  });

  async function fetchData() {
    const token = await getToken();
    if (token) {
      LOCAL_STORAGE.save("token", token);
    }
  }

  useEffect(() => {
    fetchData();
    refetch();
  }, []);

  return (
    <>
      <LayoutDashboard
        typeOfProject={"INITIAL_INSPECTION"}
        projectsPerType={[]}
      >
        <div>
          <div className="flex items-center justify-center mt-28">
            <Image
              src="/svg/empty.svg"
              height={250}
              width={350}
              alt="Empty illustation"
              className="animate-empty-image"
            />
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
}