"use client";

import { ButtonUI } from "@/components/atoms/disign-system/button-ui";
import { useToggle } from "@/hooks/use-toggle";
import { CreateBucketToS3, UpdateFilesToS3 } from "@/lib/s3";
import { useState } from "react";
import { toast } from "react-toastify";

export const CreateBucket = () => {
  const { value: isLoading, setValue: setIsLoading } = useToggle();

  const [bucketName, setBucketName] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!bucketName) {
      console.error("Nom du bucket manquant");
      setIsLoading(false);
      return;
    }

    const { data, error } = await CreateBucketToS3({ bucketName });

    if (error) {
      setIsLoading(false);
      toast.error(`Error during creation bucket ${bucketName}`);
      return;
    }

    console.log(data);
    setIsLoading(false);
    toast.success(`The bucket ${bucketName} has been created successfull`);
    return;
  };

  return (
    <div className="border-2 border-gray-100 flex justify-between">
      <input
        type="text"
        placeholder="Nom du bucket"
        value={bucketName}
        onChange={(e) => setBucketName(e.target.value)}
        className="px-2 w-full"
      />
      <ButtonUI
        action={handleSubmit}
        className="bg-black text-white font-bold p-2"
        isLoading={isLoading}
      >
        Créer le bucket
      </ButtonUI>
    </div>
  );
};

// *******************************************************************

export const UploadFile = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [bucketName, setBucketName] = useState("");
  const [directory, setDirectory] = useState("");
  const { value: isLoading, setValue: setIsLoading } = useToggle();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFiles(Array.from(event.target.files)); // Convertir FileList en tableau
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setDirectory("inspection/interne");
    const { data, error } = await UpdateFilesToS3({ files, directory });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    console.log(data);
    setIsLoading(false);
    return;
  };

  return (
    <div className="flex flex-col gap-5 w-1/2">
      <input
        type="text"
        placeholder="Nom d'un bucket existant"
        value={bucketName}
        onChange={(e) => setBucketName(e.target.value)}
        className="border-2 border-gray-100 p-2"
      />
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="border-2 border-gray-100 p-2"
      />
      <ButtonUI
        action={handleSubmit}
        className="bg-black text-white font-bold p-2"
        isLoading={isLoading}
      >
        Uploader
      </ButtonUI>
    </div>
  );
};

// *******************************************************************

export const DisplayFile = ({ url }: { url: string }) => {
  return (
    <div>
      <a href={url} download>
        Télécharger le fichier
      </a>
    </div>
  );
};
