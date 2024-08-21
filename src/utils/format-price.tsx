export const formatPrice = (
  price: number,
  params?: { currency?: "$" | "€" | "FCFA" }
) => {
  let priceFormated: string = `$${price}`;

  if ((params && params?.currency == "$") || params?.currency == "€") {
    priceFormated = `${params?.currency}${price}`;
  } else if (params && params?.currency == "FCFA") {
    priceFormated = `${price} ${params?.currency}`;
  }

  return priceFormated;
};

export const chapterList = (info: "all" | number[]) => {
  if (info === "all") return [1, 2, 3, 4, 5, 6];
  else return info;
};
