"use client";
import React, { useState } from "react";
import CardLayout from "../templates/cardLayout";
import { Button } from "../ui/button";
import { Spinner } from "../atoms/spinner/spinner";
import { ModuleProps } from "@/types/formData";
import InputField from "./inputField";
import { RxCross2 } from "react-icons/rx";
import { mutateDelApiData, mutateUpApiData } from "@/utiles/services/mutations";
import { Route } from "@/lib/route";
import { Bounce, toast } from "react-toastify";
import { ApiDataResponse, ProjectType } from "@/types/api-types";

type Props = {
  shareProject: boolean;
  archiveProject: boolean;
  deleteProject: boolean;
  projects: ProjectType[];
  closeDialog: (value: boolean) => void;
};

export default function ActionComponent({
  shareProject,
  deleteProject,
  archiveProject,
  projects,
  closeDialog,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emails, setEmails] = useState<ModuleProps[]>([]);
  const [email, setEmail] = useState<ModuleProps>();

  const allId: string[] = [];

  for (const project of projects) {
    if (project.status !== "ARCHIVED") {
      allId.push(project.id as string);
    }
  }

  // DELETE PROJECT
  async function handleDeleteProject() {
    setIsLoading((prev) => !prev);

    for (const project of projects) {
      await mutateDelApiData<ApiDataResponse<ProjectType>>(
        Route.projects,
        project?.id
      )
        .then((res) => {
          if (res && res?.status <= 205) {
            toast.success("Deleted", {
              transition: Bounce,
              autoClose: 3000,
            });

            setIsLoading((prev) => !prev);
          } else {
            toast.error("Something went wrong", {
              transition: Bounce,
              autoClose: 3000,
            });
            setIsLoading((prev) => !prev);
            closeDialog(false); // close dialogue
          }
        })
        .catch((error) => {
          console.log("An error occured while deleting project", error);
          setIsLoading((prev) => !prev);
          toast.error("Something went wrong. Please try again", {
            transition: Bounce,
            autoClose: 3000,
          });
        });
    }
  }

  // SHARE PROJECT
  async function handleShareProject() {
    setIsLoading((prev) => !prev);
  }

  // ARCHIVE PROJECT
  async function handleArchiveProject() {
    if (!allId.length) {
      toast.warning('Projet(s) deja archivé')
      closeDialog(false)
      return
    }
    setIsLoading((prev) => !prev);

    await mutateUpApiData(
      Route.projects,
      {
        status: "ARCHIVED",
      },
      // projects[0]?.id
      `${allId}`
    )
      .then((res) => {
        if (res.status <= 205) {
          closeDialog(false);
          toast.success("Project archived", {
            transition: Bounce,
            autoClose: 3000,
          });
          setIsLoading(false);
        } else {
          toast.error("Something went wrong.", {
            transition: Bounce,
            autoClose: 3000,
          });
          setIsLoading(false);
          closeDialog(false); // close dialogue
        }
      })
      .catch((error) => {
        console.log("An error occured while archiving project", error);
        setIsLoading(false);
        toast.error("Fail to archive project. Please try again", {
          transition: Bounce,
          autoClose: 3000,
        });
      });
  }

  const handleEmailUpdate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && email) {
      e.preventDefault();
      setEmails([...emails, email]);
      setEmail({ id: 0, value: "" });
    }
  };

  const filterEmails = (id: number) => {
    const filteredEmail = emails.filter((item) => item.id !== id);
    setEmails(filteredEmail);
  };

  // JSX for share project action
  const shareProjectcontent = (
    <div className="">
      <InputField
        label="Invite people to project"
        inputName="email"
        type="email"
        placeholder="Enter email and press enter"
        value={email?.value}
        onKeyDown={handleEmailUpdate}
        onChange={(e) =>
          setEmail({
            ...email,
            id: Math.floor(Math.random() * 100),
            value: e.target.value,
          })
        }
      />
      {emails.length &&
        emails.map((item) => (
          <div key={item.id} className="flex justify-between py-1">
            <p>{item.value}</p>
            <RxCross2
              className="hover:cursor-pointer hover:bg-gray-300 h-4 w-4 rounded-full"
              onClick={() => filterEmails(item.id)}
            />
          </div>
        ))}
    </div>
  );

  // JSX for archive action
  const archiveProjectcontent = (
    <div className="">
      <h2 className="font-semibold text-xl text-center pb-2">
        {projects.length > 1
          ? "Archiver ces projets"
          : "Archiver ce projet"}
      </h2>
    </div>
  );

  // JSX for delete action
  const deleteProjectContent = (
    <div className="pb-4">
      <h2 className="">
        Etes vous sure de vouloir supprimer{" "}
        <span>{projects.length > 1 ? "ces" : "ce"}</span> projet?
      </h2>
    </div>
  );

  const heading = shareProject
    ? "Partager"
    : deleteProject
    ? "Supprimer"
    : archiveProject
    ? "Archiver"
    : "";

  return (
    <CardLayout heading={heading}>
      <div className="py-4 px-6 ">
        <div className="">
          {shareProject && shareProjectcontent}
          {deleteProject && deleteProjectContent}
          {archiveProject && archiveProjectcontent}
        </div>
        <div className="flex gap-4 justify-center mx-auto">
          <Button
            className={
              deleteProject
                ? "active:transition-y-1"
                : "border active:transition-y-1 border-red-500 bg-white text-red-500 hover:bg-red-100"
            }
            onClick={() => closeDialog(false)}
          >
            Annuler
          </Button>
          {isLoading ? (
            <Button className={isLoading ? "hover: cursor-not-allowed bg-tertiary " : " w-[150px] hover:cursor-not-allowed opacity-70 "}>
              <Spinner />
            </Button>
          ) : (
            <Button
              onClick={() => {
                if (shareProject) {
                  handleShareProject();
                } else if (deleteProject) {
                  handleDeleteProject();
                } else if (archiveProject) handleArchiveProject();
              }}
              className={
                deleteProject
                  ? "text-white active:translate-y-1 hover:bg-red-400 bg-red-500 "
                  : "active:translate-y-1 bg-tertiary hover:bg-tertiary"
              }
            >
              {heading}
            </Button>
          )}
        </div>
      </div>
    </CardLayout>
  );
}
