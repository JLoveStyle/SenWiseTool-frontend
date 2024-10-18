"use client";

import { Route } from "@/lib/route";

import { Archive, FilePenLine, Rocket, Trash2, UserPlus } from "lucide-react";

// import { columnListProjects } from "../atoms/colums-of-tables/listOfProjects";

import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
import { NewMarket } from "@/components/organisms/tracability/market/new-market";
import { columnTable } from "@/components/templates/column-table";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { DashboardStatPanelData } from "@/types/app-link";
import { ReceiptProps, ReceiptTableProps } from "@/types/tracability/receipt";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { db_get_receipts } from "@/utiles/services/tracability/receipt";
import { receiptStatData } from "@/utiles/tracability.const/statistics";
import { useEffect, useState } from "react";

type TProps = {
  params: {
    id: string;
  };
};

export default function FactoryAccompaniementSheet({ params: { id } }: TProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [receiptDatas, setReceiptDatas] = useState<ReceiptProps[]>([]);

  const columns = columnTable<ReceiptTableProps>(
    {
      id: "id",
      market_id: "marché",
      village: "village",
      farmer_id: "cultivateur",
      date: "date",
      net_weight_in_kg: "poids net",
      quantity_in_bags: "quantité",
      buyer: "Acheteur",
    },
    Route.receipt,
    false
  );

  console.log(LOCAL_STORAGE.get("agents"));
  useEffect(() => {
    const fetchData = async () => {
      db_get_receipts()
        .then((dbResult) => {
          console.log("data training: ", dbResult);

          const result = dbResult as ReceiptProps[];
          console.log(
            "id",
            id,
            "market",
            result?.map((item) => item.market_id)
          );

          setReceiptDatas(result.filter((receipt) => receipt.market_id == id));
          setIsLoading(false);
        })
        .catch((err) => console.error(err));
    };

    fetchData();
  }, [id]);

  const valueToDisplay = (args: ReceiptProps[]) => {
    return args?.map((receipt) => ({
      id: receipt.id,
      market_id: receipt.market_id,
      village: receipt.village,
      farmer_id: receipt.farmer_id,
      date: receipt.date,
      net_weight_in_kg: receipt.net_weight_in_kg,
      quantity_in_bags: receipt.quantity_in_bags,
      buyer: receipt.buyer,
    }));
  };

  useEffect(() => {
    // refetch();
  }, [receiptDatas, id]);

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

  return (
    <LayoutDashboardTemplate
      newForms={[
        {
          title: "Fiche AU",
          form: <NewMarket />,
        },
      ]}
      title="Traçabilité - Les Reçus"
      statPanelDatas={statPanelDatas}
    >
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Projects</h1>
        <div className="flex gap-4 text-gray-500">
          <CustomHoverCard content="archive project">
            <Archive className="hover:cursor-pointer" />
          </CustomHoverCard>
          <CustomHoverCard content="Share project">
            <UserPlus className="hover:cursor-pointer" />
          </CustomHoverCard>
          <CustomHoverCard content="Delete Project">
            <Trash2 className="hover:cursor-pointer" />
          </CustomHoverCard>
        </div>
      </div>
      <div className="px-6">
        <DataTable<ReceiptTableProps, any>
          incomingColumns={columns}
          incomingData={
            receiptDatas?.length
              ? valueToDisplay(receiptDatas)
              : receiptDatas?.length
              ? valueToDisplay(receiptDatas as ReceiptProps[])
              : []
          }
          onSelecteItem={() => {}}
          isLoading={isLoading}
        />
      </div>
    </LayoutDashboardTemplate>
  );
}
