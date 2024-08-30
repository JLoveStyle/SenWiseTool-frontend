"use client"
import React, { useInsertionEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Project } from "@/types/gestion";
import { useRouter } from "next/navigation";
import { Route } from "@/lib/route";
import { LOCAL_STORAGE } from "@/utiles/services/storage";

type Props = {
  tableHead: string[];
  tableRaw: Project[];
};

export default function CustomTable({ tableHead, tableRaw }: Props) {
  const router = useRouter()

  if (!tableRaw.length) {
    return (
      <div className="flex flex-col gap-4 items-center">
        <h1 className="font-semibold">You haven't creat any project yet.</h1>
        <p className="">Click on <strong>New form </strong> to create a project</p>
      </div>
    )
  }

  return (
    <Table>
      <TableCaption>Internal inspections projects.</TableCaption>
      <TableHeader>
        <TableRow>
          {tableHead.map((item, index) => (
            <TableHead
              className={
                index === 0
                  ? "md:w-[500px]"
                  : index === tableHead.length - 1
                  ? "text-right "
                  : ""
              }
              key={index}
            >
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableRaw.map((item) => (
          <TableRow key={item.id}>
            <TableCell
              onClick={() => {
                router.push(Route.inspectionInterne+`/${item.id}`)
                LOCAL_STORAGE.save("projectId", item.id)
              }}
              className="font-medium hover:cursor-pointer hover:underline"
            >
              {item.title}
            </TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.creator}</TableCell>
            <TableCell>{item.updated_at}</TableCell>
            <TableCell>{item.deployed_at}</TableCell>
            <TableCell className="text-right">{item.start_date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
