"use client";
import React, { useState } from "react";
import { Logo } from "../atoms/logo";
import InputField from "./inputField";
import { Button } from "../ui/button";
import AddFormFromLibrary from "./addFormFromLibrary";

type Props = {
  closeModal: () => void;
};

export default function CreateMemeberForm({ closeModal }: Props) {
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
    role: string;
  }>({
    username: "",
    password: "",
    role: "AUDITOR",
  });

  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data: { username: string; password: string; role: string } = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(data);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(formData)
  };

  return (
    <div className="bg-white flex flex-col p-5 rounded-[12px]">
      <div className="flex justify-center py-3">
        <Logo size="very-large" className="hover:cursor-pointer" />
      </div>
      <form className="" onSubmit={handleSubmit}>
        <InputField
          label="Username"
          inputName="username"
          type="text"
          value={formData.username}
          onChange={(e) => handleChangeEvent(e)}
        />
        <InputField
          label="Password"
          inputName="password"
          type="password"
          value={formData.password}
          onChange={(e) => handleChangeEvent(e)}
        />
        <div className=" flex gap-3 justify-end">
          <Button
            className="border w-1/2 rounded-[10px] bg-white text-red-500 border-red-500 hover:bg-[#ef44441e]"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button className="" type="submit">
            Create account
          </Button>
        </div>
      </form>
    </div>
  );
}
