"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useToggle } from "@/hooks/use-toggle";
import { AttachedFilesProps } from "@/types/formData";
import { isEmptyObject } from "@/utils/tool";
import { AttachedFilesFormVerification } from "@/utils/training-form-verification";
import { useState } from "react";
import { toast } from "react-toastify";
import { ButtonUI } from "./disign-system/button-ui";
import { InputUI } from "./disign-system/form/input-ui";
import { TextareaUI } from "./disign-system/form/textarea-ui";

interface Props {
  trigger: React.ReactNode;
  titleForm?: string;
  descriptionForm?: string;
  initData?: AttachedFilesProps;
  onSubmit: (formData: AttachedFilesProps) => void;
}

export const AttachedFiles: React.FC<Props> = ({
  trigger,
  titleForm,
  descriptionForm,
  initData,
  onSubmit,
}) => {
  const { value: isLoading, setValue: setIsLoading } = useToggle();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState<AttachedFilesProps>({
    id: initData ? initData.id : "",
    title: initData ? initData.title : "",
    description: initData ? initData.description : "",
    files: initData ? initData.files : [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;

    if (target.type === "file" && target.files) {
      const filesArray = Array.from(target.files);
      setFormData((prev) => ({ ...prev, files: filesArray }));
    } else {
      const { name, value } = target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Mettre à jour le parent chaque fois que formData change
  // useEffect(() => {
  //   updatedFormData(formData);
  // }, [formData, updatedFormData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);

    e.preventDefault();

    const formErrors: any = AttachedFilesFormVerification(formData);

    if (!isEmptyObject(formErrors)) {
      setErrors(formErrors);
      toast.warning("Something is wrong");
      setIsLoading(false);
      return;
    }

    onSubmit(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{titleForm}</DialogTitle>
            <DialogDescription>{descriptionForm}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-5 mb-5">
            <InputUI
              label="Titre"
              id="title"
              placeholder="Titre de l'activité"
              isLoading={isLoading}
              errors={errors}
              value={formData.title}
              onChange={handleChange}
            />
            <TextareaUI
              label="Description"
              id="description"
              placeholder="Description de l'activité"
              isLoading={isLoading}
              errors={errors}
              value={formData.description}
              onChange={handleChange}
            />
            <InputUI
              label="Files"
              id="files"
              type="file"
              placeholder="Veuillez attacher des fichiers"
              isLoading={isLoading}
              errors={errors}
              onChange={handleChange}
              multiple
            />
          </div>
          <DialogFooter>
            <ButtonUI type="submit" isLoading={isLoading}>
              Soumettre
            </ButtonUI>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
