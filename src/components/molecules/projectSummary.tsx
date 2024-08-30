import { Project } from "@/types/gestion";
import {
  ChevronRight,
  ClipboardType,
  Eye,
  FilePenLine,
  UserRoundPlus,
} from "lucide-react";
import React from "react";

type Props = {
  projectObject: Project | undefined;
};

export default function ProjectSummary({ projectObject }: Props) {
  const lienRapide: { [key: string]: any } = [
    {
      firstIcon: <ClipboardType />,
      text: "Data collection",
      secondIcon: <ChevronRight />,
    },
    {
      firstIcon: <UserRoundPlus />,
      text: "Share project",
      secondIcon: <ChevronRight />,
    },
    {
      firstIcon: <FilePenLine />,
      text: "Edit form",
      secondIcon: <ChevronRight />,
    },
    {
      firstIcon: <Eye />,
      text: "View form",
      secondIcon: <ChevronRight />,
    },
  ];

  // console.log("here =>", projectObject);

  return (
    <div className="bg-[#f3f4f6] p-6 md:w-full flex justify-between gap-10 h-full">
      <div className="md:w-2/3">
        <p className="">Project details</p>
        <div className="bg-white md:w-full p-5 shadow">
          <div className="border-b pb-4">
            <span className="text-sm font-semibold text-gray-500">
              Description
            </span>
            <p className="">{projectObject?.description} </p>
          </div>
          <div className="flex justify-between md:w-full py-4 border-b ">
            <div className="flex md:w-[350px] justify-between">
              <div className="flex flex-col gap-2 py-2">
                <span className="text-sm text-gray-500 ">Status</span>
                <span className="bg-green-200 text-sm px-2 rounded-lg">
                  {projectObject?.status[0]}
                </span>
              </div>
              <div className="flex flex-col gap-2 py-2">
                <span className="text-sm text-gray-500 ">Questions</span>
                <span className="bg-green-200 text-sm px-2 rounded-lg">
                  {projectObject?.status[0]}
                </span>
              </div>
              <div className="flex flex-col gap-2 py-2">
                <span className="text-sm text-gray-500 ">Owner</span>
                <span className=" text-sm text-semibold">
                  {projectObject?.creator}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between md:w-full py-4 border-b ">
            <div className="flex md:w-[350px] justify-between">
              <div className="flex flex-col gap-2 py-2">
                <span className="text-sm text-gray-500 ">Last update</span>
                <span className=" text-sm rounded-lg">
                  {projectObject?.updated_at}
                </span>
              </div>
              <div className="flex flex-col gap-2 py-2">
                <span className="text-sm text-gray-500 ">Last deployment</span>
                <span className=" text-sm rounded-lg">
                  {projectObject?.deployed_at}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between md:w-full pt-4">
            <div className="flex md:w-[350px] justify-between">
              <div className="flex flex-col gap-2 py-2">
                <span className="text-sm text-gray-500 ">Country</span>
                <span className=" text-sm rounded-lg">
                  {projectObject?.country}
                </span>
              </div>
              <div className="flex flex-col gap-2 py-2">
                <span className="text-sm text-gray-500 ">Business sector</span>
                <span className=" text-sm rounded-lg">
                  {projectObject?.deployed_at}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RAPID LINKS */}
      <div className="md:w-1/3">
        <p className="">Links</p>
        <div className="bg-white px-5 shadow">
          {lienRapide.map((link: any, index: number) => (
            <div
              key={index}
              className="hover:cursor-pointer gap-4 flex justify-between py-2 border-b hover:text-lg"
            >
              <div className="flex gap-4">
                <div className="">{link.firstIcon}</div>
                <p>{link.text}</p>
              </div>
              <div className="">{link.secondIcon}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
