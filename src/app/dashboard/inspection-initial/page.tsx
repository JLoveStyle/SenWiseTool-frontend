"use client";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import React, { useEffect } from "react";
import { useCompanyStore } from "@/lib/stores/companie-store";
import ProjectDisplay from "@/components/organisms/projectsDisplay";

type Props = {};

export default function Home({ }: Props) {
  // Fetch all projects with type ["INITIAL_INSPECTION"] and pass it as props to Layout
  useEffect(() => {
    console.log("initial_inspection");

  }, []);

  return (
    <LayoutDashboard projectsPerType={[]} typeOfProject={"INITIAL_INSPECTION"}>
      <ProjectDisplay projects={[]} />
    </LayoutDashboard>
  );
}
