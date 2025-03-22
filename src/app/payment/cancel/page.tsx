import { CancelPage } from "@/components/molecules/payment-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "payment cancel page",
  description:
    "A page that display the cancelation of the payment by the customer. when the customer cancels the payment, he will be redirected to this page. this help keep the customer in the application. The customer may try again. ",
  robots: {
    index: false,
    follow: true,
  },
};

export default CancelPage;
