"use client";

import { Route } from "@/lib/route";

import { Archive, ListOrdered, Trash2 } from "lucide-react";
import { FaHandHoldingDollar } from "react-icons/fa6";

import FilePreview from "@/components/atoms/file-preview";
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
import { RiErrorWarningLine } from "react-icons/ri";

export default function ManagementPlan() {
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

  const preview = (url: string, index: number) => {
    return <FilePreview url={url} variant="button" />;
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
      management_plan:
        data.management_plan?.length !== 0 ? (
          <div className="flex justify-center gap-2 flex-wrap">
            {data.management_plan?.map((url, index) => preview(url, index))}
          </div>
        ) : (
          <div className="flex justify-center gap-2 flex-wrap">
            <RiErrorWarningLine className="text-gray-500" size={20} />
          </div>
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
        console.error("Error fetching management datas: ", err);
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
    trigger_btn_label_form: "New plan",
    construct_form_btn_label: "New plan form",
    existing_form_btn_label: "Use Existing Form",
    new_form_title: "Create new management plan",
    // choose_form: true,
    construct_form_btn_icon: FaHandHoldingDollar,
  };

  const deletePlanAccounts = () => {
    console.log("del");
  };

  const statePlan: DashboardStatPanelData[] = [
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
      statPanelDatas={statePlan}
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
                  onClick={deletePlanAccounts}
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
