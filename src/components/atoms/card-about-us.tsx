import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardDataAboutUs } from "@/lib/card-data";
import { MoveRight } from "lucide-react";
import Image from "next/image";

export function CardAboutUs() {
  const cardElement = [];

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 py-10 ">
      {cardDataAboutUs.map((cardData, index) => (
        <Card className="w-auto">
          <CardHeader className="p-0 m-0">
            <CardTitle className="relative h-40 w-full m-0 p-0">
              <Image
                src={cardData.image}
                alt="description"
                fill
                className="absolute"
                objectFit="cover"
              />
            </CardTitle>
            <CardTitle className="px-6 py-3">{cardData.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div>{cardData.content}</div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="link" className="gap-2">
              Read the article <MoveRight />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
