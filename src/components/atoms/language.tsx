import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Language() {
  return (
    <Select>
      <SelectTrigger className="w-[180px] text-gray-800 rounded-none max-h-9 max-w-28">
        <SelectValue placeholder="English" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="english">English</SelectItem>
          <SelectItem value="french">Francais</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
