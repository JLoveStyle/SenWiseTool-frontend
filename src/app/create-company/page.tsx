"use client";
import InputField from "@/components/molecules/inputField";
import Image from "next/image";
import Link from "next/link";
import React, { useActionState, useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import Select from "@/components/molecules/select";
import { Button } from "@/components/ui/button";
import CheckBox from "@/components/molecules/checkButton";
import { FormData } from "@/types/formData";

type Props = {};

export default function Home({}: Props) {
  const countries: any[] = Country.getAllCountries();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [hasAgree, setHasAgree] = useState<boolean>(false);
  const [state, setState] = useState<any[]>([]);
  const [city, setCity] = useState<object[]>([]);
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
  });
  const businessActivity: string[] = [
    "Cocoa",
    "Café",
    "Banane",
    "Thé",
    "Bois",
    "Autre",
  ];
  function handleSubmit(e: any) {
    e.preventDefault();
    console.log('infunction')
    if (!isChecked) {
      setHasAgree(prev => !prev)
      return
    }
    console.log(formData)
  }

  function handleCancel(e: any) {
    e.preventDefault();
    

  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const data: FormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(data)
    for (const country of countries) {
      if (country.name === data.country) {
        console.log('in fxn')
        setSelectedCountryObject(country);
      }
    }
    if (state) {
      for (const item of state) {
        if (item.name === data.state) {
          setCity(City.getCitiesOfState(selectedCountryObject.isoCode, item.isoCode))
        }
      }
    }
  };

  const handleOnCheck = () => {
    setIsChecked((prev) => !prev);
  };

  useEffect(() => {
    setState(State.getStatesOfCountry(selectedCountryObject?.isoCode));
  }, [formData.country]);

  return (
    <main className="">
      <div className="sm:w-fit p-6 flex justify-center flex-col rounded-[12px] shadow-xl my-20 border mx-auto">
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
          <CheckBox onChange={() => handleOnCheck()} />
          {hasAgree && <span className="text-red-500">Please agree to the terms and conditions</span>}
          <div className="flex flex-col gap-3 pt-5">
            <Button className="" type="submit">
              Register
            </Button>
            <Button
              className="text-red-500 bg-white border border-red-500 hover:bg-[#ef44441e]"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
