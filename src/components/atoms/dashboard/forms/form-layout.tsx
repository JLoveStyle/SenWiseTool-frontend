"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { LayoutTemplate, PenLine } from "lucide-react";
import { useState } from "react";

type Props = {
  // children: React.ReactNode;
  heading: string;
  form: React.ReactNode;
};

export default function FormLayout({ heading, form }: Props) {
  const [formStep, setFormStep] = useState<"CHOOSE" | "NEW" | "EXIST">(
    "CHOOSE"
  );

  return (
    <Dialog /*open={openModal}*/>
      <DialogTrigger asChild>
        <Button className="px-10 mb-4" /*onClick={toggleOpenModal}*/>
          New Form
        </Button>
      </DialogTrigger>
      <DialogClose className="text-white">x</DialogClose>
      <DialogContent className="sm:max-w-[800px] w-full h-fit bg-white rounded-lg">
        <DialogHeader className="p-5 flex h-[80px] bg-black justify-between rounded-t-lg">
          <DialogTitle className="text-xl p-4 font-semibold text-white">
            {heading}
          </DialogTitle>
          <DialogDescription className="text-center">
            {formStep === "CHOOSE" && (
              <em className="">
                Please select one of the options below to continue. You will be
                asked to enter your name and the other following steps
              </em>
            )}

            {formStep === "NEW" && (
              <em className="">
                Veuillez remplir les champs. ceux qui contiennent
                <span className="text-red-500 px-1">*</span> sont obligatoires
              </em>
            )}
          </DialogDescription>
        </DialogHeader>
        {formStep === "CHOOSE" && (
          <div className="flex justify-center gap-4 py-10">
            <div
              onClick={() => setFormStep("NEW")}
              className="rounded-[12px] bg-[#e7e9ee] w-[250px] h-[150px] flex gap-2 flex-col justify-center my-auto hover:cursor-pointer hover:shadow-md"
            >
              <PenLine className="flex justify-center mx-auto" />
              <p className="text-center font-semibold text-lg">
                Construct a form
              </p>
            </div>
            <div className="rounded-[12px] bg-[#e7e9ee] w-[250px] h-[150px] flex gap-2 flex-col justify-center my-auto hover:cursor-pointer hover:shadow-md">
              <LayoutTemplate className="flex justify-center mx-auto" />
              <p className="text-center font-semibold text-lg">
                Use a pre-defined model
              </p>
            </div>
          </div>
        )}

        {formStep === "NEW" && <div className="pt-5">{form}</div>}
      </DialogContent>
    </Dialog>
  );
}
