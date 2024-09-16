import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inputTypes } from "@/types/type-tools";
import clsx from "clsx";

interface Props {
  label?: string;
  id: string;
  type?: inputTypes;
  placeholder?: string;
  isLoading?: boolean;
  className?: string;
  errors: { [key: string]: any };
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  multiple?: boolean;
}

export const InputUI = ({
  label,
  id,
  type = "text",
  placeholder,
  isLoading,
  errors,
  value,
  onChange,
  onKeyDown,
  multiple,
}: Props) => {
  return (
    <div className="items-center gap-4 w-full">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className={clsx(
          "outline-none focus:border-blue-800/30",
          id in errors && "border-red-500",
          isLoading && "cursor-wait"
        )}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={isLoading}
        multiple={multiple}
      />
      {id in errors && (
        <span className="text-red-500 text-xs">{errors[id]}</span>
      )}
    </div>
  );
};
