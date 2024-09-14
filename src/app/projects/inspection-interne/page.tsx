"use client";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import ProjectDisplay from "@/components/organisms/projectsDisplay";
import React, { useEffect } from "react";

type Props = {};

export default function Home({}: Props) {

  // Fetech all projects xwith ["INTERNAL_INSPECTION"] and pass it as props to layout
  useEffect(() => {
    console.log("inspection interne")
  }, [])

  return (
    <LayoutDashboard typeOfProject={["INTERNAL_INSPECTION"]} projectsPerType={[]}>
      <ProjectDisplay projects={[]} />
    </LayoutDashboard>
  );
}
