import { FarmerType } from "@/types/api-types";
import dayjs from "dayjs";
import React from "react";
import { FilePreview } from "./filePreview";
import { Route } from "@/lib/route";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

type Props = {
  famerObject: FarmerType;
};

export default function FarmerDetails({ famerObject }: Props) {
  return (
    <div className="bg-[#f3f4f6] p-6 flex gap-5">
      <div className=" md:w-[70%]">
        <Link
          className="flex gap-1 underline hover:font-medium"
          href={Route.listOfFarmers}
        >
          <MoveLeft />
          Back
        </Link>
        <div className="flex gap-2 py-2 border-b pb-4 items-baseline justify-center">
          <span className="text-sm text-gray-500">Name:</span>
          <span className=" font-semibold text-lg px-2 rounded-lg">
            {famerObject?.farmer_name}
          </span>
        </div>
        <div className="flex justify-between md:w-full py-4 border-b ">
          <div className="flex md:w-full justify-between">
            <div className="flex flex-col gap-2 py-2">
              <span className="text-sm text-gray-500 ">Contact</span>
              <span className="bg-green-200 font-semibold text-center text-sm px-2 rounded-lg">
                {famerObject?.farmer_contact}
              </span>
            </div>

            <div className="flex flex-col gap-2 py-2">
              <span className="text-sm text-gray-500 ">Farmer ID card</span>
              <span className="bg-green-200 font-semibold text-center text-sm px-2 rounded-lg">
                {famerObject?.farmer_ID_card_number}
              </span>
            </div>
            <div className="flex flex-col gap-2 py-2">
              <span className="text-sm text-gray-500 ">Nulber of farms</span>
              <span className="bg-green-200 font-semibold text-center text-sm px-2 rounded-lg">
                2
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between md:w-full py-4 border-b ">
          <div className="flex md:w-full justify-between">
            <div className="flex flex-col gap-2 py-2">
              <span className="text-sm text-gray-500 ">
                Farmer registered on
              </span>
              <span className=" text-sm text-center rounded-lg font-semibold">
                {dayjs(famerObject?.inspection_date).toString().slice(0, -4)}
              </span>
            </div>
            <div className="flex flex-col gap-2 py-2">
              <span className="text-sm text-gray-500 ">Registered by</span>
              <span className=" text-sm text-center rounded-lg font-semibold">
                {famerObject?.inspector_name}
              </span>
            </div>
            <div className="flex flex-col gap-2 py-2">
              <span className="text-sm text-gray-500 ">Agent contact</span>
              <span className=" text-sm rounded-lg font-semibold">
                {famerObject?.inspector_contact}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between md:w-full py-4 border-b ">
          <div className="flex md:w-full justify-between">
            <div className="flex flex-col gap-2 py-2">
              <span className="text-sm text-gray-500 ">Council</span>
              <span className=" text-sm text-center rounded-lg font-semibold">
                {famerObject?.village}
              </span>
            </div>
            <div className="flex flex-col gap-2 py-2">
              <span className="text-sm text-gray-500 ">Village</span>
              <span className=" text-sm rounded-lg text-center font-semibold">
                {famerObject?.village}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between md:w-full pt-4">
          <div className="flex md:w-full justify-between">
            <div className="flex flex-col gap-2 py-2">
              <span className="text-sm text-gray-500 ">Weed application</span>
              <span className=" text-sm rounded-lg font-semibold">
                {famerObject?.weed_application}
              </span>
            </div>
            <div className="flex flex-col gap-2 py-2">
              <span className="text-sm text-gray-500 ">
                Weed application quantity
              </span>
              <span className=" text-sm rounded-lg font-semibold">
                {famerObject?.weed_application_quantity}
              </span>
            </div>
            <div className="flex flex-col gap-2 py-2">
              <span className="text-sm text-gray-500 ">Pesticides used</span>
              <span className=" text-sm rounded-lg font-semibold">
                {famerObject?.pesticide_used}
              </span>
            </div>
            <div className="flex flex-col gap-2 py-2">
              <span className="text-sm text-gray-500 ">
                Pesticide quantity used
              </span>
              <span className=" text-sm rounded-lg font-semibold">
                {famerObject?.pesticide_quantity}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-[30%] p">
        <h1 className="font-semibold text-center pt-2 pb-4 border-b ">
          Farmer pictures
        </h1>
        {famerObject?.farmer_photos?.map((item, idx) => (
          <div className="flex gap-2 py-4">
            <FilePreview key={idx} url={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
