"use client";

import { ButtonUI } from "@/components/atoms/disign-system/button-ui";
import { useToggle } from "@/hooks/use-toggle";
import { UpdateFilesToS3 } from "@/lib/s3";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import {
  differentialFormProps,
  incomeAndSharedResponsabilityDBProps,
} from "@/types/income-and-shared-responsability";
import { mutateApiData } from "@/utiles/services/mutations";
import { validatorForm } from "@/utils/validator-form";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { NewDifferentialForm } from "./new-differential-form";

interface Props {
  endpoint: string;
}

export function NewDifferential({ endpoint }: Props) {
  const { value: isLoading, setValue: setIsLoading } = useToggle();
  const [errors, setErrors] = useState({});
  const [URLs, setURLs] = useState<
    Partial<incomeAndSharedResponsabilityDBProps>
  >({});
  const [closeModal, setCloseModal] = useState<boolean>(false);

  const router = useRouter();

  const [formData, setFormData] = useState<differentialFormProps>({
    first_buyer_proof: [],
    producer_payment_proof: [],
  });

  // load company state
  const company = useCompanyStore((state) => state.company);
  const currentCampain = useCampaignStore((state) => state.currentCampaign);

  // Fonction de gestion pour la mise à jour des données du formulaire
  const handleUpdatedFormData = (updatedFormData: differentialFormProps) => {
    setFormData(updatedFormData);
  };

  const handleCreateActivity = async (
    formData: differentialFormProps,
    uploadedURLs: Partial<incomeAndSharedResponsabilityDBProps> | undefined
  ) => {
    const dataToDB = {
      ...uploadedURLs,
      company_id: company?.id,
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
          toast.success("Activity created successfully");
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

  const handleFirstBuyerProof = async (formData: differentialFormProps) => {
    if (
      formData.producer_payment_proof &&
      formData.producer_payment_proof.length !== 0
    ) {
      const { data, error } = await UpdateFilesToS3({
        files: formData.producer_payment_proof,
        directory: "agriculture/pictures",
      });

      if (error) {
        console.log(error);
        throw new Error("Erreur lors de l'upload des images");
      }

      setURLs((prev) => ({ ...prev, producer_payment_proof: data.URLs }));
      return data.URLs as string[];
    }
  };

  const handleProducerPaymentProof = async (
    formData: differentialFormProps
  ) => {
    if (formData.first_buyer_proof && formData.first_buyer_proof.length !== 0) {
      const { data, error } = await UpdateFilesToS3({
        files: formData.first_buyer_proof,
        directory: "agriculture/pv",
      });

      if (error) {
        console.log(error);
        throw new Error("Erreur lors de l'upload des PV");
      }

      setURLs((prev) => ({ ...prev, first_buyer_proof: data.URLs }));
      return data.URLs as string[];
    }
  };

  // Nouvelle fonction pour gérer tous les uploads
  const handleAllUploads = async (formData: differentialFormProps) => {
    try {
      const [first_buyer_proof, producer_payment_proof] = await Promise.all([
        handleFirstBuyerProof(formData),
        handleProducerPaymentProof(formData),
      ]);

      return {
        first_buyer_proof,
        producer_payment_proof,
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

      const { isValid, errors } = await validatorForm(formData, {
        activity_title: "required",
      });

      if (!isValid) {
        setErrors(errors);
        toast.error("Something is wrong");
        console.log(errors);
        setIsLoading(false);
        return;
      }

      const uploadedURLs = await handleAllUploads(formData);

      handleCreateActivity(formData, uploadedURLs);
    } catch (error) {
      console.error("Erreur pendant la soumission du formulaire:", error);
      toast.error("Erreur lors de la soumission du formulaire");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-5 pb-5">
      <NewDifferentialForm
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
