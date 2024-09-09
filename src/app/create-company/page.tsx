"use client";
import InputField from "@/components/molecules/inputField";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import CustomSelectTag from "@/components/molecules/select";
import { Button } from "@/components/ui/button";
import CheckBox from "@/components/molecules/checkButton";
import { FormData } from "@/types/formData";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CancelModal from "@/components/molecules/cancelModal";
import { createCompany } from "@/utiles/services/queries";
import { Route } from "@/lib/route";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { businessActivity } from "@/utiles/services/constants";

type Props = {};

export default function Home({}: Props) {
  const router = useRouter();
  const { getToken, isLoaded } = useAuth();

  const countries: any[] = Country.getAllCountries();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [hasAgree, setHasAgree] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [state, setState] = useState<any[]>([]);
  const [city, setCity] = useState<object[]>([]);
  const [hasOtherBusiness, setHasOtherBusiness] = useState<boolean>(false);
  const [companyLogo, setCompanyLogo] = useState<string | ArrayBuffer | null>(
    ""
  );
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

  const { isSignedIn, user } = useUser();

  async function handleSubmit(e: any) {
    e.preventDefault();
    setHasAgree(false);

    if (!isChecked) {
      setHasAgree((prev) => !prev);
      return;
    }
    setIsLoading((prev) => !prev);
    console.log(companyLogo);

    if (user?.id) {
      console.log("userId available", user);
      // const res = await createOrganization(formData, user.id);
      // console.log("res =>", res);

      await createCompany({
        companyEmail: formData.companyEmail,
        companyName: formData.companyName,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        // logo: companyLogo, // company logo will be coming from edgstore
        sector_of_activity: formData.businessActivity,
      })
        .then((response) => {
          console.log("create company res =>", response);
          setIsLoading((prev) => !prev);
          router.push(Route.inspectionInterne);
        })
        .catch((error) => {
          console.log("An error occured", error);
        });
    }
    // setTimeout(() => {
    //   setIsLoading((prev) => !prev);
    //   router.push(Route.inspectionInterne);
    // }, 6000);
    setIsLoading((prev) => !prev);
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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e) {
      reader.onload = (onLoadEvent) => {
        if (onLoadEvent.target) {
          setCompanyLogo(onLoadEvent.target.result);
        }
      };
    }
  };

  const fetchToken = async () => {
    const token = await getToken();
    console.log(token);
    LOCAL_STORAGE.save("token", token);
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <div className="h-full">
      <div className=" sm:w-[550px] p-6 flex justify-center flex-col rounded-[12px] shadow-xl my-20 border mx-auto">
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
          <CustomSelectTag
            selectName="country"
            onChange={(e) => handleInputChange(e)}
            label="Country"
            arrayOfItems={countries}
            value={formData.country}
          />
          <CustomSelectTag
            selectName="state"
            onChange={(e) => handleInputChange(e)}
            label="Region"
            arrayOfItems={state}
            value={formData.state}
          />
          <CustomSelectTag
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
            className="border flex flex-col mt-1 mb-7 p-1 w-[95%] md:w-full bg-transparent outline-none focus:border-primary shadow-sm rounded-md"
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
          <div className="pb-6 flex flex-col">
            <label htmlFor="logo" className="font-semibold">
              Enter company logo
            </label>
            <input
              type="file"
              accept=".png, .jpeg, .jpg"
              placeholder="Enter logo"
              onChange={(e) => handleLogoUpload(e)}
            />
          </div>
          <CheckBox onChange={() => handleOnCheck()} />
          {hasAgree && (
            <span className="text-red-500">
              Please agree to the terms and conditions
            </span>
          )}

          <div className="flex flex-col gap-3 pt-3 ">
            {isLoading ? (
              <Button className="cursor-wait">
                <span className="animate-spin h-5 w-5 mr-3 rounded-lg border-4 ..."></span>
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
      <Dialog onOpenChange={() => setIsModalOpen(prev => !prev)} open={isModalOpen}>
        <DialogContent>
          <CancelModal onClose={handleCloseModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
