import { Route } from "@/lib/route";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <main className="">
      <div className="md:w-1/2 w-[96%] flex justify-center mx-auto mt-10 ">
        
        <div className="md:w-1/2 w-fit ">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-primary border-0 hover:bg-[#f09a27] text-sm",
                cardBox: " h-fit",
              },
            }}
          />
        </div>
      </div>
    </main>
  );
}
