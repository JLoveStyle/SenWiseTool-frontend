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
import { ApiDataResponse, ProjectType } from "@/types/api-types";
import { mutateDelApiData } from "@/utiles/services/mutations";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Bounce, toast } from "react-toastify";

// DELETE PROJECT FUNCTION
const handleDeleteProject = async (id: string) => {
  console.log("delete project with id", id);
  await mutateDelApiData<ApiDataResponse<ProjectType>>(Route.projects, id).then(
    (res) => {
      if (res && res?.status <= 205) {
        toast.success("Project deleted", {
          transition: Bounce,
          autoClose: 3000,
        });
      } else {
        toast.error("Something went wrong", {
          transition: Bounce,
          autoClose: 3000,
        });
      }
    }
  );
};

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
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => (
      <div
        className="font-semibold hover:underline hover:cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(row.getValue("code"));
          toast.success('Code copied')
        }}
      >
        {row.getValue("code")}
      </div>
    ),
  },
  {
    accessorKey: "updated_at",
    header: "Last update",
    cell: ({ row }) => (
      <span className="">
        {dayjs(row.getValue("updated_at")).toString().slice(0, -4)}{" "}
      </span>
    ),
  },
  {
    accessorKey: "draft_at",
    header: "Creation date",
    cell: ({ row }) => (
      <span className="">
        {(row.getValue("draft_at") as string).includes("1969")
          ? "--"
          : dayjs(row.getValue("draft_at")).toString().slice(0, -4)}{" "}
      </span>
    ),
  },
  {
    accessorKey: "start_date",
    header: "Start date",
    cell: ({ row }) => (
      <span className="">
        {dayjs(row.getValue("start_date")).toString().slice(0, -13)}{" "}
      </span>
    ),
  },
  {
    accessorKey: "end_date",
    header: "End date",
    cell: ({ row }) => (
      <span className="">
        {dayjs(row.getValue("end_date")).toString().slice(0, 13)}{" "}
      </span>
    ),
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
                navigator.clipboard.writeText(project.code as string);
                toast.success("Copied", {
                  autoClose: 1000,
                  transition: Bounce,
                });
              }}
            >
              Copy project code
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
              onClick={() => handleDeleteProject(project.id as string)}
              className="text-red-500 hover:text-red-500"
            >
              Delete project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
