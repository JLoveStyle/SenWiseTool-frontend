"use client";

import { Icon } from "@/components/atoms/icon";
import { DetailTraining } from "@/components/atoms/training/detail-training";
import { TrainingProps } from "@/components/atoms/training/form-training";
import { trainings } from "@/components/atoms/training/training-list";
import { UpdateTraining } from "@/components/atoms/training/update-training";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Route } from "@/lib/route";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdArchive } from "react-icons/io";
import { RiShare2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

export default function TrainingDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const training = trainings.find((training) => training.id == Number(id));

  const [currentTraining, setCurrentTraining] = useState<TrainingProps>({
    id: training ? training.id : 0,
    theme: training ? training.theme : "",
    start_date: training ? training.start_date : "",
    end_date: training ? training.end_date : "",
    modules: training ? training.modules : [],
  });

  useEffect(() => {
    if (!id) {
      toast.warning("project not found");
      router.push(Route.formationProject);
    }
  }, [id]);

  return (
    <div className="flex flex-col justify-between gap-10  w-full">
      <div className="flex justify-between items-center py-3">
        <span className="text-2xl font-bold">Formation - Details</span>
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex items-center">
              <UpdateTraining currentTaining={currentTraining} />
              <Button
                variant="link"
                className="text-green-500 font-bold"
                title="archiver"
              >
                <Icon icon={{ icon: RiShare2Fill }} size={20}></Icon>
              </Button>
              <Button
                variant="link"
                className="text-blue-500 font-bold"
                title="Archive"
              >
                <Icon icon={{ icon: IoMdArchive }} size={20}></Icon>
              </Button>
              <Button
                variant="link"
                className=" font-bold text-red-500"
                title="Supprimer"
              >
                <Icon icon={{ icon: Trash2 }} size={20} />
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Nouveau Projet de Formation</DialogTitle>
              <DialogDescription>
                Créez votre projet de formation en définissant les éléments
                descriptifs suivants...
              </DialogDescription>
            </DialogHeader>
            d{/* <form> entourant FormTraining et le bouton de soumission */}
            {/* <form onSubmit={handleSubmit}>
          <FormTraining updatedFormData={handleUpdatedFormData} />
          <DialogFooter>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-500 flex gap-1"
            >
              <Icon icon={{ icon: Plus }}>Créer</Icon>
            </Button>
          </DialogFooter>
        </form> */}
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <DetailTraining training={currentTraining} />
      </div>
    </div>
  );
}
