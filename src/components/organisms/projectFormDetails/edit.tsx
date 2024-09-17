import React, { useEffect, useState } from "react";
import InputField from "../../molecules/inputField";
import { Project } from "@/types/gestion";
import CustomSelectTag from "../../molecules/select";
import { City, Country, State } from "country-state-city";
import { Button } from "../../ui/button";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { businessActivity } from "@/utiles/services/constants";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CardLayout from "../../templates/cardLayout";
import { Textarea } from "../../ui/textarea";
import { Bounce, toast } from "react-toastify";
import { Route } from "@/lib/route";
import { mutateUpApiData } from "@/utiles/services/mutations";
import { useEdgeStore } from "@/lib/edgestore";

type Props = {
  onClick: (val1: boolean) => void;
  project: Project;
};

export default function EditProjectFormDatails({ onClick, project }: Props) {
  const { edgestore } = useEdgeStore();
  const countries: any[] = Country.getAllCountries();
  const closeEditForm: boolean = false;
  const [selectedCountryObject, setSelectedCountryObject] = useState<{
    [key: string]: string;
  }>({});
  const [state, setState] = useState<any[]>([]);
  const [city, setCity] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otherLogo, setOtherLogo] = useState<File>();
  const [projectData, setProjectData] = useState<Project>({
    id: project?.id, // this might be harmfull
    title: project?.title,
    sector_activity: project?.sector_activity,
    country: project?.country,
    description: project?.description,
    city: project?.city,
    state: project?.state,
    start_date: project?.start_date,
    end_date: project?.end_date,
    status: ["DRAFT"],
    other_logo: "", // url from edge store
  });

  const id = LOCAL_STORAGE.get("projectId");

  const animatedComponents = makeAnimated(); // For react-select

  const handleChangeEvent = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    // const data: Project = {
    //   ...projectData,
    //   [e.target.name]: e.target.value,
    // };
    const data = {
      ...project,
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

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading((prev) => !prev);
    // const uploadedLogo = await edgestore.publicImages.upload({
    //   file: otherLogo,
    //   onProgressChange: (progress) => console.log(progress),
    // });

    // Upload other logo to edge store.
    // if (!uploadedLogo) return;

    // write the patch function here
    await mutateUpApiData(
      Route.projects,
      {
        title: projectData.title,
        description: projectData.description,
        country: projectData?.country,
        city: projectData.city,
        sector_activity: projectData.sector_activity,
        state: projectData.state,
        start_date: projectData.start_date,
        end_data: projectData.end_date,
      },
      id
    )
      .then((response) => {
        console.log("successfully updated project", response);
        onClick(closeEditForm); // close the modal after edititng
        toast("Project Edited", {
          transition: Bounce,
          autoClose: 1000,
        });
      })
      .catch((error) => {
        console.log("unable to edit project", error);
      });
    // console.log(projectData);
    // LOCAL_STORAGE.save("fakeProject", projectData);
    // LOCAL_STORAGE.save("project_data", projectData);
  }

  useEffect(() => {
    setState(State.getStatesOfCountry(selectedCountryObject?.isoCode));
  }, [projectData.country]);

  return (
    <CardLayout heading={`Edit project: Project details`}>
      <form className="w-full flex flex-col px-6 py-4" onSubmit={handleSubmit}>
        <em>
          <strong>NB</strong>: The Rain forest Alliances' logo will be added by
          default on this project form
        </em>
        <div className="flex justify-between py-5">
          {/* The existence of the company logo in the company object will checked here. This input field will be displayed based on that */}

          <div className="flex flex-col">
            <label htmlFor="company_logo">
              <strong>Add another logo</strong>
            </label>
            <input
              accept=".png, .jpeg, .jpg"
              type="file"
              onChange={(e) => setOtherLogo(e.target.files?.[0])}
            />
          </div>
        </div>
        <div className="">
          <InputField
            label="Project title"
            inputName="title"
            type="text"
            value={projectData.title}
            onChange={(e) => handleChangeEvent(e)}
          />
          {/* <div className="md:w-1/2">
            <InputField
              label="Description"
              inputName="description"
              type="text"
              value={projectData.description}
              onChange={(e) => handleChangeEvent(e)}
            />
          </div> */}
        </div>
        <div className="flex justify-between gap-4">
          <div className="md:w-1/2">
            <InputField
              label="Start date"
              inputName="start_date"
              type="date"
              value={projectData.start_date}
              onChange={(e) => handleChangeEvent(e)}
            />
          </div>
          <div className="md:w-1/2">
            <InputField
              label="End date"
              inputName="end_date"
              type="date"
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
        <label className="font-semibold " htmlFor="description">
          Description<span className="text-red-500">*</span>
        </label>
        <Textarea
          className="border mt-1 mb-7 p-1 w-[95%] md:w-full bg-transparent outline-none focus:border-primary shadow-sm rounded-md"
          placeholder="Enter project description"
          value={projectData.description}
          name="description"
          onChange={(e) => handleChangeEvent(e)}
        />
        <div className="flex justify-end gap-4">
          <Button
            className="bg-[#e7e9ee] font-semibold text-black hover:bg-[#e7e9ee] hover:shadow"
            onClick={(e: any) => {
              e.preventDefault;
              onClick(closeEditForm);
            }}
          >
            CANCEL
          </Button>
          <Button
            type="submit"
            className={isLoading ? "hover:cursor-wait opacity-70" : ""}
          >
            {isLoading ? "Processing..." : "EDIT PROJECT"}
          </Button>
        </div>
      </form>
    </CardLayout>
    // </div>
  );
}
