"use client";

import { Route } from "@/lib/route";

import { Archive, ListOrdered, Trash2 } from "lucide-react";
// import { columnListProjects } from "../atoms/colums-of-tables/listOfProjects";
import { FaHandHoldingDollar } from "react-icons/fa6";

import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
import { NewMarket } from "@/components/organisms/tracability/market/new-market";
import { columnTable } from "@/components/templates/column-table";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/use-toggle";
import { MarketDisplayProps } from "@/types/tracability/market";
import { fetchApiData } from "@/utiles/services/queries";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { mutateDelApiData, mutateUpApiData } from "@/utiles/services/mutations";
import ModalContent from "@/components/organisms/modalContent";
import { DashboardStatPanelData } from "@/types/app-link";

export default function Market() {
  const [isLoading, setIsLoading] = useState(true);
  const [marketDatas, setmarketDatas] = useState<MarketDisplayProps[]>([]);
  const [marketSelected, setmarketSelected] = useState<MarketDisplayProps[]>(
    []
  );
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteMarket, setDeleteMarket] = useState<boolean>(false);
  const [closeMarket, setCloseMarket] = useState<boolean>(false);
  const { toggle: toggleOpenModel } = useToggle({
    initial: false,
  });

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

  // load current campain object from store
  const currentCampain = LOCAL_STORAGE.get("currentCampain");

  const copyText = (text: string) => {
    return (
      <p
        className="cursor-pointer hover:underline"
        onClick={() => {
          navigator.clipboard.writeText(text);
          toast.success("Copié");
        }}
      >
        {text}
      </p>
    );
  };

  const columns = columnTable<MarketDisplayProps>(
    {
      id: "id",
      code: "code",
      campagne: "campagne",
      location: "Address",
      price_of_theday: "Prix du jour",
      supplier: "Fournisseur",
      start_date: "Date de debut",
      end_date: "Date de fin",
      status: "Statut",
      sale_slip: "Bordoreau de vente",
      store_entry_voucher: "Bon d'entrer en magazin",
    },
    Route.markets
    // false
  );

  async function getAllMarket() {
    await fetchApiData(
      Route.marketRequest + `/?campaign_id=${currentCampain?.id}`,
      ""
    )
      .then((response) => {
        if (response.status === 400 || response.status === 404) {
          setIsLoading(false);
          return;
        } else if (response.status === 200) {
          setIsLoading(false);
          for (const m of response.data) {
            if (m.code.length < 5) {
              setmarketDatas((prev) => [...prev, m]);
            }
          }
        } else {
          setIsLoading(false);
          
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getAllMarket();
  }, []);

  const valueToDisplay = (args: MarketDisplayProps[]) => {
    return args?.map((markets) => ({
      id: markets?.id ?? "",
      code: copyText(String(markets?.code ?? "")),
      location: markets?.location,
      price_of_theday: markets?.price_of_theday,
      supplier: markets?.supplier,
      start_date: markets?.start_date,
      end_date: markets?.end_date,
      campagne: markets?.campagne,
      status: markets?.status,
      sale_slip: markets?.sale_slip,
      store_entry_voucher: markets?.store_entry_voucher,
    }));
  };

  const formParams = {
    trigger_btn_label_form: "Nouveau marché",
    construct_form_btn_label: "Nouvaux formulaire",
    existing_form_btn_label: "Utiliser un model existant",
    new_form_title: "Définir un marché",
    construct_form_btn_icon: FaHandHoldingDollar,
  };

  // delete created market
  async function handleDeletemarket() {
    setIsDeleting((prev) => !prev);

    for (const item of marketSelected) {
      await mutateDelApiData(Route.marketRequest, item?.id)
        .then((response: any) => {
          if (response.status === 204) {
            toast.success("Market deleted");
            setIsDeleting((prev) => !prev);
            setDeleteMarket((prev) => !prev);
            return;
          } else {
            toast.error("Une erreur s'est produite. Veuillez réessayer");
            setIsDeleting((prev) => !prev);
            setDeleteMarket((prev) => !prev);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Une erreur s'est produite. Veuillez réessayer");
        });
    }
  }

  async function handleCloseMarket() {
    setIsDeleting((prev) => !prev);
    for (const item of marketSelected) {
      await mutateUpApiData(Route.marketRequest, { status: "CLOSED" }, item?.id)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Market closed");
            setIsDeleting((prev) => !prev);
            setCloseMarket((prev) => !prev);
          } else {
            toast.error("Une erreur s'est produite. Veuillez réessayer");
            setCloseMarket((prev) => !prev);
            setIsDeleting((prev) => !prev);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsDeleting((prev) => !prev);
        });
    }
  }

  const stateMarket: DashboardStatPanelData[] = [
    {
      structure: {
        label: "Number",
        baseUrl: "",
        icon: ListOrdered,
      },
      data: () => {
        return marketDatas.length;
      },
    },
  ];

  return (
    <LayoutDashboardTemplate
      newForms={[
        {
          title: "Nouveau marché",
          form: <NewMarket />,
        },
      ]}
      title="Gestion des marchés"
      formParams={formParams}
      statPanelDatas={stateMarket}
    >
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Marchés</h1>
        <div className="flex gap-4 text-gray-500">
          {marketSelected.length !== 0 && (
            <>
              <CustomHoverCard content="archive project">
                <Archive
                  onClick={() => setCloseMarket((prev) => !prev)}
                  className="hover:cursor-pointer text-black"
                />
              </CustomHoverCard>
              <CustomHoverCard content="Delete Accounts">
                <Trash2
                  className="hover:cursor-pointer text-black"
                  onClick={() => setDeleteMarket((prev) => !prev)}
                />
              </CustomHoverCard>
            </>
          )}
        </div>
      </div>
      <>
        <ModalContent
          openModal={deleteMarket}
          isProcessing={isDeleting}
          action={"Delete"}
          dialogTitle="Delete Market"
          dialogDescription={"Are you sure you want to delete this market?"}
          cancelationFunction={() => setDeleteMarket((prev) => !prev)}
          actionFunction={handleDeletemarket}
          updateOpenModalState={() => setDeleteMarket((prev) => !prev)}
        />

        <ModalContent
          openModal={closeMarket}
          isProcessing={isDeleting}
          action={"Close"}
          dialogTitle={"Market done ?"}
          dialogDescription={"Are you sure you want to Close this market?"}
          cancelationFunction={() => setCloseMarket((prev) => !prev)}
          actionFunction={handleCloseMarket}
          updateOpenModalState={() => setCloseMarket((prev) => !prev)}
        />
      </>

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
