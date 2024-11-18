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
import { ApiDataResponse, MarketDBProps } from "@/types/api-types";
import { MarketDisplayProps } from "@/types/tracability/market";
import { statPanelDatas } from "@/utiles/services/constants";
import { fetchApiData } from "@/utiles/services/queries";
import { marketData } from "@/utiles/tracability.const/market";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/atoms/spinner/spinner";
import { mutateDelApiData, mutateUpApiData } from "@/utiles/services/mutations";
import ModalContent from "@/components/organisms/modalContent";

export default function Market() {
  const [isLoading, setIsLoading] = useState(true);
  const [marketDatas, setmarketDatas] = useState<MarketDisplayProps[]>([]);
  const [marketSelected, setmarketSelected] = useState<MarketDisplayProps[]>(
    []
  );
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteMarket, setDeleteMarket] = useState<boolean>(false);
  const [closeMarket, setCloseMarket] = useState<boolean>(false);
  const { value: openModal, toggle: toggleOpenModel } = useToggle({
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

  // Load company object from store
  const company = useCompanyStore((state) => state.company);
  // console.log('company', company)

  // load current campain object from store
  const currentCampain = LOCAL_STORAGE.get("currentCampain");
  // console.log('currentCampain', currentCampain);

  const columns = columnTable<MarketDisplayProps>(
    {
      id: "id",
      code: "code",
      campagne: "campagne",
      location: "location",
      price_of_theday: "Price of the day",
      supplier: "Supplier",
      start_date: "Start date",
      end_date: "End date",
      status: "Status",
      sale_slip: "Sale slip",
      store_entry_voucher: "Store entry voucher",
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
      price_of_theday: data.price_of_theday,
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
    // console.log("here is company", currentCampain?.id);
    await fetchApiData(
      Route.marketRequest + `/?campaign_id=${currentCampain?.id}`,
      ""
    )
      .then((response) => {
        console.log("from useEffect market", response);
        if (response.status === 400 || response.status === 404) {
          toast.warning("No market created yet");
          setIsLoading(false);
          return;
        } else if (response.status === 200) {
          setIsLoading(false);
          setmarketDatas(response.data);
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

    // fetchData();
  }, []);

  const valueToDisplay = (args: MarketDisplayProps[]) => {
    return args?.map((markets) => ({
      id: markets?.id ?? "",
      code: markets?.code,
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

  // delete created market
  async function handleDeletemarket() {
    console.log("selected market", marketSelected);
    setIsDeleting((prev) => !prev);
    // const allId: string[] = [];
    for (const item of marketSelected) {
      // allId.push(item?.id);
      await mutateDelApiData(Route.marketRequest + `/${item?.id}`, "")
        .then((response: any) => {
          console.log("response of delete", response);
          if (response.status === 204) {
            toast.success("Market deleted");
            setIsDeleting((prev) => !prev);
            return;
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("something went wrong. please try again");
        });
    }
    setDeleteMarket((prev) => !prev);
  }

  async function handleCloseMarket() {
    setIsDeleting((prev) => !prev);
    console.log("close market");
    for (const item of marketSelected) {
      await mutateUpApiData(Route.marketRequest, { status: "CLOSED" }, item?.id)
        .then((response) => {
          console.log(response);
          toast.success("Market closed")
          setIsDeleting((prev) => !prev);
          setCloseMarket((prev) => !prev)

        })
        .catch((error) => {
          console.log(error);
          setIsDeleting((prev) => !prev);
        });
    }
  }

  return (
    <LayoutDashboardTemplate
      newForms={[
        {
          title: "New market",
          form: <NewMarket />,
        },
      ]}
      title="Markets management"
      formParams={formParams}
      statPanelDatas={statPanelDatas}
    >
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Markets</h1>
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
