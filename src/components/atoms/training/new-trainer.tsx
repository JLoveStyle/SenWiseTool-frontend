"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToggle } from "@/hooks/use-toggle";
import { Route } from "@/lib/route";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { TrainingProps } from "@/types/formData";
import { db_create_training } from "@/utiles/services/training";
import { isEmptyObject } from "@/utils/tool";
import { TrainingFormVerification } from "@/utils/training-form-verification";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { ButtonUI } from "../disign-system/button-ui";
import { FormTraining } from "./form-training";
import { revalidatePath } from "next/cache";
import { mutateApiData } from "@/utiles/services/mutations";
import { format } from "path";

export function NewTraining() {
  const { value: isLoading, setValue: setIsLoading } = useToggle();
  const { value: openModal, toggle: toggleOpenModal } = useToggle();
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const [formData, setFormData] = useState<TrainingProps>({
    id: "",
    title: "",
    start_date: "",
    end_date: "",
    location: "",
    modules: [],
  });

  // load company state
  const company = useCompanyStore((state) => state.company);

  // Fonction de gestion pour la mise à jour des données du formulaire
  const handleUpdatedFormData = (updatedFormData: TrainingProps) => {
    setFormData(updatedFormData);
  };

  const handleCreateTraining = async (formData: TrainingProps) => {
    console.log("forMData => ", formData);
    const trainingModules: string[] = []
    for(const module of formData.modules) {
      trainingModules.push(module.value)
    }

    // Create training in DB
    await mutateApiData(Route.training, {
      location: formData.location,
      title: formData.title,
      start_date: new Date(formData.start_date as string).toISOString(),
      end_date: new Date(formData.end_date as string).toISOString(),
      company_id: company?.id,
      status: "DEPLOYED",
      modules: trainingModules
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          toast.success("Training created");
          // close modal
          setIsLoading(false);
          toggleOpenModal();
          router.refresh();
          router.push(Route.trainingProject);

          return;
        } else if (response.message === "Internal Server Error") {
          toast.error("Internal Server Error");
          return
        } else toast.error("Something went wrong");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong. Please try again");
      });

    const dataToDB = {
      title: formData.title,
      start_date: new Date(formData.start_date).toISOString(),
      end_date: new Date(formData.end_date).toISOString(),
      location: formData.location,
      company_id: company?.id,
      modules: formData.modules.map((item) => item.value),
    };

    // const serverResponse = await db_create_training(dataToDB);

    // console.log("daaaaata:::::::::", serverResponse);

    // if (serverResponse.status === "error") {
    //   toast.error("Updating training failed");
    //   setIsLoading(false);
    //   return;
    // }

    // toast.success("Your project are created successfull");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      const formErrors = TrainingFormVerification(formData);

      if (!isEmptyObject(formErrors)) {
        setErrors(formErrors);
        toast.error("Something is wrong");
        setIsLoading(false);
        return;
      }

      handleCreateTraining(formData);
    } catch (error) {}
  };

  return (
    <Dialog open={openModal}>
      <DialogTrigger asChild>
        <Button className="px-10 mb-4" onClick={toggleOpenModal}>
          New Form
        </Button>
      </DialogTrigger>
      <DialogContent className="w-3/4">
        <DialogHeader className="bg-tertiary text-[#f1f1f1] p-5">
          <DialogTitle className=" text-2xl">New training project</DialogTitle>
          <DialogDescription className="">
            Create your training project by defining the following:
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="px-5 pb-5">
          <FormTraining
            updatedFormData={handleUpdatedFormData}
            errors={errors}
            isLoading={isLoading}
          />
          <DialogFooter className="mt-2">
            <ButtonUI
              type="submit"
              className={clsx("bg-tertiary hover:bg-tertiary")}
              isLoading={isLoading}
              icon={{ icon: Plus }}
            >
              Create
            </ButtonUI>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
