"use client";

import { Label } from "@/components/ui/label";
import { CodeProjectProps, MultipleFormAgentProps } from "@/types/agent-props";
import { useEffect, useState } from "react";
import { RxCross2, RxDotFilled } from "react-icons/rx";
import { InputUI } from "../../disign-system/form/input-ui";

interface Props {
  updatedFormData: (data: MultipleFormAgentProps) => void;
  initData?: MultipleFormAgentProps;
  errors: { [key: string]: any };
  isLoading: boolean;
  displayListOfProjects?: boolean
}

export const FormMultipleAgent = ({
  updatedFormData,
  initData,
  errors,
  isLoading,
  displayListOfProjects
}: Props) => {
  const [formData, setFormData] = useState<MultipleFormAgentProps>({
    id: initData ? initData.id : "",
    accountNumber: initData ? initData.accountNumber : 0,
    projectCodes: initData ? initData.projectCodes : [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [projectCode, setProjectCode] = useState<CodeProjectProps>();

  const handleProjectCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectCode({
      id: formData.projectCodes?.length! + 1,
      value: e.target.value,
    });

    if (e.target.value.trim().length !== 4) {
      errors["projectCodes"] = "Le code doit être à 4 caractères";
      return;
    } else {
      delete errors["projectCodes"];
    }
  };

  // Gestionnaire de la touche "Enter" pour ajouter un projectCode
  const handleUpdateProjectCodes = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && projectCode?.value.trim() !== "") {
      e.preventDefault();

      if (projectCode?.value.trim().length !== 4) return;

      if (
        projectCode &&
        formData.projectCodes?.filter(
          (mod) => mod.value == projectCode?.value.trim()
        ).length === 0
      ) {
        setProjectCode({ id: 0, value: "" });

        setFormData((prev) => ({
          ...prev,
          projectCodes: [...prev.projectCodes!, projectCode],
        }));
      }
    }
  };

  // Supprimer un projectCode
  const removeProjectCode = (id: number) => {
    const updatedprojectCodes = formData.projectCodes?.filter(
      (projectCode) => projectCode.id !== id
    );
    setFormData((prev) => ({ ...prev, projectCodes: updatedprojectCodes }));
  };

  // Mettre à jour le parent chaque fois que formData change
  useEffect(() => {
    updatedFormData(formData);
  }, [formData, updatedFormData]);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid w-full items-center gap-1.5">
        <InputUI
          label="Number of sub account to generate"
          id="accountNumber"
          placeholder="Enter number of account"
          required
          isLoading={isLoading}
          errors={errors}
          value={formData.accountNumber}
          onChange={handleChange}
        />
      </div>
      
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="projectCodes" className="text-gray-400">
          Liste des projets
        </Label>
        <div className="outline-none border-gray-800 block bg-gray-50 p-1 mb-2 max-h-28 overflow-y-scroll scrool-bar-hidden">
          {formData.projectCodes &&
            formData.projectCodes.map((mod) => (
              <div
                key={mod.id}
                className="flex items-center gap-1 px-1 my-2 rounded-full relative"
              >
                <span className="text-gray-700">
                  <RxDotFilled className="text-blue-600 inline" size={25} />
                  {mod.value}
                </span>
                <RxCross2
                  size={15}
                  className="text-gray-500 absolute right-0 top-0 cursor-pointer hover:text-gray-800 hover:font-bold"
                  onClick={() => removeProjectCode(mod.id)}
                />
              </div>
            ))}
        </div>

        <InputUI
          label="Project code(s)"
          id="projectCodes"
          placeholder="Enter project code and hit enter"
          isLoading={isLoading}
          value={projectCode?.value}
          errors={errors}
          onChange={handleProjectCodeChange}
          onKeyDown={handleUpdateProjectCodes}
        />
      </div>
    </div>
  );
};
