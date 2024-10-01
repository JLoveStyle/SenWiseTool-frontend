"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Route } from "@/lib/route";

type Props = {
  onClose: (value: boolean) => void;
};

export default function CancelModal({ onClose }: Props) {
  const router = useRouter();
  const [closeModal, setCloseModal] = useState<boolean>(false)

  return (
    <main className="md:w-[450px] w-[96%] h-fit p-5 bg-white rounded-[12px] mx-auto md:mx-3">
      <h1 className="font-semibold text-xl py-3">Skip company registration ?</h1>
      <p className="">Are you sure you don't want to register your company ?</p>
      <p className="">You can still do this from your dashboard</p>
      <div className="flex py-4 gap-3">
        <Button
          onClick={() => router.push(Route.dashboard)}
          className="border w-1/2 rounded-[10px] bg-white text-red-500 border-red-500 hover:bg-[#ef44441e] "
        >
          Yes
        </Button>
        <Button
          onClick={() => onClose(closeModal)}
          className="bg-primary w-1/2 rounded-[10px] py-2 text-white "
        >
          NO
        </Button>
      </div>
    </main>
  );
}
