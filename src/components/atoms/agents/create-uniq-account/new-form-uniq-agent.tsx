"use client";

import { ButtonUI } from "@/components/atoms/disign-system/button-ui";
import { useToggle } from "@/hooks/use-toggle";
import { Route } from "@/lib/route";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { AgentProps } from "@/types/agent-props";
import { validatorForm } from "@/utils/validator-form";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { dbCreateAgent } from "../create-multiple-account/new-form-multiple-agent";
import { FormUniqAgent } from "./form-uniq-agent";

export function NewFormUniqAgent() {
  const { value: isLoading, setValue: setIsLoading } = useToggle();
  const { value: openModal, toggle: toggleOpenModal } = useToggle();
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const [formData, setFormData] = useState<AgentProps>({
    id: "",
    fullName: "",
    agentCode: "",
    projectCodes: [],
  });

  // load company state
  const company = useCompanyStore((state) => state.company);

  // Fonction de gestion pour la mise à jour des données du formulaire
  const handleUpdatedFormData = (updatedFormData: AgentProps) => {
    setFormData(updatedFormData);
  };

  const handleCreateAgent = async (formData: AgentProps) => {
    const dataToDB = {
      fullName: formData.fullName,
      agentCode: formData.agentCode,
      // company_id: company?.id,
      projectCodes: formData.projectCodes
        ? formData.projectCodes.map((item) => item.value)
        : [],
    };

    const serverResponse = await dbCreateAgent(dataToDB);
    // const serverResponse = await db_create_training(dataToDB);

    console.log("daaaaata:::::::::", serverResponse);

    if (serverResponse.status === "error") {
      toast.error("Updating training failed");
      setIsLoading(false);
      return;
    }

    toast.success("Your project are created successfull");
    setIsLoading(false);
    toggleOpenModal();
    router.refresh();
    router.push(Route.agents);
    return;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      const { isValid, errors } = await validatorForm(formData, {
        agentCode: "required|size:4",
      });

      if (!isValid) {
        setErrors(errors);
        toast.error("Something is wrong");
        console.log(errors);
        setIsLoading(false);
        return;
      }

      handleCreateAgent(formData);
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit} className="px-5 pb-5">
      <FormUniqAgent
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
