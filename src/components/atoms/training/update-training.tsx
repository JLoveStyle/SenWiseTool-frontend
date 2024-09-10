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
import { db_update_training } from "@/utiles/services/training";
import { isEmptyObject } from "@/utils/tool";
import { TrainingFormVerification } from "@/utils/training-form-verification";
import { PenLine, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Icon } from "../icon";
import { FormTraining } from "./form-training";
<<<<<<< HEAD
import { useCompanyStore } from "@/lib/stores/companie-store";
=======
>>>>>>> training

interface Props {
  currentTaining: TrainingProps;
}

export function UpdateTraining({ currentTaining }: Props) {
  const { value: isLoading, setValue: setIsLoading } = useToggle();
  const [errors, setErrors] = useState({});
<<<<<<< HEAD
  const company = useCompanyStore((state) => state.company);
=======
>>>>>>> training

  const initialize = {
    id: currentTaining.id,
    title: currentTaining.title,
    location: currentTaining.location,
    start_date: currentTaining.start_date,
    end_date: currentTaining.end_date,
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
<<<<<<< HEAD
      company_id: company?.id ?? "",
      modules: formData.modules.map((item) => item.value),
    };

    await db_update_training(dataToDB, formData.id!);
=======
      company_id: "compagny1",
      modules: formData.modules.map((item) => item.value),
    };

    await db_update_training(dataToDB, formData.id);
>>>>>>> training

    // if (error) {
    //   toast.error(error.message);
    //   setIsLoading(false);
    //   return;
    // }
    // console.log(data);

    // await db_test_add(formData);
    // toast.success("Your project are created successfull");
    // setIsLoading(false);
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
<<<<<<< HEAD
    } catch (error) { }
=======
    } catch (error) {}
>>>>>>> training
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="text-yellow-500 font-bold"
          title="editer"
        >
          <Icon icon={{ icon: PenLine }} size={20}></Icon>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editer le Projet de Formation</DialogTitle>
          <DialogDescription>
            Mettez à jour votre projet de formation en definisant de nouvelles
            valeurs pour l'amelioration...
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FormTraining
            updatedFormData={handleUpdatedFormData}
            initData={initialize}
            errors={errors}
            isLoading={isLoading}
          />
          <DialogFooter>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-500 flex gap-1"
            >
              <Icon icon={{ icon: Plus }}>ÉDITER</Icon>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
