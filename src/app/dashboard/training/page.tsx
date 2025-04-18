"use client";

import { useApiOps } from "@/lib/api-provider";
import { Route } from "@/lib/route";
import {
  ApiDataResponse,
  TrainingTableDisplayType,
  TrainingType,
} from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
import { ListOrdered, PenLine } from "lucide-react";
import { NewTraining } from "@/components/atoms/training/new-trainer";
import { trainingColumnTable } from "@/components/atoms/training/training-column-table";
import { DataTable } from "@/components/molecules/projectsTable";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { DashboardStatPanelData } from "@/types/app-link";
import { TrainingProps } from "@/types/formData";
import { useState } from "react";

export default function Training() {
  const [data, setData] = useState<TrainingProps[]>([]);
  // Load company from store
  const company = useCompanyStore((state) => state.company);

  // laod current campaigne
  const currentCampaign = useCampaignStore((state) => state.currentCampaign);

  const {
    data: trainings,
    isLoading: isLoading,
  } = useApiOps<TrainingType[], ApiDataResponse<TrainingType[]>>({
    fn: () => fetchApiData<ApiDataResponse<TrainingType[]>>(Route.training, ""),
    route: Route.training,
  });

  const valueToDisplay = (args: TrainingType[]) => {
    const data: TrainingType[] = [];
    if (!Array.isArray(args)) {
      console.error("Invalid argument: args must be an array.");
      return data; // Retourne un tableau vide si args n'est pas valide.
    }

    for (const item of args) {
      if (item.code.length < 5) {
        data.push(item);
      }
    }

    return data?.map((training) => ({
      id: training.id,
      title: training.title,
      start_date: training.start_date,
      end_date: training.end_date,
      location: training.location,
      code: training.code,
      created_at: training.created_at,
    }));
  };

  const formParams = {
    trigger_btn_label_form: "Nouvelle formation",
    construct_form_btn_label: "Construire un formulaire",
    existing_form_btn_label: "Utiliser un model pré-définit",
    new_form_title: "Créer un nouveau projet formation",
    construct_form_btn_icon: PenLine,
  };

  const stateTraining: DashboardStatPanelData[] = [
    {
      structure: {
        label: "Nombre",
        baseUrl: "",
        icon: ListOrdered,
      },
      data: () => {
        return valueToDisplay(trainings as TrainingType[])?.length ?? 0;
      },
    },
  ];

  return (
    <LayoutDashboardTemplate
      newForms={[
        {
          title: "Nouveau projet de formation",
          form: <NewTraining />,
        },
      ]}
      title="FORMATION"
      formParams={formParams}
      statPanelDatas={stateTraining}
    >
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Projets</h1>
      </div>
      <div className="px-6">
        <DataTable<TrainingTableDisplayType, any>
          incomingColumns={trainingColumnTable}
          incomingData={
            trainings?.length ? valueToDisplay(trainings as TrainingType[]) : []
          }
          onSelecteItem={() => {}}
          isLoading={isLoading}
        />
      </div>
    </LayoutDashboardTemplate>
  );
}
