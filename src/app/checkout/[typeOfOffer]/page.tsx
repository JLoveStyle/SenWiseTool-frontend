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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useApiFetch } from "@/lib/api-provider";
import { PaypalPaypements } from "@/components/atoms/paypal-payment/paypal-button";
import { ApiDataResponse, PricePlanType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
// paypal component
// import { PayPalButtons, PayPalButtonsComponentProps, PayPalScriptProvider, ReactPayPalScriptOptions } from "@paypal/react-paypal-js";

type Props = {};

export default function page({ }: Props) {
  const router = useRouter();
  const [paypalActive, setPaypalActive] = useState(false);
  const [cartActive, setCartActive] = useState(false);
  const [cancel, setCancel] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showError, setShowError] = useState(false);
  // set paypal options


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

  const params = useParams();
  const { typeOfOffer } = params;

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

  const { data: pricePlan } = useApiFetch<PricePlanType, ApiDataResponse<PricePlanType>>({
    query: params.typeOfOffer.toString().toLowerCase(),
    fn: () => fetchApiData(Route.pricing, params.typeOfOffer.toString().toLowerCase()),
    route: Route.pricing,
  });


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
            <section className="pb-5">
              <div className="flex justify-between py-3">
                <h2 className="font-semibold text-xl my-auto md:text-2xl leading-normal">
                  Payment method
                </h2>
                <div className="flex justify-between my-auto gap-2 ">
                  <span className="text-sm text-gray-400">
                    Secured connection
                  </span>
                  <LockKeyhole />
                </div>
              </div>
              <div className="">
                <div
                  className="hover:cursor-pointer p-3 flex gap-3 "
                  onClick={handlePaypal}
                >
                  <input
                    type="radio"
                    className="hover:cursor-pointer w-4"
                    onChange={handleCart}
                  />
                  <div className="bg-white rounded">
                    <Image
                      width={40}
                      height={20}
                      src="https://www.udemy.com/staticx/udemy/images/v9/hpp-paypal.svg"
                      alt="paypal logo"
                    />
                  </div>
                  <p className=" font-bold">PayPal</p>
                </div>
                <hr />
                {/* I have add the text color here because it is not visible at the moment: text and bg was white */}
                <p className={paypalActive ? "flex p-6 bg-white text-muted-foreground" : "hidden"}>
                  In order to complete your transaction, we will transfer you
                  over to PayPals secure servers.
                </p>
                <div
                  className="hover:cursor-pointer p-3"
                  onClick={() => handleCart()}
                >
                  <div className="flex justify-between w-full">
                    <div className="flex gap-3 flex-1 w-[60%] ">
                      <input
                        type="radio"
                        className="hover:cursor-pointer w-4"
                        onChange={() => setCartActive((prev) => !prev)}
                      />
                      <div className="bg-white h-fit my-auto rounded">
                        {/* why using udemy stuff here ? */}
                        <Image
                          width={40}
                          height={20}
                          src="https://www.udemy.com/staticx/udemy/images/v9/card-default.svg"
                          alt="cart deault logo"
                        />
                      </div>
                      <p className="my-auto font-bold flex-1">
                        Credit/Debit Cart
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap w-[40%]  pl-8">
                      <div className="bg-white rounded">
                        <Image
                          height={20}
                          width={40}
                          src="https://www.udemy.com/staticx/udemy/images/v9/card-amex.svg"
                          alt="card-amex"
                        />
                      </div>
                      <div className="bg-white rounded">
                        <Image
                          height={20}
                          width={40}
                          src="	https://www.udemy.com/staticx/udemy/images/v9/card-discover.svg"
                          alt="card-amex"
                        />
                      </div>
                      <div className="bg-white rounded">
                        <Image
                          height={20}
                          width={40}
                          src="https://www.udemy.com/staticx/udemy/images/v9/card-mastercard.svg"
                          alt="card-mastercard"
                        />
                      </div>
                      <div className="bg-white rounded">
                        <Image
                          height={20}
                          width={40}
                          src="	https://www.udemy.com/staticx/udemy/images/v9/card-visa.svg"
                          alt="card-visa"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr className={cartActive ? "flex" : "hidden"} />
                <div className={cartActive ? "w-full px-5 py-5" : "hidden"}>
                  <div className="flex justify-between py-2">
                    <label htmlFor=" cart name" className="font-bold">
                      Name on cart
                    </label>
                  </div>
                </div>
              </div>
            </section>
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
            {
              pricePlan ? (
                <PaypalPaypements />
              ) : (
                <Button className="cursor-wait py-6 bg-primary hover:cursor-pointer font-semibold text-white w-full">
                  <span className="animate-spin h-5 w-5 mr-3 rounded-lg border-4 ..."></span>
                  loading paypal checkout...
                </Button>
              )
            }
          </div>
        </div>
      </div>
      {/* <Popup>
        <main className="w-[450px] h-fit p-5 bg-white rounded-[12px] mx-3">
          <h1 className="font-semibold text-xl py-3">Cancel registration ?</h1>
          <p className="">
            Are you sure you don't want to register your company ?
          </p>
          <p className="">You can still do this from your dashboard</p>
          <div className="flex py-4 gap-3">
            <Button
              onClick={() => router.push(Route.dashboard)}
              className="border w-1/2 rounded-[10px] bg-white text-red-500 border-red-500 hover:bg-[#ef44441e] "
            >
              Yes
            </Button>
            <Button
              onClick={() => onClose()}
              className="bg-primary w-1/2 rounded-[10px] py-2 text-white "
            >
              NO
            </Button>
          </div>
        </main>
      </Popup> */}
    </main>
  );
}
