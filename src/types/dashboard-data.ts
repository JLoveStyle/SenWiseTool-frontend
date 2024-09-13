import { BsPersonVcard } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
import {
  RxGithubLogo,
  RxHeart,
  RxLinkedinLogo,
  RxStack,
  RxTwitterLogo,
} from "react-icons/rx";
import { DashboardSidebarOption } from "./app-link";

export const DashboardSidebarOptions: DashboardSidebarOption[] = [
  {
    option: {
      label: "Campagnes",
      baseUrl: "",
      icon: RxStack,
    },
    details: [
      {
        label: "2022-2023",
        baseUrl: "",
      },
      {
        label: "2023-2024",
        baseUrl: "",
      },
      {
        label: "2024-2025",
        baseUrl: "",
      },
      {
        label: "2025-2026",
        baseUrl: "",
      },
    ],
  },
  {
    option: {
      label: "Followers",
      baseUrl: "",
      icon: RxHeart,
    },
  },
  {
    option: {
      label: "Share to",
      baseUrl: "",
      icon: IoMdShareAlt,
    },
    details: [
      {
        label: "Github",
        baseUrl: "",
        icon: RxGithubLogo,
      },
      {
        label: "Linkedin",
        baseUrl: "",
        icon: RxLinkedinLogo,
      },
      {
        label: "Twitter",
        baseUrl: "",
        icon: RxTwitterLogo,
      },
    ],
  },
  {
    option: {
      label: "Abonnement",
      baseUrl: "",
      icon: BsPersonVcard,
    },
  },
];
