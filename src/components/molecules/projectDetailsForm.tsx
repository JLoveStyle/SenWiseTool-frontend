import React, { useEffect, useState } from "react";
import InputField from "./inputField";
import { ProjectDetails } from "@/types/gestion";
import Select from "./select";
import { City, Country, State } from "country-state-city";
import { Button } from "../ui/button";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { Route } from "@/lib/route";
import { useRouter } from "next/navigation";

type Props = {
  onClick: (val1: boolean, val2: boolean) => void;
};

export default function ProjectDetailsForm({ onClick }: Props) {
  const countries: any[] = Country.getAllCountries();
  const showProjectOptions: boolean = true;
  const showProjectDetails: boolean = false;
  const closeModal: boolean = false
  const router = useRouter()
  const [selectedCountryObject, setSelectedCountryObject] = useState<{
    [key: string]: string;
  }>({});
  const [state, setState] = useState<any[]>([]);
  const [city, setCity] = useState<object[]>([]);
  const [projectData, setProjectData] = useState<ProjectDetails>({
    projectTitle: "",
    business_sector: "",
    country: "",
    description: "",
    city: "",
    state: "",
  });

  const businessActivity: string[] = [
    "Cocoa",
    "Café",
    "Banane",
    "Thé",
    "Bois",
    "Autre",
  ];

  const handleChangeEvent = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const data: ProjectDetails = {
      ...projectData,
      [e.target.name]: e.target.value,
    };
    setProjectData(data);
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
  };

  function handleSubmit(e: any) {
    e.preventDefault()
    console.log(projectData)
    LOCAL_STORAGE.save('project_data', projectData)
    router.push(Route.editProject+'/45')
  }

  useEffect(() => {
    setState(State.getStatesOfCountry(selectedCountryObject?.isoCode));
  }, [projectData.country]);

  return (
    <div className="w-full bg-white rounded-lg">
      <div className="flex h-[80px] bg-primary justify-between rounded-t-lg">
        <h1 className="text-xl p-4 font-semibold text-white">
          Create a project: Project details
        </h1>
      </div>
      <form className="w-full flex flex-col px-6 py-4" onSubmit={handleSubmit}>
        <InputField
          label="Project title"
          inputName="projectTitle"
          type="text"
          value={projectData.projectTitle}
          onChange={(e) => handleChangeEvent(e)}
        />
        <InputField
          label="Description"
          inputName="description"
          type="text"
          value={projectData.description}
          onChange={(e) => handleChangeEvent(e)}
        />
        <label className="font-semibold" htmlFor="activity">
          Business sector
          <span className="text-red-500">*</span>
        </label>
        <select
          id="activity"
          value={projectData.business_sector}
          name="business_sector"
          required
          onChange={(event) => handleChangeEvent(event)}
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
        <div className="flex justify-between gap-4">
          <Select
            selectName="country"
            onChange={(e) => handleChangeEvent(e)}
            label="Country"
            arrayOfItems={countries}
            value={projectData.country}
            className="md:w-[33.33%]"
          />
          <Select
            selectName="state"
            onChange={(e) => handleChangeEvent(e)}
            label="Region"
            arrayOfItems={state}
            value={projectData.state}
            className="md:w-[33.33%]"
          />
          <Select
            selectName="city"
            onChange={(e) => handleChangeEvent(e)}
            label="City"
            arrayOfItems={city}
            value={projectData.city}
            className="md:w-[33.33%]"
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button
            className="bg-[#e7e9ee] font-semibold text-black hover:bg-[#e7e9ee] hover:shadow"
            onClick={(e: any) => {
              e.preventDefault;
              onClick(showProjectDetails, showProjectOptions);
            }}
          >
            BACK
          </Button>
          <Button type="submit" className="">
            CREATE PROJECT
          </Button>
        </div>
      </form>
    </div>
  );
}
