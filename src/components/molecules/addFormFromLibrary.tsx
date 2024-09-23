"use client";
import { metaDataOptions } from "@/utiles/services/constants";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

type Props = {
  isSubmitting: boolean;
};

export default function AddFormFromLibrary({ isSubmitting }: Props) {
  const [metaData, setMetaData] = useState<string[]>([]);
  const metaDataFromLocalStorage = LOCAL_STORAGE.get("formMetadata");
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value, name } = e.target;
    if (checked) {
      let data: string[] = [...metaData];
      data.push(e.target.name);
      setMetaData(data);
    } else {
      const filteredData = [...metaData].filter((item) => item !== name);
      setMetaData(filteredData);
    }
  };

  useEffect(() => {
    if (!isSubmitting && metaData.length) {
      LOCAL_STORAGE.save("formMetadata", metaData);
      toast.success("Metadata saved", {
        transition: Bounce,
        autoClose: 1000,
      });
    }
  }, [isSubmitting]);

  const firstHalfMetaData = metaDataOptions.slice(
    0,
    Math.round(metaDataOptions.length / 2)
  );
  const secondHalfMetaData = metaDataOptions.slice(
    Math.round(metaDataOptions.length / 2),
    metaDataOptions.length
  );

  return (
    <div className="py-5">
      <h1 className="font-semibold uppercase pb-2">Metadata</h1>
      <fieldset className="flex gap-2 justify-between leading-loose">
        <div className="w-1/2">
          {firstHalfMetaData.map((item, index) => (
            <div key={index} className="flex gap-3">
              <input
                checked={metaDataFromLocalStorage?.includes(item.name)}
                type="checkbox"
                name={item.name}
                value={item.value}
                id={item.value}
                onChange={(e) => handleCheckbox(e)}
              />
              <label htmlFor={item.value}>{item.name}</label>
            </div>
          ))}
        </div>
        <div className="w-1/2">
          {secondHalfMetaData.map((item, index) => (
            <div key={index} className="flex gap-3">
              <input
                checked={metaDataFromLocalStorage?.includes(item.name)}
                type="checkbox"
                name={item.name}
                value={item.value}
                id={item.value}
                onChange={(e) => handleCheckbox(e)}
              />
              <label htmlFor={item.value}>{item.name}</label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
