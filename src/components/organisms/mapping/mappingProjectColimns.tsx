"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Route } from "@/lib/route";
import { ProjectType } from "@/types/api-types";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Bounce, toast } from "react-toastify";

export const mappingColumnListProjects: ColumnDef<ProjectType>[] = [
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
    accessorKey: "city",
    header: "Village",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("city")}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Creation date",
  },
  {
    accessorKey: "updated_at",
    header: "Last update",
    // cell: (row) => DateTime.fromISO(row.getValue()).toLocalString(DateTime.DATE_MED)
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
            <Link href={Route.mapping + `/${project.id}`}>
              <DropdownMenuItem
                onClick={() => LOCAL_STORAGE.save("projectId", project.id)}
              >
                View project details
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => {
                LOCAL_STORAGE.save("projectId", project.id);
                // INSERT THE DELETE PROJECT FUNCTION HERE
                toast.success("Project deleted", {
                  autoClose: 1000,
                  transition: Bounce,
                });
              }}
              className="text-red-500"
            >
              Delete project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
