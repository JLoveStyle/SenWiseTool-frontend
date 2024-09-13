"use client";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import { useApiOps } from "@/lib/api-provider";
import { Route } from "@/lib/route";
import { ApiDataResponse, UserType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { useAuth, useSession, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect } from "react";

type Props = {};

export default function Home({}: Props) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { session } = useSession();
  const { user } = useUser();

  if (!isSignedIn) return <div>sign in to view this page</div>;

  // create user and set him to the store
  const { data: currentUser, refetch } = useApiOps<
    UserType,
    ApiDataResponse<UserType>
  >({
    fn: () => fetchApiData(Route.user, "current"),
    route: Route.user,
  });

  async function fetchData() {
    const token = await getToken();
    if (token) {
      LOCAL_STORAGE.save("token", token);
      // store the user in the session
      // apiObj().POST(`${API_URL}/v1/users`, {}, Headers);
    }
  }

  useEffect(() => {
    fetchData();
    console.log(isLoaded);
    refetch();
  }, []);

  console.log(session);
  return (
    <>
      <LayoutDashboard
        typeOfProject={["INITIAL_INSPECTION"]}
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
