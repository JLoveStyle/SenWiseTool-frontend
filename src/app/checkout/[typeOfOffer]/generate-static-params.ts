export const generateStaticParams = async () => {
  const typesOfOffers = ["bronze", "silver", "gold"];
  return typesOfOffers.map((offer) => ({
    typeOfOffer: offer,
  }));
};
