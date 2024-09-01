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
import { db_update_training } from "@/utiles/services/training";
import { PenLine, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Icon } from "../icon";
import { FormTraining, TrainingProps } from "./form-training";

interface Props {
  currentTaining: TrainingProps;
}

export function UpdateTraining({ currentTaining }: Props) {
  const [initialize, setInitialize] = useState<TrainingProps>({
    id: currentTaining.id,
    theme: currentTaining.theme,
    start_date: currentTaining.start_date,
    end_date: currentTaining.end_date,
    modules: currentTaining.modules,
  });

  // Ajoutez un état pour formData
  const [formData, setFormData] = useState<TrainingProps>(initialize);

  // Fonction de gestion pour la mise à jour des données du formulaire
  const handleUpdatedFormData = (updatedFormData: TrainingProps) => {
    setFormData(updatedFormData);
  };

  const handleUpdateTraining = async (formData: TrainingProps) => {
    const { error, data } = await db_update_training(formData);

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

    handleUpdateTraining(formData);
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
          />
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
