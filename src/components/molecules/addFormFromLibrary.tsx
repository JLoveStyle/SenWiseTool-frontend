"use client";
import { metaDataOptions } from "@/utiles/services/constants";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

type Props = {
  isSubmitting: boolean;
};

export default function AddFormFromLibrary({ isSubmitting }: Props) {
  const metaDataFromLocalStorage = LOCAL_STORAGE.get("formMetadata");
  const [metaData, setMetaData] = useState<string[]>(metaDataFromLocalStorage ?? []);
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value, name } = e.target;
    if (checked) {
      if (name === "selectAll") {
        let allChecked = [...metaData];
        for (let i = 0; i < metaDataOptions.length; i++) {
          allChecked.push(metaDataOptions[i].name);
          metaDataOptions[i]["isChecked"] = true;
        }
        setMetaData([...new Set(allChecked)]);
        return;
      } 
      let data: string[] = [...metaData];
      data.push(e.target.name);
      const foundIndex = metaDataOptions.findIndex(
        (item) => item.name === name
      );
      metaDataOptions[foundIndex].isChecked = true;
      setMetaData([...new Set(data)]);
    } else {
      const filteredData = [...metaData].filter((item) => item !== name);
      const foundIndex = metaDataOptions.findIndex(
        (item) => item.name === name
      );
      metaDataOptions[foundIndex].isChecked = false;
      setMetaData([...new Set(filteredData)]);
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
  }, [isSubmitting, metaData.length]);

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
      <div className="flex gap-3">
        <input
          id="select-all"
          type="checkbox"
          name="selectAll"
          onChange={(e) => handleCheckbox(e)}
        />
        <label htmlFor={"select-all"}>
          <strong>Select all</strong>
        </label>
      </div>
      <fieldset className="flex gap-2 justify-between leading-loose">
        <div className="w-1/2">
          {firstHalfMetaData.map((item, index) => (
            <div key={index} className="flex gap-3">
              <input
                checked={item.isChecked}
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
                checked={item.isChecked}
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
