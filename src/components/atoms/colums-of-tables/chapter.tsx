"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ChapterMetaDataType } from "@/types/api-types";
import { ColumnDef, createColumnHelper, isRowSelected } from "@tanstack/react-table";


// Grouped columns
const columnHelper = createColumnHelper<ChapterMetaDataType>();

export const groupedColumns: ColumnDef<ChapterMetaDataType>[] = [
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
    accessorKey: "number",
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
      columnHelper.accessor("certication_de_group.petit_exp_agri", {
        header: () => <span>Petit expl. agri</span>,
        footer: (props) => props.column.id,
      }),
      // Accessor Column
      columnHelper.accessor("certication_de_group.grande_exp_agri", {
        header: "Grande expl. agri",
        footer: (props) => props.column.id,
      }),
      // Accessor Column
      columnHelper.accessor("certication_de_group.direction_de_group", {
        header: "Direction de group",
        footer: (props) => props.column.id,
      }),
    ],
  }),
];
