import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

interface Props {
  typeOfOffer: string;
  setChapterChoosed: Function;
}

// Swichable between differents offers

export function DisplayTabPricing({ typeOfOffer, setChapterChoosed }: Props) {
  const router = useRouter();

  return (
    <Tabs defaultValue={typeOfOffer} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        {typeOfOffers.map((type, index) => (
          <TabsTrigger
            value={type}
            key={index}
            onClick={() => router.push(`${Route.checkout}/${type}`)}
          >
            {type}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={typeOfOffer}>
        <TableDetails
          currentOffer={typeOfOffer}
          setChapterChoosed={setChapterChoosed}
        />
      </TabsContent>
    </Tabs>
  );
}

// Table of offer details

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cardDataPricing, chapters, typeOfOffers } from "@/lib/card-data";
import { Route } from "@/lib/route";
import { chapterList } from "@/utils/format-price";

interface TableProps {
  currentOffer: string;
  setChapterChoosed: Function;
}

export function TableDetails({ currentOffer, setChapterChoosed }: TableProps) {
  return (
    <Table>
      <TableBody>
        {chapters.map((chapter) => (
          <TableRow key={chapter.id}>
            <TableCell className="font-medium">
              <input
                type="radio"
                name="chapterChoosed"
                value={chapter.title}
                disabled={
                  currentOffer === "Bronze" &&
                  chapterList(
                    cardDataPricing.find((offer) => offer.type === currentOffer)
                      ?.chapters
                  ).includes(chapter.id)
                    ? false
                    : true
                }
                onChange={() => setChapterChoosed(chapter.title)}
              />
            </TableCell>
            <TableCell className="whitespace-nowrap">{chapter.title}</TableCell>
            <TableCell>{chapter.description}</TableCell>
            <TableCell className="text-right">
              {chapterList(
                cardDataPricing.find((offer) => offer.type === currentOffer)
                  ?.chapters
              ).includes(chapter.id) ? (
                <FaCheck color="green" />
              ) : (
                <ImCross color="red" />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
