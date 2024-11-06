"use client";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { useApiOps } from "@/lib/api-provider";
import { Route } from "@/lib/route";
import { ApiDataResponse, UserType } from "@/types/api-types";
import { createOrganization } from "@/utiles/services/createOrg";
import { fetchApiData } from "@/utiles/services/queries";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect } from "react";

type Props = {};

export default function Home({}: Props) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  LOCAL_STORAGE.save("username", user?.firstName);
  console.log("user", user);

  // fetch user and set him to the store
  const { refetch } = useApiOps<UserType, ApiDataResponse<UserType>>({
    fn: () => fetchApiData(Route.user, "current"),
    route: Route.user,
  });

  async function fetchData() {
    const token = await getToken();
    if (token) {
      console.log(token)
      LOCAL_STORAGE.save("token", token);
    }
  }

  

  useEffect(() => {
    fetchData();
    refetch();
  }, []);

  const createOrg = async() => {
    console.log("fxn create")
    const res = await createOrganization({
      companyName: "Tlg",
      companyEmail: 'smarvis@gmail.com',
      businessActivity: "cocoa",
      state: "yade",
      city: 'yde',
      country: "cameroon",
      otherBusiness: "",
      hasAgree: true,
      address: "",
      description: "sndvosdnv",
      phone: "48150518601,",
      headOfficeEmail: "",
      logo: ""
    }, "user_2oAWCS5IZh1MGf2wPisprUIfzYV");
    console.log("response", res)
  }

  return (
    <LayoutDashboardTemplate title="Welcome to SENWISETOOL Dashboard">
      <div>
        <button onClick={createOrg}>Create Org</button>
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
    </LayoutDashboardTemplate>
  );
}
