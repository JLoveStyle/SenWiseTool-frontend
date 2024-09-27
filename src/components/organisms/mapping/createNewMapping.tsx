import { Spinner } from "@/components/atoms/spinner/spinner";
import InputField from "@/components/molecules/inputField";
import CardLayout from "@/components/templates/cardLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Route } from "@/lib/route";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { ProjectType } from "@/types/api-types";
import { mutateApiData } from "@/utiles/services/mutations";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";

type Props = {
  onClick: (val: boolean) => void;
};

export default function CreateNewMapping({ onClick }: Props) {
  const company = useCompanyStore((state) => state.company);
  const campains = useCampaignStore((state) => state.campaigns);
  const [mappingData, setMappingData] = useState<Partial<ProjectType>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [discardModel, setDiscardModel] = useState<boolean>(false);
  let mappingProjects: Partial<ProjectType>[] =
    LOCAL_STORAGE.get("mappingProjects") || "[]";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let data: Partial<ProjectType> = {
      ...mappingData,
      [e.target.name]: e.target.value,
    };
    setMappingData(data);
  };

  // Create a new mapping
  async function createNewMapping(e: any) {
    e.preventDefault();
    setIsLoading((prev) => !prev);
    let data: Partial<ProjectType>[] = [
      ...mappingProjects,
      {
        id: (Math.random() * 10).toString(),
        title: mappingData?.title,
        description: mappingData?.description,
        city: mappingData?.city,
        created_at: "10/05/2024",
        updated_at: "11/05/2024",
      },
    ];
    LOCAL_STORAGE.save("mappingProjects", data);
    setDiscardModel(false);
    // mappingProjects.push(data);

    await mutateApiData(Route.projects, {
      title: mappingData?.title,
      city: mappingData?.city,
      description: mappingData?.description,
      company_id: company?.id,
      campaign_id: campains[0]?.id,
      status: "DRAFT",
      type: "MAPPING",
    })
      .then((res) => {
        if (res.status.toString().startsWith("2")) {
          setIsLoading((prev) => !prev);
          setDiscardModel(false);
          LOCAL_STORAGE.save("project", res.data);
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
          autoClose: 3000
        })
        setIsLoading((prev) => !prev);
      });
    
  }

  return (
    <CardLayout heading={`Create a New mapping project`}>
      <form
        onSubmit={createNewMapping}
        className="w-full flex flex-col px-4 py-2"
      >
        <InputField
          label={"Title of poject"}
          inputName={"title"}
          type={"text"}
          value={mappingData?.title as string}
          onChange={(e) => handleChange(e)}
        />
        <InputField
          label={"Village"}
          inputName={"city"}
          type={"text"}
          value={mappingData?.city as string}
          onChange={(e) => handleChange(e)}
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <Textarea
            placeholder="Enter Description"
            value={mappingData?.description}
            name="description"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex justify-end py-2 gap-4">
          <Button
            className="bg-[#e7e9ee] font-semibold text-black hover:bg-[#e7e9ee] hover:shadow active:transition-y-1"
            onClick={(e: any) => {
              e.preventDefault;
              onClick(discardModel);
            }}
          >
            CANCEL
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
  );
}
