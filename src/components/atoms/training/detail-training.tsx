import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrainingProps } from "@/types/formData";
import { RxDotFilled } from "react-icons/rx";
import { AttendanceSheetForm } from "./attendance-sheet-form";

interface Props {
  training: TrainingProps | undefined;
  toggleDisplayForm: Function;
  displayForm: boolean;
}

interface DetailTrainingDataProps {
  training: TrainingProps | undefined;
}

// interface AttendanceSheetProps {
//   toggleDisplayForm: Function;
// }

export function DetailTraining({
  training,
  toggleDisplayForm,
  displayForm,
}: Props) {
  return (
    <>
      {displayForm ? (
        <AttendanceSheet />
      ) : (
        <DetailTrainingData training={training} />
      )}
    </>
  );
}

const DetailTrainingData = ({ training }: DetailTrainingDataProps) => {
  return (
    <Card className="mr-5">
      <CardHeader>
        <CardTitle>Projet de formation</CardTitle>
        <CardDescription>{training?.title}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-10">
        <div className="flex items-center justify-around text-lg ">
          <div className="flex gap-3">
            <span className="font-bold">Du :</span>
            <span>{training?.start_date}</span>
          </div>
          <div className="flex gap-3">
            <span className="font-bold">Au :</span>
            <span>{training?.end_date}</span>
          </div>
        </div>
        <div>
          <CardTitle className="text-gray-700 text-lg">
            Modules à dispenser
          </CardTitle>
          {training?.modules.map((module) => (
            <div>
              <RxDotFilled className="text-gray-800 inline" size={25} />{" "}
              {module.value}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div>
          <CardTitle className="text-gray-700 text-lg">
            Ajouter des partenaires
          </CardTitle>
          {/* @ ...todo add partners */}
          <div>Add partners ...</div>
        </div>
      </CardFooter>
    </Card>
  );
};

const AttendanceSheet = () => {
  return (
    <div>
      <AttendanceSheetForm />
    </div>
  );
};
