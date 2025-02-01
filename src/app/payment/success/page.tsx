import { SuccessPage } from "@/components/molecules/payment-pages";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "payment success page",
  description:
    "A page that display the successfull payment by the customer. when the customer finally checkout a product, he will be redirected to this page. this help keep the customer in the application. The customer may try again. ",
};

export default function PaymentSuccessPage() {
  return (
    <SuccessPage
      headText="Payment Successfull"
      paragraphText="Congrats to your purchase! Please check your email for further instructions"
    />
  );
}
