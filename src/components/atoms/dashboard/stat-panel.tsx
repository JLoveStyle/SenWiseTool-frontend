"use client";
import { DashboardStatPanelData } from "@/types/app-link";
import { NewFormProps } from "@/types/dashboard/form";
import { dasboardFormParams } from "@/types/formData";
import { useState } from "react";
import FormLayout from "./forms/form-layout";

type Props = {
  newForms?: NewFormProps[];
  formParams?: dasboardFormParams;
  statPanelDatas?: DashboardStatPanelData[];
  isCloseModal?: boolean;
  className?: string;
};

export default function StatPanel({
  newForms,
  statPanelDatas,
  formParams,
  isCloseModal,
  className,
}: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div
      className={`bg-[#f7f6f6] w-fit h-screen px-1 pt-2 shadow-lg ${className}`}
    >
      <div className="flex flex-col gap-3 p-2">
        {newForms && (
          <FormLayout
            isCloseModal={isCloseModal}
            forms={newForms}
            formParams={formParams}
          />
        )}

        {statPanelDatas && (
          <div className="flex flex-col gap-5 p-2">
            {statPanelDatas?.map((data, index) => (
              <div
                key={index}
                className="flex justify-between gap-2 hover:cursor-pointer"
              >
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
        )}
      </div>
    </div>
  );
}
