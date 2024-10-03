import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";
import React, { useRef } from "react";
import { PiPrinterFill } from "react-icons/pi";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const PrintContent: React.FC<Props> = (props) => {
  const formRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const element = formRef.current;

    if (element) {
      // Sélectionner toutes les images dans le composant
      const images = Array.from(element.getElementsByTagName("img"));

      // Créer une promesse pour chaque image
      const loadPromises = images.map((img) => {
        if (img.complete && img.naturalHeight !== 0) {
          return Promise.resolve(); // Si l'image est déjà complètement chargée
        } else {
          return new Promise((resolve, reject) => {
            img.onload = resolve; // Résoudre lorsque l'image est chargée
            img.onerror = reject; // Rejeter si l'image échoue à se charger
          });
        }
      });

      // Attendre que toutes les images soient chargées
      Promise.all(loadPromises)
        .then(() => {
          console.log("Toutes les images sont chargées, génération du PDF...");
          // Générer le PDF après le chargement des images
          html2pdf().from(element).save();
        })
        .catch((error) => {
          console.error(
            "Une erreur est survenue lors du chargement des images",
            error
          );
        });
    }
  };

  return (
    <div className={props.className}>
      <div ref={formRef}>{props.children}</div>
      <div className="pt-24 pb-10 flex items-center justify-center">
        <Button
          size="sm"
          className="flex gap-1 items-center bg-black hover:bg-black hover:rounded-full"
          onClick={handlePrint}
        >
          <PiPrinterFill /> Imprimer en PDF
        </Button>
      </div>
    </div>
  );
};

export default PrintContent;
