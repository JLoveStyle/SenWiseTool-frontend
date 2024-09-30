import React from "react";

type Props = {
  onChange: (e: any) => void;
  label: string;
  arrayOfItems: any[];
  value: string;
  selectName: string;
  className?: string
};

export default function CustomSelectTag({
  onChange,
  label,
  arrayOfItems,
  value,
  selectName,
  className
}: Props) {
  return (
    <div className={className}>
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
          required
          className="border mt-1 mb-7 p-1 w-[95%] md:w-full bg-transparent outline-none focus:border-primary shadow-sm rounded-md"
        >
          <option selected >
            -- Select --
          </option>
          {arrayOfItems?.map((ctry: any, index: number) => (
            <option key={index} value={ctry.name}>
              {ctry.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
