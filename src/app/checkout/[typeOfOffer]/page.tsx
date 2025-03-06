"use client";
import { DisplayTabPricing } from "@/components/atoms/display-tab-pricing";
import { Logo } from "@/components/atoms/logo";
import Popup from "@/components/organisms/popup";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cardDataPricing, typeOfOffers } from "@/lib/card-data";
import { Route } from "@/lib/route";
import { formatPrice } from "@/utils/format-price";
import clsx from "clsx";
import { LockKeyhole } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";

import NokashPaymentForm from "@/components/molecules/payment-modal/components/nokash-payment-form.tsx";
import { Spinner } from "@/components/atoms/spinner/spinner";
import { useApiOps } from "@/lib/api-provider";
import { ApiDataResponse, PricePlanType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
import PaymentModal from "@/components/molecules/payment-modal";
// import { generateStaticParams } from "./generate-static-params";
// paypal component
// import { PayPalButtons, PayPalButtonsComponentProps, PayPalScriptProvider, ReactPayPalScriptOptions } from "@paypal/react-paypal-js";

type TProps = Promise<{ typeOfOffer: string }>;

export default function page(props: { params: TProps }) {
  const router = useRouter();
  // const { typeOfOffer } = useParams();
  const params = use(props.params)
  const typeOfOffer = params.typeOfOffer

  const [paypalActive, setPaypalActive] = useState(false);
  const [cartActive, setCartActive] = useState(false);
  const [cancel, setCancel] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showError, setShowError] = useState(false);
  // set paypal options

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);


  const handlePaypal = () => {
    setPaypalActive((prev) => !prev);
    setCartActive(false);
  };

  const handleCart = () => {
    setCartActive((prev) => !prev);
    setPaypalActive(false);
  };

  async function handlePayment() {
    setIsLoading((prev) => !prev);
    console.log("how are u");
  }

  // const params = useParams();

  // const { typeOfOffer } = params;

  useEffect(() => {
    if (
      typeof typeOfOffer !== "string" ||
      !typeOfOffer ||
      !typeOfOffers.includes(typeOfOffer)
    ) {
      router.push("/");
      toast.error("Page not found");
    }
  }, [router]);

  const { data: pricePlan } = useApiOps<
    PricePlanType,
    ApiDataResponse<PricePlanType>
  >({
    query: typeOfOffer ? typeOfOffer.toString().toLowerCase() : "",
    fn: () =>
      fetchApiData(
        Route.pricing,
        typeOfOffer ? typeOfOffer.toString().toLowerCase() : ""
      ),
    route: Route.pricing,
  });

  console.log("\n\n current price plan: ", pricePlan);

  const currentOffer = cardDataPricing.find(
    (offer) => offer.type === typeOfOffer
  );

  const [annualPricing, setAnnualPricing] = useState(true);

  const togglePricing = () => setAnnualPricing(!annualPricing);

  const [chapterChoosed, setChapterChoosed] = useState(null);

  return (
    <main className="">
      <div className="flex justify-between shadow-md md:px-[80px] px-[20px]">
        <div
          onClick={() => {
            router.push(Route.home);
          }}
          className="text-2xl hover:cursor-pointer my-auto"
        >
          <Logo size="very-large" />
        </div>
        <p
          className="my-auto hover:cursor-pointer hover:underline font-semibold text-primary"
          onClick={() => setCancel((prev) => !prev)}
        >
          Cancel
        </p>
        {cancel && (
          <Popup
            isVisible={cancel}
            onCloseModal={() => setCancel((prev) => !prev)}
            modalOpen={() => setCancel(true)}
          >
            <main className="w-[450px] h-fit p-5 bg-white rounded-[12px] mx-3">
              <h1 className="font-semibold text-xl py-3">Cancel Payment ?</h1>
              <p className="">Are you sure you want to exit payment</p>

              <div className="flex py-4 gap-3">
                <Button
                  onClick={() => router.push(Route.home)}
                  className="border w-1/2 rounded-[10px] bg-white text-red-500 border-red-500 hover:bg-[#ef44441e] "
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setCancel(true)}
                  className="bg-primary w-1/2 rounded-[10px] py-2 text-white "
                >
                  NO
                </Button>
              </div>
            </main>
          </Popup>
        )}
      </div>
      <div className="md:flex md:px-4 px-5">
        <div className="md:w-[55%] md:px-[80px] md:flex">
          <p className="flex-1"></p>
          <div className="md:pr-10 md:w-[40rem]">
            <div>
              <h1 className="py-4 md:py-6 font-semibold text-2xl md:text-4xl leading-normal">
                Checkout
              </h1>
            </div>

            <div>
              {typeof typeOfOffer == "string" && (
                <>
                  <DisplayTabPricing
                    typeOfOffer={typeOfOffer}
                    setChapterChoosed={setChapterChoosed}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="md:bg-[#f8fafb] md:opacity-90 md:min-h-[100vh] text-black md:w-[45%] md:px-10 md:pt-5">
          <div className="w-full md:w-[320px]">
            <div className="flex flex-col justify-between gap-10 items-center pt-10 pb-28">
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <span className="text-2xl font-extrabold text-gray-600">
                  {typeOfOffer}
                </span>
                {chapterChoosed && <span>{` - ${chapterChoosed}`}</span>}
              </div>
              <div className="flex justify-end gap-3 font-semibold text-gray-400">
                <span className={clsx(!annualPricing && "text-gray-950")}>
                  Biannual
                </span>
                <Switch
                  onCheckedChange={togglePricing}
                  checked={annualPricing}
                  className="outline-none"
                />
                <span className={clsx(annualPricing && "text-gray-950")}>
                  Annual
                </span>
              </div>
            </div>
            <h2 className="font-semibold pb-4 text-xl md:text-2xl leading-normal">
              Summary
            </h2>
            <hr />
            <div className="flex justify-between font-bold py-3">
              <p>Total: </p>
              <span>
                {annualPricing
                  ? `${formatPrice(currentOffer?.annualPricing)} / Year`
                  : `${formatPrice(
                    currentOffer?.biannualPricing
                  )}  /   ¹⁄₂Year`}
              </span>
            </div>

            {/* checkout */}
            <Button
              className="py-6 bg-primary font-semibold text-white w-full hover:bg-primary/90"
              onClick={() => setIsPaymentModalOpen(true)}
            >
              Checkout
            </Button>

            <PaymentModal
              isOpen={isPaymentModalOpen}
              onClose={() => setIsPaymentModalOpen(false)}
              amount={annualPricing ? currentOffer?.annualPricing as number : currentOffer?.biannualPricing as number}
              planType={`${typeOfOffer} ${annualPricing ? 'Annual' : 'Biannual'} Plan`}
              currentPricePlan={pricePlan?.id}
            />
          </div>
        </div>
      </div>
    </main >
    </Session >
  );
}
// export { generateStaticParams };
