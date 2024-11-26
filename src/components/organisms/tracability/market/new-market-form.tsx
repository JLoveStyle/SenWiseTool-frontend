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
    console.log(value);
    if (name === "price_of_theday") {
      console.log({ name: +value });
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
          label="Location"
          id="location"
          placeholder="Enter location"
          isLoading={isLoading}
          errors={errors}
          required
          value={formData.location}
          onChange={handleChange}
        />
        <InputUI
          label="Price of the day (in XAF)"
          id="price_of_theday"
          type="number"
          placeholder="Price of the day"
          isLoading={isLoading}
          errors={errors}
          required
          value={formData.price_of_theday}
          onChange={handleChange}
        />
      </div>
      <div className="grid items-center gap-4">
        <InputUI
          label="Supplier name"
          id="supplier"
          placeholder="Enter supplier name"
          isLoading={isLoading}
          errors={errors}
          required
          value={formData.supplier}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-2 items-center gap-4">
        <InputUI
          label="Market start date"
          id="start_date"
          type="datetime-local"
          isLoading={isLoading}
          errors={errors}
          required
          value={formData.start_date}
          onChange={(e) => handleChange(e)}
        />

        <InputUI
          label="Market end day"
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
