"use client";

import { ButtonUI } from "@/components/atoms/disign-system/button-ui";
import { useToggle } from "@/hooks/use-toggle";
import { Route } from "@/lib/route";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { MarketFormProps } from "@/types/tracability/market";
import { db_create_market } from "@/utiles/services/tracability/market";
import { validatorForm } from "@/utils/validator-form";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { NewMarketForm } from "./new-market-form";

export function UpdateMarket() {
  const { value: isLoading, setValue: setIsLoading } = useToggle();
  const { value: openModal, toggle: toggleOpenModal } = useToggle();
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const [formData, setFormData] = useState<MarketFormProps>({
    id: "",
    price_of_theday: 0,
    location: "",
    supplier: "",
    start_date: "",
    end_date: "",
  });

  // load company state
  const company = useCompanyStore((state) => state.company);

  // Fonction de gestion pour la mise à jour des données du formulaire
  const handleUpdatedFormData = (updatedFormData: MarketFormProps) => {
    setFormData(updatedFormData);
  };

  const handleCreateMarket = async (formData: MarketFormProps) => {
    const dataToDB = {
      price_of_theday: formData.price_of_theday,
      location: formData.location,
      supplier: formData.supplier,
      start_date: formData.start_date,
      end_date: formData.end_date,
      company_id: company?.id,
      campaign_id: "",
      description: "",
    };

    const serverResponse = await db_create_market(dataToDB);
    // const serverResponse = await db_create_training(dataToDB);

    if (serverResponse.status === "error") {
      toast.error("Creating market failed");
      setIsLoading(false);
      return;
    }

    toast.success("Your market are created successfull");
    setIsLoading(false);
    toggleOpenModal();
    router.refresh();
    router.push(Route.markets);
    return;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      const { isValid, errors } = await validatorForm(formData, {
        price_of_day: "required",
        start_date: "required",
        end_date: "required",
      });

      if (!isValid) {
        setErrors(errors);
        toast.error("Something is wrong");
        console.log(errors);
        setIsLoading(false);
        return;
      }

      handleCreateMarket(formData);
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit} className="px-5 pb-5">
      <NewMarketForm
        updatedFormData={handleUpdatedFormData}
        errors={errors}
        isLoading={isLoading}
      />
      <ButtonUI
        type="submit"
        className={clsx("bg-green-600 hover:bg-green-500 mt-2")}
        isLoading={isLoading}
        icon={{ icon: Plus }}
      >
        Créer
      </ButtonUI>
    </form>
  );
}
