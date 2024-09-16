"use client";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { useAuth, useSession, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useUsertore } from "@/lib/stores/user-stores";
import { ApiDataResponse, CampaignType, CompanyType, UserType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
import { useApiOps } from "@/lib/api-provider";
import { Route } from "@/lib/route";


interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { session } = useSession();
  const { user } = useUser();
  const setCurrentUser = useUsertore((state) => state.setUser);
  if (!isSignedIn) return <div>sign in to view this page</div>;

  setTimeout(() => {
    const { refetch } = useApiOps<
      CompanyType,
      ApiDataResponse<CompanyType>
    >({
      fn: () => fetchApiData(Route.user, "companies"),
      route: Route.companies,
    });
  }, 100);

  // create user and set him to the store
  async function fetchData() {
    console.log("session =>", session);
    const token = await getToken();
    if (token) {
      LOCAL_STORAGE.save("token", token);
    }
  }

  useEffect(() => {
    fetchData();
    console.log(isLoaded);
  }, []);

  console.log(user);
  return (
    <>
      <LayoutDashboard typeOfProject={["TRAINING"]} projectsPerType={[]}>
        <hr className="mt-3 mb-2" />
        {children}
      </LayoutDashboard>
    </>
  );
}
