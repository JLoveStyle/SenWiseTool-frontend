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
import { AssigneeType, BordereauxVenteType, MarketDBProps } from "@/types/api-types";
import { SaleSlipDisplayProps } from "@/types/tracability/market";
import { statPanelDatas } from "@/utiles/services/constants";
import { fetchApiData } from "@/utiles/services/queries";
import { marketData } from "@/utiles/tracability.const/market";
import { useEffect, useState } from "react";

export default function FactoryAccompaniementSheet() {
  const [isLoading, setIsLoading] = useState(true);
  const [marketDatas, setmarketDatas] = useState<SaleSlipDisplayProps[]>([]);
  const [marketSelected, setmarketSelected] = useState<SaleSlipDisplayProps[]>(
    []
  );
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

  const columns = columnTable<SaleSlipDisplayProps>(
    {
      id: "id",
      code: "Marché",
      campagne: "Campagne",
      sale_slip_title: "Titre",
      sale_slip_description: "Description",
      sale_slip_url: "Bordoreau",
    },
    Route.saleSlip
    // false
  );

  const formatedDataFromDBToDisplay = (data: BordereauxVenteType) => {
    return {
      id: data.id,
      code: data.code,
      campagne: data.campagne_id,
      sale_slip_title: data.sale_slip_title,
      sale_slip_description: data.sale_slip_description,
      sale_slip_url: data.sale_slip_url,
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
        const result = marketData as unknown as BordereauxVenteType | BordereauxVenteType[];
        const dataFormated: SaleSlipDisplayProps[] = [];

        if (result) {
          if (Array.isArray(result)) {
            result.forEach((res) => {
              res.sale_slip_title &&
                dataFormated.push(formatedDataFromDBToDisplay(res));
            });
          } else {
            result?.sale_slip_title &&
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

  const valueToDisplay = (args: SaleSlipDisplayProps[]) => {
    return args?.map((markets) => ({
      id: markets.code ?? "",
      code: markets.code,
      campagne: markets.campagne,
      sale_slip_title: markets.sale_slip_title,
      sale_slip_description: markets.sale_slip_description,
      sale_slip_url: markets.sale_slip_url,
    }));
  };

  useEffect(() => {
    // refetch();
    // const company = useCompanyStore((state) => state.company);
    // console.log("compagny", company);
  }, [marketDatas]);

  const formParams = {
    trigger_btn_label_form: "New Market",
    construct_form_btn_label: "New market form",
    existing_form_btn_label: "Use Existing Form",
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
      title="Bordoreau de vente"
      formParams={formParams}
      statPanelDatas={statPanelDatas}
    >
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Bordoreau de vente</h1>
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
        <DataTable<SaleSlipDisplayProps, any>
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
