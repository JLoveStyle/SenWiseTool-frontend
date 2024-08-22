"use client";
import React, { useState } from "react";
import { Logo } from "../atoms/logo";
import InputField from "./inputField";
import { Button } from "../ui/button";
import { X } from "lucide-react";

type Props = {
  closeModal: () => void;
};

export default function CreateMemeberForm({ closeModal }: Props) {
  const [formData, setFormData] = useState<boolean>(false);

  const handleSubmit = (event: any) => {
    event.preventDefault()
  };

  return (
    <div className="bg-white flex flex-col p-5 rounded-[12px]">
      <div className="flex justify-between">
        <p></p>
        <X onClick={closeModal} className="hover:cursor-pointer"/>
      </div>
      <div className="flex justify-center py-3">
        <Logo size="very-large" className="hover:cursor-pointer" />
      </div>
      <form className="" onSubmit={handleSubmit}>
        <InputField
          label="Username"
          inputName="username"
          type="text"
          value="name"
          onChange={function (event: any): void {
            throw new Error("Function not implemented.");
          }}
        />
        <InputField
          label="Password"
          inputName="password"
          type="password"
          value="pas"
          onChange={function (event: any): void {
            throw new Error("Function not implemented.");
          }}
        />
        <div className="flex justify-center">
          <p className="flex-1"></p>
          <div className=" flex gap-3">
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
        </div>
      </form>
    </div>
  );
}
