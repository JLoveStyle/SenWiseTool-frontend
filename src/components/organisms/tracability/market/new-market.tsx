"use client";

import { ButtonUI } from "@/components/atoms/disign-system/button-ui";
import { useToggle } from "@/hooks/use-toggle";
import { Route } from "@/lib/route";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { MarketDBProps } from "@/types/api-types";
import { mutateApiData } from "@/utiles/services/mutations";
import { validatorForm } from "@/utils/validator-form";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { NewMarketForm } from "./new-market-form";
import { useDialogControl } from "@/lib/stores/useDialog-coontrol";
import revalidatePath from "@/utils/server-actions";

export function NewMarket() {
  const { value: isLoading, setValue: setIsLoading } = useToggle();

  const { isDialogOpen, setIsDialogOpen } = useDialogControl();

  const [errors, setErrors] = useState({});

  const router = useRouter();

  const [formData, setFormData] = useState<Partial<MarketDBProps>>({
    id: "",
    location: "",
    price_of_theday: 0,
    supplier: "",
    start_date: "",
    end_date: "",
  });

  // load company state
  const company = useCompanyStore((state) => state.company);
  const currentCampain = useCampaignStore((state) => state.currentCampaign);

  // Fonction de gestion pour la mise à jour des données du formulaire
  const handleUpdatedFormData = (updatedFormData: Partial<MarketDBProps>) => {
    setFormData(updatedFormData);
  };

  const handleCreateMarket = async (formData: Partial<MarketDBProps>) => {
    setIsLoading(true);
    // CREATE MARKET
    await mutateApiData(Route.marketRequest, {
      location: formData.location,
      price_of_theday: formData.price_of_theday,
      campaign_id: formData.campaign_id,
      company_id: formData.company_id,
      description: formData.description,
      supplier: formData?.supplier,
      bon_entree_magazin_url: "",
      bordereau_vente_url: "",
      start_date: new Date(formData.start_date as string).toISOString(),
      end_date: new Date(formData.end_date as string).toISOString(),
    })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Marché créé avec succès");
          setIsLoading(false);
          setIsDialogOpen(!isDialogOpen);
          revalidatePath("/dashboard/tracability/markets");
          router.refresh();
          router.push(Route.markets);
          return;
        } else if (response.message === "Internal Server Error") {
          toast.error("Une erreur est survenue au setveur");
          setIsLoading(false);
        }
        setIsLoading(false);
        return;
      })
      .catch((error) => {
        console.log(error);
        toast.error("Une erreur s'est produite. Veuillez réessayer");
        setIsLoading(false);
        return;
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      const { isValid, errors } = await validatorForm(formData, {
        price_of_day: "required|min:1",
        location: "required",
        start_date: "required",
        end_date: "required",
        supplier: "required",
      });

      if (!isValid) {
        setErrors(errors);
        toast.error("Une erreur est survenue");
        setIsLoading(false);
        return;
      }
      handleCreateMarket({
        ...formData,
        company_id: company?.id,
        campaign_id: currentCampain?.id,
      });
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit} className="px-5 pb-5">
      <NewMarketForm
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
