"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Route } from "@/lib/route";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { IoMdArchive } from "react-icons/io";
import { RiShare2Fill } from "react-icons/ri";
import { Icon } from "../icon";

export const trainings = [
  {
    id: 1,
    title:
      "Lorem 1 ipsum dolor sit amet consectetur, adipisicing elit. Itaque rem commodi culpa, sequi sunt repellendus porro et, quod libero iste provident necessitatibus illum expedita quas nobis pariatur. Aperiam, libero aspernatur!",
    location: "Minton",
    start_date: "18/05/2024",
    end_date: "24/05/2024",
    modules: [
      { id: 1, value: "mod 1" },
      { id: 2, value: "mod 2" },
    ],
  },
  {
    id: 2,
    title:
      "Lorem 2 ipsum dolor sit amet consectetur, adipisicing elit. Itaque rem commodi culpa, sequi sunt repellendus porro et, quod libero iste provident necessitatibus illum expedita quas nobis pariatur. Aperiam, libero aspernatur!",
    location: "AKAK",
    start_date: "Pending",
    end_date: "$150.00",
    modules: [
      { id: 1, value: "mod 1" },
      { id: 2, value: "mod 2" },
    ],
  },
  {
    id: 3,
    title:
      "Lorem 3 ipsum dolor sit amet consectetur, adipisicing elit. Itaque rem commodi culpa, sequi sunt repellendus porro et, quod libero iste provident necessitatibus illum expedita quas nobis pariatur. Aperiam, libero aspernatur!",
    location: "Minton",
    start_date: "Unpaid",
    end_date: "$350.00",
    modules: [
      { id: 1, value: "mod 1" },
      { id: 2, value: "mod 2" },
    ],
  },
  {
    id: 4,
    title:
      "Lorem 4 ipsum dolor sit amet consectetur, adipisicing elit. Itaque rem commodi culpa, sequi sunt repellendus porro et, quod libero iste provident necessitatibus illum expedita quas nobis pariatur. Aperiam, libero aspernatur!",
    location: "Moutundu",
    start_date: "Paid",
    end_date: "$450.00",
    modules: [
      { id: 1, value: "mod 1" },
      { id: 2, value: "mod 2" },
    ],
  },
  {
    id: 5,
    title:
      "Lorem 5 ipsum dolor sit amet consectetur, adipisicing elit. Itaque rem commodi culpa, sequi sunt repellendus porro et, quod libero iste provident necessitatibus illum expedita quas nobis pariatur. Aperiam, libero aspernatur!",
    location: "Minton",
    start_date: "Paid",
    end_date: "$550.00",
    modules: [
      { id: 1, value: "mod 1" },
      { id: 2, value: "mod 2" },
    ],
  },
  {
    id: 6,
    title:
      "Lorem 6 ipsum dolor sit amet consectetur, adipisicing elit. Itaque rem commodi culpa, sequi sunt repellendus porro et, quod libero iste provident necessitatibus illum expedita quas nobis pariatur. Aperiam, libero aspernatur!",
    location: "Minton",
    start_date: "Pending",
    end_date: "$200.00",
    modules: [
      { id: 1, value: "mod 1" },
      { id: 2, value: "mod 2" },
    ],
  },
  {
    id: 7,
    title:
      "Lorem 7 ipsum dolor sit amet consectetur, adipisicing elit. Itaque rem commodi culpa, sequi sunt repellendus porro et, quod libero iste provident necessitatibus illum expedita quas nobis pariatur. Aperiam, libero aspernatur!",
    location: "Minton",
    start_date: "Unpaid",
    end_date: "$300.00",
    modules: [
      { id: 1, value: "mod 1" },
      { id: 2, value: "mod 2" },
    ],
  },
];

export function TrainingList() {
  const router = useRouter();

  const getData = async () => {
    // if (error) {
    //   console.log(error);
    // }
    // console.log("data::::::::::: ", data);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>title</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trainings.map((training) => (
            <TableRow
              key={training.id}
              onClick={() =>
                router.push(
                  `${Route.formationProjectDetails}?id=${training.id}`
                )
              }
              className="cursor-pointer"
            >
              <TableCell className="font-medium">{training.id}</TableCell>
              <TableCell>{training.start_date}</TableCell>
              <TableCell>{training.end_date}</TableCell>
              <TableCell>{training.title}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="link"
                  className="text-green-700 hover:text-green-600"
                  title="Publier"
                  onClick={() => alert("Publié !!!!!!!!!!")}
                >
                  <Icon icon={{ icon: RiShare2Fill }} size={23} />
                </Button>
                <Button
                  variant="link"
                  className="text-blue-500 hover:text-blue-400"
                  title="Archive"
                  onClick={() => alert("Archivé !!!!!!!!!!")}
                >
                  <Icon icon={{ icon: IoMdArchive }} size={23} />
                </Button>
                <Button
                  variant="link"
                  className="text-red-500 hover:text-red-400"
                  title="Supprimer"
                  onClick={() => alert("Supprimé !!!!!!!!!!")}
                >
                  <Icon icon={{ icon: Trash2 }} size={23} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
