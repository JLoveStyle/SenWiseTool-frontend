"use client";

import { InputUI } from "@/components/atoms/disign-system/form/input-ui";
import { TextareaUI } from "@/components/atoms/disign-system/form/textarea-ui";
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
    location: initData ? initData.location : "",
    price_of_theday: initData ? initData.price_of_theday : 0,
    supplier: initData ? initData.supplier : "",
    start_date: initData ? initData.start_date : "",
    end_date: initData ? initData.end_date : "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    if (name === "price_of_theday") {
      setFormData((prev) => ({ ...prev, [name]: +value }));
    } else setFormData((prev) => ({ ...prev, [name]: value }));

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
      <div className="grid grid-cols-2 items-center gap-4">
        <InputUI
          label="Address"
          id="location"
          placeholder="Entrer une adresse"
          isLoading={isLoading}
          errors={errors}
          required
          value={formData.location}
          onChange={handleChange}
        />
        <InputUI
          label="Prix du jour (in XAF)"
          id="price_of_theday"
          type="number"
          placeholder="Prix du jour"
          isLoading={isLoading}
          errors={errors}
          required
          value={formData.price_of_theday}
          onChange={handleChange}
        />
      </div>
      <div className="grid items-center gap-4">
        <InputUI
          label="Nom du fournisseur"
          id="supplier"
          placeholder="Nom du fournisseur"
          isLoading={isLoading}
          errors={errors}
          required
          value={formData.supplier}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-2 items-center gap-4">
        <InputUI
          label="Date de debut du marché"
          id="start_date"
          type="datetime-local"
          isLoading={isLoading}
          errors={errors}
          required
          value={formData.start_date}
          onChange={(e) => handleChange(e)}
        />

        <InputUI
          label="Date de fin du marché"
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
