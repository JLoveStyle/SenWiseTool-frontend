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
import { chapters, requirements } from "@/utiles/services/constants";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { Library, Pencil, Settings, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import ProjectDetailsForm from "@/components/organisms/projectFormDetails/createForm";
// import EditProjectFormDatails from "@/components/organisms/projectFormDetails/edit";
import { DeployableFormMetadata } from "@/components/atoms/colums-of-tables/deployableForm";
import { mutateUpApiData } from "@/utiles/services/mutations";
import { ProjectStatus, ProjectType } from "@/types/api-types";
import { Spinner } from "@/components/atoms/spinner/spinner";

const AddFormFromLibrary = dynamic(
  () => import("@/components/molecules/addFormFromLibrary"),
  {
    ssr: false,
  }
);
const EditProjectFormDatails = dynamic(
  () => import("@/components/organisms/projectFormDetails/edit"),
  {
    ssr: false,
  }
);

type Props = {
  params: {
    projectId: string;
  };
};

export default function page({ params: { projectId } }: Props) {
  const router = useRouter();
  const projectDetails: ProjectType = LOCAL_STORAGE.get("project"); // Only for project title editoring
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [openEditForm, setOpenEditForm] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [displayChapOne, setDisplayChapOne] = useState<boolean>(true);
  const [displayChapTwo, setDisplayChapTwo] = useState<boolean>(false);
  const [displayChapThree, setDisplayChapThree] = useState<boolean>(false);
  const [projectData, setProjectData] = useState<Partial<ProjectType>>({
    title: projectDetails.title,
    id: projectDetails.id,
    description: projectDetails.description,
    start_date: projectDetails.start_date,
    end_date: projectDetails.end_date,
    sector_activity: projectDetails.sector_activity,
    country: projectDetails.country,
    city: projectDetails.city,
    region: projectDetails.region,
  });

  const [chap1, chap2, chap3] = requirements;
  const chapitre1 = chap1.chapter1;
  const chapitre2 = chap2.chapitre2;
  const chapitre3 = chap3.chapitre3;

  // Fetch all requirements
  useEffect(() => {
    // function to fetch all requirements and per chapters
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = {
      ...projectData,
      [event.target.name]: event.target.value,
    };
    setProjectData(data);
    console.log("pro =>", projectData);
  };

  async function handleProjectSave() {
    console.log(projectData);
    // router.push();
  }

  async function handleProjectDraft() {
    setIsSaving((prev) => !prev);
    // get data from localStorage
    const id = LOCAL_STORAGE.get("projectId");
    const metaData: string[] = LOCAL_STORAGE.get("formMetadata");
    let chapitre: any = [];
    let constructedRequirements: DeployableFormMetadata[] = [];
    for (let i = 0; i <= 5; i++) {
      chapitre.push(LOCAL_STORAGE.get(`chap_one_req${i}`));
      chapitre.push(LOCAL_STORAGE.get(`chap_two_req${i}`));
      chapitre.push(LOCAL_STORAGE.get(`chap_three_req${i}`));
    }
    // remove undefined items in the array
    const res = chapitre.filter((item: any) => item !== undefined).flat();

    // construct an array of objects of type DeployableMetadata[]
    for (let i = 0; i < res.length; i++) {
      constructedRequirements.push({
        status: {
          NA: false,
          NC: false,
          C: false,
        },
        principal_requirement: res[i].principal_requirement,
        certication_de_group: res[i].certication_de_group,
        number: res[i].number,
        comment: "",
      });
    }

    // Join constructedRequirements and metaData to form a single json object
    const finalJson = {
      metaData: metaData,
      requirements: constructedRequirements,
    };
    LOCAL_STORAGE.save("finalJson", finalJson);
    console.log("finalJson =>", finalJson);

    // router.push(Route.editProject + `/${projectId}/pdf`);

    for (let i = 0; i < 5; i++) {
      LOCAL_STORAGE.remove(`chap_one_req${i}`);
      LOCAL_STORAGE.remove(`chap_two_req${i}`);
      LOCAL_STORAGE.remove(`chap_three_req${i}`);
    }

    // Make a patch request with the project id
    await mutateUpApiData(
      Route.projects,
      {
        project_structure: finalJson,
      },
      projectId
    )
      .then((response) => {
        console.log("here is the response", response);

        if (response.status <= 205) {
          toast.success("Project saved", {
            transition: Bounce,
            autoClose: 1000,
          });
          router.push(Route.editProject + `/${projectId}/pdf`);
          setIsSaving((prev) => !prev);
        } else {
          toast.error("Something went wrong. Please try again", {
            transition: Bounce,
            autoClose: 1000,
          });
          setIsSaving((prev) => !prev);
        }
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again", {
          transition: Bounce,
          autoClose: 1000,
        });
        setIsSaving((prev) => !prev);
        console.log("An error occured", error);
      });
  }

  const discartProjectForm = () => {
    for (let i = 0; i < 5; i++) {
      LOCAL_STORAGE.remove(`chap_one_req${i}`);
      LOCAL_STORAGE.remove(`chap_two_req${i}`);
      LOCAL_STORAGE.remove(`chap_three_req${i}`);
    }
    router.push(Route.dashboard); // conditionally
    toast.success("Discarded", {
      autoClose: 1000,
      transition: Bounce,
    });
  };

  return (
    <div>
      <nav className="flex gap-10 justify-between px-3 bg-tertiary shadow-md z-50 py-2 w-full text-gray-100">
        <Link href={Route.home}>
          <Logo size="very-large" />
        </Link>
        <div className="flex my-auto md:w-[80%] items-center gap-5">
          <label htmlFor="projectTitle" className="font-semibold">
            PROJECT TITLE
          </label>
          <div className="flex-1">
            <input
              type="text"
              required
              name="title"
              value={projectData.title}
              onChange={(e) => handleInputChange(e)}
              className="border mt-1 p-1 w-[95%] md:w-full bg-transparent outline-none focus:border-primary shadow-sm rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-between my-auto md:w-[140px] pr-3 gap-2">
          <Button
            onClick={handleProjectDraft}
            className={isSaving ? "hover:cursor-wait opacity-70 px-4" : " px-6"}
          >
            {isSaving ? <Spinner /> : "Save"}
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
        <div className="flex justify-between gap-10 ">
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
                project={projectData as ProjectType}
                onClick={function (val: boolean): void {
                  setOpenEditForm(val);
                }}
              />
            </DialogContent>
          </Dialog>
          {/* <div className="flex gap-4 hover:cursor-pointer ">
            <Library />
            <p className="font-semibold">Add from library</p>
          </div> */}

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
                    key2localStorage={`chap_one_req${idx}`}
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
                    key2localStorage={`chap_two_req${idx}`}
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
                    key2localStorage={`chap_three_req${idx}`}
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