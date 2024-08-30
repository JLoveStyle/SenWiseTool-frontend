"use client";
import InspectionInterne from "@/components/organisms/inspectionInterne";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import React from "react";

type Props = {};

export default function Home({}: Props) {
  return (
    <LayoutDashboard>
      <InspectionInterne />
    </LayoutDashboard>
  );
}
