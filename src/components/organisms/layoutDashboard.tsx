import React from "react";
import NavDashboard from "../molecules/navDashboard";

type Props = {};

export default function LayoutDashboard({}: Props) {

  const sideIcons: {[key: string]: any}[] = [
    {
      label: ""
    }
  ]

  return (
    <div>
      <NavDashboard placeholder="Recherche..." />
      
    </div>
  );
}
