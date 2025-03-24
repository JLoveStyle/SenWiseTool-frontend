"use client";

import { ProofOfPaiementFormProps } from "@/types/income-and-shared-responsability";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

interface Props {
  updatedFormData: (data: ProofOfPaiementFormProps) => void;
  initData?: ProofOfPaiementFormProps;
  errors: { [key: string]: any };
  isLoading: boolean;
}

export const NewProofOfPaiementForm = ({
  updatedFormData,
  initData,
}: Props) => {
  const [formData, setFormData] = useState<ProofOfPaiementFormProps>({
    agreement_pv: initData ? initData.agreement_pv : [],
    proof_of_paiement: initData ? initData.proof_of_paiement : [],
    proof_of_expenses: initData ? initData.proof_of_expenses : [],
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        [name as keyof ProofOfPaiementFormProps]: [
          ...(prev[name as keyof ProofOfPaiementFormProps] as File[]),
          ...fileArray,
        ],
      }));
    }
  };

  const removeFile = (name: keyof ProofOfPaiementFormProps, index: number) => {
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
        {(
          ["agreement_pv", "proof_of_paiement", "proof_of_expenses"] as Array<
            keyof ProofOfPaiementFormProps
          >
        ).map((fileType, index) => (
          <div key={index}>
            <div className="flex flex-col items-start gap-2">
              <label
                htmlFor={fileType}
                className="text-sm font-medium text-gray-600"
              >
                {fileType === "agreement_pv"
                  ? "PV d’entente"
                  : fileType === "proof_of_paiement"
                  ? "preuves de paiement"
                  : "Justificatifs de dépenses"}
              </label>
              <input
                type="file"
                multiple
                id={fileType}
                name={fileType}
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
// import { ProofOfPaiementFormProps } from "@/types/activity";
// import { useEffect, useState } from "react";

// interface Props {
//   updatedFormData: (data: ProofOfPaiementFormProps) => void;
//   initData?: ProofOfPaiementFormProps;
//   errors: { [key: string]: any };
//   isLoading: boolean;
// }

// export const NewActivityForm = ({
//   updatedFormData,
//   initData,
//   errors,
//   isLoading,
// }: Props) => {
//   const [formData, setFormData] = useState<ProofOfPaiementFormProps>({
//     activity_title: initData ? initData.activity_title : "",
//     proof_of_paiement: initData ? initData.proof_of_paiement : [],
//     proof_of_expenses: initData ? initData.proof_of_expenses : [],
//     agreement_pv: initData ? initData.agreement_pv : [],
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
//           id="agreement_pv"
//           name="agreement_pv"
//           accept=".pdf"
//           onChange={handleFileChange}
//           className="border-2 border-gray-100 p-2"
//         />

//         <input
//           type="file"
//           multiple
//           id="proof_of_paiement"
//           name="proof_of_paiement"
//           accept=".jpg,.jpeg,.png"
//           onChange={handleFileChange}
//           className="border-2 border-gray-100 p-2"
//         />

//         <input
//           type="file"
//           multiple
//           id="proof_of_expenses"
//           name="proof_of_expenses"
//           accept=".jpg,.jpeg,.png,.pdf"
//           onChange={handleFileChange}
//           className="border-2 border-gray-100 p-2"
//         />
//       </div>
//     </div>
//   );
// };
