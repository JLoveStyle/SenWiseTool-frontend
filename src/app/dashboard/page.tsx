"use client";
import NavDashboard from "@/components/molecules/navDashboard";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { useAuth, UserButton, useSession, useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

type Props = {};

export default function Home({}: Props) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { session } = useSession();
  const { user } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
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
  }, []);

  console.log(user);
  return (
    <>
    <LayoutDashboard>
      <p></p>
    </LayoutDashboard>

    </>
  );
}
