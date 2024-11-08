"use client";

import { Route } from "@/lib/route";

import { Archive, Trash2 } from "lucide-react";
// import { columnListProjects } from "../atoms/colums-of-tables/listOfProjects";
import { FaHandHoldingDollar } from "react-icons/fa6";

import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
import { NewMarket } from "@/components/organisms/tracability/market/new-market";
import { columnTable } from "@/components/templates/column-table";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/use-toggle";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { MarketDBProps } from "@/types/api-types";
import { MarketDisplayProps } from "@/types/tracability/market";
import { statPanelDatas } from "@/utiles/services/constants";
import { fetchApiData } from "@/utiles/services/queries";
import { marketData } from "@/utiles/tracability.const/market";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Market() {
  const [isLoading, setIsLoading] = useState(true);
  const [marketDatas, setmarketDatas] = useState<MarketDisplayProps[]>([]);
  const [marketSelected, setmarketSelected] = useState<MarketDisplayProps[]>(
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

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const togglePopup = (url?: string) => {
    url ? setPreviewImage(url) : setPreviewImage(null);
  };

  const preview = (url: string) => {
    return (
      <Button
        variant="link"
        onClick={() => togglePopup(url)}
        className="text-green-500 px-0"
      >
        Disponible
      </Button>
    );
  };

  // Load company object from store
  const company = useCompanyStore((state) => state.company);

  // load current campain object from store
  const currentCampain = useCampaignStore((state) => state.currentCampaign);
  console.log(currentCampain);

  const columns = columnTable<MarketDisplayProps>(
    {
      id: "id",
      code: "code",
      campagne: "campagne",
      location: "location",
      price_of_day: "price_of_day",
      supplier: "Fournisseu",
      start_date: "start_date",
      end_date: "end_date",
      status: "status",
      sale_slip: "Bordoreau de vente",
      store_entry_voucher: "Bon d'entré magasin",
    },
    Route.markets
    // false
  );

  const formatedDataFromDBToDisplay = (data: MarketDBProps) => {
    return {
      id: data.id,
      code: data.code,
      campagne: data.campaign_id,
      location: data.location,
      price_of_day: data.price_of_theday,
      supplier: data.supplier,
      start_date: data.start_date,
      end_date: data.end_date,
      status: data.status,
      sale_slip: data.sale_slip ? (
        preview(data.sale_slip)
      ) : (
        <span className="text-slate-500">Indisponible</span>
      ),
      store_entry_voucher: data.store_entry_voucher ? (
        preview(data.store_entry_voucher)
      ) : (
        <span className="text-slate-500">Indisponible</span>
      ),
    };
  };

  async function getAllMarket() {
    console.log("here is company", currentCampain?.id);
    await fetchApiData(Route.marketRequest, company?.id)
      .then((response) => {
        console.log("from useEffect market", response);
        if (response.status !== 200) {
          toast.error("Could not load markets. Please try again");
        }
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
        const result = await marketData;
        const dataFormated: MarketDisplayProps[] = [];

        if (result) {
          if (Array.isArray(result)) {
            result.forEach((res) => {
              dataFormated.push(formatedDataFromDBToDisplay(res));
            });
          } else {
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

    // const fetchData = async () => {
    // const result = await db_get_markets()
    // .then((result) => {
    // console.log("data market list: ", result);

    // setIsLoading(false);
    // })
    // .catch((err) => console.error(err));
    // };

    // fetchData();
  }, []);

  const valueToDisplay = (args: MarketDisplayProps[]) => {
    return args?.map((markets) => ({
      id: markets.code ?? "",
      code: markets.code,
      location: markets.location,
      price_of_day: markets.price_of_day,
      supplier: markets.supplier,
      start_date: markets.start_date,
      end_date: markets.end_date,
      campagne: markets.campagne,
      status: markets.status,
      sale_slip: markets.sale_slip,
      store_entry_voucher: markets.store_entry_voucher,
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
          title: "Nouveau marché",
          form: <NewMarket />,
        },
      ]}
      title="Markets management"
      formParams={formParams}
      statPanelDatas={statPanelDatas}
    >
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Les Marchés</h1>
        <div className="flex gap-4 text-gray-500">
          {marketSelected.length !== 0 && (
            <>
              <CustomHoverCard content="archive project">
                <Archive className="hover:cursor-pointer" />
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
        <DataTable<MarketDisplayProps, any>
          incomingColumns={columns}
          incomingData={marketDatas?.length ? valueToDisplay(marketDatas) : []}
          onSelecteItem={(selects) => {
            setmarketSelected(selects);
          }}
          isLoading={isLoading}
        />

        {previewImage && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg p-4 w-4/5 h-4/5">
              <button
                onClick={() => togglePopup()}
                className="absolute top-4 right-4 text-xl text-gray-600"
              >
                &times;
              </button>
              <img
                loading="lazy"
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </LayoutDashboardTemplate>
  );
}
