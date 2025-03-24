"use client";

import { Route } from "@/lib/route";

import { Archive, ListOrdered, Trash2 } from "lucide-react";
import { FaCheck, FaHandHoldingDollar } from "react-icons/fa6";

import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
import { columnTable } from "@/components/templates/column-table";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { useToggle } from "@/hooks/use-toggle";
import { ActivityDisplayProps, ActivityProps } from "@/types/activity";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import { fetchApiData } from "@/utiles/services/queries";
import { ApiDataResponse } from "@/types/api-types";
import { NewActivityAgriculture } from "@/components/organisms/agriculture-activities/new-activity";
import { DashboardStatPanelData } from "@/types/app-link";
import { useDialogControl } from "@/lib/stores/useDialog-coontrol";

export default function social() {
  const [isLoading, setIsLoading] = useState(true);
  const [socialDatas, setSocialDatas] = useState<ActivityDisplayProps[]>([]);
  const [socualSelected, setSocialSelected] = useState<ActivityDisplayProps[]>(
    []
  );

  const columns = columnTable<ActivityDisplayProps>(
    {
      id: "id",
      activity_title: "Activité",
      pv_url: "PVs",
      pictures_url: "Images",
      documents_url: "Documents",
    },
    Route.social
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
        setIsLoading(prev => !prev)
        const result: ApiDataResponse<ActivityProps[]> = await fetchApiData(Route.socialRequest, "");
        const dataFormated: ActivityDisplayProps[] = [];

        if (result.status === 200) {
          setIsLoading(false)
          if (Array.isArray(result.data)) {
            result.data.forEach((res: ActivityProps) => {
              dataFormated.push(formatedDataFromDBToDisplay(res));
            });
          }
          setSocialDatas(dataFormated);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching social datas: ", err);
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
    construct_form_btn_label: "Nouveau formulaire",
    existing_form_btn_label: "Utiliser un formulaire existant",
    new_form_title: "Créer une activité sociale",
    construct_form_btn_icon: FaHandHoldingDollar,
  };

  const deleteSocialAccounts = () => {
    if (socualSelected.length !== 0) {
      const allSocials = LOCAL_STORAGE.get("socials");
      const idSelecteds = socualSelected.map((objet) => objet.id);
      const restSocials: ActivityProps[] = [];

      allSocials.map((item: ActivityProps) => {
        if (!idSelecteds.includes(item.id ?? "")) {
          restSocials.push(item);
        }
      });

      toast.success("Accounts are deleted successfull");
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
        return socialDatas.length;
      },
    },
  ]

  return (
    <LayoutDashboardTemplate
      newForms={[
        {
          title: "Nouvelle Activité",
          form: <NewActivityAgriculture endpoint={Route.socialRequest} />,
        },
      ]}
      title="SOCIAL"
      formParams={formParams}
      statPanelDatas={stateActivity}
    >
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Social</h1>
        <div className="flex gap-4 text-gray-500">
          {socualSelected.length !== 0 && (
            <>
              <CustomHoverCard content="Archiver">
                <Archive className="hover:cursor-pointer" />
              </CustomHoverCard>
              <CustomHoverCard content="Supprimer">
                <Trash2
                  className="hover:cursor-pointer"
                  onClick={deleteSocialAccounts}
                />
              </CustomHoverCard>
            </>
          )}
        </div>
      </div>
      <div className="px-6">
        <DataTable<ActivityDisplayProps, any>
          incomingColumns={columns}
          incomingData={socialDatas?.length ? valueToDisplay(socialDatas) : []}
          onSelecteItem={(selects) => {
            setSocialSelected(selects);
          }}
          isLoading={isLoading}
        />
      </div>
    </LayoutDashboardTemplate>
  );
}