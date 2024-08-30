import { LayoutTemplate, PenLine } from "lucide-react";
import React, { useState } from "react";

type Props = {
  onClick: (value1: boolean, value2: boolean) => void;
};

export default function CreateProjectOptions({ onClick }: Props) {
  const [constructForm, setConstructForm] = useState<boolean>(true);
  const [projectForm, setProjectform] = useState<boolean>(false);

  return (
    <div className="w-full md:h-[450px] bg-white rounded-lg">
      <div className="flex h-[80px] bg-primary justify-between rounded-t-lg">
        <h1 className="text-xl p-4 font-semibold text-white">
          Create a project: Choose source
        </h1>
      </div>
      <div className="p-2 ">
        <em className="">
          Please select one of the options below to continue. You will be asked
          to enter your name and the other following steps
        </em>
        <div className="flex justify-center gap-4 pt-20">
          <div
            onClick={() => onClick(constructForm, projectForm)}
            className="rounded-[12px] bg-[#e7e9ee] w-[250px] h-[150px] flex gap-2 flex-col justify-center my-auto hover:cursor-pointer hover:shadow-md"
          >
            <PenLine className="flex justify-center mx-auto" />
            <p className="text-center font-semibold text-lg">
              Construct a form
            </p>
          </div>
          <div className="rounded-[12px] bg-[#e7e9ee] w-[250px] h-[150px] flex gap-2 flex-col justify-center my-auto hover:cursor-pointer hover:shadow-md">
            <LayoutTemplate className="flex justify-center mx-auto" />
            <p className="text-center font-semibold text-lg">
              Use a pre-defined model
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
