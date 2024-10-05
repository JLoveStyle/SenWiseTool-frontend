"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

export type DeployableFormMetadata = {
  // id: string;
  number: string;
  comment: string;
  status: {
    C: boolean;
    NC: boolean;
    NA: boolean;
  };
  principal_requirement: string;
  certif_de_group: {
    petite_exploitation_agricole: string;
    grande_exploitation_agricole: string;
    direction_du_group: string;
  };
};

// Grouped columns
const columnHelper = createColumnHelper<DeployableFormMetadata>();

export const printableFormColumns: ColumnDef<DeployableFormMetadata>[] = [
  {
    accessorKey: "number",
    header: "#",
  },
  {
    accessorKey: "principal_requirement",
    header: "Exigences principal",
  },
  columnHelper.group({
    header: "Certification de groupe",
    columns: [
      columnHelper.accessor("certif_de_group", {
        header: () => <span className="">Petit rxpl. agri</span>,
      }),
      columnHelper.accessor("certif_de_group.petite_exploitation_agricole", {
        header: () => <span className="">Petit expl. agri</span>,
      }),
      columnHelper.accessor("certif_de_group.grande_exploitation_agricole", {
        header: () => <span className="">Grande expl. agri</span>,
      }),
      columnHelper.accessor("certif_de_group.direction_du_group", {
        header: () => <span className="">Direction de groupe</span>,
      }),
    ],
  }),
  columnHelper.group({
    header: "Status",
    columns: [
      columnHelper.accessor("status.C", {
        header: () => <span className="">C</span>,
        cell: ({ row }) => (
          <input
            type="radio"
            name="c"
            id="c"
            value="C"
            onChange={(e) => row.getValue(e.target.value)}
          />
        ),
      }),
      columnHelper.accessor("status.NC", {
        header: () => <span className="">NC</span>,
        cell: ({ row }) => (
          <input
            type="radio"
            name="nc"
            id="nc"
            value="NC"
            onChange={(e) => row.getValue(e.target.value)}
          />
        ),
      }),
      columnHelper.accessor("status.NA", {
        header: () => <span className="">NA</span>,
        cell: ({ row }) => (
          <input
            type="radio"
            name="na"
            id="NA"
            value="NA"
            onChange={(e) => row.getValue(e.target.value)}
          />
        ),
      }),
    ],
    
  }),
  {
    id: "select",
    header: () => (
      <span>
        Observation/
        <br />
        comment
      </span>
    ),
    cell: ({ row }) => (
      <textarea
        className="w-full h-full p-2"
        onChange={(e) => row.getValue(e.target.value)}
        placeholder="Enter comment"
      />
    ),
  },
];
