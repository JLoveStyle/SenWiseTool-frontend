"use client";

import { Route } from "@/lib/route";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Bounce, toast } from "react-toastify";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ProjectType } from "@/types/api-types";

export type ChapterMetaData = {
  id: string;
  number: string;
  principal_requirement: string;
  certication_de_group: {
    petit_exp_agri: string;
    grande_exp_agri: string;
    direction_de_group: string;
  };
};

let allProject = LOCAL_STORAGE.get("all_projects");

// this could be wrapped in a hook inorder to have a stable reference to prevent infinite re-rendres
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
  },
  {
    accessorKey: "certication_de_group.petit_exp_agri",
    id: "Petite exp. agricole",
  },
  {
    accessorKey: "certication_de_group.grande_exp_agri",
    id: "Grande exp. agricole",
  },
  {
    accessorKey: "certication_de_group.direction_de_group",
    id: "Direction de group",
  }
];

export const columnListProjects: ColumnDef<ProjectType>[] = [
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
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "updated_at",
    header: "Last update",
  },
  {
    accessorKey: "deployed_at",
    header: "Deployment date",
  },
  {
    accessorKey: "start_date",
    header: "Start date",
  },
  {
    accessorKey: "end_date",
    header: "End date",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const project = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(project.id as string);
                toast.success("Copied", {
                  autoClose: 1000,
                  transition: Bounce,
                });
              }}
            >
              Copy project ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={Route.details + `/${project.id}`}>
              <DropdownMenuItem
                onClick={() => LOCAL_STORAGE.save("projectId", project.id)}
              >
                View project details
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className=""
            >
              Deploy project
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => {}}
            >
              Delete project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

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
        header: "Girection de group",
        footer: (props) => props.column.id,
      }),
    ],
  }),
];
