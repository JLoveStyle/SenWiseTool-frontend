"use client";

import { ButtonUI } from "@/components/atoms/disign-system/button-ui";
import { useToggle } from "@/hooks/use-toggle";
import { UpdateFilesToS3 } from "@/lib/s3";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { ActivityFormProps, ActivityProps } from "@/types/activity";
import { validatorForm } from "@/utils/validator-form";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { NewActivityForm } from "./new-activity-form";
import { mutateApiData } from "@/utiles/services/mutations";
import { useDialogControl } from "@/lib/stores/useDialog-coontrol";

interface Props {
  endpoint: string;
}

export function NewActivityAgriculture({ endpoint }: Props) {
  const { value: isLoading, setValue: setIsLoading } = useToggle();
  const [errors, setErrors] = useState({});
  const [URLs, setURLs] = useState<Partial<ActivityProps>>({});
  const { isDialogOpen, setIsDialogOpen } = useDialogControl();

  const [formData, setFormData] = useState<ActivityFormProps>({
    activity_title: "",
    pv_url: [],
    pictures_url: [],
    documents_url: [],
  });

  // load company state
  const company = useCompanyStore((state) => state.company);

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

    // CREATE AGRICULTURAL ACTIVITY
    await mutateApiData(endpoint, dataToDB)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Activity created successfully");
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
