"use client";

import { InputUI } from "@/components/atoms/disign-system/form/input-ui";
import { MarketFormProps } from "@/types/tracability/market";
import { useEffect, useState } from "react";

interface Props {
  updatedFormData: (data: MarketFormProps) => void;
  initData?: MarketFormProps;
  errors: { [key: string]: any };
  isLoading: boolean;
}

export const NewMarketForm = ({
  updatedFormData,
  initData,
  errors,
  isLoading,
}: Props) => {
  const [formData, setFormData] = useState<MarketFormProps>({
    id: initData ? initData.id : "",
    price_of_day: initData ? initData.price_of_day : 0,
    start_date: initData ? initData.start_date : "",
    end_date: initData ? initData.end_date : "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (e.target.value.trim().length === 0) {
      errors[name] = "Le code est requis";
      return;
    } else {
      delete errors[name];
    }
  };

  // Mettre à jour le parent chaque fois que formData change
  useEffect(() => {
    updatedFormData(formData);
  }, [formData, updatedFormData]);

  return (
    <div className="flex flex-col gap-5">
      <InputUI
        label="Prix du jour (en XAF)"
        id="title"
        placeholder="Prix du jour"
        isLoading={isLoading}
        errors={errors}
        value={formData.price_of_day}
        onChange={handleChange}
      />
      <div className="grid grid-cols-2 items-center gap-4">
        <InputUI
          label="Début du marché"
          id="start_date"
          type="datetime-local"
          isLoading={isLoading}
          errors={errors}
          value={formData.start_date}
          onChange={handleChange}
        />

        <InputUI
          label="Fin du marché"
          id="end_date"
          type="datetime-local"
          isLoading={isLoading}
          errors={errors}
          value={formData.end_date}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
