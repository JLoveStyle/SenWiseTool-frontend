"use client";

import LayoutDashboard from "@/components/organisms/layoutDashboard";
import { useApiOps } from "@/lib/api-provider";
import { Route } from "@/lib/route";
import { ApiDataResponse, CompanyType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";

import { Archive, Trash2, UserPlus } from "lucide-react";

// import { columnListProjects } from "../atoms/colums-of-tables/listOfProjects";

import { NewTraining } from "@/components/atoms/training/new-trainer";
import { getTrainings } from "@/components/atoms/training/training-list";
import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
import { columnTable } from "@/lib/column-table";
import { trainingDatas } from "@/lib/datas";
import { TrainingProps } from "@/types/formData";
import { useEffect, useState } from "react";

export default function Training() {
  const { data: companyData } = useApiOps<
    CompanyType,
    ApiDataResponse<CompanyType>
  >({
    fn: () => fetchApiData(Route.companies, "current"),
    route: Route.companies,
  });

  const [data, setData] = useState<TrainingProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [trainingDatas, setTrainingDatas] = useState<TrainingProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTrainings();
      setData(result); // Ici on passe bien les données renvoyées par la fonction
      setIsLoading(false);
      console.log(result);
    };

    fetchData();
  }, []);

  return (
    <LayoutDashboard
      projectsPerType={[]}
      typeOfProject={["TRAINING"]}
      newForm={<NewTraining />}
    >
      {/* <div className="flex flex-col justify-between gap-10  w-full">
        <div className="flex justify-between items-center py-3 mr-10">
          <span className="text-2xl font-bold">Formations</span>
          <NewTraining />
        </div>
        <div>
          <TrainingList /> 
        </div>
      </div> */}
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
        <DataTable
          incomingColumns={columnTable}
          incomingData={trainingDatas}
          onSelecteItem={() => {}}
          isLoading={isLoading}
        />
      </div>
    </LayoutDashboard>
  );
}
