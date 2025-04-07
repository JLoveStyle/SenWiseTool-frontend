"use client";
import {
  ChapterMetaData,
  groupedColumns,
} from "@/components/atoms/colums-of-tables/chapter";
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
import { chapters, requirements } from "@/utiles/services/constants";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { Pencil, Settings, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { DeployableFormMetadata } from "@/components/atoms/colums-of-tables/deployableForm";
import { mutateUpApiData } from "@/utiles/services/mutations";
import { ProjectType } from "@/types/api-types";
import { Spinner } from "@/components/atoms/spinner/spinner";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

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

type Props = Promise<{ projectId: string }>;

export default function page(props: { params: Props }) {
  const params = use(props.params);
  const projectId = params.projectId;
  const router = useRouter();
  const projectDetails: ProjectType = LOCAL_STORAGE.get("project"); // Only for project title editoring
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [openEditForm, setOpenEditForm] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [displayChapOne, setDisplayChapOne] = useState<boolean>(true);
  const [displayChapTwo, setDisplayChapTwo] = useState<boolean>(false);
  const [displayChapThree, setDisplayChapThree] = useState<boolean>(false);
  const [displayChapFour, setDisplayChapFour] = useState<boolean>(false);
  const [displayChapFive, setDisplayChapFive] = useState<boolean>(false);
  const [displayChapSix, setDisplayChapSix] = useState<boolean>(false);
  const [projectData, setProjectData] = useState<Partial<ProjectType>>({
    title: projectDetails.title,
    id: projectDetails.id,
  });

  const [chap1, chap2, chap3, chap4, chap5, chap6] = requirements;
  const chapitre1 = chap1.content;
  const chapitre2 = chap2.content;
  const chapitre3 = chap3.content;
  const chapitre4 = chap4.content;
  const chapitre5 = chap5.content;
  const chapitre6 = chap6.content;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = {
      ...projectData,
      [event.target.name]: event.target.value,
    };
    setProjectData(data);
  };

  async function handleProjectSave() {
    console.log('projectData');
    // router.push();
  }

  async function handleProjectDraft() {
    // get data from localStorage
    const metaData: string[] = LOCAL_STORAGE.get("formMetadata");

    // Check if user has tick metadata
    if (!metaData?.length) {
      toast.warning("Veillez choisir les meta données du formulaire");
      setOpenSheet(true);
      return;
    }

    setIsSaving((prev) => !prev);

    let chapitre: any = [];
    let constructedRequirements: DeployableFormMetadata[] = [];
    for (let i = 0; i <= 10; i++) {
      chapitre.push(LOCAL_STORAGE.get(`chap_one_req${i}`));
      chapitre.push(LOCAL_STORAGE.get(`chap_two_req${i}`));
      chapitre.push(LOCAL_STORAGE.get(`chap_three_req${i}`));
      chapitre.push(LOCAL_STORAGE.get(`chap_four_req${i}`));
      chapitre.push(LOCAL_STORAGE.get(`chap_five_req${i}`));
      chapitre.push(LOCAL_STORAGE.get(`chap_six_req${i}`));
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
        certif_de_group: res[i].certif_de_group,
        number: res[i].num,
        comment: "",
      });
    }

    // Join constructedRequirements and metaData to form a single json object
    const finalJson = {
      metaData: metaData,
      requirements: constructedRequirements,
    };
    LOCAL_STORAGE.save("finalJson", finalJson);

    // router.push(Route.editProject + `/${projectId}/pdf`);

    for (let i = 0; i < 10; i++) {
      LOCAL_STORAGE.remove(`chap_one_req${i}`);
      LOCAL_STORAGE.remove(`chap_two_req${i}`);
      LOCAL_STORAGE.remove(`chap_three_req${i}`);
      LOCAL_STORAGE.remove(`chap_four_req${i}`);
      LOCAL_STORAGE.remove(`chap_five_req${i}`);
      LOCAL_STORAGE.remove(`chap_six_req${i}`);
    }

    // Make a patch request with the project id
    await mutateUpApiData(
      Route.projects,
      {
        project_structure: finalJson,
        title: projectData.title,
      },
      projectId
    )
      .then((response) => {

        if (response.status <= 205) {
          toast.success("Projet enregisté, redirection...", {
            transition: Bounce,
            autoClose: 3000,
          });
          router.push(Route.editProject + `/${projectId}/pdf`);
          setIsSaving((prev) => !prev);
        } else {
          toast.error("Une erreur est survenu au serveur. Veillez reessayer", {
            transition: Bounce,
            autoClose: 3000,
          });
          setIsSaving((prev) => !prev);
        }
      })
      .catch((error) => {
        toast.error("Une erreur est survenu au serveur. Veillez reessayer", {
          transition: Bounce,
          autoClose: 3000,
        });
        setIsSaving((prev) => !prev);
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
            TITRE PROJET
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
                  Annuler
                </Button>
                <Button onClick={handleProjectSave} className="px-6">
                  Brouillon
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
      <div className="flex justify-between px-9 bg-[#f7f6f6] py-4 w-full">
        <em className=" ">
          Cliquer sur <strong>Form metadata</strong> pour selectionner les metadonnées du projet
        </em>
        <div className="flex justify-between gap-10 ">
          <div
            onClick={() => setOpenEditForm((prev) => !prev)}
            className="flex gap-4 hover:cursor-pointer "
          >
            <Pencil />
            <p className="font-semibold">Editer projet</p>
          </div>
          <Dialog onOpenChange={setOpenEditForm} open={openEditForm}>
            <DialogContent>
              <VisuallyHidden.Root>
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
              </VisuallyHidden.Root>
              <EditProjectFormDatails
                project={projectData as ProjectType}
                onClick={function (val: boolean): void {
                  setOpenEditForm(val);
                }}
              />
            </DialogContent>
          </Dialog>
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
                  Style de formulaire
                </SheetTitle>
                <SheetDescription className="py-3">
                  Choisir les metadonnées du formulaire de votre projet.
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
                    if (chap === "Chapitre 1") {
                      setDisplayChapOne(true);
                      setDisplayChapTwo(false);
                      setDisplayChapThree(false);
                      setDisplayChapFour(false);
                      setDisplayChapFive(false);
                      setDisplayChapSix(false);
                    } else if (chap === "Chapitre 2") {
                      setDisplayChapOne(false);
                      setDisplayChapTwo(true);
                      setDisplayChapThree(false);
                      setDisplayChapFour(false);
                      setDisplayChapFive(false);
                      setDisplayChapSix(false);
                    } else if (chap === "Chapitre 3") {
                      setDisplayChapThree(true);
                      setDisplayChapOne(false);
                      setDisplayChapTwo(false);
                      setDisplayChapFour(false);
                      setDisplayChapFive(false);
                      setDisplayChapSix(false);
                    } else if (chap === "Chapitre 4") {
                      setDisplayChapThree(false);
                      setDisplayChapOne(false);
                      setDisplayChapTwo(false);
                      setDisplayChapFour(true);
                      setDisplayChapFive(false);
                      setDisplayChapSix(false);
                    } else if (chap === "Chapitre 5") {
                      setDisplayChapThree(false);
                      setDisplayChapOne(false);
                      setDisplayChapTwo(false);
                      setDisplayChapFour(false);
                      setDisplayChapFive(true);
                      setDisplayChapSix(false);
                    } else if (chap === "Chapitre 6") {
                      setDisplayChapThree(false);
                      setDisplayChapOne(false);
                      setDisplayChapTwo(false);
                      setDisplayChapFour(false);
                      setDisplayChapFive(false);
                      setDisplayChapSix(true);
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
          {displayChapFour && (
            <>
              {chapitre4?.map((chap, idx) => (
                <div key={idx}>
                  <h1 className="font-semibold pt-6">
                    {chap.numero} - {chap.title}
                  </h1>
                  <ChaptersRequirements
                    incomingColumns={groupedColumns}
                    incomingData={chap.content}
                    key2localStorage={`chap_four_req${idx}`}
                  />
                </div>
              ))}
            </>
          )}
          {displayChapFive && (
            <>
              {chapitre5?.map((chap, idx) => (
                <div key={idx}>
                  <h1 className="font-semibold pt-6">
                    {chap.numero} - {chap.title}
                  </h1>
                  <ChaptersRequirements
                    incomingColumns={groupedColumns}
                    incomingData={chap.content}
                    key2localStorage={`chap_five_req${idx}`}
                  />
                </div>
              ))}
            </>
          )}
          {displayChapSix && (
            <>
              {chapitre6?.map((chap, idx) => (
                <div key={idx}>
                  <h1 className="font-semibold pt-6">
                    {chap.numero} - {chap.title}
                  </h1>
                  <ChaptersRequirements
                    incomingColumns={groupedColumns}
                    incomingData={chap.content}
                    key2localStorage={`chap_six_req${idx}`}
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
