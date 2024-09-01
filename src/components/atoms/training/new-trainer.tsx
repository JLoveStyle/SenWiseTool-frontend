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
import { db_create_training } from "@/utiles/services/training";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Icon } from "../icon";
import { FormTraining, TrainingProps } from "./form-training";

export function NewTraining() {
  // Ajoutez un état pour formData
  const [formData, setFormData] = useState<TrainingProps>({
    id: 0,
    theme: "",
    start_date: "",
    end_date: "",
    modules: [],
  });

  // Fonction de gestion pour la mise à jour des données du formulaire
  const handleUpdatedFormData = (updatedFormData: TrainingProps) => {
    setFormData(updatedFormData);
  };

  const handleCreateTraining = async (formData: TrainingProps) => {
    const { error, data } = await db_create_training(formData);

    if (error) {
      toast.error(error.message);
      // setIsLoading(false);
      return;
    }
    console.log(data);

    toast.success("Your account are created successfull");
    // setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ... @todo verification des variables

    handleCreateTraining(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-500 gap-1 h-7 w-18 px-2 font-normal text-sm rounded-none"
        >
          <Icon icon={{ icon: Plus }} size={20}>
            New
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
          <FormTraining updatedFormData={handleUpdatedFormData} />
          <DialogFooter>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-500 flex gap-1"
            >
              <Icon icon={{ icon: Plus }}>Créer</Icon>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
