"use client";

import { ButtonUI } from "@/components/atoms/disign-system/button-ui";
import { FormTraining } from "@/components/atoms/training/form-training";
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

export function NewFormReceipt() {
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
    const dataToDB = {
      title: formData.title,
      start_date: new Date(formData.start_date).toISOString(),
      end_date: new Date(formData.end_date).toISOString(),
      location: formData.location,
      company_id: company?.id,
      modules: formData.modules.map((item) => item.value),
    };

    const serverResponse = await db_create_training(dataToDB);

    console.log("daaaaata:::::::::", serverResponse);

    if (serverResponse.status === "error") {
      toast.error("Updating training failed");
      setIsLoading(false);
      return;
    }

    toast.success("Your project are created successfull");
    setIsLoading(false);
    toggleOpenModal();
    router.refresh();
    router.push(Route.trainingProject);
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
    <form onSubmit={handleSubmit} className="px-5 pb-5">
      <FormTraining
        updatedFormData={handleUpdatedFormData}
        errors={errors}
        isLoading={isLoading}
      />
      <ButtonUI
        type="submit"
        className={clsx("bg-green-600 hover:bg-green-500")}
        isLoading={isLoading}
        icon={{ icon: Plus }}
      >
        Créer
      </ButtonUI>
    </form>
  );
}
