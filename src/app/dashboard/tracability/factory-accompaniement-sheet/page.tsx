"use client";

import { Route } from "@/lib/route";

import { Printer, Trash2 } from "lucide-react";
import { FaHandHoldingDollar } from "react-icons/fa6";

import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
import { NewMarket } from "@/components/organisms/tracability/market/new-market";
import { columnTable } from "@/components/templates/column-table";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { useToggle } from "@/hooks/use-toggle";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { AssigneeType, MarketDBProps } from "@/types/api-types";
import { FactoryAccompaniementSheetDisplayProps } from "@/types/tracability/market";
import { statPanelDatas } from "@/utiles/services/constants";
import { fetchApiData } from "@/utiles/services/queries";
import { useEffect, useState } from "react";
import { marketData } from "@/utiles/tracability.const/market";

export default function FactoryAccompaniementSheet() {
  const [isLoading, setIsLoading] = useState(true);
  const [marketDatas, setmarketDatas] = useState<
    FactoryAccompaniementSheetDisplayProps[]
  >([]);
  const [marketSelected, setmarketSelected] = useState<
    FactoryAccompaniementSheetDisplayProps[]
  >([]);
  const { value: openModal, toggle: toggleOpenModel } = useToggle({
    initial: false,
  });
  const closeDialog = () => {
    toggleOpenModel();
  };

  // Load company object from store
  const company = useCompanyStore((state) => state.company);

  // load current campain object from store
  const currentCampain = useCampaignStore((state) => state.currentCampaign);

  const columns = columnTable<FactoryAccompaniementSheetDisplayProps>(
    {
      id: "id",
      code: "Marché",
      campagne: "campagne",
      tracability_level: "tracability level",
      car_number: "car_number",
      quantity_in_bags_declared: "Nombre de sac déclaré",
      net_weight_declared: "Poids net déclaré",
      humidity: "humidité",
    },
    Route.factoryAccompaniementSheet
    // false
  );

  const formatedDataFromDBToDisplay = (data: MarketDBProps) => {
    return {
      id: data.id,
      code: data.code,
      campagne: data.campaign_id,
      tracability_level: data.tracability_level,
      car_number: data.car_number,
      quantity_in_bags_declared: data.quantity_in_bags_declared,
      net_weight_declared: data.net_weight_declared,
      humidity: data.humidity,
    };
  };

  async function getAllMarket() {
    await fetchApiData<AssigneeType>(
      Route.assigne,
      `?campaign_id=${currentCampain?.id}`,
      company?.id
    )
      .then((response) => {
        console.log("from useEffecte");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllMarket();
    const fetchData = async () => {
      try {
        // const result = await db_get_markets();
        const result = (await marketData) as MarketDBProps | MarketDBProps[];
        const dataFormated: FactoryAccompaniementSheetDisplayProps[] = [];

        if (result) {
          if (Array.isArray(result)) {
            result.forEach((res) => {
              res.quantity_in_bags_declared !== null &&
                dataFormated.push(formatedDataFromDBToDisplay(res));
            });
          } else {
            result?.quantity_in_bags_declared !== null &&
              dataFormated.push(formatedDataFromDBToDisplay(result));
          }

          setmarketDatas(dataFormated);
        }
      } catch (err) {
        console.error("Error fetching markets: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const valueToDisplay = (args: FactoryAccompaniementSheetDisplayProps[]) => {
    return args?.map((markets) => ({
      id: markets.code ?? "",
      code: markets.code,
      campagne: markets.campagne,
      tracability_level: markets.tracability_level,
      car_number: markets.car_number,
      quantity_in_bags_declared: markets.quantity_in_bags_declared,
      net_weight_declared: markets.net_weight_declared,
      humidity: markets.humidity,
    }));
  };

  const formParams = {
    trigger_btn_label_form: "Nouveau marché",
    construct_form_btn_label: "Nouveau formulaire",
    existing_form_btn_label: "Utiliser un formulaire existant",
    new_form_title: "Définir un marché",
    construct_form_btn_icon: FaHandHoldingDollar,
  };

  return (
    <LayoutDashboardTemplate
      newForms={[
        {
          title: "Nouvelle fiche",
          form: <NewMarket />,
        },
      ]}
      title="Fiches d'accompagnement à l'usine"
      formParams={formParams}
      statPanelDatas={statPanelDatas}
    >
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">
          Fiche d'accompagnement à l'usine
        </h1>
        <div className="flex gap-4 text-gray-500">
          {marketSelected.length !== 0 && (
            <>
              <CustomHoverCard content="archive project">
                <Printer className="hover:cursor-pointer" />
              </CustomHoverCard>
              <CustomHoverCard content="Delete Accounts">
                <Trash2
                  className="hover:cursor-pointer"
                  // onClick={deletemarketAccounts}
                />
              </CustomHoverCard>
            </>
          )}
        </div>
      </div>
      <div className="px-6">
        <DataTable<FactoryAccompaniementSheetDisplayProps, any>
          incomingColumns={columns}
          incomingData={marketDatas?.length ? valueToDisplay(marketDatas) : []}
          onSelecteItem={(selects) => {
            setmarketSelected(selects);
          }}
          isLoading={isLoading}
        />
      </div>
    </LayoutDashboardTemplate>
  );
}
