import React from "react";

type Props = {
  onChange: (e: any) => void;
  label: string;
  arrayOfItems: any[];
  value: string;
  selectName: string;
};

export default function Select({
  onChange,
  label,
  arrayOfItems,
  value,
  selectName
}: Props) {
  return (
    <div className="flex flex-col">
      <label className="font-semibold" htmlFor="currentCountry">
        {label}
        <span className="text-red-500">*</span>
      </label>
      <select
        id="currentCountry"
        value={value}
        name={selectName}
        onChange={onChange}
        className="border mt-1 mb-7 p-1 w-[95%] md:w-[500px] bg-transparent outline-none focus:border-primary shadow-sm rounded-md"
      >
        <option selected disabled>
          -- Select --
        </option>
        {arrayOfItems?.map((ctry: any) => (
          <option key={ctry.id} value={ctry.name}>
            {ctry.name}
          </option>
        ))}
      </select>
    </div>
  );
}