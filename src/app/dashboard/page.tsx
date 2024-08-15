"use client";
import { useAuth, UserButton, useSession, useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import React, { useEffect } from "react";

type Props = {};

export default function Home({}: Props) {
  // const {user: any} = await currentUser()
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { session } = useSession();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>sign in to view this page</div>;

  async function fetchData() {
    console.log("session =>", session)
    const token = await getToken();
    console.log("token =>", token);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const { user } = useUser();
  console.log(user);
  return (
    <div className="flex justify-between">
      <h1>Hello Dashboard</h1>
      <UserButton />
    </div>
  );
}
