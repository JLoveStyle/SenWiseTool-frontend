import { NewFormProps } from "@/types/dashboard/form";
import { dasboardFormParams } from "@/types/formData";
import { useState } from "react";
import FormLayout from "./form-layout";

type Props = {
  forms?: NewFormProps[];
  formParams?: dasboardFormParams;
};

export default function NewForm({ forms, formParams }: Props) {
  const [constructForm, setConstructForm] = useState<boolean>(true);
  const [projectForm, setProjectform] = useState<boolean>(false);

  return <FormLayout forms={forms} formParams={formParams} />;
}
