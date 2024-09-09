import React from "react";

type Props = {
  children: React.ReactNode;
  heading: string;
};

export default function CardLayout({ children, heading }: Props) {
  return (
    <div className="w-full h-fit bg-white rounded-lg">
      <div className="flex h-[80px] bg-primary justify-between rounded-t-lg">
        <h1 className="text-xl p-4 font-semibold text-white">{heading}</h1>
      </div>
      <div className="">{children}</div>
    </div>
  );
}
