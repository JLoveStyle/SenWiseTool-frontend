"use client";
import React, { useState } from "react";
import CardLayout from "../templates/cardLayout";
import { Button } from "../ui/button";
import { Spinner } from "../atoms/spinner/spinner";
import { InputUI } from "../atoms/disign-system/form/input-ui";
import { ModuleProps } from "@/types/formData";
import InputField from "./inputField";
import { RxCross2 } from "react-icons/rx";

type Props = {
  shareProject: boolean;
  archiveProject: boolean;
  deleteProject: boolean;
  projectsId: string[];
};

export default function ActionComponent({
  shareProject,
  deleteProject,
  archiveProject,
  projectsId,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emails, setEmails] = useState<ModuleProps[]>([]);
  const [email, setEmail] = useState<ModuleProps>();
  // DELETE PROJECT
  async function handleDeleteProject() {
    // write logic here
    console.log("delete pro");
  }

  // SHARE PROJECT
  async function handleShareProject() {
    // Whrite your logic here
    console.log("share pro");
  }

  // ARCHIVE PROJECT
  async function handleArchiveProject() {
    // write logic here
    console.log("archive pro");
  }

  const handleEmailUpdate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && email) {
      e.preventDefault();
      setEmails([...emails, email]);
      setEmail({ id: 0, value: "" });
    }
  };

  const filterdEmails = (id: number) => {
    const filteredEmail = emails.filter((item) => item.id !== id);
    setEmails(filteredEmail);
  };

  async function sendInvites() {
    // write logic here
  }

  const shareProjectcontent = (
    <div className="">
      <div className="flex gap-4 pb-6">
        <div className=" w-full">
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
        </div>
      </div>
      {emails.length &&
        emails.map((item) => (
          <div key={item.id} className="flex justify-between py-1">
            <p>{item.value}</p>
            <RxCross2
              className="hover:cursor-pointer hover:bg-gray-300 h-4 w-4 rounded-full"
              onClick={() => filterdEmails(item.id)}
            />
          </div>
        ))}
    </div>
  );

  const archiveProjectcontent = (
    <div className="">
      <p>archive</p>
    </div>
  );

  const deleteProjectContent = (
    <div className="">
      <label htmlFor="">Enter </label>
    </div>
  );

  const heading = shareProject
    ? "Share project"
    : deleteProject
    ? "Delete project"
    : archiveProject
    ? "Archive project"
    : "";

  const description = {};
  console.log(heading);
  return (
    <CardLayout heading={heading}>
      <div className="p-6 ">
        <div className="">
          {shareProject && shareProjectcontent}
          {deleteProject && deleteProjectContent}
          {archiveProject && archiveProjectcontent}
        </div>
        <div className="flex gap-4 justify-center mx-auto">
          <Button className="border border-red-500 bg-white text-red-500 hover:bg-red-100">
            Cancel
          </Button>
          {isLoading ? (
            <Button className="w-[150px] hover:cursor-not-allowed opacity-70 ">
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
              className="active:translate-y-1"
            >
              {heading}
            </Button>
          )}
        </div>
      </div>
    </CardLayout>
  );
}
