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
  certication_de_group: {
    petit_exp_agri: string;
    grande_exp_agri: string;
    direction_de_group: string;
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
      columnHelper.accessor("certication_de_group.petit_exp_agri", {
        header: () => <span className="">Petit rxpl. agri</span>,
      }),
      columnHelper.accessor("certication_de_group.petit_exp_agri", {
        header: () => <span className="">Petit expl. agri</span>,
      }),
      columnHelper.accessor("certication_de_group.grande_exp_agri", {
        header: () => <span className="">Grande expl. agri</span>,
      }),
      columnHelper.accessor("certication_de_group.direction_de_group", {
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

export const deployableFormColumn: ColumnDef<DeployableFormMetadata>[] = [
  {
    accessorKey: "number",
    header: "#",
  },
  {
    accessorKey: "principal_requirement",
    header: "Exigences principal",
  },
  columnHelper.group({
    header: "Certification de group",
    columns: [
      // Accessor Column
      columnHelper.accessor("certication_de_group.petit_exp_agri", {
        header: () => <span className="text-center">Petit expl. agri</span>,
        footer: (props) => props.column.id,
      }),
      // Accessor Column
      columnHelper.accessor("certication_de_group.grande_exp_agri", {
        header: () => <span className="text-center">Grande expl. agri</span>,
        footer: (props) => props.column.id,
      }),
      // Accessor Column
      columnHelper.accessor("certication_de_group.direction_de_group", {
        header: () => <span className="text-center">Girection de group</span>,
        footer: (props) => props.column.id,
      }),
    ],
  }),
  columnHelper.group({
    header: "Status",
    columns: [
      columnHelper.accessor("status.C", {
        id: "C",
        header: () => <span>C</span>,
        cell: ({ row }) => (
          <input
            name="status"
            type="radio"
            value="C"
            onChange={(e) => row.getValue(e.target.value)}
          />
        ),
      }),
      columnHelper.accessor("status.NC", {
        id: "NC",
        header: () => <span>NC</span>,
        cell: ({ row }) => (
          <input
            name="status"
            type="radio"
            value="NC"
            onChange={(e) => row.getValue(e.target.value)}
          />
        ),
      }),
      columnHelper.accessor("status.NA", {
        id: "NA",
        header: () => <span>NA</span>,
        cell: ({ row }) => (
          <input
            name="status"
            type="radio"
            value="NA"
            checked={row.getIsSelected()}
            onChange={(e) => {
              console.log(e.target.value);
              row.toggleSelected();
            }}
          />
        ),
      }),
      // columnHelper.accessor("status.NA", {
      //   header: () => <span className="text-center">NA</span>,
      // }),
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
  // {
  //   accessorKey: 'comment',
  //   header: 'Commentaires/Observations',
  // }
];
