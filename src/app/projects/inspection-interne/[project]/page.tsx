"use client";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import ProjectDetails from "@/components/organisms/projectDetails";
import React from "react";

type Props = {};

export default function Home({}: Props) {
  return (
    <LayoutDashboard>
      <ProjectDetails />
    </LayoutDashboard>
  );
}
