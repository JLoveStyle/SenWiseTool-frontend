"use client";

import { Route } from "@/lib/route";

import { Archive, Trash2 } from "lucide-react";
// import { columnListProjects } from "../atoms/colums-of-tables/listOfProjects";
import { FaCheck, FaHandHoldingDollar } from "react-icons/fa6";

import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
// import { Newagriculture } from "@/components/organisms/tracability/agriculture/new-agriculture";
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
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";

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

  const closeDialog = () => {
    toggleOpenModel();
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
      producer_payment_proof: data.producer_payment_proof ? (
        <FaCheck color="green" />
      ) : (
        <ImCross color="red" />
      ),
      first_buyer_proof: data.first_buyer_proof ? (
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
        const result = await fetchApiData(Route.agricultureRequest, "");
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
    trigger_btn_label_form: "New agriculture",
    construct_form_btn_label: "New agriculture form",
    existing_form_btn_label: "Use Existing Form",
    new_form_title: "Create new agricultural activity",
    construct_form_btn_icon: FaHandHoldingDollar,
  };

  const deleteDifferential = () => {
    if (differentialSelected.length !== 0) {
      const allDifferential = LOCAL_STORAGE.get("differentials");
      const idSelecteds = differentialSelected.map((objet) => objet.id);
      const restDifferential: incomeAndSharedResponsabilityDBProps[] = [];

      allDifferential.map((item: incomeAndSharedResponsabilityDBProps) => {
        if (!idSelecteds.includes(item.id ?? "")) {
          restDifferential.push(item);
        }
      });
      LOCAL_STORAGE.save("differentials", restDifferential);

      toast.success("Accounts are deleted successfull");
    }
  };

  const stateActivity: DashboardStatPanelData[] = [
    {
      structure: {
        label: "Number",
        baseUrl: "",
        icon: Archive,
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
          form: <NewDifferential endpoint={Route.agricultureRequest} />,
        },
      ]}
      title="DIFFERENTIEL DE DURABILITÉ"
      formParams={formParams}
      statPanelDatas={stateActivity}
    >
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Différentiel de durabilité</h1>
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
