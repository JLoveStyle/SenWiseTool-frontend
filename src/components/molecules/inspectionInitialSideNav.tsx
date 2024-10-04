import React from "react";
import { Button } from "../ui/button";
import { Archive, FilePenLine, Rocket } from "lucide-react";
import { tableRaw } from "@/utiles/services/constants";

type Props = {};

export default function InspectionInitialSideNav({}: Props) {
  return (
    <div className="bg-[#f7f6f6] w-fit h-screen px-5 pt-20 shadow-lg">
      <div className="flex flex-col gap-5">
        <Button className="px-10">New Form</Button>
        <div className="flex gap-2 hover:cursor-pointer">
          <div className="flex gap-2 flex-1">
            <Rocket />
            <p className="font-semibold">Deployed</p>
          </div>
          <span className="bg-white rounded-full h-1 w-1">0</span>
        </div>
        <div className="flex gap-2 hover:cursor-pointer">
          <div className="flex gap-2 flex-1">
            <FilePenLine />
            <p className="font-semibold">Draft</p>
          </div>
          <span className="bg-white rounded-full h-1 w-1">{tableRaw.length}</span>
        </div>
        <div className="flex gap-2 hover:cursor-pointer">
          <div className="flex gap-2 flex-1">
            <Archive />
            <p className="font-semibold">Archive</p>
          </div>
          <span className="bg-white rounded-full h-1 w-1">0</span>
        </div>
      </div>
    </div>
  );
}