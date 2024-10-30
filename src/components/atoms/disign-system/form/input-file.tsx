// // components/InputFile.tsx

// import { useState } from "react";
// import { FaTimes } from "react-icons/fa";

// interface InputFileProps {
//   label: string;
//   accept: string;
//   multiple?: boolean;
//   onFilesChange: (files: File[]) => void;
// }

// export const InputFile = ({
//   label,
//   accept,
//   multiple = false,
//   onFilesChange,
// }: InputFileProps) => {
//   const [previewUrls, setPreviewUrls] = useState<string[]>([]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (!files) return;

//     const fileArray = Array.from(files);
//     onFilesChange(fileArray);

//     const urls = fileArray.map((file) => URL.createObjectURL(file));
//     setPreviewUrls(urls);
//   };

//   const removeFile = (index: number) => {
//     const updatedUrls = previewUrls.filter((_, i) => i !== index);
//     setPreviewUrls(updatedUrls);
//     onFilesChange(updatedUrls.map((url) => fileFromUrl(url)));
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       <label className="font-medium text-gray-700">{label}</label>
//       <input
//         type="file"
//         accept={accept}
//         multiple={multiple}
//         onChange={handleFileChange}
//         className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
//       />
//       <div className="mt-2 flex flex-wrap gap-4">
//         {/* {previewUrls.map((url, index) => (
//           <div
//             key={index}
//             className="relative w-32 h-32 border rounded-lg overflow-hidden shadow-lg"
//           >
//             {url.match(/\.(jpg|jpeg|png)$/) ? (
//               <img
//                 src={url}
//                 alt="preview"
//                 className="object-cover w-full h-full"
//               />
//             ) : (
//               <div className="flex items-center justify-center h-full text-gray-500">
//                 <span>{`Document ${index + 1}`}</span>
//               </div>
//             )}
//             <button
//               onClick={() => removeFile(index)}
//               className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
//             >
//               ×
//             </button>
//           </div>
//         ))} */}

//         <div className="flex flex-wrap gap-2 mt-2">
//           {previewUrls
//             .map((url, index) => fileFromUrl(url))
//             .map((file, fileIndex) => (
//               <div
//                 key={fileIndex}
//                 className="relative w-20 h-20 border rounded-md overflow-hidden shadow-md bg-gray-100"
//               >
//                 {file.type.startsWith("image") ? (
//                   <img
//                     src={URL.createObjectURL(file)}
//                     alt="preview"
//                     className="object-cover w-full h-full"
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center h-full text-sm text-gray-600 bg-gray-200">
//                     PDF
//                   </div>
//                 )}
//                 <button
//                   onClick={() => removeFile(fileIndex)}
//                   className="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1 text-xs"
//                 >
//                   <FaTimes />
//                 </button>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Utility function to convert URL back to a File object if needed
// function fileFromUrl(url: string): File {
//   return new File([], url); // Placeholder; adjust if needed to store actual files
// }

interface Props {
  id: string;
  label: string;
  type?: "file" | "image" | "pdf";
  isLoading?: boolean;
  className?: string;
  errors: { [key: string]: any };
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilesChange: (files: File[]) => void;
}

export const inputFile = ({
  id,
  label,
  type = "file",
  isLoading,
  className,
  errors,
  required,
  onChange,
  onFilesChange,
}: Props) => {
  const removeFile = (name: keyof ActivityFormProps, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: (prev[name] as File[]).filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-600">
        {label}
        {type === "pdf"
          ? "(PDF)"
          : id === "image"
          ? "(JPG, PNG)"
          : "(PDF, Images)"}
      </label>
      <input
        type="file"
        multiple
        id={id}
        name={id}
        accept={
          id === "pv_url"
            ? ".pdf"
            : id === "pictures_url"
            ? ".jpg,.jpeg,.png"
            : ".jpg,.jpeg,.png,.pdf"
        }
        onChange={onChange}
        className="hidden"
      />
      <label
        htmlFor={id}
        className="cursor-pointer border-2 border-dashed border-gray-300 p-4 rounded-lg w-full text-center text-gray-500 hover:bg-gray-50"
      >
        Cliquez pour ajouter des fichiers
      </label>

      <div className="flex flex-wrap gap-2 mt-2">
        {(formData[id] as File[]).map((file, fileIndex) => (
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
              onClick={() => removeFile(id, fileIndex)}
              className="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1 text-xs"
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
