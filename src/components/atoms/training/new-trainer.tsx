"use client";

import { useToggle } from "@/hooks/use-toggle";
import { Route } from "@/lib/route";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { TrainingProps } from "@/types/formData";
import { mutateApiData } from "@/utiles/services/mutations";
import { isEmptyObject } from "@/utils/tool";
import { TrainingFormVerification } from "@/utils/training-form-verification";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { ButtonUI } from "../disign-system/button-ui";
import { FormTraining } from "./form-training";
import { useDialogControl } from "@/lib/stores/useDialog-coontrol";

export function NewTraining() {
  const { value: isLoading, setValue: setIsLoading } = useToggle();
  const [errors, setErrors] = useState({});
  const { setIsDialogOpen } = useDialogControl();

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
    const trainingModules: string[] = [];
    for (const module of formData.modules) {
      trainingModules.push(module.value);
    }

    // Create training in DB
    setIsLoading((prev) => !prev);
    await mutateApiData(Route.training, {
      location: formData.location,
      title: formData.title,
      start_date: new Date(formData.start_date as string).toISOString(),
      end_date: new Date(formData.end_date as string).toISOString(),
      company_id: company?.id,
      status: "DEPLOYED",
      modules: trainingModules,
    })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Formation créer, Rafraichir");
          setIsLoading(false);
          setIsDialogOpen(false)
          router.refresh();
          return;
        } else if (response.message === "Internal Server Error") {
          setIsLoading(false);
          toast.error("Internal Server Error");
          return;
        } else {
          toast.error("Something went wrong. Please try again");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong. Please try again");
        setIsLoading(false);
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      // setIsLoading(true);
      e.preventDefault();

      const formErrors = TrainingFormVerification(formData);

      if (!isEmptyObject(formErrors)) {
        setErrors(formErrors);
        // toast.error("Something is wrong");
        toast.warning("Please fill all required fields");
        // setIsLoading(false);
        return;
      }
      handleCreateTraining(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-5 pb-5">
      <FormTraining
        updatedFormData={handleUpdatedFormData}
        errors={errors}
        isLoading={isLoading}
      />
      <div className="flex items-baseline space-x-2">
        <p className="flex-1"></p>

        <ButtonUI
          type="submit"
          className={clsx("bg-black hover:bg-black mt-2 flex justify-end")}
          isLoading={isLoading}
          icon={{ icon: Plus }}
        >
          Créer
        </ButtonUI>
      </div>
    </form>
  );
}
