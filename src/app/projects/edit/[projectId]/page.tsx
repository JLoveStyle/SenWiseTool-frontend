"use client";
import { Logo } from "@/components/atoms/logo";
import AddFormFromLibrary from "@/components/molecules/addFormFromLibrary";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ProjectDetails } from "@/types/gestion";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { Library, Settings, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

export default function page({}: Props) {
  const projectDetails: ProjectDetails = LOCAL_STORAGE.get("project_data");
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [projectData, setProjectData] = useState<ProjectDetails>({
    business_sector: projectDetails.business_sector,
    city: projectDetails.city,
    country: projectDetails.country,
    state: projectDetails.state,
    projectTitle: projectDetails.projectTitle,
    description: projectDetails.description,
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data: ProjectDetails = {
      ...projectData,
      [event.target.name]: event.target.value,
    };
    setProjectData(data);
  };

  async function handleProjectSave() {
    console.log(projectData);
  }
  return (
    <div className="">
      <nav className="flex justify-between px-3 bg-tertiary shadow-md z-50 py-2 w-screen">
        <Link href="">
          <Logo size="very-large" />
        </Link>
        <div className="flex flex-col my-auto md:w-[80%]">
          <label htmlFor="projectTitle" className="font-semibold">
            PROJECT
          </label>
          <input
            type="text"
            placeholder="Project name"
            required
            name="projectTitle"
            value={projectData.projectTitle}
            onChange={(e) => handleInputChange(e)}
            className="border mt-1 p-1 w-[95%] md:w-full bg-transparent outline-none focus:border-primary shadow-sm rounded-md"
          />
        </div>
        <div className="flex gap-6 my-auto pr-5 md:w-[10%]">
          <Button onClick={handleProjectSave} className="md:w-[100px] px-6">
            Save
          </Button>
          <X className="my-auto hover:cursor-pointer" />
        </div>
      </nav>
      <div className="flex justify-between px-9 bg-[#f7f6f6] py-4">
        <div className=" "></div>
        <div className="flex justify-between gap-10 d">
          <div className="flex gap-4 hover:cursor-pointer ">
            <Library />
            <p className="font-semibold">Add from library</p>
          </div>
          
          <div
            onClick={() => setOpenSheet((prev) => !prev)}
            className="flex gap-4 hover:cursor-pointer"
          >
            <Settings />
            <p className="font-semibold">Layout &amp; Settings</p>
          </div>
          <Sheet
            onOpenChange={() => setOpenSheet((prev) => !prev)}
            open={openSheet}
          >
            <SheetContent>
              <AddFormFromLibrary />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
