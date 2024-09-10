"use client";
import { groupedColumns } from "@/components/atoms/colums-of-tables/chapter";
import { Logo } from "@/components/atoms/logo";
import { ChaptersRequirements } from "@/components/molecules/chapters-table-data/chapterOne";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Route } from "@/lib/route";
import { Project } from "@/types/gestion";
import { chapter2, chapters, requirements } from "@/utiles/services/constants";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { Library, Pencil, Settings, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";
import ProjectDetailsForm from "@/components/organisms/projectFormDetails/createForm";
import EditProjectFormDatails from "@/components/organisms/projectFormDetails/edit";

const AddFormFromLibrary = dynamic(
  () => import("@/components/molecules/addFormFromLibrary"),
  {
    ssr: false,
  }
);

type Props = {};

export default function page({}: Props) {
  const router = useRouter();
  const projectDetails: Project = LOCAL_STORAGE.get("project_data"); // Only for project title editoring
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [openEditForm, setOpenEditForm] = useState<boolean>(false);
  const [exit, setExit] = useState<boolean>(false);
  const [displayChapOne, setDisplayChapOne] = useState<boolean>(true);
  const [displayChapTwo, setDisplayChapTwo] = useState<boolean>(false);
  const [displayChapThree, setDisplayChapThree] = useState<boolean>(false);
  const [projectData, setProjectData] = useState<Project>({
    id: projectDetails.id,
    sector_activity: projectDetails.sector_activity,
    city: projectDetails.city,
    country: projectDetails.country,
    status: ["DRAFT"],
    state: projectDetails.state,
    title: projectDetails.title,
    description: projectDetails.description,
  });

  const [chap1, chap2, chap3] = requirements;
  const chapitre1 = chap1.chapter1;
  const chapitre2 = chap2.chapitre2;
  const chapitre3 = chap3.chapitre3;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data: Project = {
      ...projectData,
      [event.target.name]: event.target.value,
    };
    setProjectData(data);
    console.log("pro =>", projectData);
  };

  async function handleProjectSave() {
    console.log(projectData);
  }

  async function handleProjectDraft() {
    router.push(Route.editProject + "/45/pdf");
  }

  const discartProjectForm = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("chap_one_req");
      localStorage.removeItem("chap_two_req");
    }
    toast.success("Discarded", {
      autoClose: 1000,
      transition: Bounce,
    });
    router.push(Route.inspectionInterne);
  };

  return (
    <div>
      <nav className="flex gap-10 justify-between px-3 bg-tertiary shadow-md z-50 py-2 w-full">
        <Link href={Route.home}>
          <Logo size="very-large" />
        </Link>
        <div className="flex flex-col my-auto md:w-[80%]">
          <label htmlFor="projectTitle" className="font-semibold">
            PROJECT
          </label>
          <input
            type="text"
            required
            name="projectTitle"
            value={projectData.title}
            onChange={(e) => handleInputChange(e)}
            className="border mt-1 p-1 w-[95%] md:w-full bg-transparent outline-none focus:border-primary shadow-sm rounded-md"
          />
        </div>
        <div className="flex justify-between my-auto md:w-[140px] pr-3 gap-2">
          <Button onClick={handleProjectDraft} className=" px-6">
            Save
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <X className="my-auto hover:cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader className="px-5 py-3">
                <DialogTitle>Exit project form</DialogTitle>
                <DialogDescription className="py-3">
                  Make sure you save your project form as draft before exiting
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end items-center space-x-2 bg-white px-5 pb-5">
                <Button
                  onClick={discartProjectForm}
                  className="text-red-500 bg-white border border-red-500 hover:bg-[#ef44441e]"
                >
                  Discart
                </Button>
                <Button onClick={handleProjectSave} className="px-6">
                  Draft
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
      <div className="flex justify-between px-9 bg-[#f7f6f6] py-4 w-full">
        <em className=" ">
          Click on <strong>Form metadata</strong> to select form metadata
        </em>
        <div className="flex justify-between gap-10 d">
          <div
            onClick={() => setOpenEditForm((prev) => !prev)}
            className="flex gap-4 hover:cursor-pointer "
          >
            <Pencil />
            <p className="font-semibold">Edit project</p>
          </div>
          <Dialog onOpenChange={setOpenEditForm} open={openEditForm}>
            <DialogContent>
              <EditProjectFormDatails
                project={projectData}
                onClick={function (val: boolean): void {
                  setOpenEditForm(val);
                }}
              />
            </DialogContent>
          </Dialog>
          <div className="flex gap-4 hover:cursor-pointer ">
            <Library />
            <p className="font-semibold">Add from library</p>
          </div>

          <div
            onClick={() => setOpenSheet((prev) => !prev)}
            className="flex gap-4 hover:cursor-pointer"
          >
            <Settings />
            <p className="font-semibold">Form metadata</p>
          </div>
          <Sheet
            onOpenChange={() => setOpenSheet((prev) => !prev)}
            open={openSheet}
          >
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="uppercase font-bold">
                  Form style
                </SheetTitle>
                <SheetDescription className="py-3">
                  Choose the metadata of your project form.
                </SheetDescription>
              </SheetHeader>
              <AddFormFromLibrary isSubmitting={openSheet} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* REQUIREMENTS SELECTION FROM THE LIST OF REQUIREMENTS OF RAINFOREST ALIANCE */}
      <div className="">
        <div className="container mx-auto py-6">
          <Tabs
            defaultValue={chapters[0]}
            className="md:w-[800px] flex justify-center mx-auto"
          >
            <TabsList className="grid w-full grid-cols-6">
              {chapters.map((chap: string, index: number) => (
                <TabsTrigger
                  key={index}
                  value={chap}
                  onClick={() => {
                    if (chap === "Chapter 1") {
                      setDisplayChapOne(true);
                      setDisplayChapTwo(false);
                      setDisplayChapThree(false);
                    } else if (chap === "Chapter 2") {
                      setDisplayChapOne(false);
                      setDisplayChapTwo(true);
                      setDisplayChapThree(false);
                    } else if (chap === "Chapter 3") {
                      setDisplayChapThree(true);
                      setDisplayChapOne(false);
                      setDisplayChapTwo(false);
                    }
                  }}
                >
                  {chap}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {displayChapOne && (
            <>
              {chapitre1?.map((chap, idx) => (
                <div key={idx}>
                  <h1 className="font-semibold pt-6">
                    {chap.numero} - {chap.title}
                  </h1>
                  <ChaptersRequirements
                    incomingColumns={groupedColumns}
                    incomingData={chap.content}
                    key2localStorage="chap_one_req"
                  />
                </div>
              ))}
            </>
          )}
          {displayChapTwo && (
            <>
              {chapitre2?.map((chap, idx) => (
                <div key={idx}>
                  <h1 className="font-semibold pt-6">
                    {chap.numero} - {chap.title}
                  </h1>
                  <ChaptersRequirements
                    incomingColumns={groupedColumns}
                    incomingData={chap.content}
                    key2localStorage="chap_two_req"
                  />
                </div>
              ))}
            </>
          )}
          {displayChapThree && (
            <>
              {chapitre3?.map((chap, idx) => (
                <div key={idx}>
                  <h1 className="font-semibold pt-6">
                    {chap.numero} - {chap.title}
                  </h1>
                  <ChaptersRequirements
                    incomingColumns={groupedColumns}
                    incomingData={chap.content}
                    key2localStorage="chap_three_req"
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}