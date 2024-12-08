"use client";

import FormLayout from "@/components/atoms/dashboard/forms/form-layout";
import { DisplayDocuments } from "@/components/atoms/display-documents";
import { Spinner } from "@/components/atoms/spinner/spinner";
import { AttendanceSheetForm } from "@/components/atoms/training/attendance-sheet-form";
import { DeleteTraining } from "@/components/atoms/training/delete-training";
import { UpdateTraining } from "@/components/atoms/training/update-training";
import CustomHoverCard from "@/components/organisms/hoverCard";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { Button } from "@/components/ui/button";
import { Route } from "@/lib/route";
import { TrainingType } from "@/types/api-types";
import { TrainingProps } from "@/types/formData";
import { fetchApiData } from "@/utiles/services/queries";
import { db_get_trainings } from "@/utiles/services/training";
// import dayjs from "dayjs";
import { MoveLeft, MoveRight, PenLine, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { PiFilesFill, PiPrinterFill } from "react-icons/pi";
import { toast } from "react-toastify";
interface Props {
  displayForm: boolean;
}

type TProps = Promise<{ id: string }>;

export default function TrainingDetails(props: { params: TProps }) {
  const params = use(props.params);
  const id = params.id;
  // const { id } = useParams();

  // const { value: displayForm, toggle: toggleForm } = useToggle();
  const [currentTrainingData, setCurrentTrainingData] =
    useState<TrainingProps>();
  const [dbCurrentTrainingData, setDbCurrentTrainingData] =
    useState<TrainingType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayComponent, setDisplayComponent] = useState<
    | "trainingDetails"
    | "attendanceSheet"
    | "attendanceSheetData"
    | "pictures"
    | "proofOfCompetency"
    | "report"
  >("trainingDetails");

  const [isModalClose, setIsModalClose] = useState<boolean>(false);

  async function fetchTraining() {
    setIsLoading((prev) => !prev);
    await fetchApiData(Route.training, id)
      .then((response) => {
        if (response.status > 205) {
          toast.error("Could not fetch tranings. Please refresh");
          setIsLoading((prev) => !prev);
          return;
        }
        console.log("this are training =>", response);
        setDbCurrentTrainingData(response.data as TrainingType);

        setCurrentTrainingData({
          id: response.data.id,
          title: response.data.title,
          start_date: response.data.start_date,
          end_date: response.data.end_date,
          location: response.data.location,
          modules: response.data.modules.map(
            (module: string, index: number) => ({
              id: index,
              value: module,
            })
          ),
        });
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Something sent wrong please try again");
        console.log(error);
      });
  }

  const formParams = {
    trigger_btn_label_form: "Edit Form",
    construct_form_btn_label: "Construct a form",
    existing_form_btn_label: "Use a pre-defined model",
    new_form_title: "Edit a TRAINING project",
    construct_form_btn_icon: PenLine,
  };

  const closeModal = (value: boolean) => {
    console.log("from mapping page", value);
    setIsModalClose((prev) => (prev = value));
  };

  useEffect(() => {
    fetchTraining();
    const fetchData = async () => {
      // const result = await LOCAL_STORAGE.get("trainings");

      // const training = result.find(
      //   (training: LocalTrainingProps) => training.id == id
      // );
      const training = (await db_get_trainings(id!)) as TrainingType;
      // setDbCurrentTrainingData(training);

      if (training) {
        setCurrentTrainingData({
          id: training.id,
          title: training.title,
          start_date: training.start_date,
          end_date: training.end_date,
          location: training.location,
          modules: training.modules.map((module: string, index: number) => ({
            id: index,
            value: module,
          })),
        });
        setIsLoading(false);
      }
    };

    // fetchData();
  }, []);

  useEffect(() => {}, [currentTrainingData]);

  return (
    <LayoutDashboardTemplate
      title="Traning details"
      isCloseModal={isModalClose}
    >
      <div className="flex justify-between items-center pb-4 pt-2 px-6 w-3/4">
        <h1 className="text-xl font-semibold">
          <Link
            className="flex gap-1 items-center underline hover:font-medium"
            href={Route.trainingProject}
          >
            <MoveLeft />
            Back
          </Link>
        </h1>
        <div className="flex items-center gap-4 text-gray-500">
          <CustomHoverCard content="Delete Project">
            {/* {isLoading && <Spinner size="very-small" color="#999" />} */}
            {!isLoading && currentTrainingData !== undefined && (
              <DeleteTraining
                trainingId={id}
                training={currentTrainingData}
                header={<Trash2 className="hover:cursor-pointer" />}
              />
            )}
          </CustomHoverCard>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex gap-5">
          <div className="w-3/4 max-h-[480px] overflow-y-auto scrool-bar-hidden relative">
            {displayComponent === "trainingDetails" && (
              <>
                {currentTrainingData ? (
                  <div className="bg-gray-50 p-5 shadow-md flex items-center text-center flex-col gap-8">
                    <span className="text-xl text-gray-700">
                      {currentTrainingData.title}
                    </span>
                    <div className="flex flex-col items-center gap-2">
                      <div className="font-medium text-xs">
                        Information sur la date de formation
                      </div>
                      <div className="flex gap-5">
                        <div>
                          <span className="text-gray-700">Du </span>
                          <span className="text-gray-400">
                            {currentTrainingData.start_date}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-700">Au </span>
                          <span className="text-gray-400">
                            {currentTrainingData.end_date}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-700">À</span>
                        <span className="text-gray-400">
                          {currentTrainingData.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="font-medium text-xs">
                        Les modules de la formation à dispenser
                      </div>
                      <div className="space-y-1">
                        {currentTrainingData.modules.map((module, index) => (
                          <div key={index} className="flex gap-1 items-center">
                            <MoveRight className="text-gray-600" />
                            <span className="text-gray-500">
                              {module.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center mt-28">
                    <Image
                      src="/svg/empty.svg"
                      height={250}
                      width={350}
                      alt="Empty illustation"
                      className="animate-empty-image"
                    />
                  </div>
                )}
              </>
            )}

            {/* display an attendance sheet template */}
            {displayComponent === "attendanceSheet" && (
              <div>
                {currentTrainingData ? (
                  <AttendanceSheetForm row={12} data={currentTrainingData} />
                ) : (
                  <div className="flex items-center justify-center mt-28">
                    <Image
                      src="/svg/empty.svg"
                      height={250}
                      width={350}
                      alt="Empty illustation"
                      className="animate-empty-image"
                    />
                  </div>
                )}
              </div>
            )}

            {/* display attendances sheet datas */}
            {displayComponent === "attendanceSheetData" && (
              <DisplayDocuments
                documents={
                  dbCurrentTrainingData?.training_attendance_sheet_url ?? []
                }
                // documents={url_test}
              />
            )}

            {/* display pictures of the current training */}
            {displayComponent === "pictures" && (
              <DisplayDocuments
                documents={dbCurrentTrainingData?.training_picture_url ?? []}
              />
            )}

            {/* display proof of compatences of trainer */}
            {displayComponent === "proofOfCompetency" && (
              <DisplayDocuments
                documents={
                  dbCurrentTrainingData?.trainer_proof_of_competency ?? []
                }
              />
            )}

            {/* display report url */}
            {displayComponent === "report" && (
              <DisplayDocuments
                documents={
                  Array.isArray(dbCurrentTrainingData?.report_url)
                    ? dbCurrentTrainingData.report_url
                    : dbCurrentTrainingData?.report_url
                    ? [dbCurrentTrainingData.report_url]
                    : []
                }
              />
            )}

            {displayComponent !== "trainingDetails" && (
              <Button
                size="sm"
                className="absolute z-50 top-1 right-5 text-gray-700 bg-transparent hover:bg-transparent hover:text-red-500 font-medium"
                onClick={() => setDisplayComponent("trainingDetails")}
              >
                <IoClose size={25} className="fixed" />
              </Button>
            )}
          </div>

          <div className="bg-slate-100 w-1/4 relative">
            <div className="flex justify-between items-center p-3">
              <div className="font-bold text-xl">Metadata</div>

              <CustomHoverCard content="Edit Project">
                {!isLoading && currentTrainingData !== undefined && (
                  <FormLayout
                    isCloseModal={isModalClose}
                    forms={[
                      {
                        title: "Edit training project",
                        form: (
                          <UpdateTraining
                            trainingId={id}
                            currentTaining={currentTrainingData}
                            header={
                              <PenLine className="hover:cursor-pointer" />
                            }
                          />
                        ),
                      },
                    ]}
                    formParams={formParams}
                  />
                )}
              </CustomHoverCard>
            </div>
            <hr />
            <div className="p-3 text-xs flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <span>Status</span>
                <span className="text-blue-500 font-medium">
                  {dbCurrentTrainingData?.status}
                </span>
              </div>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setDisplayComponent("attendanceSheetData")}
              >
                <span>Fiches de presences</span>
                <span>
                  {dbCurrentTrainingData?.training_attendance_sheet_url
                    ? dbCurrentTrainingData.training_attendance_sheet_url.length
                    : 0}
                </span>
              </div>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setDisplayComponent("pictures")}
              >
                <span>Image de la formation</span>
                <span>
                  {dbCurrentTrainingData?.training_picture_url
                    ? dbCurrentTrainingData?.training_picture_url.length
                    : 0}
                </span>
              </div>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setDisplayComponent("report")}
              >
                <span>Rapport de la formation</span>
                <span>
                  {dbCurrentTrainingData?.report_url ? (
                    <span className="text-green-500">Available</span>
                  ) : (
                    <span className="text-red-500">Unavailable</span>
                  )}
                </span>
              </div>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setDisplayComponent("proofOfCompetency")}
              >
                <span>Preuve de compétence des formateurs</span>
                <span>
                  {dbCurrentTrainingData?.trainer_proof_of_competency
                    ? dbCurrentTrainingData?.trainer_proof_of_competency.length
                    : 0}
                </span>
              </div>
              <hr className="mt-10" />
              <div className="flex justify-between items-center gap-5 bg-transparent">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex gap-1 items-center"
                  onClick={() => setDisplayComponent("attendanceSheetData")}
                >
                  <PiFilesFill /> Tout voir
                </Button>
                <Button
                  size="sm"
                  className="flex gap-1 items-center bg-black hover:bg-gray-900"
                  onClick={() => setDisplayComponent("attendanceSheet")}
                >
                  <PiPrinterFill /> Imprimer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </LayoutDashboardTemplate>
  );
}
