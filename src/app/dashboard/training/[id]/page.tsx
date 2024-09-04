"use client";

import { Icon } from "@/components/atoms/icon";
import { DetailTraining } from "@/components/atoms/training/detail-training";
import { trainings } from "@/components/atoms/training/training-list";
import { UpdateTraining } from "@/components/atoms/training/update-training";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/use-toggle";
import { Route } from "@/lib/route";
import { TrainingProps } from "@/types/formData";
import { Share2, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdArchive } from "react-icons/io";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { toast } from "react-toastify";

interface Props {
  displayForm: boolean;
}

export default function TrainingDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const { value: displayForm, toggle: toggleForm } = useToggle();

  const training: TrainingProps | undefined = trainings.find(
    (training) => training.id == id
  );

  const [currentTraining, setCurrentTraining] = useState<TrainingProps>({
    id: training ? training.id : "",
    title: training ? training.title : "",
    location: training ? training.location : "",
    start_date: training ? training.start_date : "",
    end_date: training ? training.end_date : "",
    modules: training ? training.modules : [],
  });

  useEffect(() => {
    if (!id) {
      toast.warning("project not found");
      router.push(Route.formationProject);
    }
    console.log(displayForm);
  }, [id]);

  return (
    <div className="flex flex-col justify-between gap-10  w-full">
      <div className="flex justify-between items-center py-3">
        <span className="text-2xl font-bold">Formation - Details</span>

        <div className="flex items-center">
          <Button
            variant="link"
            className="text-gray-800 font-bold"
            title="Preview"
            onClick={() => toggleForm()}
          >
            <Icon
              icon={{ icon: displayForm ? LuEyeOff : LuEye }}
              size={20}
            ></Icon>
          </Button>
          <UpdateTraining currentTaining={currentTraining} />
          <Button
            variant="link"
            className="text-green-500 font-bold"
            title="archiver"
          >
            <Icon icon={{ icon: Share2 }} size={20}></Icon>
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
      </div>
      <div>
        <DetailTraining
          training={currentTraining}
          toggleDisplayForm={toggleForm}
          displayForm={displayForm}
        />
      </div>
    </div>
  );
}
