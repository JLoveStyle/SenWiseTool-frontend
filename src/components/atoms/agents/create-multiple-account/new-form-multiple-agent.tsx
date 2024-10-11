"use client";

import { ButtonUI } from "@/components/atoms/disign-system/button-ui";
import { useToggle } from "@/hooks/use-toggle";
import { Route } from "@/lib/route";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { DBAgentProps, MultipleFormAgentProps } from "@/types/agent-props";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { generateUniqueCode } from "@/utils/generate-uniq-code";
import { arrayNumber } from "@/utils/tool";
import { validatorForm } from "@/utils/validator-form";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { FormMultipleAgent } from "./form-multiple-agent";

export function NewFormMiltipleAgent() {
  const { value: isLoading, setValue: setIsLoading } = useToggle();
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const [formData, setFormData] = useState<MultipleFormAgentProps>({
    id: "",
    accountNumber: 0,
    projectCodes: [],
  });

  // load company state
  const company = useCompanyStore((state) => state.company);

  // Fonction de gestion pour la mise à jour des données du formulaire
  const handleUpdatedFormData = (updatedFormData: MultipleFormAgentProps) => {
    setFormData(updatedFormData);
  };

  const handleCreateAgent = async (formData: MultipleFormAgentProps) => {
    const serverResponses: any[] = [];

    const serverResponse = await Promise.all(
      arrayNumber(formData.accountNumber).map(async () => {
        const dataToDB = {
          agentCode: generateUniqueCode(),
          projectCodes: formData.projectCodes
            ? formData.projectCodes.map((item) => item.value)
            : [],
        };

        // const result = await db_create_agent(dataToDB);
        const result = await dbCreateAgent(dataToDB);
        return result;
      })
    );

    serverResponses.push(...serverResponse);

    for (const index in serverResponses) {
      if (Object.prototype.hasOwnProperty.call(serverResponses, index)) {
        const serverResponse = serverResponses[index];
        if (serverResponse.status === "error") {
          toast.error(`Faillure during agent ${index + 1} generation`);
          setIsLoading(false);
          return;
        }
      }
    }

    toast.success("All agents are generated successfull");
    setIsLoading(false);
    // closeDialog();
    router.refresh();
    router.push(Route.agents);
    return;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      const { isValid, errors } = await validatorForm(formData, {
        accountNumber: "required|min:2",
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
      <FormMultipleAgent
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
        Générer
      </ButtonUI>
    </form>
  );
}

export const dbCreateAgent = async (data: DBAgentProps) => {
  const agents = LOCAL_STORAGE.get("agents") || [];
  const id = agents.length != 0 ? agents.length + 1 : 1;
  LOCAL_STORAGE.save("agents", [...agents, { id: id, ...data }]);
  return { response: "creation successfull", status: "success" };
};
