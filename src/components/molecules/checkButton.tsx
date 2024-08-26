import React from "react";

type Props = {
  onChange: () => void;
};

export default function CheckBox({ onChange }: Props) {
  return (
    <div>
      <div className="items-top flex space-x-2">
        <input
          id="terms1"
          type="checkbox"
          onChange={onChange}
          className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
          <p className="text-sm text-muted-foreground">
            You agree to our{" "}
            <span className="underline hover:cursor-pointer">
              Terms of Service and Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
