"use server";

import { ImageLoaderProps } from "next/image";

export const ImageLoader = ({ src }: ImageLoaderProps): string => {
  return src;
};
