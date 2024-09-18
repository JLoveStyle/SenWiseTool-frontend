import React, { useEffect, useState } from "react";
import InputField from "../../molecules/inputField";
import { Project } from "@/types/gestion";
import CustomSelectTag from "../../molecules/select";
import { City, Country, State } from "country-state-city";
import { Button } from "../../ui/button";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { Route } from "@/lib/route";
import { useRouter } from "next/navigation";
import { businessActivity } from "@/utiles/services/constants";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CardLayout from "../../templates/cardLayout";
import { Textarea } from "../../ui/textarea";
import { mutateApiData } from "@/utiles/services/mutations";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { useCampaignStore } from "@/lib/stores/campaign-store";

type Props = {
  onClick: (val1: boolean, val2: boolean) => void;
  typeOfProject?:
  | "INTERNAL_INSPECTION"
  | "INITIAL_INSPECTION"
  | "AUTO_EVALUATION"
  | "TRAINING"
  ;
  project?: Project;
};

export default function ProjectDetailsForm({
  onClick,
  typeOfProject,
  project,
}: Props) {
  const countries: any[] = Country.getAllCountries();
  const showProjectOptions: boolean = true;
  const showProjectDetails: boolean = false;
  const router = useRouter();
  const company = useCompanyStore((state) => state.company);
  const compains = useCampaignStore((state) => state.campaigns);
  const [selectedCountryObject, setSelectedCountryObject] = useState<{
    [key: string]: string;
  }>({});
  const [state, setState] = useState<any[]>([]);
  const [city, setCity] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [companyLogo, setCompanyLogo] = useState<string | ArrayBuffer | null>(
    ""
  );
  const [otherLogo, setOtherLogo] = useState<string | ArrayBuffer | null>("");
  const [projectData, setProjectData] = useState<Project>({
    id: "", // this might be harmfull
    title: "",
    sector_activity: "",
    country: "",
    description: "",
    city: "",
    state: "",
    start_date: "",
    end_date: "",
    status: "DRAFT",
    type: typeOfProject, // Project type 'AUTO_EVALUATION' | 'INITIAL_INSPECTION' | etc
  });


  const animatedComponents = makeAnimated(); // For react-select

  const handleChangeEvent = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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

  /*
  const handlecompanyLogo = (e: any) => {
    const reader = new FileReader();
    if (e) {
      reader.onload = (onLoadEvent) => {
        if (onLoadEvent.target) {
          console.log(onLoadEvent.target.result);
          setCompanyLogo(onLoadEvent.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }; */

  const handleOtherLogo = (e: any) => {
    const reader = new FileReader();
    if (e) {
      reader.onload = (onLoadEvent) => {
        if (onLoadEvent.target) {
          setOtherLogo(onLoadEvent.target.result);
        }
      };
    }
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading((prev) => !prev);
    if (companyLogo) {
      // load the company logo in the companys' table
    }

    // CREATE NEW RECORD IN THE PROJECTS TABLE
    await mutateApiData(Route.projects, {
      type: projectData.type,
      company_id: company?.id,
      title: projectData.title,
      description: projectData.description,
      sector_activity: projectData.sector_activity,
      country: projectData.country,
      city: projectData.city,
      state: projectData.state,
      status: projectData.status,
      start_date: new Date(projectData.start_date).toISOString(),
      end_date: new Date(projectData.end_date).toISOString(),
      campaign_id: compains[0]?.id,
    })
      .then((res) => {
        console.log("project cereated", res);
        setIsLoading((prev) => !prev);
        LOCAL_STORAGE.save("project", {
          title: res.data.title,
          id: res.data.id
        });
        router.push(Route.editProject + `/${res.data.id}`);
      })
      .catch((err) => {
        console.log("error occured while creating", err);
      });

    // get the id of the project response and route to that ID
  }

  useEffect(() => {
    setState(State.getStatesOfCountry(selectedCountryObject?.isoCode));
  }, [projectData.country]);

  return (
    <CardLayout
      heading={`Create a project (${typeOfProject}): Project details`}
    >
      <form className="w-full flex flex-col px-6 py-4" onSubmit={handleSubmit}>
        <em>
          <strong>NB</strong>: The Rain forest Alliances' logo will be added by
          default on this project form
        </em>
        <div className="flex justify-between py-5">
          {/* The existence of the company logo in the company object will checked here. This input field will be displayed based on that */}
          {/* <div className="flex flex-col">
            <label htmlFor="company_logo">
              <strong>Company logo</strong>
            </label>
            <input type="file" onChange={(e) => handlecompanyLogo(e)} />
          </div> */}
          <div className="flex flex-col">
            <label htmlFor="company_logo">
              <strong>Add another logo</strong>
            </label>
            <input type="file" onChange={(e) => handleOtherLogo(e)} />
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <div className="md:w-1/2">
            <InputField
              label="Project title"
              inputName="title"
              type="text"
              value={projectData.title}
              onChange={(e) => handleChangeEvent(e)}
            />
          </div>
          <div className="md:w-1/2">
            <InputField
              label="Description"
              inputName="description"
              type="text"
              value={projectData.description}
              onChange={(e) => handleChangeEvent(e)}
            />
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <div className="md:w-1/2">
            <InputField
              label="Start date"
              inputName="start_date"
              type="datetime-local"
              value={projectData.start_date}
              onChange={(e) => handleChangeEvent(e)}
            />
          </div>
          <div className="md:w-1/2">
            <InputField
              label="End date"
              inputName="end_date"
              type="datetime-local"
              value={projectData.end_date}
              onChange={(e) => handleChangeEvent(e)}
            />
          </div>
        </div>
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
        {/* <Textarea
          placeholder="Enter project description"
          value={projectData.description}
          name='description'

          onChange={(e) => handleChangeEvent(e)}
        /> */}
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
          <Button
            type="submit"
            className={isLoading ? "hover:cursor-wait opacity-70" : ""}
          >
            {isLoading ? "Processing..." : "CREATE PROJECT"}
          </Button>
        </div>
      </form>
    </CardLayout>
    // </div>
  );
}
