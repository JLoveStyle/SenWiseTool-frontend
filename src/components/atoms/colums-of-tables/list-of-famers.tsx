import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Route } from "@/lib/route";
import { FarmerType } from "@/types/api-types";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Bounce, toast } from "react-toastify";


// DELETE FAMER
async function handleDeleteProject (id: string) {
  console.log(id)
}

export const columnsListOfFarmers: ColumnDef<FarmerType>[] = [
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
    accessorKey: "farmer_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Famer name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => (
      <div className="capitalize">
        {row.getValue("farmer_name")}
      </div>
    )
  },
  {
    accessorKey: "farmer_contact",
    header: 'Farmer contact'
  },
  {
    accessorKey: "farmer_ID_card_number",
    header: 'ID card number'
  },
  {
    accessorKey: "village",
    header: 'Village'
  },
  {
    accessorKey: "inspection_date",
    header: "Date of inspection",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const farmer = row.original;

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
                navigator.clipboard.writeText(farmer.farmer_contact as string);
                toast.success("Copied", {
                  autoClose: 1000,
                  transition: Bounce,
                });
              }}
            >
              Copy farmer's contact
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={Route.listOfFarmers + `/${farmer.id}`}>
              <DropdownMenuItem
                onClick={() => LOCAL_STORAGE.save("farmer_id", farmer.id)}
              >
                View farmer details
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => handleDeleteProject(farmer.id as string)}
              className="text-red-500 hover:text-red-500"
            >
              Delete farmer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]