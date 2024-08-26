export const formatPrice = (
  price: number | undefined,
  params?: { currency?: "$" | "€" | "FCFA" }
) => {
  let priceFormated: string = `$${typeof price === "number" ? price : 0}`;

  if ((params && params?.currency == "$") || params?.currency == "€") {
    priceFormated = `${params?.currency}${price}`;
  } else if (params && params?.currency == "FCFA") {
    priceFormated = `${price} ${params?.currency}`;
  }

  return priceFormated;
};

export const chapterList = (info: "all" | number[] | undefined) => {
  if (info === undefined) return [];
  else if (info === "all") return [1, 2, 3, 4, 5, 6];
  else return info;
};
