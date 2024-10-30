"use client";

import { InputUI } from "@/components/atoms/disign-system/form/input-ui";
import { ActivityFormProps } from "@/types/activity";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

interface Props {
  updatedFormData: (data: ActivityFormProps) => void;
  initData?: ActivityFormProps;
  errors: { [key: string]: any };
  isLoading: boolean;
}

export const NewActivityForm = ({
  updatedFormData,
  initData,
  errors,
  isLoading,
}: Props) => {
  const [formData, setFormData] = useState<ActivityFormProps>({
    activity_title: initData ? initData.activity_title : "",
    pictures_url: initData ? initData.pictures_url : [],
    documents_url: initData ? initData.documents_url : [],
    pv_url: initData ? initData.pv_url : [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        [name as keyof ActivityFormProps]: [
          ...(prev[name as keyof ActivityFormProps] as File[]),
          ...fileArray,
        ],
      }));
    }
  };

  // const handleFileChange = (field: keyof ActivityFormProps) => (files: File[]) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [field]: files.map((file) => URL.createObjectURL(file)), // Convert to URLs for preview
  //   }));
  // };

  const removeFile = (name: keyof ActivityFormProps, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: (prev[name] as File[]).filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    updatedFormData(formData);
  }, [formData, updatedFormData]);

  return (
    <div className="flex flex-col gap-5">
      <div className="items-center gap-4">
        <InputUI
          label="Titre de l'activité"
          id="activity_title"
          placeholder="Entrer le titre de l'activité"
          isLoading={isLoading}
          errors={errors}
          required
          value={formData.activity_title}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {(
          ["pv_url", "pictures_url", "documents_url"] as Array<
            keyof ActivityFormProps
          >
        ).map((fileType, index) => (
          <div key={index}>
            <div className="flex flex-col items-start gap-2">
              <label
                htmlFor={fileType}
                className="text-sm font-medium text-gray-600"
              >
                {fileType === "pv_url"
                  ? "PV (PDF)"
                  : fileType === "pictures_url"
                  ? "Images (JPG, PNG)"
                  : "Documents (PDF, Images)"}
              </label>
              <input
                type="file"
                multiple
                id={fileType}
                name={fileType}
                accept={
                  fileType === "pv_url"
                    ? ".pdf"
                    : fileType === "pictures_url"
                    ? ".jpg,.jpeg,.png"
                    : ".jpg,.jpeg,.png,.pdf"
                }
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor={fileType}
                className="cursor-pointer border-2 border-dashed border-gray-300 p-4 rounded-lg w-full text-center text-gray-500 hover:bg-gray-50"
              >
                Cliquez pour ajouter des fichiers
              </label>

              <div className="flex flex-wrap gap-2 mt-2">
                {(formData[fileType] as File[]).map((file, fileIndex) => (
                  <div
                    key={fileIndex}
                    className="relative w-20 h-20 border rounded-md overflow-hidden shadow-md bg-gray-100"
                  >
                    {file.type.startsWith("image") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-sm text-gray-600 bg-gray-200">
                        PDF
                      </div>
                    )}
                    <button
                      onClick={() => removeFile(fileType, fileIndex)}
                      className="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1 text-xs"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// "use client";

// import { InputUI } from "@/components/atoms/disign-system/form/input-ui";
// import { ActivityFormProps } from "@/types/activity";
// import { useEffect, useState } from "react";

// interface Props {
//   updatedFormData: (data: ActivityFormProps) => void;
//   initData?: ActivityFormProps;
//   errors: { [key: string]: any };
//   isLoading: boolean;
// }

// export const NewActivityForm = ({
//   updatedFormData,
//   initData,
//   errors,
//   isLoading,
// }: Props) => {
//   const [formData, setFormData] = useState<ActivityFormProps>({
//     activity_title: initData ? initData.activity_title : "",
//     pictures_url: initData ? initData.pictures_url : [],
//     documents_url: initData ? initData.documents_url : [],
//     pv_url: initData ? initData.pv_url : [],
//   });
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     let { name, value } = e.target;
//     console.log(value);
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = event.target;
//     if (files && files.length > 0) {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: Array.from(files), // Utilise le `name` pour définir le bon champ
//       }));
//     }
//   };

//   // Mettre à jour le parent chaque fois que formData change
//   useEffect(() => {
//     updatedFormData(formData);
//   }, [formData, updatedFormData]);

//   return (
//     <div className="flex flex-col gap-5">
//       <div className="grid grid-cols-2 items-center gap-4">
//         <InputUI
//           label="Titre de l'activité"
//           id="activity_title"
//           placeholder="entrer le titre de l'activité"
//           isLoading={isLoading}
//           errors={errors}
//           required
//           value={formData.activity_title}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="grid grid-cols-2 items-center gap-4">
//         <input
//           type="file"
//           multiple
//           id="pv_url"
//           name="pv_url"
//           accept=".pdf"
//           onChange={handleFileChange}
//           className="border-2 border-gray-100 p-2"
//         />

//         <input
//           type="file"
//           multiple
//           id="pictures_url"
//           name="pictures_url"
//           accept=".jpg,.jpeg,.png"
//           onChange={handleFileChange}
//           className="border-2 border-gray-100 p-2"
//         />

//         <input
//           type="file"
//           multiple
//           id="documents_url"
//           name="documents_url"
//           accept=".jpg,.jpeg,.png,.pdf"
//           onChange={handleFileChange}
//           className="border-2 border-gray-100 p-2"
//         />
//       </div>
//     </div>
//   );
// };
