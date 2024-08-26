import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

type Props = {
  children: React.ReactNode;
  content: string
};

export default function CustomHoverCard({children, content}: Props) {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger>
          {children}
        </HoverCardTrigger>
        <HoverCardContent className="w-fit p-1 text-sm text-white bg-[#333847]">
          {content}
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
