"use client";

import { ButtonUI } from "@/components/atoms/disign-system/button-ui";
import FilePreview from "@/components/atoms/file-preview";
import { Spinner } from "@/components/atoms/spinner/spinner";
import { FilePreview } from "@/components/molecules/filePreview";
import CustomHoverCard from "@/components/organisms/hoverCard";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { Button } from "@/components/ui/button";
import { Route } from "@/lib/route";
import { ActivityProps } from "@/types/activity";
import { fetchApiData } from "@/utiles/services/queries";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { Archive, Delete, MoveLeft, UserPlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import { use, useEffect, useState } from "react"
=======
import { useEffect, useState } from "react";
import { PiPrinterFill } from "react-icons/pi";
>>>>>>> 1d85753eb369f1d09bfe69097a6cb558b15dacae

type TProps = Promise<{id: string}>;

export default function EnvironmentDetails(props: {params: TProps}) {
  const params = use(props.params)
  const id = params.id
  const [currentActivity, setCurrentActivity] = useState<ActivityProps>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(prev => !prev)
      const activities = await fetchApiData(Route.environmentRequest + `/${id}`, "")

      if (activities.status === 200) {
        console.log("enviro activity => ", activities);
        setIsLoading(prev => !prev);
        setCurrentActivity(activities.data);
      }
    };
    fetchData();
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const thereIsAllURLExceptSeconde = (
    first: string[] | undefined,
    second: string[] | undefined,
    third: string[] | undefined
  ) => {
    if (first && typeof second === "undefined" && third) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <LayoutDashboardTemplate title="Environement - Détails de l'activité N°{id}">
      <div className="flex justify-between pb-4 pt-2 px-6 w-3/4">
        <ButtonUI
          className="mx-10 p-0 bg-transparent hover:bg-transparent text-gray-950 hover:text-gray-500"
          icon={{ icon: MoveLeft }}
          size="very-small"
          baseURL={Route.environment}
        />
        <div className="flex items-center gap-4 text-gray-500">
          <CustomHoverCard content="archive project">
            <Archive className="hover:cursor-not-allowed" />
          </CustomHoverCard>
          <CustomHoverCard content="Share project">
            <UserPlus className="hover:cursor-not-allowed" />
          </CustomHoverCard>
          <CustomHoverCard content="Delete Project">
            <Delete className={isLoading ? 'hover:cursor-not-allowed' : ""} />
          </CustomHoverCard>
        </div>
      </div>

      <div className="flex items-center w-full gap-5 px-2">
        <div className="bg-slate-50 w-full mt-3">
          {isLoading ? (
            <div className="flex justify-center text-center w-full">
              <Spinner color="#999" size="large" />
            </div>
          ) : currentActivity ? (
            <div className="pb-6">
              <h2 className="text-2xl font-medium text-gray-800 mb-4 p-6 text-center">
                Activité d'environement :{" "}
                <span className="font-bold">
                  {currentActivity.activity_title}
                </span>
              </h2>
              <div className="flex flex-col gap-10 h-[calc(100vh-300px)] overflow-y-auto">
                <div className="flex flex-col justify-center items-center gap-5 px-6">
                  {currentActivity.pv_url && (
                    <div className="flex flex-col items-center gap-3">
                      <h1 className="font-semibold">Les PV</h1>
                      <div className="flex justify-center gap-10">
                        {currentActivity.pv_url.map((url) => (
                          <FilePreview key={url} url={url} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {currentActivity.pv_url && currentActivity.pictures_url && (
                  <hr />
                )}

                {thereIsAllURLExceptSeconde(
                  currentActivity.pv_url,
                  currentActivity.pictures_url,
                  currentActivity.documents_url
                ) && <hr />}

                <div className="flex flex-col justify-center items-center gap-5 px-6">
                  {currentActivity.pictures_url && (
                    <div className="flex flex-col items-center gap-3">
                      <h1 className="font-semibold">Les IMAGES</h1>
                      <div className="flex justify-center gap-10">
                        {currentActivity.pictures_url.map((url) => (
                          <FilePreview key={url} url={url} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {currentActivity.pv_url && currentActivity.documents_url && (
                  <hr />
                )}

                <div className="flex flex-col justify-center items-center gap-5 px-6">
                  {currentActivity.documents_url && (
                    <div className="flex flex-col items-center gap-3">
                      <h1 className="font-semibold">Les autres DOCUMENTS</h1>
                      <div className="flex justify-center gap-10">
                        {currentActivity.documents_url.map((url) => (
                          <FilePreview key={url} url={url} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                  <div className="relative bg-white rounded-lg p-4 w-4/5 h-4/5">
                    <button
                      onClick={togglePopup}
                      className="absolute top-4 right-4 text-xl text-gray-600"
                    >
                      &times;
                    </button>
                    <img
                      src="/svg/market-preview.svg"
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center mt-28">
              <Image
                src="/svg/empty.svg"
                height={250}
                width={350}
                alt="Empty illustration"
                className="animate-empty-image"
              />
            </div>
          )}
        </div>

      </div>
    </LayoutDashboardTemplate>
  );
}
<<<<<<< HEAD

=======
>>>>>>> 1d85753eb369f1d09bfe69097a6cb558b15dacae
