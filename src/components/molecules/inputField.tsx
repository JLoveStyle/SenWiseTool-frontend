import React from "react";

type Props = {
  label: string;
  inputName: string;
  type: string;
  value: string;
  onChange: (event: any) => void;
};

export default function InputField({
  label,
  value,
  type,
  inputName,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col">
      <label className="font-semibold" htmlFor={inputName}>
        {label}
        <span className="text-red-600">*</span>
      </label>
      <input
        className="border mt-1 mb-7 p-1 w-[95%] md:w-full bg-transparent outline-none focus:border-primary shadow-sm rounded-md"
        name={inputName}
        value={value}
        onChange={onChange}
        type={type}
        required
        autoComplete="on"
      />
    </div>
  );
}
