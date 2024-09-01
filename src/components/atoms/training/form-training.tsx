"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RxCross2, RxDotFilled } from "react-icons/rx";

interface ModuleProps {
  id: number;
  value: string;
}

export interface TrainingProps {
  id: number;
  theme: string;
  start_date: string;
  end_date: string;
  modules: ModuleProps[];
}

interface Props {
  updatedFormData: (data: TrainingProps) => void;
  initData?: TrainingProps;
}

export const FormTraining = ({ updatedFormData, initData }: Props) => {
  const [formData, setFormData] = useState<TrainingProps>({
    id: initData ? initData.id : 0,
    theme: initData ? initData.theme : "",
    start_date: initData ? initData.start_date : "",
    end_date: initData ? initData.end_date : "",
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
      <div className="items-center gap-4">
        <Label htmlFor="theme" className="text-right">
          Theme de la formation
        </Label>
        <Input
          id="theme"
          name="theme"
          className="outline-none focus:border-blue-800/30"
          value={formData.theme}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-2 items-center gap-4">
        <div>
          <Label htmlFor="start_date" className="text-right">
            Du
          </Label>
          <Input
            id="start_date"
            name="start_date"
            type="date"
            className="outline-none focus:border-blue-800/30"
            value={formData.start_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="end_date" className="text-right">
            Au
          </Label>
          <Input
            id="end_date"
            name="end_date"
            type="date"
            className="outline-none focus:border-blue-800/30"
            value={formData.end_date}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="modules">Modules à dispenser</Label>
        <div className="outline-none border-gray-800 block bg-gray-50 p-1 mb-2 max-h-32 overflow-y-scroll scrool-bar-hidden">
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
        <Input
          type="text"
          onChange={handleModuleChange}
          onKeyDown={handleUpdateModules}
          value={module?.value}
          id="modules"
          placeholder="Modules à dispenser"
          className="outline-none focus:border-blue-800/30"
          autoComplete="off"
        />
      </div>
    </div>
  );
};
