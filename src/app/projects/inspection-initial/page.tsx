"use client";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import ProjectDisplay from "@/components/organisms/projectsDisplay";
import { tableRaw } from "@/utiles/services/constants";

type Props = {};

export default function Home({}: Props) {
  // Fetch all projects with type ["INITIAL_INSPECTION"] and pass it as props to Layout
  // useEffect(() => {
  //   console.log("initial_inspection");
  // }, []);

  return (
    <LayoutDashboard
      projectsPerType={tableRaw}
      typeOfProject={["INITIAL_INSPECTION"]}
    >
      <ProjectDisplay projects={tableRaw} />
    </LayoutDashboard>
  );
}
