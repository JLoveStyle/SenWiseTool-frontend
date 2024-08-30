"use client";
import { column } from "@/components/atoms/columnsProject";
import { Logo } from "@/components/atoms/logo";
import AddFormFromLibrary from "@/components/molecules/addFormFromLibrary";
import { DataTable } from "@/components/molecules/data-table";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Route } from "@/lib/route";
import { Project, ProjectDetails } from "@/types/gestion";
import {
  chapter2,
  chapterData,
  chapters,
  requirements,
} from "@/utiles/services/constants";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { Library, Settings, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

export default function page({}: Props) {
  const router = useRouter()
  const projectDetails: Project = LOCAL_STORAGE.get("project_data");
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [displayChapOne, setDisplayChapOne] = useState<boolean>(true);
  const [displayChapTwo, setDisplayChapTwo] = useState<boolean>(false);
  const [displayChapThree, setDisplayChapThree] = useState<boolean>(false);
  const [projectData, setProjectData] = useState<Project>({
    sector_activity: projectDetails.sector_activity,
    city: projectDetails.city,
    country: projectDetails.country,
    status: ['DRAFT'],
    state: projectDetails.state,
    title: projectDetails.title,
    description: projectDetails.description,
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data: Project = {
      ...projectData,
      [event.target.name]: event.target.value,
    };
    setProjectData(data);
  };

  async function handleProjectSave() {
    console.log(projectData);
  }

  useEffect(() => {
    console.log(requirements);
  }, []);

  return (
    <div className="">
      <nav className="flex gap-10 justify-between px-3 bg-tertiary shadow-md z-50 py-2 w-screen">
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
            value={projectData.title}
            onChange={(e) => handleInputChange(e)}
            className="border mt-1 p-1 w-[95%] md:w-full bg-transparent outline-none focus:border-primary shadow-sm rounded-md"
          />
        </div>
        <div className="flex gap-6 my-auto pr-5 md:w-[10%]">
          <Button onClick={handleProjectSave} className="md:w-[100px] px-6">
            Save
          </Button>
          <X onClick={() => router.push(Route.inspectionInterne)} className="my-auto hover:cursor-pointer" />
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

      {/* REQUIREMENTS SELECTION FROM THE LIST OF REQUIREMENTS OF RAINFOREST ALIANCE */}
      <div className="">
        <div className="container mx-auto py-10">
          <Tabs
            defaultValue={chapters[0]}
            className="w-[400px] flex justify-center mx-auto"
          >
            <TabsList className="grid w-full grid-cols-3">
              {chapters.map((chap: string, index: number) => (
                <TabsTrigger
                  key={index}
                  value={chap}
                  onClick={() => {
                    setDisplayChapTwo((prev) => !prev);
                    setDisplayChapOne((prev) => !prev);
                  }}
                >
                  {chap}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {displayChapOne && (
            <>
              <h1 className="font-semibold">1.1 - Gestion</h1>
              <DataTable columns={column} data={chapterData} />
            </>
          )}
          {displayChapTwo && (
            <>
              <h1 className="font-semibold">2.1 - Traçabilité</h1>

              <DataTable columns={column} data={chapter2} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
