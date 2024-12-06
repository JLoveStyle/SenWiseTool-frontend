"use client";

import { Route } from "@/lib/route";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { ApiDataResponse, TrainingType } from "@/types/api-types";
import { TrainingProps } from "@/types/formData";
import { mutateUpApiData } from "@/utiles/services/mutations";
import { isEmptyObject } from "@/utils/tool";
import { TrainingFormVerification } from "@/utils/training-form-verification";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { ButtonUI } from "../disign-system/button-ui";
import { FormTraining } from "./form-training";

interface Props {
  currentTaining: TrainingProps;
  header: React.ReactNode;
  trainingId: string;
}

export function UpdateTraining({ currentTaining, header, trainingId }: Props) {
  // const { value: isLoading, setValue: setIsLoading } = useToggle();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState({});
  const company = useCompanyStore((state) => state.company);
  const [openModal, setOpenModal] = useState<boolean>(false);

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
      start_date: new Date(formData.start_date as string).toISOString(),
      end_date: new Date(formData.end_date as string).toISOString(),
      location: formData.location,
      modules: formData.modules.map((item) => item.value),
    };

    await mutateUpApiData<ApiDataResponse<TrainingType>>(
      Route.training,
      dataToDB,
      trainingId
    )
      .then((response) => {
        console.log(response);
        setIsLoading((prev) => !prev);
        if (response.status === 204) {
          toast.success("Training updated");
          setOpenModal((prev) => !prev);
        } else {
          toast.error("Could not update. Please try again");
        }
      })
      .catch((error) => {
        setOpenModal((prev) => !prev);
        setIsLoading((prev) => !prev);
        toast.error("An error occured.please try again later");
        console.log(error);
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading((prev) => !prev);
    e.preventDefault();
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

  // return (
  //   <Dialog open={openModal}>
  //     <DialogTrigger asChild onClick={() => setOpenModal((prev) => !prev)}>
  //       {header}
  //     </DialogTrigger>
  //     <DialogContent className="sm:max-w-lg">
  //       <DialogHeader className="bg-tertiary p-5">
  //         <DialogTitle className="text-black text-2xl">
  //           Editer le Projet de Formation
  //         </DialogTitle>
  //         <DialogDescription className="text-gray-100">
  //           Mettez à jour votre projet de formation en definisant de nouvelles
  //           valeurs pour l'amelioration...
  //         </DialogDescription>
  //       </DialogHeader>
  //       <form onSubmit={handleSubmit} className="px-5 pb-5">
  //         <FormTraining
  //           updatedFormData={handleUpdatedFormData}
  //           initData={initialize}
  //           errors={errors}
  //           isLoading={isLoading}
  //         />
  //         <DialogFooter className="mt-2">
  //           <div className="m-2 flex gap-5">
  //             <Button
  //               className=""
  //               type="button"
  //               variant="outline"
  //               size="sm"
  //               onClick={() => setOpenModal((prev) => !prev)}
  //             >
  //               Annuler
  //             </Button>
  //             {isLoading ? (
  //               <Button
  //                 type="button"
  //                 className="bg-green-600 hover:bg-green-500 flex gap-1 placeholder-opacity-90 hover:cursor-not-allowed"
  //               >
  //                 <Spinner />
  //               </Button>
  //             ) : (
  //               <Button
  //                 type="submit"
  //                 className="bg-green-600 hover:bg-green-500 flex gap-1"
  //               >
  //                 <Icon icon={{ icon: PenLine }}>ÉDITER</Icon>
  //               </Button>
  //             )}
  //           </div>
  //         </DialogFooter>
  //       </form>
  //     </DialogContent>
  //   </Dialog>
  // );

  return (
    <form onSubmit={handleSubmit} className="px-5 pb-5">
      <FormTraining
        updatedFormData={handleUpdatedFormData}
        errors={errors}
        isLoading={isLoading}
      />
      <ButtonUI
        type="submit"
        className={clsx("bg-green-600 hover:bg-green-500 mt-2")}
        isLoading={isLoading}
        icon={{ icon: Plus }}
      >
        Edit
      </ButtonUI>
    </form>
  );
}
