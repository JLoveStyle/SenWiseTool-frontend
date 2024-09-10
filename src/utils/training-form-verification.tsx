import { AttachedFilesProps, TrainingProps } from "@/types/formData";

export const TrainingFormVerification = (formData: TrainingProps) => {
  const errors: { [key: string]: any } = {};

  if (formData.title.length === 0) {
    errors["title"] = "Title is required";
  }

  if (formData.start_date.length === 0) {
    errors["start_date"] = "Start date is required";
  }

  if (formData.end_date.length === 0) {
    errors["end_date"] = "End date is required";
  }

  if (formData.location.length === 0) {
    errors["location"] = "Location is required";
  }

  if (formData.modules.length === 0) {
    errors["modules"] = "Modules is required";
  }

  return errors;
};

export const AttachedFilesFormVerification = (formData: AttachedFilesProps) => {
  const errors: { [key: string]: any } = {};

  if (formData.title.length === 0) {
    errors["title"] = "Title is required";
  }

  if (formData.description.length === 0) {
    errors["description"] = "Start date is required";
  }

  if (formData.files.length === 0) {
    errors["files"] = "You must choose at least one file";
  }

  return errors;
};
