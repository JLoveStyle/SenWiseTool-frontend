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
import { Bounce, toast } from "react-toastify";
import { dbCreateAgent } from "../create-multiple-account/new-form-multiple-agent";
import { FormUniqAgent } from "./form-uniq-agent";
import { mutateApiData } from "@/utiles/services/mutations";

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

  // load company from state
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
    e.preventDefault();
    setIsLoading(true);

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

    // check if there is atleast a project code
    if (!formData.projectCodes?.length) {
      toast.warning("Please enter atleast one project code. Hit enter to validate code");
      setIsLoading(false);
      return;
    }
    // Because projectCodes should be of type string[]
    const formatProjectcode = []
    for (const code of formData.projectCodes) {
      formatProjectcode.push(code.value)
    }
    console.log('=>\n', {
      company_id: company?.id,
      projectCodes: formatProjectcode,
      agentCode: formData.agentCode,
      fullName: formData.fullName,
    })

    await mutateApiData(Route.assigne, {
      company_id: company?.id,
      projectCodes: formatProjectcode,
      agentCode: formData.agentCode,
      fullName: formData.fullName,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          setIsLoading(false);
          toast.success("Success", {
            transition: Bounce,
            autoClose: 3000,
          });
          // close modal
          router.refresh();
        } else if (response.status === 409) {
          setIsLoading(false);
          toast.warning(`Agent with code ${formData.agentCode} already exist`, {
            transition: Bounce,
            autoClose: 3000,
          });
          return;
        } else {
          setIsLoading(false);
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Sorry something went wrong. Please try again");
      });
    console.log("formData", { ...formData, company_id: company?.id });

    // handleCreateAgent(formData);
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
        Create
      </ButtonUI>
    </form>
  );
}
