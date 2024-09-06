import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import clsx from "clsx";

interface Props {
  label?: string;
  id: string;
  placeholder?: string;
  isLoading?: boolean;
  className?: string;
  errors: { [key: string]: any };
  value?: any;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextareaUI = ({
  label,
  id,
  placeholder,
  isLoading,
  errors,
  value,
  rows = 4,
  onChange,
}: Props) => {
  return (
    <div className="items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Textarea
        id={id}
        name={id}
        rows={rows}
        placeholder={placeholder}
        className={clsx(
          "outline-none focus:border-blue-800/30",
          id in errors && "border-red-500",
          isLoading && "cursor-wait"
        )}
        value={value}
        onChange={onChange}
        disabled={isLoading}
      />
      {id in errors && (
        <span className="text-red-500 text-xs">{errors[id]}</span>
      )}
    </div>
  );
};
