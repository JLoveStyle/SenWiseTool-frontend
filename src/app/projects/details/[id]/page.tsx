"use client";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import ProjectDetails from "@/components/organisms/projectDetails";
import React, { useEffect } from "react";

type Props = {};

export default function Home({}: Props) {
  // Fetch all projects with type ["INTERNAL_INSPECTION"] and pass it as props to Layout
  useEffect(() => {
    console.log("internal_inspection");
  }, []);

  return (
    <LayoutDashboard
      projectsPerType={[]}
      typeOfProject={["INTERNAL_INSPECTION"]}
    >
      <ProjectDetails />
    </LayoutDashboard>
  );
}
