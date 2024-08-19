import { cardDataFeatureType, cardDataType } from "@/types/type-tools";

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
