"use client";

import { Icon } from "@/components/atoms/icon";
import { DetailTraining } from "@/components/atoms/training/detail-training";
import { trainings } from "@/components/atoms/training/training-list";
import { UpdateTraining } from "@/components/atoms/training/update-training";
import { Button } from "@/components/ui/button";
import { Route } from "@/lib/route";
import { TrainingProps } from "@/types/formData";
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

  const training: TrainingProps | undefined = trainings.find(
    (training) => training.id == Number(id)
  );

  const [currentTraining, setCurrentTraining] = useState<TrainingProps>({
    id: training ? training.id : 0,
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
  }, [id]);

  return (
    <div className="flex flex-col justify-between gap-10  w-full">
      <div className="flex justify-between items-center py-3">
        <span className="text-2xl font-bold">Formation - Details</span>

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
      </div>
      <div>
        <DetailTraining training={currentTraining} />
      </div>
    </div>
  );
}
