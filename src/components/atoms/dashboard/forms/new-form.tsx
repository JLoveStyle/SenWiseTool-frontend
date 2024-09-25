import { useState } from "react";
import FormLayout from "./form-layout";

type Props = {
  form?: React.ReactNode;
};

export default function NewForm({ form }: Props) {
  const [constructForm, setConstructForm] = useState<boolean>(true);
  const [projectForm, setProjectform] = useState<boolean>(false);

  return <FormLayout heading="Create a project: Choose source" form={form} />;
}
