"use client";
import { Route } from "@/lib/route";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { Dialog } from "@radix-ui/react-dialog";
import { Archive, FilePenLine, Rocket } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import CreateProjectOptions from "./createProjectOptions";
import ProjectDetailsForm from "./projectFormDetails/createForm";
import { ProjectsType, ProjectType, TrainingType } from "@/types/api-types";

type Props = {
  typeOfProject: ProjectsType;
  projectsPerType: ProjectType[] | TrainingType[];
  newForm?: React.ReactNode;
};

export default function CloseSiveNav({
  typeOfProject,
  projectsPerType,
  newForm,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [showDeployed, setShowDeployed] = useState<boolean>(false);
  const [showDraft, setShowDraft] = useState<boolean>(false);
  const [showArchive, setShowArchive] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showProjectDetailsForm, setShowProjectDetailsForm] =
    useState<boolean>(false);
  const [showProjectOptions, setShowProjectOptions] = useState<boolean>(false);

  const handleOpenProjectOptions = (value: boolean, value2: boolean) => {
    setShowProjectDetailsForm(value);
    setShowProjectOptions(value2);
  };

  const closeModal = (val: boolean) => {
    setOpenModal(val);
  };

  const handleShowProjectDetails = (value1: boolean, value2: boolean) => {
    setShowProjectDetailsForm(value1);
    setShowProjectOptions(value2);
  };

  const draftProjects = projectsPerType?.filter(
    (item) => item.status === "DRAFT"
  );
  const deployedProjects = projectsPerType?.filter(
    (item) => item.status === "DEPLOYED"
  );
  const archiveProjects = projectsPerType?.filter(
    (item) => item.status === "ARCHIVED"
  );

  return (
    <div
      className={
        pathname.includes("/details") || pathname.includes("/mapping/") // Hide this component on the detail page
          ? "hidden"
          : "bg-[#f7f6f6] w-fit h-screen px-5 pt-2 shadow-lg"
      }
      // className="bg-gray-100 h-screen"
    >
      <div className="flex flex-col gap-3 p-2">
        {pathname.includes("/training") ? (
          newForm
        ) : (
          <Button
            onClick={() => {
              setOpenModal((prev) => !prev);
              setShowProjectOptions((prev) => !prev);
            }}
            className="px-10 mb-4"
          >
            New Form
          </Button>
        )}
        <Dialog
          onOpenChange={() => {
            setOpenModal((prev) => !prev);
            setShowProjectOptions((prev) => !prev);
          }}
          open={openModal}
        >
          <DialogContent className="sm:max-w-[800px]">
            <VisuallyHidden.Root>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
            </VisuallyHidden.Root>
            {showProjectDetailsForm && (
              <ProjectDetailsForm
                closeModal={closeModal}
                onClick={handleShowProjectDetails}
                typeOfProject={typeOfProject}
              />
            )}
            {showProjectOptions && (
              <CreateProjectOptions onClick={handleOpenProjectOptions} />
            )}
          </DialogContent>
        </Dialog>
        <div className="flex justify-between gap-2 hover:cursor-pointer">
          <div
            onClick={() => {
              setShowDeployed((prev) => !prev);
              setShowArchive(false);
              setShowDraft(false);
            }}
            className="flex gap-2 flex-1 "
          >
            <Rocket />
            <p className="font-semibold">Deployed</p>
          </div>
          <span className="bg-white rounded-full h-fit w-fit px-2 py-[2px] ">
            {deployedProjects?.length}
          </span>
        </div>
        <div className="max-h-[200px] overflow-y-auto">
          {deployedProjects?.map((item) => (
            <p
              key={item.id}
              onClick={() => {
                LOCAL_STORAGE.save("projectId", item.id);
                router.push(Route.details + `/${item.id}`);
              }}
              className={
                showDeployed
                  ? "flex hover:underline hover:cursor-pointer"
                  : "hidden"
              }
            >
              {item.title.slice(0, 20)}
            </p>
          ))}
        </div>
        <div className="flex gap-2 hover:cursor-pointer">
          <div
            onClick={() => {
              setShowDeployed(false);
              setShowArchive(false);
              setShowDraft((prev) => !prev);
            }}
            className="flex gap-2 flex-1"
          >
            <FilePenLine />
            <p className="font-semibold">Draft</p>
          </div>
          <span className="bg-white rounded-full h-fit w-fit px-2 py-[2px]">
            {draftProjects?.length}
          </span>
        </div>
        <div className="max-h-[200px] overflow-y-auto">
          {draftProjects?.map((item, index) => (
            <p
              key={index}
              onClick={() => {
                LOCAL_STORAGE.save("projectId", item.id);
                router.push(Route.details + `/${item.id}`);
              }}
              className={
                showDraft
                  ? "flex hover:underline hover:cursor-pointer"
                  : "hidden"
              }
            >
              {item.title.slice(0, 20)}
            </p>
          ))}
        </div>
        <div className="flex gap-2 hover:cursor-pointer">
          <div
            onClick={() => {
              setShowDeployed(false);
              setShowArchive((prev) => !prev);
              setShowDraft(false);
            }}
            className="flex gap-2 flex-1"
          >
            <Archive />
            <p className="font-semibold">Archive</p>
          </div>
          <span className="bg-white rounded-full h-fit w-fit px-2 py-[2px]">
            {archiveProjects?.length}
          </span>
        </div>
        <div className="max-h-[200px] overflow-y-auto">
          {archiveProjects?.map((item) => (
            <p
              onClick={() => {
                LOCAL_STORAGE.save("projectId", item.id);
                router.push(Route.details + `/${item.id}`);
              }}
              className={
                showArchive
                  ? "flex hover:underline hover:cursor-pointer"
                  : "hidden"
              }
            >
              {item.title.slice(0, 20)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
