"use client";

import { ButtonUI } from "@/components/atoms/disign-system/button-ui";
import { useToggle } from "@/hooks/use-toggle";
import { UpdateFilesToS3 } from "@/lib/s3";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import {
  incomeAndSharedResponsabilityDBProps,
  ManagementPlanFormProps,
} from "@/types/income-and-shared-responsability";
import { mutateApiData } from "@/utiles/services/mutations";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { NewActivityForm } from "./new-management-plan-form";

interface Props {
  endpoint: string;
}

export function NewManagementPlan({ endpoint }: Props) {
  const { value: isLoading, setValue: setIsLoading } = useToggle();
  const [errors, setErrors] = useState({});
  const [URLs, setURLs] = useState<
    Partial<incomeAndSharedResponsabilityDBProps>
  >({});
  const [closeModal, setCloseModal] = useState<boolean>(false);

  const router = useRouter();

  const [formData, setFormData] = useState<ManagementPlanFormProps>({
    management_plan: [],
  });

  // load company state
  const company = useCompanyStore((state) => state.company);
  const currentCampain = useCampaignStore((state) => state.currentCampaign);

  // Fonction de gestion pour la mise à jour des données du formulaire
  const handleUpdatedFormData = (updatedFormData: ManagementPlanFormProps) => {
    setFormData(updatedFormData);
  };

  const handleCreateManagementPlan = async (
    formData: ManagementPlanFormProps,
    uploadedURLs: Partial<incomeAndSharedResponsabilityDBProps> | undefined
  ) => {
    const dataToDB = {
      ...uploadedURLs,
      company_id: company?.id,
      type: "INVESTMENT_MANAGEMENT_PLAN",
      agreement_pv: [''],
      proof_of_paiement: [""],
      proof_of_expenses: [""],
      first_buyer_proof: [""],
      producer_payment_proof: [""]
    };

    console.log(dataToDB);

    // Sauvegarde de l'activité
    // const existingActivities = LOCAL_STORAGE.get("agricultures") ?? [];
    // LOCAL_STORAGE.save("agricultures", [
    //   ...existingActivities,
    //   { id: existingActivities.length + 1, ...dataToDB },
    // ]);

    // CREATE AGRICULTURAL ACTIVITY
    await mutateApiData(endpoint, dataToDB)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          toast.success("Management plan created successfully");
          setIsLoading(false);

          // closeModal
          setCloseModal(false);
          router.refresh();
          // router.push(Route.agriculture);
          return;
        } else if (response.message === "Internal Server Error") {
          toast.error("Internal Server Error");
          setIsLoading(false);
          return;
        } else {
          toast.error("Something went wrong. Please try again");
          setIsLoading(false);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUploadPictures = async (formData: ManagementPlanFormProps) => {
    if (formData.management_plan && formData.management_plan.length !== 0) {
      const { data, error } = await UpdateFilesToS3({
        files: formData.management_plan,
        directory: "agriculture/pictures",
      });

      if (error) {
        console.log(error);
        throw new Error("Erreur lors de l'upload des fichiers");
      }

      setURLs((prev) => ({ ...prev, management_plan: data.URLs }));
      return data.URLs as string[];
    }
  };

  // Nouvelle fonction pour gérer tous les uploads
  const handleAllUploads = async (formData: ManagementPlanFormProps) => {
    try {
      const [management_plan] = await Promise.all([
        handleUploadPictures(formData),
      ]);

      return {
        management_plan,
      };
    } catch (error) {
      console.error("Erreur pendant l'upload des fichiers:", error);
      toast.error("Erreur lors de l'upload des fichiers");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      // const { isValid, errors } = await validatorForm(formData, {
      //   activity_title: "required",
      // });

      // if (!isValid) {
      //   setErrors(errors);
      //   toast.error("Something is wrong");
      //   console.log(errors);
      //   setIsLoading(false);
      //   return;
      // }

      const uploadedURLs = await handleAllUploads(formData);

      handleCreateManagementPlan(formData, uploadedURLs);
    } catch (error) {
      console.error("Erreur pendant la soumission du formulaire:", error);
      toast.error("Erreur lors de la soumission du formulaire");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-5 pb-5">
      <NewActivityForm
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
        Créer
      </ButtonUI>
    </form>
  );
}
