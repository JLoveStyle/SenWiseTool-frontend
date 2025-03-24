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
import { useDialogControl } from "@/lib/stores/useDialog-coontrol";

interface Props {
  endpoint: string;
}

export function NewManagementPlan({ endpoint }: Props) {
  const { value: isLoading, setValue: setIsLoading } = useToggle();
  const [errors, setErrors] = useState({});
  const [URLs, setURLs] = useState<
    Partial<incomeAndSharedResponsabilityDBProps>
  >({});
  const { isDialogOpen, setIsDialogOpen } = useDialogControl();
  const router = useRouter();

  const [formData, setFormData] = useState<ManagementPlanFormProps>({
    management_plan: [],
  });

  // load company state
  const company = useCompanyStore((state) => state.company);

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

    // CREATE AGRICULTURAL ACTIVITY
    await mutateApiData(endpoint, dataToDB)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Management plan created successfully");
          setIsLoading(false);

          // closeModal
          setIsDialogOpen(!isDialogOpen);
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
