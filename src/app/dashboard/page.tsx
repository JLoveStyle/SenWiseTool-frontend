"use client";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import { API_URL } from "@/utiles/services/constants";
import ApiCall, { apiObj, Headers } from "@/utiles/services/httpClients";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { useAuth, useSession, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

type Props = {};

export default function Home({ }: Props) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { session } = useSession();
  const { user } = useUser();

  if (!isSignedIn) return <div>sign in to view this page</div>;

  async function fetchData() {
    const token = await getToken();
    if (token) {
      LOCAL_STORAGE.save("token", token);
      // store the user in the session
      // apiObj().POST(`${API_URL}/v1/users`, {}, Headers);
    }
  }

  useEffect(() => {
    console.log("storage", LOCAL_STORAGE.get("token"));
    fetchData();
    console.log(isLoaded);
  }, []);

  console.log(user);
  return (
    <>
      <LayoutDashboard>
        <p> jnsduvusdbvjsdjv sdfviqsdfiovsd</p>
      </LayoutDashboard>
    </>
  );
}
