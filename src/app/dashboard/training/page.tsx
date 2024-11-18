"use client";

import LayoutDashboard from "@/components/organisms/layoutDashboard";
import { useApiOps } from "@/lib/api-provider";
import { Route } from "@/lib/route";
import {
  ApiDataResponse,
  TrainingTableDisplayType,
  TrainingType,
} from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";

import { Archive, Trash2, UserPlus } from "lucide-react";

// import { columnListProjects } from "../atoms/colums-of-tables/listOfProjects";

import { NewTraining } from "@/components/atoms/training/new-trainer";
import { trainingColumnTable } from "@/components/atoms/training/training-column-table";
import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { TrainingProps } from "@/types/formData";
import { db_get_trainings } from "@/utiles/services/training";
import { useEffect, useState } from "react";

export default function Training() {
  const [data, setData] = useState<TrainingProps[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [trainingDatas, setTrainingDatas] = useState<TrainingType[]>([]);

  // Load company from store
  const company = useCompanyStore((state) => state.company);

  // laod current campaigne
  const currentCampaign = useCampaignStore((state) => state.currentCampaign);

  const {
    data: trainings,
    refetch,
    isLoading: isLoading,
  } = useApiOps<TrainingType[], ApiDataResponse<TrainingType[]>>({
    fn: () => fetchApiData<ApiDataResponse<TrainingType[]>>(Route.training, ""),
    route: Route.training,
  });

  const valueToDisplay = (args: TrainingType[]) => {
    const data: TrainingType[] = []
    for (const item of args) {
      if (item.code.length < 5) {
        data.push(item)
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
      // modules: training.modules.map((module: string, index: number) => ({
      //   id: index,
      //   value: module,
      // })),
    }));
  };

  useEffect(() => {
    // refetch();
  }, [trainingDatas]);

  console.log("training =>", trainings);

  return (
    <LayoutDashboard
      projectsPerType={trainingDatas ?? []}
      typeOfProject={"TRAINING"}
      newForm={<NewTraining />}
    >
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Projects</h1>
        <div className="flex gap-4 text-gray-500">
          <CustomHoverCard content="archive project">
            <Archive className="hover:cursor-pointer" />
          </CustomHoverCard>
          <CustomHoverCard content="Share project">
            <UserPlus className="hover:cursor-pointer" />
          </CustomHoverCard>
          <CustomHoverCard content="Delete Project">
            <Trash2 className="hover:cursor-pointer" />
          </CustomHoverCard>
        </div>
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
    </LayoutDashboard>
  );
}
