import { toast } from "react-toastify";

export function copyTextToClipBord(text: string | undefined | null, fallback?: "-") {

  if (!text) return fallback;

  navigator.clipboard.writeText(text as string);

  toast.success("Code copied");

  return text;
}
