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
import { db_update_training } from "@/utiles/services/training";
import { isEmptyObject } from "@/utils/tool";
import { TrainingFormVerification } from "@/utils/training-form-verification";
import { PenLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Icon } from "../icon";
import { FormTraining } from "./form-training";

interface Props {
  currentTaining: TrainingProps;
  header: React.ReactNode;
}

export function UpdateTraining({ currentTaining, header }: Props) {
  const { value: isLoading, setValue: setIsLoading } = useToggle();
  const [errors, setErrors] = useState({});
  const company = useCompanyStore((state) => state.company);
  const { value: openModal, toggle: toggleOpenModal } = useToggle();

  const router = useRouter();

  const initialize = {
    id: currentTaining.id,
    title: currentTaining.title,
    location: currentTaining.location,
    start_date: new Date(currentTaining.start_date).toISOString().slice(0, 16),
    end_date: new Date(currentTaining.end_date).toISOString().slice(0, 16),
    modules: currentTaining.modules,
  };

  // Ajoutez un état pour formData
  const [formData, setFormData] = useState<TrainingProps>(initialize);

  // Fonction de gestion pour la mise à jour des données du formulaire
  const handleUpdatedFormData = (updatedFormData: TrainingProps) => {
    setFormData(updatedFormData);
  };

  const handleUpdateTraining = async (formData: TrainingProps) => {
    // const { error, data } = await db_create_training(formData);
    const dataToDB = {
      title: formData.title,
      start_date: formData.start_date,
      end_date: formData.end_date,
      location: formData.location,
      modules: formData.modules.map((item) => item.value),
    };

    const serverResponse = await db_update_training(dataToDB, formData.id);

    if (serverResponse.status === "error") {
      toast.error(serverResponse.response.message.message);
      setIsLoading(false);
      return;
    }

    toast.success("Your project are updated successfull");
    setIsLoading(false);
    toggleOpenModal();
    router.push(Route.trainingProject + `/${formData.id}`);
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

      handleUpdateTraining(formData);
    } catch (error) {}
  };

  return (
    <Dialog open={openModal}>
      <DialogTrigger asChild onClick={toggleOpenModal}>
        {header}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="bg-orange-300 p-5">
          <DialogTitle className="text-black text-2xl">
            Editer le Projet de Formation
          </DialogTitle>
          <DialogDescription className="text-gray-700">
            Mettez à jour votre projet de formation en definisant de nouvelles
            valeurs pour l'amelioration...
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="px-5 pb-5">
          <FormTraining
            updatedFormData={handleUpdatedFormData}
            initData={initialize}
            errors={errors}
            isLoading={isLoading}
          />
          <DialogFooter className="mt-2">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-500 flex gap-1"
            >
              <Icon icon={{ icon: PenLine }}>ÉDITER</Icon>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
