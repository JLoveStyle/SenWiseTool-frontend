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
import { TrainingProps } from "@/types/formData";
import { db_create_training } from "@/utiles/services/training";
import { isEmptyObject } from "@/utils/tool";
import { TrainingFormVerification } from "@/utils/training-form-verification";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { ButtonUI } from "../disign-system/button-ui";
import { Icon } from "../icon";
import { FormTraining } from "./form-training";
import { useCompanyStore } from "@/lib/stores/companie-store";



export function NewTraining() {
  const { value: isLoading, setValue: setIsLoading } = useToggle();
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
      company_id: company?.id,
      modules: formData.modules.map((item) => item.value),
    };
    const result = await db_create_training(dataToDB);
    console.log(result)
    // if (error) {
    //   toast.error(error.message);
    //   setIsLoading(false);
    //   return;
    // }
    // console.log(data);

    // // await db_test_add(formData);
    // toast.success("Your project are created successfull");
    setIsLoading(false);
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
    } catch (error) { }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-500 gap-1 h-7 w-18 px-3 py-4 font-normal text-sm rounded-md"
        >
          <Icon icon={{ icon: Plus }} size={20}>
            CRÉER
          </Icon>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nouveau Projet de Formation</DialogTitle>
          <DialogDescription>
            Créez votre projet de formation en définissant les éléments
            descriptifs suivants...
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
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
