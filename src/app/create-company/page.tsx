"use client";
import InputField from "@/components/molecules/inputField";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import Select from "@/components/molecules/select";
import { Button } from "@/components/ui/button";
import CheckBox from "@/components/molecules/checkButton";
import { FormData } from "@/types/formData";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/atoms/logo";
import Popup from "@/components/organisms/popup";
import CancelModal from "@/components/molecules/cancelModal";
import { createCompany } from "@/utiles/services/queries";
import { Route } from "@/lib/route";

type Props = {};

export default function Home({}: Props) {
  const router = useRouter();
  const countries: any[] = Country.getAllCountries();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [hasAgree, setHasAgree] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [state, setState] = useState<any[]>([]);
  const [city, setCity] = useState<object[]>([]);
  const [hasOtherBusiness, setHasOtherBusiness] = useState<boolean>(false);
  const [selectedCountryObject, setSelectedCountryObject] = useState<{
    [key: string]: string;
  }>({});
  const [formData, setFormData] = useState<FormData>({
    companyEmail: "",
    companyName: "",
    country: "",
    hasAgree: false,
    state: "",
    city: "",
    businessActivity: "",
    otherBusiness: "",
  });
  const businessActivity: string[] = [
    "Cocoa",
    "Café",
    "Banane",
    "Thé",
    "Bois",
    "Autre",
  ];

  const { isSignedIn } = useUser();
  console.log(isSignedIn);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setHasAgree(false);
    if (!isChecked) {
      setHasAgree((prev) => !prev);
      return;
    }
    setIsLoading(prev => !prev)
    // setIsLoading((prev) => !prev);
    // await createCompany({
    //   companyEmail: formData.companyEmail,
    //   companyName: formData.companyName,
    //   country: formData.country,
    //   state: formData.state,
    //   city: formData.city,
    //   sector_of_activity: formData.businessActivity,
    // })
    //   .then((response) => {
    //     console.log("create company res =>", response);
    //     setIsLoading((prev) => !prev);
    //     router.push(Route.dashboard);
    //   })
    //   .catch((error) => {
    //     console.log("An error occured", error);
    //   });
    setTimeout(() => {
      setIsLoading(prev => !prev)
      router.push(Route.dashboard)
    }, 6000)
    
  }

  function handleCancel(e: any) {
    e.preventDefault();
    setIsModalOpen((prev) => !prev);
    console.log("canceled");
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const data: FormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(data);
    for (const country of countries) {
      if (country.name === data.country) {
        setSelectedCountryObject(country);
      }
    }
    if (state) {
      for (const item of state) {
        if (item.name === data.state) {
          setCity(
            City.getCitiesOfState(selectedCountryObject.isoCode, item.isoCode)
          );
        }
      }
    }
    if (data.businessActivity === "Autre") {
      setHasOtherBusiness(true);
    }
  };

  const handleOnCheck = () => {
    setIsChecked((prev) => !prev);
    setHasAgree(false);
  };

  useEffect(() => {
    setState(State.getStatesOfCountry(selectedCountryObject?.isoCode));
  }, [formData.country]);

  const handleCloseModal = (value: boolean) => {
    setIsModalOpen(value);
  };

  return (
    <div
      className="h-full"
    >
      <div className=" sm:w-fit p-6 flex justify-center flex-col rounded-[12px] shadow-xl my-20 border mx-auto">
        <div className="flex justify-center ">
          <Link href={Route.home}>
            <Image
              src="/images/logo.png"
              height={150}
              width={150}
              alt="SenWiseTool logo"
              loading="lazy"
            />
            {/* <Logo size="very-large"/> */}
          </Link>
        </div>
        <h3 className="font-semibold text-2xl text-center pb-7">
          Register your company
        </h3>
        <form className="" onSubmit={handleSubmit}>
          <InputField
            label="Company name"
            inputName="companyName"
            type="text"
            value={formData.companyName}
            onChange={(e) => handleInputChange(e)}
          />
          <InputField
            label="Company email"
            inputName="companyEmail"
            type="email"
            value={formData.companyEmail}
            onChange={(e) => handleInputChange(e)}
          />
          <Select
            selectName="country"
            onChange={(e) => handleInputChange(e)}
            label="Country"
            arrayOfItems={countries}
            value={formData.country}
          />
          <Select
            selectName="state"
            onChange={(e) => handleInputChange(e)}
            label="State"
            arrayOfItems={state}
            value={formData.state}
          />
          <Select
            selectName="city"
            onChange={(e) => handleInputChange(e)}
            label="City"
            arrayOfItems={city}
            value={formData.city}
          />
          <label className="font-semibold" htmlFor="activity">
            Business activity
            <span className="text-red-500">*</span>
          </label>
          <select
            id="activity"
            value={formData.businessActivity}
            name="businessActivity"
            required
            onChange={(event) => handleInputChange(event)}
            className="border flex flex-col mt-1 mb-7 p-1 w-[95%] md:w-[500px] bg-transparent outline-none focus:border-primary shadow-sm rounded-md"
          >
            <option selected disabled>
              -- Select --
            </option>
            {businessActivity?.map((item: any, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          {hasOtherBusiness && (
            <input
              type="text"
              required
              value={formData.otherBusiness}
              name="otherBusiness"
              placeholder="Enter the business"
              onChange={(e) => handleInputChange(e)}
              className="border mt-1 mb-7 p-1 w-[95%] md:w-[500px] bg-transparent outline-none focus:border-primary shadow-sm rounded-md"
            />
          )}
          <CheckBox onChange={() => handleOnCheck()} />
          {hasAgree && (
            <span className="text-red-500">
              Please agree to the terms and conditions
            </span>
          )}
          <div className="flex flex-col gap-3 pt-5">
            {isLoading ? (
              <Button className="cursor-wait" >
                <span
                  className="animate-spin h-5 w-5 mr-3 rounded-lg border-4 ..."
                ></span>
                Processing...
              </Button>
            ) : (
              <Button className="" type="submit">
                Register
              </Button>
            )}

            <Button
              className="text-red-500 bg-white border border-red-500 hover:bg-[#ef44441e]"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>

      <Popup
        isVisible={isModalOpen}
        onCloseModal={() => setIsModalOpen((prev) => !prev)}
      >
        <CancelModal onClose={handleCloseModal} />
      </Popup>
    </div>
  );
}
