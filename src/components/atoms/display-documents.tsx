"use client";

import React, { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";

interface DocumentProps {
  name: string;
  url: string;
}

interface Props {
  documents: string[];
}

export const DisplayDocuments: React.FC<Props> = ({ documents }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fonction pour détecter le type de fichier à partir de l'URL ou du nom
  const detectFileType = (url: string): "image" | "pdf" | "word" | "other" => {
    const extension = url.split(".").pop()?.toLowerCase();

    if (extension) {
      if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(extension))
        return "image";
      if (["pdf"].includes(extension)) return "pdf";
      if (["doc", "docx"].includes(extension)) return "word";
    }

    return "other";
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === documents.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? documents.length - 1 : prevIndex - 1
    );
  };

  const renderDocument = () => {
    if (documents.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded shadow-md">
          <FaExclamationCircle className="text-red-500 text-4xl mb-4" />
          <p className="text-gray-700 font-semibold text-lg">
            Aucun document disponible pour le moment.
          </p>
        </div>
      );
    }

    const currentDocument = documents[currentIndex];
    const currentFileType = detectFileType(currentDocument);

    switch (currentFileType) {
      case "image":
        return (
          <img
            src={currentDocument}
            alt="Display image document"
            className="w-full h-auto max-h-96 object-contain"
          />
        );
      case "pdf":
        return (
          <iframe
            src={currentDocument}
            title="Display pdf document"
            className="w-full h-96"
          />
        );
      case "word":
        return (
          <div className="p-4 bg-gray-200 rounded shadow">
            <p className="text-gray-700">
              Fichier Word :{" "}
              <a
                href={currentDocument}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                "Display word document"
              </a>
            </p>
          </div>
        );
      default:
        return (
          <div className="p-4 bg-gray-200 rounded shadow">
            <p className="text-gray-700">
              Type de fichier non supporté.{" "}
              <a
                href={currentDocument}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Télécharger ici
              </a>
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full max-w-full h-full border rounded shadow p-4">
        {renderDocument()}
      </div>
      {documents.length > 0 && (
        <div className="flex justify-between w-full max-w-lg">
          <button
            onClick={handlePrevious}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900"
          >
            Précédent
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};
