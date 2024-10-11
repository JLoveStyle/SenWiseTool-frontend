"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CodeProjectProps } from "@/types/agent-props";
import { useEffect, useState } from "react";
import { RxCross2, RxDotFilled } from "react-icons/rx";
import { InputUI } from "../disign-system/form/input-ui";

interface Props {
  updatedFormProjectCode: (data: CodeProjectProps[]) => void;
  onSubmitProjectCodeAgent: () => void;
  initData?: CodeProjectProps[];
  errors: { [key: string]: any };
  isLoading: boolean;
}

export const UpdateProjectCodeAgent = ({
  updatedFormProjectCode,
  onSubmitProjectCodeAgent,
  initData,
  errors,
  isLoading,
}: Props) => {
  const [formData, setFormData] = useState<CodeProjectProps[]>(initData ?? []);

  const [projectCode, setProjectCode] = useState<CodeProjectProps>();

  const handleProjectCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectCode({
      id: formData?.length! + 1,
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
        Array.isArray(formData) &&
        formData.filter((mod) => mod.value == projectCode?.value.trim())
          .length === 0
      ) {
        setFormData((prev) => [...prev, projectCode]);
        setProjectCode({ id: 0, value: "" });
      }
    }
  };

  // Supprimer un projectCode
  const removeProjectCode = (id: number) => {
    const updatedprojectCodes = formData.filter(
      (projectCode) => projectCode.id !== id
    );
    setFormData(updatedprojectCodes);
  };

  // Mettre à jour le parent chaque fois que formData change
  useEffect(() => {
    updatedFormProjectCode(formData);
  }, [formData, updatedFormProjectCode]);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid w-full items-center gap-3">
        {formData.length !== 0 && (
          <>
            <div className="flex justify-between items-center">
              <Label htmlFor="projectCodes" className="text-gray-400">
                Liste des projets
              </Label>
              <Button onClick={() => onSubmitProjectCodeAgent()}>Submit</Button>
            </div>
            <div className="outline-none border-gray-800 block bg-gray-50 p-1 mb-2 max-h-28 w-full overflow-y-scroll scrool-bar-hidden">
              {Array.isArray(formData) &&
                formData.map((mod) => (
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
          </>
        )}
        <InputUI
          label="Code du projet"
          id="projectCodes"
          placeholder="Entrer le code du projet"
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
