"use client";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

type Props = {
  isSubmitting: boolean;
};

export default function AddFormFromLibrary({ isSubmitting }: Props) {
  const [metaData, setMetaData] = useState<{[key: string]: string}[]>([]);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value, name } = e.target;
    if (checked) {
      let data: {[key: string]: string}[] = [...metaData]
      data.push({val: e.target.name})
      setMetaData(data);
    } else {
      const filteredData = [...metaData].filter((item) => item.val !== name)
      setMetaData(filteredData)
    }
  };

  useEffect(() => {
    if (!isSubmitting && metaData.length) {
      LOCAL_STORAGE.save('formMetadata', metaData)
      toast.success('Metadata saved', {
        transition: Bounce,
        autoClose: 1000
      })
    }

  }, [isSubmitting])

  return (
    <div className="py-5">
      <h1 className="font-semibold uppercase pb-2">Metadata</h1>
      <fieldset className="flex gap-2 justify-between leading-loose">
        <div className="w-1/2">
          <div className="flex gap-3">
            <input
              type="checkbox"
              name="Nom du planteur"
              value="nom_planteur"
              id="nom_planteur"
              onChange={(e) => handleCheckbox(e)}
            />
            <label htmlFor="nom_planteur">Nom du planteur</label>
          </div>
          <div className="flex gap-3">
            <input
              type="checkbox"
              name="Contact du planteur"
              value="contact_planteur"
              id="contact_planteur"
              onChange={(e) => handleCheckbox(e)}
            />
            <label htmlFor="contact_planteur">Contact du planteur</label>
          </div>
          <div className="flex gap-3">
            <input
              type="checkbox"
              name="Code du panteur"
              value="code_planteur"
              onChange={(e) => handleCheckbox(e)}
              id="code_planteur"
            />
            <label htmlFor="code_planteur">Code du planteur</label>
          </div>
          <div className="flex gap-3">
            <input
              type="checkbox"
              name="N° CNI"
              value="cni"
              id="cni"
              onChange={(e) => handleCheckbox(e)}
            />
            <label htmlFor="cni">CNI°</label>
          </div>
          <div className="flex gap-3">
            <input
              type="checkbox"
              name="Date de l'inspection"
              value="date_de_inspection"
              id="date_de_inspection"
              onChange={(e) => handleCheckbox(e)}
            />
            <label htmlFor="date_de_inspection">Date de l'inspection</label>
          </div>
          <div className="flex gap-3">
            <input
              type="checkbox"
              name="Village"
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
              name="Année de certification"
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
              name="Nom de L'inspecteur"
              value="nom_de_inspecteur"
              id="nom_de_inspecteur"
              onChange={(e) => handleCheckbox(e)}
            />
            <label htmlFor="nom_de_inspecteur">Nom de l'inspecteur</label>
          </div>
          <div className="flex gap-3">
            <input
              type="checkbox"
              name="Pesticides utilisés"
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
              name="Quantité"
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
