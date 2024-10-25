"use client";

import { Route } from "@/lib/route";

import { Archive, FilePenLine, Rocket, Trash2, UserPlus } from "lucide-react";

// import { columnListProjects } from "../atoms/colums-of-tables/listOfProjects";

import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
import { columnTable } from "@/components/templates/column-table";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { Button } from "@/components/ui/button";
import { DashboardStatPanelData } from "@/types/app-link";
import { ReceiptProps, ReceiptTableProps } from "@/types/tracability/receipt";
import { db_get_receipts } from "@/utiles/services/tracability/receipt";
import { receiptStatData } from "@/utiles/tracability.const/statistics";
import { useEffect, useState } from "react";

export default function Receipt() {
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
      sale_slip: "Bordoreau de vente",
    },
    Route.receipt
  );

  useEffect(() => {
    const fetchData = async () => {
      db_get_receipts()
        .then((result) => {
          console.log("data training: ", result);

          setReceiptDatas(result as ReceiptProps[]);
          setIsLoading(false);
        })
        .catch((err) => console.error(err));
    };

    fetchData();
  }, []);

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
      sale_slip: receipt.sale_slip ? (
        preview(receipt.sale_slip)
      ) : (
        <span className="text-slate-500">Indisponible</span>
      ),
    }));
  };

  useEffect(() => {
    // refetch();
  }, [receiptDatas]);

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
      // newForm={<NewFormReceipt />}
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
