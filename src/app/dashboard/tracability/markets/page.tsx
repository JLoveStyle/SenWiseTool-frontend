"use client";

import { Route } from "@/lib/route";

import { Archive, FilePenLine, Rocket, Trash2 } from "lucide-react";
// import { columnListProjects } from "../atoms/colums-of-tables/listOfProjects";
import { FaHandHoldingDollar } from "react-icons/fa6";

import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
import { NewMarket } from "@/components/organisms/tracability/market/new-market";
import { columnTable } from "@/components/templates/column-table";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { useToggle } from "@/hooks/use-toggle";
import { DashboardStatPanelData } from "@/types/app-link";
import { db_get_markets } from "@/utiles/services/tracability/market";
import { receiptStatData } from "@/utiles/tracability.const/statistics";
import { useEffect, useState } from "react";
import { MarketDisplayProps } from "../../../../types/tracability/market";
import { MarketDBProps } from "@/types/api-types";

export default function Market() {
  const [isLoading, setIsLoading] = useState(true);
  const [marketDatas, setmarketDatas] = useState<Partial<MarketDBProps>[]>([]);
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

  const columns = columnTable<MarketDisplayProps>(
    {
      id: "id",
      campagne: "campagne",
      location: "location",
      price_of_day: "price_of_day",
      start_date: "start_date",
      end_date: "end_date",
      status: "status",
    },
    Route.markets,
    false
  );

  const formatedDataFromDBToDisplay = (data: Partial<MarketDBProps>) => {
    return {
      id: data.id,
      campagne: data.campaign_id,
      location: data.location,
      price_of_day: data.price_of_day,
      start_date: data.start_date,
      end_date: data.end_date,
      status: data.status,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await db_get_markets();
        const dataFormated: Partial<MarketDBProps>[] = [];

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

    fetchData();
  }, []);

  const valueToDisplay = (args: MarketDisplayProps[]) => {
    return args?.map((markets) => ({
      id: markets.id,
      location: markets.location,
      price_of_day: markets.price_of_day,
      start_date: markets.start_date,
      end_date: markets.end_date,
      campagne: markets.campagne,
    }));
  };

  useEffect(() => {
    // refetch();
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

  const statPanelDatas: DashboardStatPanelData[] = [
    {
      structure: {
        label: "Ventes",
        baseUrl: "",
        icon: Rocket,
      },
      data: () => {
        return receiptStatData.totalSale;
      },
    },
    {
      structure: {
        label: "Marchés",
        baseUrl: "",
        icon: FilePenLine,
      },
      data: () => {
        return receiptStatData.distinctMarketCount;
      },
    },
    {
      structure: {
        label: "Quantités",
        baseUrl: "",
        icon: Archive,
      },
      data: () => {
        return receiptStatData.totalQuantity;
      },
    },
    {
      structure: {
        label: "Poids.Net",
        baseUrl: "",
        icon: Archive,
      },
      data: () => {
        return receiptStatData.totalNetWeight;
      },
    },
  ];
  const formParams = {
    trigger_btn_label_form: "New Market",
    construct_form_btn_label: "New market form",
    existing_form_btn_label: "Use Existing Form",
    new_form_title: "Définir un marché",
    construct_form_btn_icon: FaHandHoldingDollar,
    closeDialog: closeDialog,
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
          form: <NewMarket closeDialog={closeDialog} />,
        },
      ]}
      title="Gestion des marchés"
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
