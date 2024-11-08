"use client";

import { ManagementPlanFormProps } from "@/types/income-and-shared-responsability";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

interface Props {
  updatedFormData: (data: ManagementPlanFormProps) => void;
  initData?: ManagementPlanFormProps;
  errors: { [key: string]: any };
  isLoading: boolean;
}

export const NewActivityForm = ({
  updatedFormData,
  initData,
  errors,
  isLoading,
}: Props) => {
  const [formData, setFormData] = useState<ManagementPlanFormProps>({
    management_plan: initData ? initData.management_plan : [],
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
        [name as keyof ManagementPlanFormProps]: [
          ...(prev[name as keyof ManagementPlanFormProps] as File[]),
          ...fileArray,
        ],
      }));
    }
  };

  // const handleFileChange = (field: keyof ManagementPlanFormProps) => (files: File[]) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [field]: files.map((file) => URL.createObjectURL(file)), // Convert to URLs for preview
  //   }));
  // };

  const removeFile = (name: keyof ManagementPlanFormProps, index: number) => {
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
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <div className="flex flex-col items-start gap-2">
            <label
              htmlFor="management_plan"
              className="text-sm font-medium text-gray-600"
            >
              Plan de gestion de l’investissement de durabilité
            </label>
            <input
              type="file"
              multiple
              id="management_plan"
              name="management_plan"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="management_plan"
              className="cursor-pointer border-2 border-dashed border-gray-300 p-4 rounded-lg w-full text-center text-gray-500 hover:bg-gray-50"
            >
              Cliquez pour ajouter des fichiers
            </label>

            <div className="flex flex-wrap gap-2 mt-2">
              {(formData["management_plan"] as File[]).map(
                (file, fileIndex) => (
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
                      onClick={() => removeFile("management_plan", fileIndex)}
                      className="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1 text-xs"
                    >
                      <FaTimes />
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// "use client";

// import { InputUI } from "@/components/atoms/disign-system/form/input-ui";
// import { ManagementPlanFormProps } from "@/types/activity";
// import { useEffect, useState } from "react";

// interface Props {
//   updatedFormData: (data: ManagementPlanFormProps) => void;
//   initData?: ManagementPlanFormProps;
//   errors: { [key: string]: any };
//   isLoading: boolean;
// }

// export const NewActivityForm = ({
//   updatedFormData,
//   initData,
//   errors,
//   isLoading,
// }: Props) => {
//   const [formData, setFormData] = useState<ManagementPlanFormProps>({
//     activity_title: initData ? initData.activity_title : "",
//     managementPlan: initData ? initData.managementPlan : [],
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
//           id="management_plan"
//           name="management_plan"
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
