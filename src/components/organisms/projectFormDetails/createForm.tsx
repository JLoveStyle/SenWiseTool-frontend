import React, { useEffect, useState } from "react";
import InputField from "../../molecules/inputField";
import { Project } from "@/types/gestion";
import CustomSelectTag from "../../molecules/select";
import { City, Country, State } from "country-state-city";
import { Button } from "../../ui/button";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { Route } from "@/lib/route";
import { usePathname, useRouter } from "next/navigation";
import { businessActivity } from "@/utiles/services/constants";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CardLayout from "../../templates/cardLayout";
import { Textarea } from "../../ui/textarea";
import { mutateApiData } from "@/utiles/services/mutations";
import { Spinner } from "@/components/atoms/spinner/spinner";
import { ApiDataResponse, ProjectsType, ProjectType } from "@/types/api-types";
import { Bounce, toast } from "react-toastify";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { useCampaignStore } from "@/lib/stores/campaign-store";

type Props = {
  onClick: (val1: boolean, val2: boolean) => void;
  typeOfProject: ProjectsType;
  project?: Project;
  closeModal: (val: boolean) => void
};

export default function ProjectDetailsForm({
  onClick,
  typeOfProject,
  closeModal,
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
  const [errorDate, setErrorDate] = useState<string>("");
  const [otherLogo, setOtherLogo] = useState<string | ArrayBuffer | null>("");
  const [projectData, setProjectData] = useState<Partial<ProjectType>>({
    title: "",
    sector_activity: "",
    country: "",
    description: "",
    city: "",
    region: "",
    start_date: "",
    end_date: "",
    status: "DRAFT",
    type: typeOfProject, // Project type 'AUTO_EVALUATION' | 'INITIAL_INSPECTION' | etc
  });
  const pathname = usePathname();

  const handleChangeEvent = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const data = {
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
        if (item.name === data.region) {
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
    if (companyLogo) {
      // load the company logo in the companys' table
    }

    // CONVERT DATE INTO NUMBER
    const startDate = new Date(`${projectData.start_date?.slice(0, 10)}`);
    const endDate = new Date(`${projectData.end_date?.slice(0, 10)}`);

    if (startDate?.getTime() > endDate.getTime()) {
      setErrorDate("Start date must not be greater than end date");
      return;
    }

    setIsLoading((prev) => !prev);
    console.log(compains[0]);
    console.log("company", company);
    setErrorDate("");
    // CREATE NEW RECORD IN THE PROJECTS TABLE
    await mutateApiData(Route.projects, {
      type: projectData.type,
      company_id: company?.id,
      title: projectData.title,
      description: projectData.description,
      sector_activity: projectData.sector_activity,
      country: projectData.country,
      city: projectData.city,
      region: projectData.region,
      status: projectData.status,
      another_logo: companyLogo,
      start_date: new Date(projectData.start_date as string).toISOString(),
      end_date: new Date(projectData.end_date as string).toISOString(),
      campaign_id: compains[0]?.id,
    })
      .then((res: ApiDataResponse<ProjectType>) => {
        console.log("project cereated", res);
        if (res.status === 201) {
          setIsLoading((prev) => !prev);
          toast.success("Success", {
            transition: Bounce,
            autoClose: 3000,
          });
          if (pathname.includes("mapping")) {
            // CLOSE MODAL
            closeModal(false)
            router.refresh();
            return;
          }
          router.push(Route.editProject + `/${res.data.id}`);
          LOCAL_STORAGE.save("project", res.data);
          return;
        }
        setIsLoading((prev) => !prev);
        toast.error("Something went wrong", {
          transition: Bounce,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.log("error occured while creating project", err);
        toast.error("Something went wrong. Please try again", {
          transition: Bounce,
          autoClose: 3000,
        });
        setIsLoading((prev) => !prev);
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
      <form className="w-full flex flex-col px-4 py-2" onSubmit={handleSubmit}>
        {typeOfProject === "MAPPING" ? (
          ""
        ) : (
          <>
            <em>
              <strong>NB</strong>: The Rain forest Alliances' and company logos
              will be added by default on this project form
            </em>
            <div className="flex flex-col py-2">
              <label htmlFor="company_logo">
                <strong>Add another logo</strong>
              </label>
              <input type="file" onChange={(e) => handleOtherLogo(e)} />
            </div>
          </>
        )}

        <InputField
          label="Project title"
          inputName="title"
          type="text"
          value={projectData.title}
          onChange={(e) => handleChangeEvent(e)}
        />
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
        {errorDate && <span className="text-red-500 mt-4"><em>{errorDate}</em></span>}
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
          <option>-- Select --</option>
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
            value={projectData.country as string}
            className="md:w-[33.33%]"
          />
          <CustomSelectTag
            selectName="region"
            onChange={(e) => handleChangeEvent(e)}
            label="Region"
            arrayOfItems={state}
            value={projectData.region as string}
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
            value={projectData.city as string}
            className="md:w-[33.33%]"
          />
        </div>
        <label className="font-semibold" htmlFor="activity">
          Project description
        </label>
        <Textarea
          placeholder="Enter description"
          value={projectData.description}
          name="description"
          onChange={(e) => handleChangeEvent(e)}
        />
        <div className="flex justify-end py-2 gap-4">
          <Button
            className="bg-[#e7e9ee] font-semibold text-black hover:bg-[#e7e9ee] hover:shadow active:transition-y-1"
            onClick={(e: any) => {
              e.preventDefault;
              onClick(showProjectDetails, showProjectOptions);
            }}
          >
            BACK
          </Button>
          <Button
            type="submit"
            className={
              isLoading
                ? "hover:cursor-wait opacity-70"
                : "active:transition-y-1"
            }
          >
            {isLoading ? <Spinner /> : "CREATE PROJECT"}
          </Button>
        </div>
      </form>
    </CardLayout>
    // </div>
  );
}
