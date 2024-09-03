"use client";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import React, { useEffect, useState } from "react";

type Props = {
  isSubmitting: boolean;
};

export default function AddFormFromLibrary({ isSubmitting }: Props) {
  const [metaData, setMetaData] = useState<string[]>([]);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      setMetaData((prev) => [...prev, value]);
    } else {
      setMetaData((prev) => {
        return [...prev.filter((data) => data !== value)];
      });
    }
  };

  useEffect(() => {
    if (!isSubmitting) LOCAL_STORAGE.save('formMetadata', metaData)
  }, [isSubmitting])

  console.log(metaData);

  return (
    <div className="py-5">
      <h1 className="uppercase font-bold">Form style</h1>
      <p className="py-5">Choose the metadata of your project form.</p>

      <h1 className="font-semibold uppercase pb-2">Metadata</h1>
      <fieldset className="flex gap-2 justify-between leading-loose">
        <div className="w-1/2">
          <div className="flex gap-3">
            <input
              type="checkbox"
              value="nom_planteur"
              id="nom_planteur"
              onChange={(e) => handleCheckbox(e)}
            />
            <label htmlFor="nom_planteur">Nom du planteur</label>
          </div>
          <div className="flex gap-3">
            <input
              type="checkbox"
              value="contact_planteur"
              id="contact_planteur"
              onChange={(e) => handleCheckbox(e)}
            />
            <label htmlFor="contact_planteur">Contact du planteur</label>
          </div>
          <div className="flex gap-3">
            <input
              type="checkbox"
              value="code_planteur"
              onChange={(e) => handleCheckbox(e)}
              id="code_planteur"
            />
            <label htmlFor="code_planteur">Code du planteur</label>
          </div>
          <div className="flex gap-3">
            <input
              type="checkbox"
              value="date_de_l'inspection"
              id="date_de_l'inspection"
              onChange={(e) => handleCheckbox(e)}
            />
            <label htmlFor="date_de_l'inspection">Date de l'inspection</label>
          </div>
          <div className="flex gap-3">
            <input
              type="checkbox"
              value="village"
              onChange={(e) => handleCheckbox(e)}
              id="village"
            />
            <label htmlFor="village">Village</label>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex gap-3 align-baseline">
            <input
              type="checkbox"
              value="annee_de_certification"
              id="annee_de_certification"
              onChange={(e) => handleCheckbox(e)}
            />
            <label htmlFor="annee_de_certification">
              Année de certification
            </label>
          </div>
          <div className="flex gap-3">
            <input
              type="checkbox"
              value="cni"
              id="cni"
              onChange={(e) => handleCheckbox(e)}
            />
            <label htmlFor="cni">CNI°</label>
          </div>
          <div className="flex gap-3">
            <input
              type="checkbox"
              value="nom_de_inspecteur"
              id="nom_de_inspecteur"
              onChange={(e) => handleCheckbox(e)}
            />
            <label htmlFor="nom_de_inspacteur">Nom de l'inspecteur</label>
          </div>
          <div className="flex gap-3">
            <input
              type="checkbox"
              value="pesticite_utliser"
              id="pesticide_utiliser"
              onChange={(e) => handleCheckbox(e)}
            />
            <label htmlFor="pesticide_utiliser">
              Pesticides utilisés dans l'exploitation
            </label>
          </div>
          <div className="flex gap-3">
            <input
              type="checkbox"
              value="qte_pesticide"
              id="qte_pesticide"
              onChange={(e) => handleCheckbox(e)}
            />
            <label htmlFor="qte_pesticide">
              Quantité de Pesticides utiliser
            </label>
          </div>
        </div>
      </fieldset>
      <h1 className="font-semibold py-4">Back-end Audio</h1>
    </div>
  );
}
