import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardDataPricing, getChapterById } from "@/lib/card-data";
import { chapterList, formatPrice } from "@/utils/format-price";
import clsx from "clsx";
import { MoveRight, Sparkles } from "lucide-react";
import Image from "next/image";

interface Props {
  annualPricing: boolean;
}

export function PricingCard({ annualPricing }: Props) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 py-10">
      {cardDataPricing.map((cardData, index) => (
        <Card className="w-auto mx-4 border-none" key={index}>
          <CardHeader className="p-0 m-0">
            <CardTitle className="relative h-56 w-full m-0 p-0">
              <Image
                src={cardData.image}
                alt="description"
                fill
                className="absolute w-full m-0"
                objectFit="cover"
              />
              <span className="absolute flex items-center gap-1 z-50 text-base bg-[#FFE4C9] my-5 pl-2 pr-3 py-0.5 -left-1 space-x-0.5 shadow-2xl rounded-r-full">
                {cardData.type} <Sparkles size={15} className="text-primary" />
              </span>
              <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-white via-white/70 dark:from-[#020817] dark:via-[#020817]/70 to-black/0 to-70%"></div>
            </CardTitle>
            <CardTitle className="text-center pb-2 pt-3 text-primary">
              {annualPricing
                ? `${formatPrice(cardData.annualPricing)} / Year`
                : `${formatPrice(cardData.biannualPricing)}  /   ¹⁄₂Year`}
            </CardTitle>
            <span className="text-center py-8 text-sm text-gray-600 dark:text-gray-300 italic">
              {cardData?.condition?.description}
            </span>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-5">
              {chapterList(cardData.chapters).map((chapter, index) => (
                <>
                  {cardData?.condition && index != 0 && (
                    <div className="divide-y divide-gray-300 w-full">
                      <div className="relative flex items-center justify-center my-8">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative bg-white px-4 text-gray-500">
                          {cardData?.condition?.badge}
                        </div>
                      </div>
                    </div>
                  )}
                  <div
                    key={index}
                    className={clsx(
                      "flex items-center justify-center gap-3",
                      index % 2 == 1 && "flex-row-reverse"
                    )}
                  >
                    <Image
                      src={getChapterById(chapter)?.image ?? ""}
                      width={96}
                      height={96}
                      alt="illustration"
                    />
                    <div className="flex flex-col justify-between items-center gap-2">
                      <span className="font-semibold">
                        {getChapterById(chapter)?.title}
                      </span>
                      <span className="text-sm text-center">
                        {getChapterById(chapter)?.description}
                      </span>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="gap-2 mt-10">
              SUBSCRIBE PLAN <MoveRight />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
