"use client"
import React, { useState } from "react"
import { FaDownload, FaEye, FaRegFilePdf } from "react-icons/fa";

/************************************************************ */

interface Props {
  url: string
} 

export function FilePreview ({ url }: Props) {
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
