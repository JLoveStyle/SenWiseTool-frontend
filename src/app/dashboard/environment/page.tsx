"use client";

import { Route } from "@/lib/route";
import { Archive, ListOrdered, Trash2 } from "lucide-react";
import { FaCheck, FaHandHoldingDollar } from "react-icons/fa6";
import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
import { columnTable } from "@/components/templates/column-table";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { ActivityDisplayProps, ActivityProps } from "@/types/activity";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import { NewActivityAgriculture } from "@/components/organisms/agriculture-activities/new-activity";
import { DashboardStatPanelData } from "@/types/app-link";
import { fetchApiData } from "@/utiles/services/queries";
import { ApiDataResponse } from "@/types/api-types";

export default function environment() {
  const [isLoading, setIsLoading] = useState(true);
  const [environmentDatas, setEnvironmentDatas] = useState<
    ActivityDisplayProps[]
  >([]);
  const [environmentSelected, setEnvironmentSelected] = useState<
    ActivityDisplayProps[]
  >([]);


  const columns = columnTable<ActivityDisplayProps>(
    {
      id: "id",
      activity_title: "Activité",
      pv_url: "PVs",
      pictures_url: "Images",
      documents_url: "Documents",
    },
    Route.environment
    // false
  );
  const formatedDataFromDBToDisplay = (data: ActivityProps) => {
    return {
      id: data.id ?? "",
      // company_id: data.company_id,
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
        setIsLoading((prev) => !prev);
        const result: ApiDataResponse<ActivityProps[]> = await fetchApiData(
          Route.environmentRequest,
          ""
        );
        const dataFormated: ActivityDisplayProps[] = [];
        console.log(result);

        if (result.status === 200) {
          setIsLoading(false)
          if (Array.isArray(result.data)) {
            result.data.forEach((res) => {
              dataFormated.push(formatedDataFromDBToDisplay(res));
            });
          }
          setEnvironmentDatas(dataFormated);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching environment datas: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const valueToDisplay = (args: ActivityDisplayProps[]) => {
    return args?.map((data) => ({
      id: data.id ?? "",
      // company_id: data.company_id,
      activity_title: data.activity_title,
      pictures_url: data.pictures_url,
      documents_url: data.documents_url,
      pv_url: data.pv_url,
    }));
  };

  const formParams = {
    trigger_btn_label_form: "New activity",
    construct_form_btn_label: "New form",
    existing_form_btn_label: "Use Existing Form",
    new_form_title: "Create new environment activity",
    construct_form_btn_icon: FaHandHoldingDollar,
  };

  const deleteEnvironmentAccounts = () => {
    if (environmentSelected.length !== 0) {
      const allEnvironment = LOCAL_STORAGE.get("environments");
      const idSelecteds = environmentSelected.map((objet) => objet.id);
      const restEnvironment: ActivityProps[] = [];

      allEnvironment.map((item: ActivityProps) => {
        if (!idSelecteds.includes(item.id ?? "")) {
          restEnvironment.push(item);
        }
      });
      LOCAL_STORAGE.save("environments", restEnvironment);

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
        return environmentDatas.length;
      },
    },
  ];

  return (
    <LayoutDashboardTemplate
      newForms={[
        {
          title: "New activity",
          form: <NewActivityAgriculture endpoint={Route.environmentRequest} />,
        },
      ]}
      title="ENVIRONMENT"
      formParams={formParams}
      statPanelDatas={stateActivity}
    >
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Environment</h1>
        <div className="flex gap-4 text-gray-500">
          {environmentSelected.length !== 0 && (
            <>
              <CustomHoverCard content="archive project">
                <Archive className="hover:cursor-pointer" />
              </CustomHoverCard>
              <CustomHoverCard content="Delete Accounts">
                <Trash2
                  className="hover:cursor-pointer"
                  onClick={deleteEnvironmentAccounts}
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
            environmentDatas?.length ? valueToDisplay(environmentDatas) : []
          }
          onSelecteItem={(selects) => {
            setEnvironmentSelected(selects);
          }}
          isLoading={isLoading}
        />
      </div>
    </LayoutDashboardTemplate>
  );
}

// data request
const environmentData = async () => {
  return LOCAL_STORAGE.get("environments") ?? [];
};
