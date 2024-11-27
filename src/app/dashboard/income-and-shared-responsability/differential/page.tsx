"use client";

import { Route } from "@/lib/route";

import { Archive, ListOrdered, Trash2 } from "lucide-react";
import { FaHandHoldingDollar } from "react-icons/fa6";

import FilePreview from "@/components/atoms/file-preview";
import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
import { NewDifferential } from "@/components/organisms/income-and-shared-responsability/differential/new-differential";
import { columnTable } from "@/components/templates/column-table";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { useToggle } from "@/hooks/use-toggle";
import { DashboardStatPanelData } from "@/types/app-link";
import {
  differentialDisplayProps,
  incomeAndSharedResponsabilityDBProps,
} from "@/types/income-and-shared-responsability";
import { fetchApiData } from "@/utiles/services/queries";
import { useEffect, useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";

export default function Agriculture() {
  const [isLoading, setIsLoading] = useState(true);
  const [differentialDatas, setDifferentialDatas] = useState<
    differentialDisplayProps[]
  >([]);
  const [differentialSelected, setDifferentialSelected] = useState<
    differentialDisplayProps[]
  >([]);

  const { value: openModal, toggle: toggleOpenModel } = useToggle({
    initial: false,
  });

  const preview = (url: string, index: number) => {
    return <FilePreview url={url} variant="button" />;
  };

  const columns = columnTable<differentialDisplayProps>(
    {
      id: "id",
      first_buyer_proof: "Preuve de versement fourni par le premier acheteur",
      producer_payment_proof:
        "Justificatifs de paiement auprès des producteurs",
    },
    Route.incomeAndSharedResponsabilityDifferential,
    false
  );
  const formatedDataFromDBToDisplay = (
    data: incomeAndSharedResponsabilityDBProps
  ) => {
    return {
      id: data.id ?? "",
      producer_payment_proof:
        data.producer_payment_proof?.length !== 0 ? (
          <div className="flex justify-center gap-2 flex-wrap">
            {data.producer_payment_proof?.map((url, index) =>
              preview(url, index)
            )}
          </div>
        ) : (
          <div className="flex justify-center gap-2 flex-wrap">
            <RiErrorWarningLine className="text-gray-500" size={20} />
          </div>
        ),
      first_buyer_proof:
        data.first_buyer_proof?.length !== 0 ? (
          <div className="flex justify-center gap-2 flex-wrap">
            {data.first_buyer_proof?.map((url, index) => preview(url, index))}
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
          "?type=SUSTENABILITY_DIFFERENTIAL",
          ""
        );
        const dataFormated: differentialDisplayProps[] = [];

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
          setDifferentialDatas(dataFormated);
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

  const valueToDisplay = (args: differentialDisplayProps[]) => {
    return args?.map((data) => ({
      id: data.id ?? "",
      // company_id: data.company_id,
      producer_payment_proof: data.producer_payment_proof,
      first_buyer_proof: data.first_buyer_proof,
    }));
  };

  const formParams = {
    trigger_btn_label_form: "New Differential",
    construct_form_btn_label: "New form",
    existing_form_btn_label: "Use Existing Form",
    new_form_title: "Create new differential sustanability differential",
    construct_form_btn_icon: FaHandHoldingDollar,
  };

  const deleteDifferential = () => {
    console.log("Delete sustanability differential");
    // if (differentialSelected.length !== 0) {
    //   const allDifferential = LOCAL_STORAGE.get("differentials");
    //   const idSelecteds = differentialSelected.map((objet) => objet.id);
    //   const restDifferential: incomeAndSharedResponsabilityDBProps[] = [];

    //   allDifferential.map((item: incomeAndSharedResponsabilityDBProps) => {
    //     if (!idSelecteds.includes(item.id ?? "")) {
    //       restDifferential.push(item);
    //     }
    //   });
    //   LOCAL_STORAGE.save("differentials", restDifferential);

    //   toast.success("Accounts are deleted successfull");
    // }
  };

  const stateActivity: DashboardStatPanelData[] = [
    {
      structure: {
        label: "Number",
        baseUrl: "",
        icon: ListOrdered,
      },
      data: () => {
        return differentialDatas.length;
      },
    },
  ];

  return (
    <LayoutDashboardTemplate
      newForms={[
        {
          title: "New activity",
          form: <NewDifferential endpoint={Route.revenuEtResponsabilite} />,
        },
      ]}
      title="DIFFERENTIEL DE DURABILITÉ"
      formParams={formParams}
      statPanelDatas={stateActivity}
    >
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Sustanability differential</h1>
        <div className="flex gap-4 text-gray-500">
          {differentialSelected.length !== 0 && (
            <>
              <CustomHoverCard content="archive project">
                <Archive className="hover:cursor-pointer" />
              </CustomHoverCard>
              <CustomHoverCard content="Delete Accounts">
                <Trash2
                  className="hover:cursor-pointer"
                  onClick={deleteDifferential}
                />
              </CustomHoverCard>
            </>
          )}
        </div>
      </div>
      <div className="px-6">
        <DataTable<differentialDisplayProps, any>
          incomingColumns={columns}
          incomingData={
            differentialDatas?.length ? valueToDisplay(differentialDatas) : []
          }
          onSelecteItem={(selects) => {
            setDifferentialSelected(selects);
          }}
          isLoading={isLoading}
        />
      </div>
    </LayoutDashboardTemplate>
  );
}
