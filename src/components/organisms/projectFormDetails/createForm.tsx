import { Spinner } from "@/components/atoms/spinner/spinner";
import { Route } from "@/lib/route";
import { UpdateFilesToS3 } from "@/lib/s3";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { ApiDataResponse, ProjectsType, ProjectType } from "@/types/api-types";
import { businessActivity } from "@/utiles/services/constants";
import { mutateApiData } from "@/utiles/services/mutations";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { City, Country, State } from "country-state-city";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import InputField from "../../molecules/inputField";
import CustomSelectTag from "../../molecules/select";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { useDialogControl } from "@/lib/stores/useDialog-coontrol";

type Props = {
  typeOfProject: ProjectsType;
};

export default function ProjectDetailsForm({
  typeOfProject,
}: Props) {
  const countries: any[] = Country.getAllCountries();
  const router = useRouter();
  const currentCampain = useCampaignStore((state) => state.currentCampaign);
  const [selectedCountryObject, setSelectedCountryObject] = useState<{
    [key: string]: string;
  }>({});
  const [state, setState] = useState<any[]>([]);
  const [city, setCity] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorDate, setErrorDate] = useState<string>("");
  const [otherLogo, setOtherLogo] = useState<File[]>([]);
  const { setIsDialogOpen}  = useDialogControl()
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setOtherLogo(Array.from(event.target.files)); // Convertir FileList en tableau
    }
  };

  const uploadOtherLogo = async () => {
    // @todo Add s3 bucketName on database
    const bucketName = LOCAL_STORAGE.get("bucketName");

    //upload company logo
    if (!otherLogo.length) {
      return "";
    } else {
      const { data, error } = await UpdateFilesToS3({
        bucketName,
        files: otherLogo,
      });

      if (error) {
        console.log(error);
        toast.error("Error while uploading logo. Please try again");
        setIsLoading(false);
        throw new Error("Error lors de l'upload du logo");
      }

      return data.URLs[0] as string;
    }
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    const company = LOCAL_STORAGE.get("company");
    setIsLoading((prev) => !prev);
    const [URLOtherLogo] = await Promise.all([uploadOtherLogo()]);

    // CONVERT DATE INTO NUMBER
    const startDate = new Date(`${projectData.start_date?.slice(0, 10)}`);
    const endDate = new Date(`${projectData.end_date?.slice(0, 10)}`);

    if (startDate?.getTime() > endDate.getTime()) {
      setErrorDate("Start date must not be greater than end date");
      setIsLoading((prev) => !prev);
      return;
    }

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
      another_logo: URLOtherLogo,
      start_date: new Date(projectData.start_date as string).toISOString(),
      end_date: new Date(projectData.end_date as string).toISOString(),
      campaign_id: currentCampain?.id,
    })
      .then((res: ApiDataResponse<ProjectType>) => {
        if (res.status === 201) {
          setIsLoading((prev) => !prev);
          toast.success("Success, redirection...", {
            transition: Bounce,
            autoClose: 3000,
          });
          if (pathname.includes("mapping")) {
            setIsDialogOpen(false);
            return;
          }
          router.push(Route.editProject + `/${res.data.id}`);
          LOCAL_STORAGE.save("project", res.data);
          return;
        } else if (res.message === "Internal Server Error") {
          toast.error("You don't have a company yet! Register your company", {
            transition: Bounce,
            autoClose: 3000,
          });
          setIsLoading((prev) => !prev);
          return;
        }
        setIsLoading((prev) => !prev);
        toast.error("Something went wrong. Please refresh", {
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
    <form className="w-full flex flex-col px-4 py-2" onSubmit={handleSubmit}>
      {typeOfProject === "MAPPING" ? (
        ""
      ) : (
        <>
          <em>
            <strong>NB</strong>: Les logos de votre company et celui de rainforest aliance seront attaché par defaut sur ce projet.
          </em>
          <div className="flex flex-col py-2">
            <label htmlFor="company_logo">
              <strong>Autre logo</strong>
            </label>
            <input
              accept=".png, .jpeg, .jpg"
              type="file"
              onChange={(e) => handleFileChange(e)}
            />
          </div>
        </>
      )}

      <InputField
        label="Titre"
        inputName="title"
        type="text"
        value={projectData.title}
        onChange={(e) => handleChangeEvent(e)}
      />
      <div className="flex justify-between gap-4">
        <div className="md:w-1/2">
          <InputField
            label="Date de debut"
            inputName="start_date"
            type="datetime-local"
            value={projectData.start_date}
            onChange={(e) => handleChangeEvent(e)}
          />
        </div>
        <div className="md:w-1/2">
          <InputField
            label="Date de fin"
            inputName="end_date"
            type="datetime-local"
            value={projectData.end_date}
            onChange={(e) => handleChangeEvent(e)}
          />
        </div>
      </div>
      {errorDate && (
        <span className="text-red-500 mt-4">
          <em>{errorDate}</em>
        </span>
      )}
      <label className="font-semibold" htmlFor="activity">
        Secteur d'activité
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
          label="Pays"
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
        <CustomSelectTag
          selectName="city"
          onChange={(e) => handleChangeEvent(e)}
          label="Ville"
          arrayOfItems={city}
          value={projectData.city as string}
          className="md:w-[33.33%]"
        />
      </div>
      <label className="font-semibold" htmlFor="activity">
        Description du projet
      </label>
      <Textarea
        placeholder="Enter description"
        value={projectData.description}
        name="description"
        onChange={(e) => handleChangeEvent(e)}
      />
      <div className="flex justify-end py-2 gap-4">
        <Button
          variant="outline"
          type="button"
          className="bg-secondary hover:bg-secondary"
          onClick={() => setIsDialogOpen(false)}
        >
          ANNULER
        </Button>
        <Button
          type="submit"
          className={
            isLoading
              ? "hover:cursor-wait opacity-70 bg-tertiary hover:bg-tertiary"
              : "active:transition-y-1 bg-tertiary hover:bg-tertiary"
          }
        >
          {isLoading ? <Spinner /> : "CREER"}
        </Button>
      </div>
    </form>
  );
}
