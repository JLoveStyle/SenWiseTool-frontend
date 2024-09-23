import LayoutDashboard from "@/components/organisms/layoutDashboard";
import ProjectDetails from "@/components/organisms/projectDetails";
import ProjectDisplay from "@/components/organisms/projectsDisplay";
import React from "react";

type Props = {};

export default function Home({}: Props) {
  return (
    <LayoutDashboard projectsPerType={[]}>
      <ProjectDisplay projects={[]} isLoading={false} />
    </LayoutDashboard>
  );
}
