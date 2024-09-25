"use client";

import { useApiOps } from "@/lib/api-provider";
import { Route } from "@/lib/route";
import {
  ApiDataResponse,
  TrainingTableDisplayType,
  TrainingType,
} from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";

import { Archive, FilePenLine, Rocket, Trash2, UserPlus } from "lucide-react";

// import { columnListProjects } from "../atoms/colums-of-tables/listOfProjects";

import { trainingColumnTable } from "@/components/atoms/training/training-column-table";
import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
import { NewFormReceipt } from "@/components/organisms/tracability/receipt/new-form-receipt";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { DashboardStatPanelData } from "@/types/app-link";
import { TrainingProps } from "@/types/formData";
import { db_get_trainings } from "@/utiles/services/training";
import { useEffect, useState } from "react";

export default function Receipt() {
  const { data: trainings, refetch } = useApiOps<
    TrainingType[],
    ApiDataResponse<TrainingType[]>
  >({
    fn: () => fetchApiData<ApiDataResponse<TrainingType[]>>(Route.training, ""),
    route: Route.training,
  });

  const [data, setData] = useState<TrainingProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trainingDatas, setTrainingDatas] = useState<TrainingType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      db_get_trainings()
        .then((result) => {
          console.log("data training: ", result);

          setTrainingDatas(result as TrainingType[]);
          setIsLoading(false);
        })
        .catch((err) => console.error(err));
    };

    fetchData();
  }, [trainingDatas]);

  const valueToDisplay = (args: TrainingType[]) => {
    return args?.map((training) => ({
      id: training.id,
      title: training.title,
      start_date: training.start_date,
      end_date: training.end_date,
      location: training.location,
    }));
  };

  useEffect(() => {
    refetch();
  }, [trainingDatas]);

  const statPanelDatas: DashboardStatPanelData[] = [
    {
      structure: {
        label: "Deployed",
        baseUrl: "",
        icon: Rocket,
      },
      data: () => {
        return 0;
      },
    },
    {
      structure: {
        label: "Draft",
        baseUrl: "",
        icon: FilePenLine,
      },
      data: () => {
        return 0;
      },
    },
    {
      structure: {
        label: "Archive",
        baseUrl: "",
        icon: Archive,
      },
      data: () => {
        return 0;
      },
    },
  ];

  return (
    <LayoutDashboardTemplate
      newForm={<NewFormReceipt />}
      title="Traçabilité - Les Reçus"
      // statPanelDatas={statPanelDatas}
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
            trainingDatas?.length
              ? valueToDisplay(trainingDatas)
              : trainings?.length
              ? valueToDisplay(trainings as TrainingType[])
              : []
          }
          onSelecteItem={() => {}}
          isLoading={isLoading}
        />
      </div>
    </LayoutDashboardTemplate>
  );
}
