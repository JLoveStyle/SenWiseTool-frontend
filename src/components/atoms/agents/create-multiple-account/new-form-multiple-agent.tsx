"use client";

import { ButtonUI } from "@/components/atoms/disign-system/button-ui";
import { useToggle } from "@/hooks/use-toggle";
import { Route } from "@/lib/route";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { MultipleFormAgentProps } from "@/types/agent-props";
import { generateUniqueCode } from "@/utils/generate-uniq-code";
import { arrayNumber } from "@/utils/tool";
import { validatorForm } from "@/utils/validator-form";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { FormMultipleAgent } from "./form-multiple-agent";
import { AssigneeType } from "@/types/api-types";
import { mutateApiData } from "@/utiles/services/mutations";
import { useDialogControl } from "@/lib/stores/useDialog-coontrol";

interface Props {
  projects?: any[];
}

export function NewFormMiltipleAgent({ projects }: Props) {
  const { value: isLoading, setValue: setIsLoading } = useToggle();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState<MultipleFormAgentProps>({
    id: "",
    accountNumber: 0,
    projectCodes: [],
  });

  // load company state
  const company = useCompanyStore((state) => state.company);

  const { isDialogOpen, setIsDialogOpen } = useDialogControl();

  // Fonction de gestion pour la mise à jour des données du formulaire
  const handleUpdatedFormData = (updatedFormData: MultipleFormAgentProps) => {
    setFormData(updatedFormData);
  };

  const handleCreateAgent = async (formData: MultipleFormAgentProps) => {
    setIsLoading((prev) => !prev);
    let assignees: Partial<AssigneeType>[] = [];
    arrayNumber(formData.accountNumber).map(async () => {
      const dataToDB = {
        company_id: company?.id,
        agentCode: generateUniqueCode(),
        projectCodes: formData.projectCodes
          ? formData.projectCodes.map((item) => item.value)
          : [],
      };
      assignees.push(dataToDB);
    });

    await mutateApiData(Route.assigne + "/bulkCreate", assignees)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Success");
          setIsLoading(false);
          setIsDialogOpen(!isDialogOpen);
          return;
        } else if (response.status === 409) {
          setIsLoading(false);
          toast.warning(`Agent with code ${response.agentCode} already exist`);
          return;
        } else {
          setIsLoading(false);
          toast.error("Something went wrong");
          return;
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong. Please try again");
      });
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
        projects={projects as any[]}
      />
      <div className="flex items-baseline space-x-2">
        <p className="flex-1"></p>

        <ButtonUI
          type="submit"
          className={clsx("bg-black hover:bg-black mt-2 flex justify-end")}
          isLoading={isLoading}
          icon={{ icon: Plus }}
        >
          Generer
        </ButtonUI>
      </div>
    </form>
  );
}
