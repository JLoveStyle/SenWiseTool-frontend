"use client";

import { Route } from "@/lib/route";

import { Archive, Trash2 } from "lucide-react";
// import { columnListProjects } from "../atoms/colums-of-tables/listOfProjects";
import { FaCheck, FaHandHoldingDollar } from "react-icons/fa6";

import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
// import { Newsocial } from "@/components/organisms/tracability/social/new-social";
import { NewActivitySocial } from "@/components/organisms/social-activities/new-activity";
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

export default function social() {
  const [isLoading, setIsLoading] = useState(true);
  const [socialDatas, setSocialDatas] = useState<ActivityDisplayProps[]>([]);
  const [socualSelected, setSocialSelected] = useState<ActivityDisplayProps[]>(
    []
  );

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
    Route.social
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

  // async function getAllsocial() {
  //   console.log("here is company", currentCampain?.id);
  //   await fetchApiData(Route.socialRequest, company?.id)
  //     .then((response) => {
  //       console.log("from useEffect social", response);
  //       if (response.status !== 200) {
  //         toast.error("Could not load socials. Please try again");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  useEffect(() => {
    // getAllsocial();
    const fetchData = async () => {
      try {
        const result = await socialData();
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
          setSocialDatas(dataFormated);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching social datas: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    // const fetchData = async () => {
    // const result = await db_get_socials()
    // .then((result) => {
    // console.log("data social list: ", result);

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
  }, [socialDatas]);

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
    trigger_btn_label_form: "New social",
    construct_form_btn_label: "New social form",
    existing_form_btn_label: "Use Existing Form",
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
      LOCAL_STORAGE.save("socials", restSocials);

      toast.success("Accounts are deleted successfull");
    }
  };

  return (
    <LayoutDashboardTemplate
      newForms={[
        {
          title: "Nouvelle Activité",
          form: <NewActivitySocial />,
        },
      ]}
      title="social"
      formParams={formParams}
      statPanelDatas={statPanelDatas}
    >
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Social</h1>
        <div className="flex gap-4 text-gray-500">
          {socualSelected.length !== 0 && (
            <>
              <CustomHoverCard content="archive project">
                <Archive className="hover:cursor-pointer" />
              </CustomHoverCard>
              <CustomHoverCard content="Delete Accounts">
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
            console.log("seleccccccct", selects);

            setSocialSelected(selects);
          }}
          isLoading={isLoading}
        />
      </div>
    </LayoutDashboardTemplate>
  );
}

// data request
const socialData = async () => {
  return LOCAL_STORAGE.get("socials") ?? [];
};
