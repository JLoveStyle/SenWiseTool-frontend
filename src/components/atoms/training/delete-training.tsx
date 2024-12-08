import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToggle } from "@/hooks/use-toggle";
import { Route } from "@/lib/route";
import { ApiDataResponse, TrainingType } from "@/types/api-types";
import { TrainingProps } from "@/types/formData";
import { mutateDelApiData } from "@/utiles/services/mutations";
import { Dialog } from "@radix-ui/react-dialog";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "../spinner/spinner";

interface Props {
  training: TrainingProps;
  header: React.ReactNode;
  trainingId: string;
}

export const DeleteTraining = ({ training, header, trainingId }: Props) => {
  // const { value: openModal, toggle: toggleOpenModal } = useToggle();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { value: isLoading, setValue: setIsLoading } = useToggle();

  const router = useRouter();

  const handleDeleteTraining = async () => {
    setIsLoading(true);
    await mutateDelApiData<ApiDataResponse<Partial<TrainingType>>>(
      Route.training,
      trainingId
    )
      .then((response) => {
        setIsLoading((prev) => !prev);
        if (response?.status === 204) {
          toast.success("Training Deleted successful");
          router.push(Route.training);
          return;
        } else {
          toast.error("Could not delete. Please try again");
          return;
        }
      })
      .catch((error) => {
        setIsLoading((prev) => !prev);
        console.log("Hello");
      });

    // toast.success("Your project are updated successfull");
    // setIsLoading(false);
    // toggleOpenModal();
    // router.push(Route.trainingProject);
    // return;
  };

  return (
    <Dialog open={openModal}>
      <DialogTrigger asChild onClick={() => setOpenModal((prev) => !prev)}>
        {header ?? <Trash2 className="hover:cursor-pointer text-red-500" />}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="p-5">
          <DialogTitle className="text-black text-2xl">
            Supprimer votre projet de formation
          </DialogTitle>
          <DialogDescription className="text-gray-700">
            Êtes vous sûr de voiloir supprimer le projet de formation
            <span className="font-medium px-1">{training.title}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="p-2">
          <div className="m-2 flex gap-5">
            <Button
              className=""
              variant="outline"
              size="sm"
              onClick={() => setOpenModal((prev) => !prev)}
            >
              Annuler
            </Button>
            {isLoading ? (
              <Button
                size="sm"
                className="flex gap-1 bg-red-500 hover:cursor-not-allowed opacity-90 hover:bg-red-400"
              >
                <Spinner />
              </Button>
            ) : (
              <Button
                size="sm"
                className="flex gap-1 bg-red-500 hover:bg-red-400"
                onClick={handleDeleteTraining}
              >
                <Trash2 size={15} />
                Supprimer
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
