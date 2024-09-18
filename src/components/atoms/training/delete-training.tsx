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
import { TrainingProps } from "@/types/formData";
import { db_delete_training } from "@/utiles/services/training";
import { Dialog } from "@radix-ui/react-dialog";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  training: TrainingProps;
  header: React.ReactNode;
}

export const DeleteTraining = ({ training, header }: Props) => {
  const { value: openModal, toggle: toggleOpenModal } = useToggle();
  const { value: isLoading, setValue: setIsLoading } = useToggle();

  const router = useRouter();

  const handleDeleteTraining = async () => {
    setIsLoading(true);

    const serverResponse = await db_delete_training(training.id);

    if (serverResponse.status === "error") {
      toast.error(serverResponse.response.message.message);
      setIsLoading(false);
      return;
    }

    toast.success("Your project are updated successfull");
    setIsLoading(false);
    toggleOpenModal();
    router.push(Route.trainingProject);
    return;
  };

  return (
    <Dialog open={openModal}>
      <DialogTrigger asChild onClick={toggleOpenModal}>
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
              onClick={toggleOpenModal}
            >
              Annuler
            </Button>
            <Button
              size="sm"
              className="flex gap-1 bg-red-500 hover:bg-red-400"
              onClick={handleDeleteTraining}
            >
              <Trash2 size={15} />
              Supprimer
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
