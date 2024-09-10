<<<<<<< HEAD
"use client";

import { NewTraining } from "@/components/atoms/training/new-trainer";
import { TrainingList } from "@/components/atoms/training/training-list";
import { useApiOps } from "@/lib/api-provider";
import { Route } from "@/lib/route";
import { ApiDataResponse, CompanyType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";



export default function Home() {
  // set company state
  const { data: companyData } = useApiOps<CompanyType, ApiDataResponse<CompanyType>>({
    fn: () => fetchApiData(Route.companies, "current", Route.companies),
  })
=======
import { NewTraining } from "@/components/atoms/training/new-trainer";
import { TrainingList } from "@/components/atoms/training/training-list";

export default function Home() {
>>>>>>> training
  return (
    <>
      <div className="flex flex-col justify-between gap-10  w-full">
        <div className="flex justify-between items-center py-3 mr-10">
          <span className="text-2xl font-bold">Formations</span>
          <NewTraining />
        </div>
        <div>
          <TrainingList />
        </div>
      </div>
    </>
  );
}
