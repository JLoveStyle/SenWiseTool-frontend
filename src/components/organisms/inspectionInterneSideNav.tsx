"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Archive, FilePenLine, Rocket } from "lucide-react";
import { tableRaw } from "@/utiles/services/constants";
import CreateProjectOptions from "../molecules/createProjectOptions";
import ProjectDetailsForm from "../molecules/projectDetailsForm";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogTrigger } from "../ui/dialog";

type Props = {};

export default function InspectionInterneSideNav({}: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showProjectDetailsForm, setShowProjectDetailsForm] =
    useState<boolean>(false);
  const [showProjectOptions, setShowProjectOptions] = useState<boolean>(false);

  const handleOpenProjectOptions = (value: boolean, value2: boolean) => {
    setShowProjectDetailsForm(value);
    setShowProjectOptions(value2);
  };

  const handleShowProjectDetails = (value1: boolean, value2: boolean) => {
    setShowProjectDetailsForm(value1);
    setShowProjectOptions(value2);
  };

  return (
    <div className="bg-[#f7f6f6] w-fit h-screen px-5 pt-20 shadow-lg ">
      <div className="flex flex-col gap-5">
        <Button
          onClick={() => {
            setOpenModal((prev) => !prev);
            setShowProjectOptions(prev => !prev);
          }}
          className="px-10"
        >
          New Form
        </Button>
        <Dialog
          onOpenChange={() => {
            setOpenModal((prev) => !prev);
            setShowProjectOptions((prev) => !prev);
          }}
          open={openModal}
        >
          <DialogContent className="sm:max-w-[800px]">
            {showProjectDetailsForm && (
              <ProjectDetailsForm onClick={handleShowProjectDetails} />
            )}
            {showProjectOptions && (
              <CreateProjectOptions onClick={handleOpenProjectOptions} />
            )}
          </DialogContent>
        </Dialog>
        <div className="flex gap-2 hover:cursor-pointer">
          <div className="flex gap-2 flex-1">
            <Rocket />
            <p className="font-semibold">Deployed</p>
          </div>
          <span className="bg-white rounded-full h-1 w-1">0</span>
        </div>
        <div className="flex gap-2 hover:cursor-pointer">
          <div className="flex gap-2 flex-1">
            <FilePenLine />
            <p className="font-semibold">Draft</p>
          </div>
          <span className="bg-white rounded-full h-1 w-1">
            {tableRaw.length}
          </span>
        </div>
        <div className="flex gap-2 hover:cursor-pointer">
          <div className="flex gap-2 flex-1">
            <Archive />
            <p className="font-semibold">Archive</p>
          </div>
          <span className="bg-white rounded-full h-1 w-1">0</span>
        </div>
      </div>
    </div>
  );
}
