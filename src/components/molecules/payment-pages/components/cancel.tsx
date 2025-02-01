"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export interface ICancelPageProps { }

export default function CancelPage(props: ICancelPageProps) {
  return (
    <section className=" w-full min-h-[80vh] flex items-center justify-center">
      <Card className=" w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <XCircle className=" w-12 h-12 rounded-full bg-red-500/30 text-red-500 p-2"></XCircle>
          </div>

          <div className=" mt-3 text-center sm:mt-5  w-full">
            <h3 className=" text-lg leading-6 font-medium mt-2">
              Payment Cancelled
            </h3>
            <p className=" mt-2 text-sm text-muted-foreground">
              Something went wrong with your payment.{" "}
              <span className="font-semibold">You have not been charged</span>
            </p>

            <Button className=" mt-5 sm:mt-6 w-full">
              <Link href={"/"}>Back to Home Page</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
