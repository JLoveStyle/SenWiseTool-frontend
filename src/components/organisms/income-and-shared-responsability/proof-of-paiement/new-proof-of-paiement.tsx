"use client";

import { ButtonUI } from "@/components/atoms/disign-system/button-ui";
import { useToggle } from "@/hooks/use-toggle";
import { UpdateFilesToS3 } from "@/lib/s3";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import {
  ProofOfPaiementFormProps,
  incomeAndSharedResponsabilityDBProps,
} from "@/types/income-and-shared-responsability";
import { mutateApiData } from "@/utiles/services/mutations";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { NewProofOfPaiementForm } from "./new-proof-of-paiement-form";
import { useDialogControl } from "@/lib/stores/useDialog-coontrol";
import { Button } from "@/components/ui/button";

interface Props {
  endpoint: string;
}

export function NewProofOfPaiement({ endpoint }: Props) {
  const { value: isLoading, setValue: setIsLoading } = useToggle();
  const [errors, setErrors] = useState({});
  const [URLs, setURLs] = useState<
    Partial<incomeAndSharedResponsabilityDBProps>
  >({});
  const { isDialogOpen, setIsDialogOpen } = useDialogControl();

  const router = useRouter();

  const [formData, setFormData] = useState<ProofOfPaiementFormProps>({
    agreement_pv: [],
    proof_of_paiement: [],
    proof_of_expenses: [],
  });

  // load company state
  const company = useCompanyStore((state) => state.company);
  const currentCampain = useCampaignStore((state) => state.currentCampaign);

  // Fonction de gestion pour la mise à jour des données du formulaire
  const handleUpdatedFormData = (updatedFormData: ProofOfPaiementFormProps) => {
    setFormData(updatedFormData);
  };

  const handleCreateActivity = async (
    formData: ProofOfPaiementFormProps,
    uploadedURLs: Partial<incomeAndSharedResponsabilityDBProps> | undefined
  ) => {
    const dataToDB = {
      ...uploadedURLs,
      company_id: company?.id,
      type: "PAYMENT_JUSTIFICATION",
      producer_payment_proof: [""],
      first_buyer_proof: [""],
      management_plan: [""],
    };

    // CREATE AGRICULTURAL ACTIVITY
    await mutateApiData(endpoint, dataToDB)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          toast.success("Activity created successfully");
          setIsLoading(false);

          // closeModal
          setIsDialogOpen(!isDialogOpen);
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

  const handleUploadAgreementPV = async (
    formData: ProofOfPaiementFormProps
  ) => {
    if (formData.agreement_pv && formData.agreement_pv.length !== 0) {
      const { data, error } = await UpdateFilesToS3({
        files: formData.agreement_pv,
        directory: "income_and_shared_responsability",
      });

      if (error) {
        console.log(error);
        throw new Error("Erreur lors de l'upload des PV");
      }

      setURLs((prev) => ({ ...prev, agreement_pv: data.URLs }));
      return data.URLs as string[];
    }
  };

  const handleUploadProofOfPaiement = async (
    formData: ProofOfPaiementFormProps
  ) => {
    if (formData.proof_of_paiement && formData.proof_of_paiement.length !== 0) {
      const { data, error } = await UpdateFilesToS3({
        files: formData.proof_of_paiement,
        directory: "income_and_shared_responsability",
      });

      if (error) {
        console.log(error);
        throw new Error("Erreur lors de l'upload des images");
      }

      setURLs((prev) => ({ ...prev, proof_of_paiement: data.URLs }));
      return data.URLs as string[];
    }
  };

  const handleUploadProofOfExpenses = async (
    formData: ProofOfPaiementFormProps
  ) => {
    if (formData.proof_of_expenses && formData.proof_of_expenses.length !== 0) {
      const { data, error } = await UpdateFilesToS3({
        files: formData.proof_of_expenses,
        directory: "income_and_shared_responsability",
      });
      if (error) {
        console.log(error);
        throw new Error("Erreur lors de l'upload des documents");
      }

      setURLs((prev) => ({ ...prev, proof_of_expenses: data.URLs }));
      return data.URLs as string[];
    }
  };

  // Nouvelle fonction pour gérer tous les uploads
  const handleAllUploads = async (formData: ProofOfPaiementFormProps) => {
    try {
      const [agreement_pv, proof_of_paiement, proof_of_expenses] =
        await Promise.all([
          handleUploadAgreementPV(formData),
          handleUploadProofOfPaiement(formData),
          handleUploadProofOfExpenses(formData),
        ]);

      return {
        agreement_pv,
        proof_of_paiement,
        proof_of_expenses,
      };
    } catch (error) {
      console.error("Erreur pendant l'upload des fichiers:", error);
      toast.error("Erreur lors de l'upload des fichiers");
      return
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      const uploadedURLs = await handleAllUploads(formData);
      console.log(uploadedURLs);
      handleCreateActivity(formData, uploadedURLs);
    } catch (error) {
      console.error("Erreur pendant la soumission du formulaire:", error);
      toast.error("Erreur lors de la soumission du formulaire");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-5 pb-5">
      <NewProofOfPaiementForm
        updatedFormData={handleUpdatedFormData}
        errors={errors}
        isLoading={isLoading}
      />

      <div className="flex items-baseline space-x-2">
        <p className="flex-1"></p>

        <ButtonUI
          type="submit"
          className={clsx("bg-black hover:bg-black mt-2 flex justify-end")}
          isLoading={isLoading}
          icon={{ icon: Plus }}
        >
          Créer
        </ButtonUI>
      </div>
    </form>
  );
}
