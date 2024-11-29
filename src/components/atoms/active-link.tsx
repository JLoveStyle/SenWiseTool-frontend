"use client";

import { AppLink } from "@/types/app-link";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface Props extends AppLink {
  style?: string;
  className?: string;
}

export const ActiveLink = ({
  baseUrl,
  label,
  type = "internal",
  disabled,
  style,
  className,
}: Props) => {
  const pathname = usePathname();

  const isActive = useMemo(() => {
    return pathname === baseUrl;
  }, [pathname, baseUrl]);

  return (
    <Link
      className={clsx(
        isActive && style,
        disabled && "cursor-not-allowed",
        className
      )}
      href={baseUrl}
      target={type === "external" ? "_blank" : "_self"}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-500 w-full"></span>
      )}
    </Link>
  );
};
