"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export interface ISuccessPageProps {
  headText: string;
  paragraphText: string;
}

export default function SuccessPage({
  headText,
  paragraphText,
}: ISuccessPageProps) {
  return (
    <section className=" w-full min-h-[80vh] flex justify-center items-center">
      <Card className=" w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <CheckCircle className=" w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2"></CheckCircle>
          </div>

          <div className=" mt-3 text-center sm:mt-5  w-full">
            <h3 className=" text-lg leading-6 font-medium mt-2">
              {headText}
            </h3>
            <p className=" mt-2 text-sm text-muted-foreground">
              {paragraphText}
            </p>

            <Button className=" mt-5 sm:mt-6 w-full">
              <Link href={"/"}>
                Back to Home Page
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
