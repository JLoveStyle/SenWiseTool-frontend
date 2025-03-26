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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToggle } from "@/hooks/use-toggle";
import { NewFormProps } from "@/types/dashboard/form";
import { dasboardFormParams } from "@/types/formData";
import { LayoutTemplate, LucideX, PenLine } from "lucide-react";
import { useState, useEffect } from "react";
import slugify from "slugify";
import { Icon } from "../../icon";
import { useDialogControl } from "@/lib/stores/useDialog-coontrol";

type Props = {
  forms?: NewFormProps[];
  formParams?: dasboardFormParams;
  isCloseModal?: boolean;
};

export default function FormLayout({ forms, formParams, isCloseModal }: Props) {
  const [formStep, setFormStep] = useState<"CHOOSE" | "NEW" | "EXIST">(
    formParams?.choose_form ? "CHOOSE" : "NEW"
  );

  const [closingDialog, setClosingDialog] = useState<boolean>(false);
  const {isDialogOpen, setIsDialogOpen} = useDialogControl()

  const { value: openModal, toggle: toggleOpenModel } = useToggle({
    initial: false,
  });

  const closeDialog = () => {
    setFormStep(formParams?.choose_form ? "CHOOSE" : "NEW");
    toggleOpenModel();
    setIsDialogOpen(!isDialogOpen);
  };

  useEffect(() => {
    setIsDialogOpen(isDialogOpen);
  }, [isCloseModal]);

  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="px-10 mb-4"
          onClick={() => setIsDialogOpen(!isDialogOpen)}
        >
          {formParams?.trigger_btn_label_form ?? "New Form"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] w-full h-fit bg-white rounded-lg">
        <Button
          onClick={closeDialog}
          className="absolute top-4 right-4 bg-transparent hover:bg-transparent text-white hover:text-white focus:outline-none"
        >
          <LucideX />
        </Button>
        <DialogHeader className="p-4 flex h-[80px] bg-black justify-between rounded-t-lg">
          <DialogTitle className="text-xl p-4 font-semibold text-white">
            {formParams?.new_form_title && formStep === "NEW"
              ? formParams?.new_form_title
              : "Create a project: Choose source"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {formStep === "CHOOSE" && (
              <em className="">
                Please select one of the options below to continue. You will be
                asked to enter your name and the other following steps
              </em>
            )}
          </DialogDescription>
        </DialogHeader>
        {formStep === "CHOOSE" && (
          <div className="flex justify-center gap-4 py-10">
            <div
              onClick={() => setFormStep("NEW")}
              className="rounded-[12px] bg-[#e7e9ee] w-[250px] h-[150px] text-gray-800 px-2 flex gap-2 flex-col justify-center my-auto hover:cursor-pointer hover:shadow-md"
            >
              <span className="flex justify-center mx-auto text-gray-500">
                <Icon
                  size={30}
                  icon={{
                    icon: formParams?.construct_form_btn_icon ?? PenLine,
                  }}
                />
              </span>
              <p className="text-center font-semibold text-lg">
                {formParams?.construct_form_btn_label ?? "Construct a form"}
              </p>
            </div>
            <div className="rounded-[12px] bg-[#e7e9ee] w-[250px] h-[150px] text-gray-800 px-2 flex gap-2 flex-col justify-center my-auto hover:cursor-pointer hover:shadow-md">
              <span className="flex justify-center mx-auto text-gray-500">
                <Icon
                  size={30}
                  icon={{
                    icon: formParams?.existing_form_btn_icon ?? LayoutTemplate,
                  }}
                />
              </span>
              <p className="text-center font-semibold text-lg">
                {formParams?.existing_form_btn_label ??
                  "Use a pre-defined model"}
              </p>
            </div>
          </div>
        )}

        {formStep === "NEW" && (
          <div className="-mt-4">
            {forms?.length === 1 ? (
              <div>
                <div className="my-4 flex justify-center text-xs">
                  <em>
                    Fields with
                    <span className="text-red-500 px-1">*</span> are obligatory
                  </em>
                </div>
                {forms[0].form}
              </div>
            ) : (
              <Tabs
                defaultValue={
                  forms &&
                  slugify(forms[0].title ?? `Formulaire 1`).toLowerCase()
                }
                className="w-full"
              >
                <TabsList className="w-full bg-black p-0 h-8">
                  {forms?.map((form, index) => (
                    <TabsTrigger
                      value={slugify(
                        form.title ?? `Formulaire ${index + 1}`
                      ).toLowerCase()}
                      key={index}
                      className="flex justify-around items-center w-full h-full"
                    >
                      {form.title ?? `Formulaire ${index + 1}`}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {forms?.map((form, index) => (
                  <TabsContent
                    key={index}
                    value={slugify(
                      form.title ?? `Formulaire ${index + 1}`
                    ).toLowerCase()}
                  >
                    <div className="my-4 flex justify-center text-xs">
                      <em>
                        Fields with
                        <span className="text-red-500 px-1">*</span> are
                        obligatory
                      </em>
                    </div>

                    {form.form}
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
