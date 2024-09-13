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
import { trainingDatas } from "@/lib/datas";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { TrainingProps } from "@/types/formData";
import { db_create_training } from "@/utiles/services/training";
import { isEmptyObject } from "@/utils/tool";
import { TrainingFormVerification } from "@/utils/training-form-verification";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { ButtonUI } from "../disign-system/button-ui";
import { FormTraining } from "./form-training";

export function NewTraining() {
  const { value: isLoading, setValue: setIsLoading } = useToggle();
  const { value: openModal, toggle: toggleOpenModal } = useToggle();
  const [errors, setErrors] = useState({});

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
    // const { error, data } = await db_create_training(formData);
    const dataToDB = {
      title: formData.title,
      start_date: new Date(formData.start_date).toISOString(),
      end_date: new Date(formData.end_date).toISOString(),
      location: formData.location,
      company_id: "cm0job09a0004wrr2scsyu3a3", //company?.id
      modules: formData.modules.map((item) => item.value),
    };

    const serverResponse = await db_create_training(dataToDB);

    console.log("daaaaata:::::::::", serverResponse);

    trainingDatas.push(formData);

    if (serverResponse.status === "error") {
      toast.error(serverResponse.response.message.message);
      setIsLoading(false);
      return;
    }

    toast.success("Your project are created successfull");
    setIsLoading(false);
    toggleOpenModal();
    return;
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
        <DialogHeader className="bg-orange-300 p-5">
          <DialogTitle className="text-black text-2xl">
            Nouveau Projet de Formation
          </DialogTitle>
          <DialogDescription className="text-gray-700">
            Créez votre projet de formation en définissant les éléments
            descriptifs suivants...
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
              className={clsx("bg-green-600 hover:bg-green-500")}
              isLoading={isLoading}
              icon={{ icon: Plus }}
            >
              Créer
            </ButtonUI>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
