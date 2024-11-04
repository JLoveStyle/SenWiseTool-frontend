import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Route } from "@/lib/route";
import { AgentPropsFromDB } from "@/types/agent-props";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Bounce, toast } from "react-toastify";


// Delete agent function
async function handleDeleteAgent (id: string) {
  console.log(id)
} 

export const columnsListOfAgents: ColumnDef<AgentPropsFromDB>[] = [
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
    accessorKey: "agentCode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Agent code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => (
      <div className="">
        {row.getValue("agentCode")}
      </div>
    )
  },
  {
    accessorKey: "fullName",
    header: 'Full name'
  },
  {
    accessorKey: 'projectCodes',
    header: 'Assigned project code',
    cell: ({row}) => (
      <div className="">
        {row.getValue("projectCodes")}
      </div>
    )
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const agentCode = row.original;

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
                navigator.clipboard.writeText(agentCode.agentCode as string);
                toast.success("Copied", {
                  autoClose: 1000,
                  transition: Bounce,
                });
              }}
            >
              Copy agent code
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={Route.details + `/${agentCode.id}`}>
              <DropdownMenuItem
                onClick={() => LOCAL_STORAGE.save("agent_id", agentCode.id)}
              >
                View agent details
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => handleDeleteAgent(agentCode.id as string)}
              className="text-red-500 hover:text-red-500"
            >
              Delete agent
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]