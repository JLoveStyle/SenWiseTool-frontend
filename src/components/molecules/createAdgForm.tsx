"use client";
import React, { useState } from "react";
import { Logo } from "../atoms/logo";
import InputField from "./inputField";
import { Button } from "../ui/button";

type Props = {
  closeModal: () => void;
};

export default function CreateAdgForm({ closeModal }: Props) {
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
    email: string;
    role: string
  }>({
    username: "",
    password: "",
    email: "",
    role: 'ADG'
  });

  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data: { username: string; password: string; email: string, role: string } = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(data);
  };

  async function handleSubmit (event: any) {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-white flex flex-col p-5 rounded-[12px] w-[96%] mx-auto md:w-full">
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
          label="Email"
          inputName="email"
          type="email"
          value={formData.email}
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
            type="button"
            className="border px-12 rounded-[10px] bg-white text-red-500 border-red-500 hover:bg-[#ef44441e]"
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
