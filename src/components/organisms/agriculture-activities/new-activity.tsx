"use client";

import { ButtonUI } from "@/components/atoms/disign-system/button-ui";
import { useToggle } from "@/hooks/use-toggle";
import { Route } from "@/lib/route";
import { UpdateFilesToS3 } from "@/lib/s3";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { ActivityFormProps, ActivityProps } from "@/types/activity";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { validatorForm } from "@/utils/validator-form";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { NewActivityForm } from "./new-activity-form";

export function NewActivityAgriculture() {
  const { value: isLoading, setValue: setIsLoading } = useToggle();
  const [errors, setErrors] = useState({});
  const [URLs, setURLs] = useState<Partial<ActivityProps>>({});

  const router = useRouter();

  const [formData, setFormData] = useState<ActivityFormProps>({
    activity_title: "",
    pv_url: [],
    pictures_url: [],
    documents_url: [],
  });

  // load company state
  const company = useCompanyStore((state) => state.company);
  const currentCampain = useCampaignStore((state) => state.currentCampaign);

  // Fonction de gestion pour la mise à jour des données du formulaire
  const handleUpdatedFormData = (updatedFormData: ActivityFormProps) => {
    setFormData(updatedFormData);
  };

  const handleCreateActivity = async (
    formData: ActivityFormProps,
    uploadedURLs: Partial<ActivityProps> | undefined
  ) => {
    const dataToDB = {
      activity_title: formData.activity_title,
      ...uploadedURLs,
      company_id: company?.id,
    };

    // Sauvegarde de l'activité
    const existingActivities = LOCAL_STORAGE.get("agricultures") ?? [];
    LOCAL_STORAGE.save("agricultures", [
      ...existingActivities,
      { id: existingActivities.length + 1, ...dataToDB },
    ]);

    toast.success("Activité d'agriculture créée avec succès");
    setIsLoading(false);
    router.refresh();
    router.push(Route.agriculture);
    return;
  };

  const handleUploadPV = async (formData: ActivityFormProps) => {
    if (formData.pv_url && formData.pv_url.length !== 0) {
      const { data, error } = await UpdateFilesToS3({
        files: formData.pv_url,
        directory: "agriculture/pv",
      });

      if (error) {
        console.log(error);
        throw new Error("Erreur lors de l'upload des PV");
      }

      setURLs((prev) => ({ ...prev, pv_url: data.URLs }));
      return data.URLs as string[];
    }
  };

  const handleUploadPictures = async (formData: ActivityFormProps) => {
    if (formData.pictures_url && formData.pictures_url.length !== 0) {
      const { data, error } = await UpdateFilesToS3({
        files: formData.pictures_url,
        directory: "agriculture/pictures",
      });

      if (error) {
        console.log(error);
        throw new Error("Erreur lors de l'upload des images");
      }

      setURLs((prev) => ({ ...prev, pictures_url: data.URLs }));
      return data.URLs as string[];
    }
  };

  const handleUploadDocuments = async (formData: ActivityFormProps) => {
    if (formData.documents_url && formData.documents_url.length !== 0) {
      const { data, error } = await UpdateFilesToS3({
        files: formData.documents_url,
        directory: "agriculture/documents",
      });
      if (error) {
        console.log(error);
        throw new Error("Erreur lors de l'upload des documents");
      }

      setURLs((prev) => ({ ...prev, documents_url: data.URLs }));
      return data.URLs as string[];
    }
  };

  // Nouvelle fonction pour gérer tous les uploads
  const handleAllUploads = async (formData: ActivityFormProps) => {
    try {
      const [pv_url, pictures_url, documents_url] = await Promise.all([
        handleUploadPV(formData),
        handleUploadPictures(formData),
        handleUploadDocuments(formData),
      ]);

      return {
        pv_url,
        pictures_url,
        documents_url,
      };

      console.log("Tous les fichiers ont été téléchargés avec succès");

      // Files updated
      console.table([
        {
          Action: "Uploaded PV",
          Status: URLs.pv_url ? "Successfull..." : "unavailable...",
          URLs: URLs.pv_url || "-",
        },
        {
          Action: "Uploaded Pictures",
          Status: URLs.pictures_url ? "Successfull..." : "unavailable...",
          URLs: URLs.pictures_url || "-",
        },
        {
          Action: "Uploaded Documents",
          Status: "Successfull...",
          URLs: URLs.documents_url || "-",
        },
      ]);
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
