import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <main className="">
      <div className="md:w-1/2 w-[96%] flex justify-center mx-auto items-center ">
        <div className="bg-[#d8972f98] shadow-xl md:w-1/2 hidden md:block rounded-l-[12px]">
          <div className="flex justify-center ">
            <Link href="/">
              <Image
                src="/images/logo.png"
                height={150}
                width={150}
                alt="SenWiseTool logo"
                loading="lazy"
              />
            </Link>
          </div>
          <div className="flex justify-center">
            <Image
              height={250}
              width={250}
              src="/images/Login-rafiki.png"
              alt="signup picture"
              loading="lazy"
              className="h-fit"
            />
          </div>
        </div>
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
