"use client";

import { Route } from "@/lib/route";

import { Archive, ListOrdered, Trash2 } from "lucide-react";
import { FaCheck, FaHandHoldingDollar } from "react-icons/fa6";

import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
import { NewManagementPlan } from "@/components/organisms/income-and-shared-responsability/management-plan/new-management-plan";
import { columnTable } from "@/components/templates/column-table";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { useToggle } from "@/hooks/use-toggle";
import { DashboardStatPanelData } from "@/types/app-link";
import {
  ManagementPlanDisplayProps,
  incomeAndSharedResponsabilityDBProps,
} from "@/types/income-and-shared-responsability";
import { fetchApiData } from "@/utiles/services/queries";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";

export default function Agriculture() {
  const [isLoading, setIsLoading] = useState(true);
  const [managementPlanDatas, setManagementPlanDatas] = useState<
    ManagementPlanDisplayProps[]
  >([]);
  const [managementPlanSelected, setManagementPlanSelected] = useState<
    ManagementPlanDisplayProps[]
  >([]);

  const { value: openModal, toggle: toggleOpenModel } = useToggle({
    initial: false,
  });

  const closeDialog = () => {
    toggleOpenModel();
  };

  const columns = columnTable<ManagementPlanDisplayProps>(
    {
      id: "id",
      management_plan: "Plan de gestion de l’investissement de durabilité",
    },
    Route.incomeAndSharedResponsabilityManagementPlan,
    false
  );
  const formatedDataFromDBToDisplay = (
    data: incomeAndSharedResponsabilityDBProps
  ) => {
    return {
      id: data.id ?? "",
      management_plan: data.management_plan ? (
        <FaCheck color="green" />
      ) : (
        <ImCross color="red" />
      ),
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchApiData(
          Route.revenuEtResponsabilite,
          "?type=INVESTMENT_MANAGEMENT_PLAN",
          ""
        );
        const dataFormated: ManagementPlanDisplayProps[] = [];

        if (result.status === 200) {
          setIsLoading(false);
          if (Array.isArray(result.data)) {
            console.log("if condition");
            result.data.forEach((res: incomeAndSharedResponsabilityDBProps) => {
              dataFormated.push(formatedDataFromDBToDisplay(res));
            });
          } else {
            console.log("if else condition");
            dataFormated.push(formatedDataFromDBToDisplay(result.data));
          }
          setManagementPlanDatas(dataFormated);
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

  const valueToDisplay = (args: ManagementPlanDisplayProps[]) => {
    return args?.map((data) => ({
      id: data.id ?? "",
      // company_id: data.company_id,
      management_plan: data.management_plan,
    }));
  };

  const formParams = {
    trigger_btn_label_form: "New agriculture",
    construct_form_btn_label: "New agriculture form",
    existing_form_btn_label: "Use Existing Form",
    new_form_title: "Create new agricultural activity",
    construct_form_btn_icon: FaHandHoldingDollar,
  };

  const deleteAgricultureAccounts = () => {
    console.log("del");
  };

  const stateActivity: DashboardStatPanelData[] = [
    {
      structure: {
        label: "Number",
        baseUrl: "",
        icon: ListOrdered,
      },
      data: () => {
        return managementPlanDatas.length;
      },
    },
  ];

  return (
    <LayoutDashboardTemplate
      newForms={[
        {
          title: "New Management Plan",
          form: <NewManagementPlan endpoint={Route.revenuEtResponsabilite} />,
        },
      ]}
      title="MANAGEMENT PLAN"
      formParams={formParams}
      statPanelDatas={stateActivity}
    >
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Management plan</h1>
        <div className="flex gap-4 text-gray-500">
          {managementPlanSelected.length !== 0 && (
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
        <DataTable<ManagementPlanDisplayProps, any>
          incomingColumns={columns}
          incomingData={
            managementPlanDatas?.length
              ? valueToDisplay(managementPlanDatas)
              : []
          }
          onSelecteItem={(selects) => {
            setManagementPlanSelected(selects);
          }}
          isLoading={isLoading}
        />
      </div>
    </LayoutDashboardTemplate>
  );
}
