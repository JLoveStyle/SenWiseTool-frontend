"use client";

import { Route } from "@/lib/route";

import { Archive, Trash2 } from "lucide-react";
// import { columnListProjects } from "../atoms/colums-of-tables/listOfProjects";
import { FaCheck, FaHandHoldingDollar } from "react-icons/fa6";

import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
// import { Newenvironment } from "@/components/organisms/tracability/environment/new-environment";
import { NewActivityEnvironment } from "@/components/organisms/environment-activities/new-activity";
import { columnTable } from "@/components/templates/column-table";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { useToggle } from "@/hooks/use-toggle";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { ActivityDisplayProps, ActivityProps } from "@/types/activity";
import { statPanelDatas } from "@/utiles/services/constants";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";

export default function environment() {
  const [isLoading, setIsLoading] = useState(true);
  const [environmentDatas, setEnvironmentDatas] = useState<
    ActivityDisplayProps[]
  >([]);
  const [environmentSelected, setEnvironmentSelected] = useState<
    ActivityDisplayProps[]
  >([]);

  const { value: openModal, toggle: toggleOpenModel } = useToggle({
    initial: false,
  });

  const closeDialog = () => {
    toggleOpenModel();
  };

  // Load company object from store
  const company = useCompanyStore((state) => state.company);

  // load current campain object from store
  const currentCampain = useCampaignStore((state) => state.currentCampaign);
  console.log(currentCampain);

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

  // async function getAllenvironment() {
  //   console.log("here is company", currentCampain?.id);
  //   await fetchApiData(Route.environmentRequest, company?.id)
  //     .then((response) => {
  //       console.log("from useEffect environment", response);
  //       if (response.status !== 200) {
  //         toast.error("Could not load environment. Please try again");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  useEffect(() => {
    // getAllenvironment();
    const fetchData = async () => {
      try {
        const result = await environmentData();
        const dataFormated: ActivityDisplayProps[] = [];
        console.log(result);

        if (result) {
          if (Array.isArray(result)) {
            result.forEach((res) => {
              dataFormated.push(formatedDataFromDBToDisplay(res));
            });
          } else {
            dataFormated.push(formatedDataFromDBToDisplay(result));
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

    // const fetchData = async () => {
    // const result = await db_get_environment()
    // .then((result) => {
    // console.log("data environment list: ", result);

    // setIsLoading(false);
    // })
    // .catch((err) => console.error(err));
    // };

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

  useEffect(() => {
    // refetch();
    // const company = useCompanyStore((state) => state.company);
    // console.log("compagny", company);
  }, [environmentDatas]);

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

  return (
    <LayoutDashboardTemplate
      newForms={[
        {
          title: "New activity",
          form: <NewActivityEnvironment />,
        },
      ]}
      title="ENVIRONMENT"
      formParams={formParams}
      statPanelDatas={statPanelDatas}
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
            console.log("seleccccccct", selects);

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
