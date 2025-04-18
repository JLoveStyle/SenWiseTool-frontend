"use client";

import { Route } from "@/lib/route";

import { Archive, ListOrdered, Trash2 } from "lucide-react";
import { FaCheck, FaHandHoldingDollar } from "react-icons/fa6";
import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
import { NewActivityAgriculture } from "@/components/organisms/agriculture-activities/new-activity";
import { columnTable } from "@/components/templates/column-table";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { ActivityDisplayProps, ActivityProps } from "@/types/activity";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import { fetchApiData } from "@/utiles/services/queries";
import { DashboardStatPanelData } from "@/types/app-link";
import { useDialogControl } from "@/lib/stores/useDialog-coontrol";

export default function Agriculture() {
  const [isLoading, setIsLoading] = useState(true);
  const [agricultureDatas, setAgricultureDatas] = useState<
    ActivityDisplayProps[]
  >([]);
  const [agricultureSelected, setAgricultureSelected] = useState<
    ActivityDisplayProps[]
  >([]);

  const { isDialogOpen, setIsDialogOpen } = useDialogControl();

  const columns = columnTable<ActivityDisplayProps>(
    {
      id: "id",
      activity_title: "Activité",
      pv_url: "PVs",
      pictures_url: "Images",
      documents_url: "Documents",
    },
    Route.agriculture
    // false
  );
  const formatedDataFromDBToDisplay = (data: ActivityProps) => {
    return {
      id: data.id ?? "",
      activity_title: data.activity_title,
      pictures_url: data.pictures_url ? (
        <FaCheck color="green" />
      ) : (
        <ImCross color="red" />
      ),
      documents_url: data.documents_url ? (
        <FaCheck color="green" />
      ) : (
        <ImCross color="red" />
      ),
      pv_url: data.pv_url ? <FaCheck color="green" /> : <ImCross color="red" />,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchApiData(Route.agricultureRequest, "");
        const dataFormated: ActivityDisplayProps[] = [];

        if (result.status === 200) {
          setIsLoading(false);
          if (Array.isArray(result.data)) {
            result.data.forEach((res: ActivityProps) => {
              dataFormated.push(formatedDataFromDBToDisplay(res));
            });
          } else {
            dataFormated.push(formatedDataFromDBToDisplay(result.data));
          }
          setAgricultureDatas(dataFormated);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching agriculture datas: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const valueToDisplay = (args: ActivityDisplayProps[]) => {
    return args?.map((data) => ({
      id: data.id ?? "",
      activity_title: data.activity_title,
      pictures_url: data.pictures_url,
      documents_url: data.documents_url,
      pv_url: data.pv_url,
    }));
  };

  const formParams = {
    trigger_btn_label_form: "Nouveau",
    construct_form_btn_label: "Noveau formulaire",
    existing_form_btn_label: "Utiliser un formulaire existant",
    new_form_title: "Créer une nouvelle activité",
    construct_form_btn_icon: FaHandHoldingDollar,
  };

  const deleteAgricultureAccounts = () => {
    if (agricultureSelected.length !== 0) {
      const allAgricultures = LOCAL_STORAGE.get("agricultures");
      const idSelecteds = agricultureSelected.map((objet) => objet.id);
      const restAgricultures: ActivityProps[] = [];

      allAgricultures.map((item: ActivityProps) => {
        if (!idSelecteds.includes(item.id ?? "")) {
          restAgricultures.push(item);
        }
      });
      LOCAL_STORAGE.save("agricultures", restAgricultures);

      toast.success("Compte supprimé");
    }
  };

  const stateActivity: DashboardStatPanelData[] = [
    {
      structure: {
        label: "Number",
        baseUrl: "",
        icon: ListOrdered,
      },
      data: () => {
        return agricultureDatas.length;
      },
    },
  ];

  return (
    <LayoutDashboardTemplate
      newForms={[
        {
          title: "Nouvelle activité",
          form: <NewActivityAgriculture endpoint={Route.agricultureRequest} />,
        },
      ]}
      title="AGRICULTURE"
      formParams={formParams}
      statPanelDatas={stateActivity}
    >
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Agriculture</h1>
        <div className="flex gap-4 text-gray-500">
          {agricultureSelected.length !== 0 && (
            <>
              <CustomHoverCard content="archive project">
                <Archive className="hover:cursor-pointer" />
              </CustomHoverCard>
              <CustomHoverCard content="Delete Accounts">
                <Trash2
                  className="hover:cursor-pointer"
                  onClick={deleteAgricultureAccounts}
                />
              </CustomHoverCard>
            </>
          )}
        </div>
      </div>
      <div className="px-6">
        <DataTable<ActivityDisplayProps, any>
          incomingColumns={columns}
          incomingData={
            agricultureDatas?.length ? valueToDisplay(agricultureDatas) : []
          }
          onSelecteItem={(selects) => {
            setAgricultureSelected(selects);
          }}
          isLoading={isLoading}
        />
      </div>
    </LayoutDashboardTemplate>
  );
}
