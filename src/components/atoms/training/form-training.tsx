"use client";

import { Label } from "@/components/ui/label";
import { ModuleProps, TrainingProps } from "@/types/formData";
import { useEffect, useState } from "react";
import { RxCross2, RxDotFilled } from "react-icons/rx";
import { InputUI } from "../disign-system/form/input-ui";

interface Props {
  updatedFormData: (data: TrainingProps) => void;
  initData?: TrainingProps;
  errors: { [key: string]: any };
  isLoading: boolean;
}

export const FormTraining = ({
  updatedFormData,
  initData,
  errors,
  isLoading,
}: Props) => {
  const [formData, setFormData] = useState<TrainingProps>({
    id: initData ? initData.id : "",
    title: initData ? initData.title : "",
    start_date: initData ? initData.start_date : "",
    end_date: initData ? initData.end_date : "",
    location: initData ? initData.location : "",
    modules: initData ? initData.modules : [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [module, setModule] = useState<ModuleProps>();

  const handleModuleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModule({ id: formData.modules.length + 1, value: e.target.value });
  };

  // Gestionnaire de la touche "Enter" pour ajouter un module
  const handleUpdateModules = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && module?.value.trim() !== "") {
      e.preventDefault();

      if (
        module &&
        formData.modules.filter((mod) => mod.value == module?.value.trim())
          .length === 0
      ) {
        setModule({ id: 0, value: "" });

        setFormData((prev) => ({
          ...prev,
          modules: [...prev.modules, module],
        }));
      }
    }
  };

  // Supprimer un module
  const removeModule = (id: number) => {
    const updatedModules = formData.modules.filter(
      (module) => module.id !== id
    );
    setFormData((prev) => ({ ...prev, modules: updatedModules }));
  };

  // Mettre à jour le parent chaque fois que formData change
  useEffect(() => {
    updatedFormData(formData);
  }, [formData, updatedFormData]);

  return (
    <div className="flex flex-col gap-5">
      <InputUI
        label="Titre"
        id="title"
        placeholder="Entrer le titre du projet"
        isLoading={isLoading}
        errors={errors}
        value={formData.title}
        onChange={handleChange}
      />
      <InputUI
        label="Lieu de la formation"
        id="location"
        placeholder="Lieu"
        isLoading={isLoading}
        errors={errors}
        value={formData.location}
        onChange={handleChange}
      />
      <div className="grid grid-cols-2 items-center gap-4">
        <InputUI
          label="Date de debut"
          id="start_date"
          type="datetime-local"
          isLoading={isLoading}
          errors={errors}
          value={formData.start_date}
          onChange={handleChange}
        />

        <InputUI
          label="Date de fin"
          id="end_date"
          type="datetime-local"
          isLoading={isLoading}
          errors={errors}
          value={formData.end_date}
          onChange={handleChange}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="modules">Training modules</Label>
        <div className="outline-none border-gray-800 block bg-gray-50 p-1 mb-2 max-h-28 overflow-y-scroll scrool-bar-hidden">
          {formData.modules &&
            formData.modules.map((mod) => (
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
                  onClick={() => removeModule(mod.id)}
                />
              </div>
            ))}
        </div>

        <InputUI
          label="Modules"
          id="modules"
          placeholder="Renseigner le module et frapper Entrer"
          isLoading={isLoading}
          value={module?.value}
          errors={errors}
          onChange={handleModuleChange}
          onKeyDown={handleUpdateModules}
        />
      </div>
    </div>
  );
};
