import React, { useEffect, useState } from "react";
import InputField from "./inputField";
import { Project } from "@/types/gestion";
import CustomSelectTag from "./select";
import { City, Country, State } from "country-state-city";
import { Button } from "../ui/button";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { Route } from "@/lib/route";
import { useRouter } from "next/navigation";
import { tableRaw } from "@/utiles/services/constants";
import Select from "react-select";
import makeAnimated from "react-select/animated";

type Props = {
  onClick: (val1: boolean, val2: boolean) => void;
};

export default function ProjectDetailsForm({ onClick }: Props) {
  const countries: any[] = Country.getAllCountries();
  const showProjectOptions: boolean = true;
  const showProjectDetails: boolean = false;
  const closeModal: boolean = false;
  const router = useRouter();
  const [selectedCountryObject, setSelectedCountryObject] = useState<{
    [key: string]: string;
  }>({});
  const [state, setState] = useState<any[]>([]);
  const [city, setCity] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [companyLogo, setCompanyLogo] = useState<string | ArrayBuffer | null>("");
  const [otherLogo, setOtherLogo] = useState<string | ArrayBuffer | null>("")
  const [projectData, setProjectData] = useState<Project>({
    id: "", // this might be harmfull
    title: "",
    sector_activity: "",
    country: "",
    description: "",
    city: "",
    state: "",
    status: ["DRAFT"],
    type: ["INTERNAL_INSPECTION"],
  });

  const animatedComponents = makeAnimated(); // Fro react-select

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
    const data: Project = {
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

  const handlecompanyLogo = (e: any) => {
    const reader = new FileReader();
    if (e) {
      reader.onload = (onLoadEvent) => {
        if (onLoadEvent.target) {
          console.log(onLoadEvent.target.result)
          setCompanyLogo(onLoadEvent.target.result)
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleOtherLogo = (e: any) => {
    const reader = new FileReader()
    if (e) {
      reader.onload = (onLoadEvent) => {
        if (onLoadEvent.target) {
          setOtherLogo(onLoadEvent.target.result)
        }
      }
    }
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(prev => !prev)
    if (companyLogo) {
      // load the company logo in the companys' table
    }
    console.log(projectData);
    LOCAL_STORAGE.save("project_data", projectData);
    tableRaw.push(projectData);
    router.push(Route.editProject + "/45");
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
        <em><strong>NB</strong>: The Rain forest Alliances' logo will be added by default on this project</em>
        <div className="flex justify-between py-5">
          
          {/* The existence of the company logo in the company object will done here. This input field will be displayed based on that */}
          <div className="flex flex-col">
            <label htmlFor="company_logo">
              <strong>Company logo</strong>
            </label>
            <input type="file" onChange={(e) => handlecompanyLogo(e)}/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="company_logo">
              <strong>Add another logo</strong>
            </label>
            <input type="file" onChange={(e) => handleOtherLogo(e)}/>
          </div>
        </div>
        <InputField
          label="Project title"
          inputName="title"
          type="text"
          value={projectData.title}
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
          value={projectData.sector_activity}
          name="sector_activity"
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
          <CustomSelectTag
            selectName="country"
            onChange={(e) => handleChangeEvent(e)}
            label="Country"
            arrayOfItems={countries}
            value={projectData.country}
            className="md:w-[33.33%]"
          />
          <CustomSelectTag
            selectName="state"
            onChange={(e) => handleChangeEvent(e)}
            label="Region"
            arrayOfItems={state}
            value={projectData.state}
            className="md:w-[33.33%]"
          />
          {/* <div className="flex flex-col ">
            <label htmlFor="region">Region</label>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={state}
            />
          </div> */}
          <CustomSelectTag
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
          <Button type="submit" className={isLoading ? "hover:cursor-wait opacity-70" : ""}>
            {isLoading ? "Processing..." : "CREATE PROJECT"}
          </Button>
        </div>
      </form>
    </div>
  );
}
