import dynamic from "next/dynamic";
import React from "react";

const LayoutDashboardTemplate = dynamic(
  () => import("@/components/templates/layout-dashboard-template"),
  {
    ssr: false,
  }
);

type Props = {};

export default function Home({}: Props) {
  return (
    <LayoutDashboardTemplate title="AGRICULTURE">
      <p>Agriculture</p>
    </LayoutDashboardTemplate>
  );
}
