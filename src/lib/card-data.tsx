import {
  cardDataFeatureType,
  cardDataPricingType,
  cardDataType,
  chaptersType,
} from "@/types/type-tools";

export const cardDataAboutUs: cardDataType[] = [
  {
    title: "Title about card 1",
    image: "/images/about-us/img1.png",
    content:
      "We maintain the most widely used data collection tool for challenging settings and provide it for free to nonprofit organizations.",
  },
  {
    title: "Title about card 2",
    image: "/images/about-us/img2.png",
    content:
      "We help generate high quality data to inform organizations working  globally in humanitarian response, development, human rights,  environment and more.",
  },
  {
    title: "Title about card 3",
    image: "/images/about-us/img3.png",
    content:
      "We develop data tools designed for and by practitioners, including next generation qualitative and quantitative methods.",
  },
];

export const cardDataFeature: cardDataFeatureType[] = [
  {
    title: "Powerful form development",
    image: "/images/features/image3.png",
    content: [
      "Quickly build questionnaires with our intuitive tools",
      "Choose from 25 quantitative and qualitative question types",
      "Edit forms in Excel for complex needs with the XLSForm standard",
      "Use skip logic and validation for high data quality",
      "Translate forms into multiple languages",
    ],
  },
  {
    title: "Data collection & analysis",
    image: "/images/features/image4.png",
    content: [
      "Translate forms into multiple languages",
      "Collect data using our Android app or a web browser",
      "Review and validate data in real time",
      "Visualize data with custom maps and reports",
      "Download data in XLS, CSV, KML, ZIP, or GeoJSON",
    ],
  },
];

export const chapters: chaptersType[] = [
  {
    id: 1,
    title: "chapter 1",
    image: "/images/pricing/chapter1.png",
    description:
      "Group administration \n Geodata collection \n Internal inspection",
  },
  {
    id: 2,
    title: "chapter 2",
    image: "/images/pricing/chapter2.png",
    description:
      "Automation of  purchasing, transportation and storage process",
  },
  {
    id: 3,
    title: "chapter 3",
    image: "/images/pricing/chapter3.png",
    description: "Income and shared responsibilites",
  },
  {
    id: 4,
    title: "chapter 4",
    image: "/images/pricing/chapter4.png",
    description: "Agriculture",
  },
  {
    id: 5,
    title: "chapter 5",
    image: "/images/pricing/chapter5.png",
    description: "Social ",
  },
  {
    id: 6,
    title: "chapter 6",
    image: "/images/pricing/chapter6.png",
    description: "Environment",
  },
];

export const cardDataPricing: cardDataPricingType[] = [
  {
    type: "Bronze",
    annualPricing: 1800,
    biannualPricing: 1350,
    chapters: [1, 2],
    image: "/images/pricing/bronze.jpg",
    condition: {
      description: "Choose either Chapter 01 or Chapter 02",
      badge: "OR",
    },
  },
  {
    type: "Gold",
    annualPricing: 2500,
    biannualPricing: 1800,
    chapters: "all",
    image: "/images/pricing/gold.jpg",
  },
  {
    type: "Silver",
    annualPricing: 2200,
    biannualPricing: 1700,
    chapters: [1, 2],
    image: "/images/pricing/silver.jpg",
  },
];

export const getChapterById = (id: number): chaptersType | undefined => {
  return chapters.find((chapter) => chapter.id === id);
};
