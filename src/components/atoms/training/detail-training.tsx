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

interface Props {
  training: TrainingProps | undefined;
}

export function DetailTraining({ training }: Props) {
  return (
    <Card className="mr-5">
      <CardHeader>
        <CardTitle>Projet de formation</CardTitle>
        <CardDescription>{training?.theme}</CardDescription>
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
}
// {currentTraining && (
//   <div>
//     <div>
//       <span>{currentTraining.theme}</span>
//     </div>
//     <div></div>
//   </div>
// )}
