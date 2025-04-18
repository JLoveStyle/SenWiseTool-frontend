"use client";

import { ButtonUI } from "@/components/atoms/disign-system/button-ui";
import { useToggle } from "@/hooks/use-toggle";
import { Route } from "@/lib/route";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { AgentProps } from "@/types/agent-props";
import { validatorForm } from "@/utils/validator-form";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { FormUniqAgent } from "./form-uniq-agent";
import { mutateApiData } from "@/utiles/services/mutations";
import { useDialogControl } from "@/lib/stores/useDialog-coontrol";
import revalidatePath from "@/utils/server-actions";

interface Props {
  projects?: any[];
}

export function NewFormUniqAgent({ projects }: Props) {
  const { value: isLoading, setValue: setIsLoading } = useToggle();
  const [errors, setErrors] = useState({});

  const { isDialogOpen, setIsDialogOpen } = useDialogControl();

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
      toast.warning(
        "Veillez entrer au moins un code de projet et frapper la touche entrer pour validé de code"
      );
      setIsLoading(false);
      return;
    }
    // Because projectCodes should be of type string[]
    const formatProjectcode = [];
    for (const code of formData.projectCodes) {
      formatProjectcode.push(code.value);
    }

    // assigne a project or multiple projects to an agent
    await mutateApiData(Route.assigne, {
      company_id: company?.id,
      projectCodes: formatProjectcode,
      agentCode: formData.agentCode,
      fullName: formData.fullName,
    })
      .then((response) => {
        if (response.status === 201) {
          setIsLoading(false);
          toast.success("Success", {
            transition: Bounce,
            autoClose: 3000,
          });
          // close modal
          setIsDialogOpen(!isDialogOpen);

          // revalidate the page
          revalidatePath("/dashboard/agents");
        } else if (response.status === 409) {
          setIsLoading(false);
          toast.warning(`Code ${formData.agentCode} existe déjà`, {
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

    // handleCreateAgent(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="px-5 pb-5">
      <FormUniqAgent
        projects={projects as any[]}
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
