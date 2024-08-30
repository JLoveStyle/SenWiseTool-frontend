"use client"

import { Checkbox } from "@radix-ui/react-checkbox"
import { ColumnDef } from "@tanstack/react-table"

export type ChapterMetaData = {
  id: string
  number: string
  principal_requirement: string
  certication_de_group: {
    petit_exp_agri: string
    grande_exp_agri: string
    direction_de_group: string
  }
}

export const column: ColumnDef<ChapterMetaData>[] = [
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
  {
    accessorKey: "number",
    header: "No",
  },
  {
    accessorKey: "principal_requirement",
    header: "Exigences principal",
    // cell: ({ row }) => <div className="lowercase">{row.getValue("principal_requirement")}</div>,
  },
  {
    accessorKey: "certication_de_group",
    header: "Certification de group"
  },
  {
    accessorKey: "certification_de_group.petit_exp_agri",
    header: "Petite exp. agricole"
  },
  {
    accessorKey: "certification_de_group.grande_exp_agri",
    header: "Grande exp. agricole"
  },
  {
    accessorKey: "certification_de_group.direction_de_group",
    header: "Direction de group"
  }
]