import { NewTraining } from "@/components/atoms/training/new-trainer";
import { TrainingList } from "@/components/atoms/training/training-list";

export default function Home() {
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
