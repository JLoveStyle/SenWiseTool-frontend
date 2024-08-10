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
    </Link>
  );
};
