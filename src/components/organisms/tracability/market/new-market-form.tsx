"use client";

import { InputUI } from "@/components/atoms/disign-system/form/input-ui";
<<<<<<< HEAD
import { DBMarketProps, MarketFormProps } from "@/types/tracability/market";
=======
import { TextareaUI } from "@/components/atoms/disign-system/form/textarea-ui";
import { MarketFormProps } from "@/types/tracability/market";
>>>>>>> 66eaa012f9bbed756b5adcd1cf8c7d309a0e3395
import { useEffect, useState } from "react";

interface Props {
  updatedFormData: (data: Partial<DBMarketProps>) => void;
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
  const [formData, setFormData] = useState<Partial<DBMarketProps>>({
    id: initData ? initData.id : "",
    location: initData ? initData.location : "",
    price_of_day: initData ? initData.price_of_day : 0,
    start_date: initData ? initData.start_date : "",
    end_date: initData ? initData.end_date : "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(value)
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
<<<<<<< HEAD
      <InputUI
        label="Prix du jour (en XAF)"
        id="title"
        type="number"
        placeholder="Prix du jour"
        isLoading={isLoading}
        errors={errors}
        value={formData.price_of_day}
        onChange={(e) => handleChange(e)}
      />
=======
>>>>>>> 66eaa012f9bbed756b5adcd1cf8c7d309a0e3395
      <div className="grid grid-cols-2 items-center gap-4">
        <InputUI
          label="Où se tiendra le marché ?"
          id="location"
          placeholder="entrer la Localité"
          isLoading={isLoading}
          errors={errors}
          required
          value={formData.location}
          onChange={handleChange}
        />
        <InputUI
          label="Prix du jour (en XAF)"
          id="price_of_day"
          type="number"
          placeholder="Prix du jour"
          isLoading={isLoading}
          errors={errors}
          required
          value={formData.price_of_day}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-2 items-center gap-4">
        <InputUI
          label="date de début du marché"
          id="start_date"
          type="datetime-local"
          isLoading={isLoading}
          errors={errors}
          required
          value={formData.start_date}
          onChange={(e) => handleChange(e)}
        />

        <InputUI
          label="date de fin du marché"
          id="end_date"
          type="datetime-local"
          isLoading={isLoading}
          errors={errors}
          required
          value={formData.end_date}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <TextareaUI
        label="Description"
        id="description"
        isLoading={isLoading}
        errors={errors}
        value={formData.description}
        onChange={handleChange}
      />
    </div>
  );
};
