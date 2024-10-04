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
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Bounce, toast } from "react-toastify";

// The first parameter of columnName must be id
export const columnTable = <T extends Record<string, any>>(
  columnName: Record<keyof T, string>,
  routePage: string
) => {
  const ColumnsTable: ColumnDef<T>[] = [
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
      accessorKey: Object.keys(columnName)[1],
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <div className="capitalize">
              {columnName[Object.keys(columnName)[1] as keyof T]}
            </div>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue(Object.keys(columnName)[1])}
        </div>
      ),
    },

    ...Object.entries(columnName)
      .slice(2)
      .map(([key, header]) => ({
        accessorKey: key as string,
        header: () => <div className="capitalize">{header}</div>,
        cell: ({ row }: CellContext<T, unknown>) => (
          <div className="capitalize">{row.getValue(key)}</div>
        ),
      })),

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
                  navigator.clipboard.writeText(project.id);
                  toast.success("Copied", {
                    autoClose: 1000,
                    transition: Bounce,
                  });
                }}
              >
                Copy project ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href={routePage + `/${project.id}`}>
                <DropdownMenuItem
                  onClick={() =>
                    LOCAL_STORAGE.save("currentTrainingProject", project)
                  }
                >
                  View project details
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="text-red-500">
                Delete project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return ColumnsTable;
};
