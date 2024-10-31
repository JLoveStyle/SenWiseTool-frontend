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
import { useToggle } from "@/hooks/use-toggle";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { AssigneeType, MarketDBProps } from "@/types/api-types";
import { MarketDisplayProps } from "@/types/tracability/market";
import { statPanelDatas } from "@/utiles/services/constants";
import { fetchApiData } from "@/utiles/services/queries";
import { toast } from "react-toastify";
import { marketData } from "@/utiles/tracability.const/market";
import { useEffect, useState } from "react";

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

  // Load company object from store
  const company = useCompanyStore((state) => state.company);

  // load current campain object from store
  const currentCampain = useCampaignStore((state) => state.currentCampaign);
  console.log(currentCampain)

  const columns = columnTable<MarketDisplayProps>(
    {
      id: "id",
      code: "code",
      campagne: "campagne",
      location: "location",
      price_of_day: "price_of_day",
      start_date: "start_date",
      end_date: "end_date",
      status: "status",
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
      price_of_day: data.price_of_day,
      start_date: data.start_date,
      end_date: data.end_date,
      status: data.status,
    };
  };

  async function getAllMarket() {
    console.log('here is company', currentCampain?.id);
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
      start_date: markets.start_date,
      end_date: markets.end_date,
      campagne: markets.campagne,
    }));
  };

  useEffect(() => {
    // refetch();
    // const company = useCompanyStore((state) => state.company);
    // console.log("compagny", company);
  }, [marketDatas]);

  // const statPanelDatas: DashboardStatPanelData[] = [
  //   {
  //     structure: {
  //       label: "Deployed",
  //       baseUrl: "",
  //       icon: Rocket,
  //     },
  //     data: () => {
  //       return 0;
  //     },
  //   },
  //   {
  //     structure: {
  //       label: "Draft",
  //       baseUrl: "",
  //       icon: FilePenLine,
  //     },
  //     data: () => {
  //       return 0;
  //     },
  //   },
  //   {
  //     structure: {
  //       label: "Archive",
  //       baseUrl: "",
  //       icon: Archive,
  //     },
  //     data: () => {
  //       return 0;
  //     },
  //   },
  // ];

  const formParams = {
    trigger_btn_label_form: "New Market",
    construct_form_btn_label: "New market form",
    existing_form_btn_label: "Use Existing Form",
    new_form_title: "Définir un marché",
    construct_form_btn_icon: FaHandHoldingDollar,
  };

  // const deletemarketAccounts = () => {
  //   if (marketSelected.length !== 0) {
  //     const allmarketsAccounts = LOCAL_STORAGE.get("markets");
  //     const idSelecteds = marketSelected.map((objet) => objet.id);

  //     allmarketsAccounts.map((item: MarketDisplayProps) => {
  //       if (!idSelecteds.includes(item.id)) {
  //         restAccount.push(item);
  //       }
  //     });
  //     LOCAL_STORAGE.save("markets", restAccount);

  //     toast.success("Accounts are deleted successfull");
  //   }
  // };

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
      </div>
    </LayoutDashboardTemplate>
  );
}
