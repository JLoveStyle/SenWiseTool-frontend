"use client";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import ProjectDisplay from "@/components/organisms/projectsDisplay";
import { useEffect } from "react";

type Props = {};

export default function Home({}: Props) {
  // Fetch all projects with type ["INITIAL_INSPECTION"] and pass it as props to Layout...
  useEffect(() => {
    console.log("initial_inspection");
  }, []);

  return (
    <LayoutDashboard
      projectsPerType={[]}
      typeOfProject={["INITIAL_INSPECTION"]}
    >
      <ProjectDisplay projects={[]} />
    </LayoutDashboard>
  );
}
