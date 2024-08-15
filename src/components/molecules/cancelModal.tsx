"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  onClose: (value: boolean) => void;
};

export default function CancelModal({ onClose }: Props) {
  const router = useRouter();
  const [closeModal, setCloseModal] = useState<boolean>(true)

  return (
    <main className="w-[450px] h-fit p-5 bg-white rounded-[12px] mx-3">
      <h1 className="font-semibold text-xl py-3">Cancel registration ?</h1>
      <p className="">Are you sure you don't want to register your company ?</p>
      <p className="">You can still do this from your dashboard</p>
      <div className="flex py-4 gap-3">
        <Button
          onClick={() => router.push("/dashboard")}
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
