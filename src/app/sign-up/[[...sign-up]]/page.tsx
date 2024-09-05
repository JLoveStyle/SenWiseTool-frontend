import { Route } from "@/lib/route";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <main className="">
      <div className="md:w-1/2 w-[96%] flex justify-center mx-auto mt-10 ">
        {/* <div className="bg-[#d8972f98] shadow-xl md:w-1/2 hidden md:block rounded-l-[12px]">
          <div className="flex justify-center ">
            <Link href={Route.home}>
              <Image
                src="/images/logo.png"
                height={150}
                width={150}
                alt="SenWiseTool logo"
                loading="lazy"
              />
            </Link>
          </div>
          <Image
            height={1000}
            width={1000}
            src="/images/sign-up.png"
            alt="signup picture"
            loading="lazy"
          />
        </div> */}
        <div className="md:w-1/2 w-fit">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-primary border-0 hover:bg-[#f09a27] text-sm",
              },
            }}
          />
        </div>
      </div>
    </main>
  );
}
