"use client";

import { Route } from "@/lib/route";

import { Printer, Trash2 } from "lucide-react";
// import { columnListProjects } from "../atoms/colums-of-tables/listOfProjects";
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
import { TransmissionAndDeclarationSheetDisplayProps } from "@/types/tracability/market";
import { statPanelDatas } from "@/utiles/services/constants";
import { fetchApiData } from "@/utiles/services/queries";
import { marketData } from "@/utiles/tracability.const/market";
import { useEffect, useState } from "react";

export default function FactoryAccompaniementSheet() {
  const [isLoading, setIsLoading] = useState(true);
  const [marketDatas, setmarketDatas] = useState<
    TransmissionAndDeclarationSheetDisplayProps[]
  >([]);
  const [marketSelected, setmarketSelected] = useState<
    TransmissionAndDeclarationSheetDisplayProps[]
  >([]);
  const [errors, setErrors] = useState({});

  const { value: openModal, toggle: toggleOpenModel } = useToggle({
    initial: false,
  });
  const projectCodeSeparator = " ";

  const closeDialog = () => {
    toggleOpenModel();
  };

  // Load company object from store
  const company = useCompanyStore((state) => state.company);

  // load current campain object from store
  const currentCampain = useCampaignStore((state) => state.currentCampaign);

  const columns = columnTable<TransmissionAndDeclarationSheetDisplayProps>(
    {
      id: "id",
      code: "Marché",
      campagne: "campagne",
      sender: "Expéditeur",
      Receiver: "Recepteur",
      register_number: "Numero d'immatriculation",
      driver_name: "Nom du chauffeur",
      quantity_in_bags_tone: "Nombre de sac",
      quantity_product: "Quantité de produit",
    },
    Route.transmissionAndDeclarationSheet
    // false
  );

  const formatedDataFromDBToDisplay = (data: MarketDBProps) => {
    return {
      id: data.id,
      code: data.code,
      campagne: data.campaign_id,
      sender: data.sender,
      Receiver: data.Receiver,
      register_number: data.register_number,
      driver_name: data.driver_name,
      quantity_in_bags_tone: data.quantity_in_bags_tone,
      quantity_product: data.quantity_product,
    };
  };

  async function getAllMarket() {
    await fetchApiData<AssigneeType>(
      Route.assigne,
      `?campaign_id=${currentCampain?.id}`,
      company?.id
    )
      .then((response) => {
        console.log("from useEffecte", response);
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
        const dataFormated: TransmissionAndDeclarationSheetDisplayProps[] = [];

        if (result) {
          if (Array.isArray(result)) {
            result.forEach((res) => {
              res.sender && dataFormated.push(formatedDataFromDBToDisplay(res));
            });
          } else {
            result?.sender &&
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

  const valueToDisplay = (
    args: TransmissionAndDeclarationSheetDisplayProps[]
  ) => {
    return args?.map((markets) => ({
      id: markets.code ?? "",
      code: markets.code,
      campagne: markets.campagne,
      sender: markets.sender,
      Receiver: markets.Receiver,
      register_number: markets.register_number,
      driver_name: markets.driver_name,
      quantity_in_bags_tone: markets.quantity_in_bags_tone,
      quantity_product: markets.quantity_product,
    }));
  };

  useEffect(() => {
    // refetch();
    // const company = useCompanyStore((state) => state.company);
    // console.log("compagny", company);
  }, [marketDatas]);

  const formParams = {
    trigger_btn_label_form: "Nouvaux marché",
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
      title="Fiche de transmission et de déclaration"
      formParams={formParams}
      statPanelDatas={statPanelDatas}
    >
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">
          Fiche de transmission et de déclaration
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
        <DataTable<TransmissionAndDeclarationSheetDisplayProps, any>
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
