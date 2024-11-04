"use client";

import { ButtonUI } from "@/components/atoms/disign-system/button-ui";
import { Spinner } from "@/components/atoms/spinner/spinner";
import CustomHoverCard from "@/components/organisms/hoverCard";
import CardLayout from "@/components/templates/cardLayout";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Route } from "@/lib/route";
import { ActivityProps } from "@/types/activity";
import { ApiDataResponse } from "@/types/api-types";
import { mutateDelApiData } from "@/utiles/services/mutations";
import { fetchApiData } from "@/utiles/services/queries";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { DialogContent } from "@radix-ui/react-dialog";
import { Archive, Delete, MoveLeft, UserPlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaDownload, FaEye } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import { PiPrinterFill } from "react-icons/pi";

type TProps = {
  params: {
    id: string;
  };
};

export default function SocialDetails({ params: { id } }: TProps) {
  const router = useRouter();
  const [currentActivity, setCurrentActivity] = useState<ActivityProps>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading((prev) => !prev);
      const activities = await fetchApiData(Route.socialRequest + `/${id}`, "");
      if (activities.status === 200) {
        console.log("social activity => ", activities);
        setIsLoading(false);
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

  async function handleDelete() {
    await mutateDelApiData<ApiDataResponse<ActivityProps>>(
      Route.socialRequest,
      currentActivity?.id
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <LayoutDashboardTemplate title="Social - Détails de l'activité N°{id}">
      <div className="flex justify-between pb-4 pt-2 px-6 w-3/4">
        <ButtonUI
          className="mx-10 p-0 bg-transparent hover:bg-transparent text-gray-950 hover:text-gray-500"
          icon={{ icon: MoveLeft }}
          size="very-small"
          baseURL={Route.social}
        />
        <div className="flex items-center gap-4 text-gray-500">
          <CustomHoverCard content="archive project">
            <Archive className="hover:cursor-not-allowed" />
          </CustomHoverCard>
          <CustomHoverCard content="Share project">
            <UserPlus className="hover:cursor-not-allowed" />
          </CustomHoverCard>
          <CustomHoverCard content="Delete Project">
            <Delete
              onClick={() => setOpenModal((prev) => !prev)}
              className={
                isLoading ? "hover:cursor-not-allowed" : "hover:cursor-pointer"
              }
            />
          </CustomHoverCard>
        </div>
      </div>
      {/* <Dialog
        open={openModal}
        onOpenChange={() => setOpenModal((prev) => !prev)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog> */}

      <div className="flex items-center w-full gap-5 px-2">
        <div className="bg-slate-50 w-full mt-3">
          {isLoading ? (
            <div className="flex justify-center text-center w-full my-auto">
              <Spinner color="#999" size="large" />
            </div>
          ) : currentActivity ? (
            <div className="pb-6">
              <h2 className="text-2xl font-medium text-gray-800 mb-4 p-6 text-center">
                Activité sociale :{" "}
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

/************************************************************ */

export const FilePreview = ({ url }: { url: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const fileName = url.split("-").pop();

  const togglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };

  return (
    <>
      <div
        className="relative w-48 h-44 shadow-lg rounded-lg overflow-hidden bg-slate-100 transition-transform transform hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {url.endsWith(".jpg") ||
        url.endsWith(".jpeg") ||
        url.endsWith(".png") ? (
          <img
            src={url}
            alt="file preview"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 text-2xl">
            <FaRegFilePdf className="text-red-500" />
            <span className="text-sm mt-2">{fileName}</span>
          </div>
        )}

        {/* Overlay with file name and actions */}
        <div
          className={`absolute inset-0 flex flex-col justify-end items-center bg-black bg-opacity-40 text-white p-2 text-center ${
            isHovered ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          <p className="truncate text-sm">{fileName}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={togglePreview}
              className="bg-white bg-opacity-30 hover:bg-opacity-50 p-1 rounded text-xs flex gap-2 items-center"
            >
              <FaEye /> Preview
            </button>
            <a
              href={url}
              target="_blank"
              download
              className="bg-white bg-opacity-30 hover:bg-opacity-50 p-1 rounded text-xs flex gap-2 items-center"
            >
              <FaDownload /> Download
            </a>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg w-4/5 h-4/5">
            <button
              onClick={togglePreview}
              className="absolute top-2 right-2 text-gray-500 text-xl hover:text-gray-700"
            >
              &times;
            </button>
            {url.endsWith(".jpg") ||
            url.endsWith(".jpeg") ||
            url.endsWith(".png") ? (
              <img
                src={url}
                alt="Preview"
                className="object-contain w-full h-full"
              />
            ) : (
              <embed
                src={url}
                type="application/pdf"
                className="w-full h-full"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
