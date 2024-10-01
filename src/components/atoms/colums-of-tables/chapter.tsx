"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef, createColumnHelper, isRowSelected } from "@tanstack/react-table";

export interface Requirements {
  title: string // eg. Gestion
  numero: string // eg. 1.1
  content: ChapterMetaData[]
}

export type ChapterMetaData = {
  num: string; // eg. 1.1.1
  principal_requirement: string;
  certif_de_group: {
    petite_exploitation_agricole: string;
    grande_exploitation_agricole: string;
    direction_du_group: string;
  };
};

// Grouped columns
const columnHelper = createColumnHelper<ChapterMetaData>();

export const groupedColumns: ColumnDef<ChapterMetaData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "numero",
  //   header: '#'
  // },
  // {
  //   accessorKey: "title",
  //   header: () => <span>Thème</span>
  // },
  {
    accessorKey: "num",
    header: "No",
  },
  {
    accessorKey: "principal_requirement",
    header: "Exigences principal",
  },
  columnHelper.group({
    header: "Certification de group",
    columns: [
      // Accessor Column
      columnHelper.accessor("certif_de_group.petite_exploitation_agricole", {
        header: () => <span>Petit expl. agri</span>,
        footer: (props) => props.column.id,
      }),
      // Accessor Column
      columnHelper.accessor("certif_de_group.grande_exploitation_agricole", {
        header: "Grande expl. agri",
        footer: (props) => props.column.id,
      }),
      // Accessor Column
      columnHelper.accessor("certif_de_group.direction_du_group", {
        header: "Direction de group",
        footer: (props) => props.column.id,
      }),
    ],
  }),
];
