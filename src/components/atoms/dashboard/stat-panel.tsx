"use client";
import { DashboardStatPanelData } from "@/types/app-link";
import { useState } from "react";
import NewForm from "./forms/new-form";

type Props = {
  newForm?: React.ReactNode;
  statPanelDatas?: DashboardStatPanelData[];
};

export default function StatPanel({ newForm, statPanelDatas }: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className="bg-[#f7f6f6] w-fit h-screen px-5 pt-2 shadow-lg">
      <div className="flex flex-col gap-3 p-2">
        <NewForm form={newForm} />
        <div className="flex flex-col gap-5 p-2">
          {statPanelDatas?.map((data) => (
            <div className="flex justify-between gap-2 hover:cursor-pointer">
              <div className="flex gap-2 flex-1 ">
                {data.structure.icon && <data.structure.icon />}
                <p className="font-semibold">{data.structure.label}</p>
              </div>
              <span className="bg-white rounded-full h-fit w-fit px-2 py-[2px] ">
                {data.data()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
