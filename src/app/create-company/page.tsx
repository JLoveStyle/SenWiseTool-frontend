"use client";
import CancelModal from "@/components/molecules/cancelModal";
import CheckBox from "@/components/molecules/checkButton";
import InputField from "@/components/molecules/inputField";
import CustomSelectTag from "@/components/molecules/select";
import { Button } from "@/components/ui/button";
import { FormData } from "@/types/formData";
import { useAuth, useUser } from "@clerk/nextjs";
import { City, Country, State } from "country-state-city";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { createCompany } from "@/utiles/services/queries";
import { Spinner } from "@/components/atoms/spinner/spinner";
import { Session } from "@/components/templates/session";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Route } from "@/lib/route";
import { CreateBucketToS3, UpdateFilesToS3 } from "@/lib/s3";
import { NOT_HAS_COMPANY } from "@/lib/session-statut";
import { businessActivity } from "@/utiles/services/constants";
import { createOrganization } from "@/utiles/services/createOrg";
import { mutateApiData } from "@/utiles/services/mutations";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { uniqueString } from "@/utils/tool";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Bounce, toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const { getToken } = useAuth();
  const countries: any[] = Country.getAllCountries();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [hasAgree, setHasAgree] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [state, setState] = useState<any[]>([]);
  const [city, setCity] = useState<object[]>([]);
  const [hasOtherBusiness, setHasOtherBusiness] = useState<boolean>(false);
  const [companyLogo, setCompanyLogo] = useState<File[]>([]);
  const [selectedCountryObject, setSelectedCountryObject] = useState<{
    [key: string]: string;
  }>({});
  const [bucketName, setBucketName] = useState<string>("")
  const [formData, setFormData] = useState<FormData>({
    companyEmail: "",
    companyName: "",
    headOfficeEmail: "",
    country: "",
    hasAgree: false,
    state: "",
    city: "",
    businessActivity: "",
    otherBusiness: "",
    logo: "",
    phone: "",
    address: "",
    description: "",
  });

  const { user } = useUser();

  useEffect(() => {
    const bucketName = uniqueString()
    LOCAL_STORAGE.save("bucketName", bucketName)
    setBucketName(prev => prev = bucketName);

    // check if there is a company already created
    const hasCompany = JSON.parse(localStorage.getItem("company") || "{}");

    if (hasCompany?.id) {
      router.push(Route.dashboard);
    }
  }, []);

  const createCompanyStorage = async () => {
    // create bucket company S3 bucket
    const { data, error } = await CreateBucketToS3({
      bucketName,
    });

    if (error) {
      toast.error("Erreur lors de la creation du bucket");
      setIsLoading(false);
      throw new Error("Erreur lors de la creation du bucket");
    }

    //upload company logo
    if (companyLogo && companyLogo.length !== 0) {
      const { data, error } = await UpdateFilesToS3({ files: companyLogo });

      if (error) {
        toast.error("Erreur lors de l'upload du logo");
        setIsLoading(false);
        throw new Error("Error lors de l'upload du logo");
      }
      return data.URLs[0] as string;
    }
  };

  // REGISTER COMPANY
  async function handleSubmit(e: any) {
    e.preventDefault();
    setHasAgree(false);
    let activity;
    if (formData.businessActivity === "Other") {
      activity = formData.otherBusiness;
    } else activity = formData.businessActivity;

    // if has not agree to terms and conditions returns
    if (!isChecked) {
      setHasAgree((prev) => !prev);
      return;
    }

    // Head office email and company email must not be the same
    if (formData.headOfficeEmail === formData.companyEmail) {
      toast.warning("L'email du sierge social doit être different de l'email de la company", {
        autoClose: 4000,
      });
      return;
    }

    setIsLoading((prev) => !prev);

    const [URLCompanyLogo] = await Promise.all([createCompanyStorage()]);

    if (user?.id) {
      await createOrganization(formData, user.id);
      await mutateApiData(Route.companies, {
        email: formData.companyEmail,
        name: formData.companyName,
        head_office_email: formData.headOfficeEmail,
        country: formData.country,
        region: formData.state,
        city: formData.city,
        sector_of_activity: activity,
        logo: URLCompanyLogo,
        phone_number: formData.phone,
        address: formData.address,
        description: formData.description,
        company_bucket: bucketName
      })
        .then((response) => {
          if (response.status === 201) {
            toast.success(`Success!`, {
              transition: Bounce,
              autoClose: 3000,
            });
            router.push(Route.dashboard);
            return;
          } else if (response.status === 409) {
            return toast.error("Companie exists déjà");
          } else if (response.statusCode === 401) {
            return toast.error("Une erreur est survenu veillez recharger la page");
          } else if (!response.status.toString().startWith("2")) {
            return toast.error(`Une erreur est survenu au serveur`);
          }
          if (response.status === 201) {
            toast.success(`Success!`, {
              transition: Bounce,
              autoClose: 3000,
            });
            router.push(Route.dashboard);
            return;
          }
        })
        .catch((error) => {
          toast.error("Une erreur est survenu au serveur. Veillez réessayer", {
            transition: Bounce,
            autoClose: 3000,
          });
        })
        .finally(() => {
          setIsLoading((prev) => !prev);
        });
    }
  }

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const data: FormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(data);
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
    if (data.businessActivity === "Other") {
      setHasOtherBusiness(true);
    }
  };

  const handleOnCheck = () => {
    setIsChecked((prev) => !prev);
    setHasAgree(false);
  };

  useEffect(() => {
    setState(State.getStatesOfCountry(selectedCountryObject?.isoCode));
  }, [formData.country]);

  const handleCloseModal = (value: boolean) => {
    setIsModalOpen(value);
  };

  const fetchToken = async () => {
    const token = await getToken();
    LOCAL_STORAGE.save("token", token);
  };

  useEffect(() => {
    fetchToken();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setCompanyLogo(Array.from(event.target.files)); // Convertir FileList en tableau
    }
  };

  return (
    <Session
      // sessionStatus={NOT_HAS_COMPANY}
    >
      <div className="h-full">
        <div className=" sm:w-[550px] p-6 flex justify-center flex-col rounded-[12px] shadow-xl my-20 border mx-auto">
          <div className="flex justify-center ">
            <Link href={Route.home}>
              <Image
                src="/images/logo.png"
                height={150}
                width={150}
                alt="SenWiseTool logo"
                loading="lazy"
              />
            </Link>
          </div>
          <h3 className="font-semibold text-2xl text-center pb-7">
            Bienvenu sur Senwisetool
            <br />
            Enregistrer votre entreprise
          </h3>
          <form className="" onSubmit={handleSubmit}>
            <InputField
              label="Nom de l'entreprise"
              inputName="companyName"
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange(e)}
            />
            <InputField
              label="Email de l'entreprise"
              inputName="companyEmail"
              placeholder="Exemple@gmail.com"
              type="email"
              value={formData?.companyEmail}
              onChange={(e) => handleInputChange(e)}
            />
            <InputField
              label="Siege social"
              inputName="headOfficeEmail"
              type="email"
              placeholder="Exemple@gamil.com"
              value={formData.headOfficeEmail}
              onChange={(e) => handleInputChange(e)}
            />
            <InputField
              label="Address"
              inputName="address"
              type="text"
              placeholder="Yaounde, Cameroon"
              value={formData.address}
              onChange={(e) => handleInputChange(e)}
            />
            <InputField
              label="Numero de telephone de l'entreprise"
              inputName="phone"
              placeholder="(+237) 6 00 00 00 00"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange(e)}
            />

            <CustomSelectTag
              selectName="country"
              onChange={(e) => handleInputChange(e)}
              label="Pays"
              arrayOfItems={countries}
              value={formData.country}
            />
            <CustomSelectTag
              selectName="state"
              onChange={(e) => handleInputChange(e)}
              label="Region"
              arrayOfItems={state}
              value={formData.state}
            />
            <CustomSelectTag
              selectName="city"
              onChange={(e) => handleInputChange(e)}
              label="Ville"
              arrayOfItems={city}
              value={formData.city}
            />
            <label className="font-semibold" htmlFor="activity">
              Business activity
              <span className="text-red-500">*</span>
            </label>
            <select
              id="activity"
              value={formData.businessActivity}
              name="businessActivity"
              required
              onChange={(event) => handleInputChange(event)}
              className="border flex flex-col mt-1 mb-7 p-1 w-[95%] md:w-full bg-transparent outline-none focus:border-primary shadow-sm rounded-md"
            >
              <option selected>-- Select --</option>
              {businessActivity?.map((item: any, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {hasOtherBusiness && (
              <input
                type="text"
                required
                value={formData.otherBusiness}
                name="otherBusiness"
                placeholder="Autre secteur d'activité"
                onChange={(e) => handleInputChange(e)}
                className="border mt-1 mb-7 p-1 w-[95%] md:w-[500px] bg-transparent outline-none focus:border-primary shadow-sm rounded-md"
              />
            )}
            <div className="pb-6 flex flex-col">
              <label htmlFor="logo" className="font-semibold">
                Entrer le logo
              </label>
              <input
                type="file"
                accept=".png, .jpeg, .jpg"
                placeholder="logo de l'entreprise"
                onChange={(e) => handleFileChange(e)}
              />
            </div>
            <label className="font-semibold" htmlFor="description">
              Description<span className="text-red-500">*</span>
            </label>
            <Textarea
              className="w-full p-2 mb-3"
              value={formData.description}
              name="description"
              onChange={(e) => handleInputChange(e)}
            />
            <CheckBox onChange={() => handleOnCheck()} />
            {hasAgree && (
              <span className="text-red-500">
                Accepter les condition d'utilisation
              </span>
            )}

            <div className="flex flex-col gap-3 pt-3 ">
              <Button
                className={
                  isLoading ? "hover:cursor-not-allowed opacity-70" : ""
                }
                type="submit"
              >
                {isLoading ? <Spinner /> : "Continuer"}
              </Button>
            </div>
          </form>
        </div>
        <Dialog
          onOpenChange={() => setIsModalOpen((prev) => !prev)}
          open={isModalOpen}
        >
          <DialogContent>
            <VisuallyHidden.Root>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
            </VisuallyHidden.Root>
            <CancelModal onClose={handleCloseModal} />
          </DialogContent>
        </Dialog>
      </div>
    </Session>
  );
}