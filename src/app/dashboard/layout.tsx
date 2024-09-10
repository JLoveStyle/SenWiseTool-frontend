"use client";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { useAuth, useSession, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { session } = useSession();
  const { user } = useUser();

  if (!isSignedIn) return <div>sign in to view this page</div>;

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
