import { AppLink, footerLink } from "@/types/app-link";
import { Facebook, FacebookIcon, Linkedin, Youtube } from "lucide-react";

export const footerLinks: footerLink[] = [
  {
    title: "INFORMATION",
    links: [
      {
        label: "Online learning",
        baseUrl: "/",
        type: "external",
      },
      {
        label: "About SenWiseTool",
        baseUrl: "/",
        type: "internal",
      },
      {
        label: "Feautures",
        baseUrl: "/",
        type: "internal",
      },
      {
        label: "Pricing",
        baseUrl: "/",
        type: "internal",
      },
    ],
  },
  {
    title: "ORGANIZATION",
    links: [
      {
        label: "About us",
        baseUrl: "/",
        type: "internal",
      },
      {
        label: "Team",
        baseUrl: "/",
        type: "internal",
      },
      {
        label: "Jobs",
        baseUrl: "/",
        type: "internal",
      },
      {
        label: "Financies",
        baseUrl: "/",
        type: "internal",
      },
    ],
  },
  {
    title: "LEGAL",
    links: [
      {
        label: "Terms of use",
        baseUrl: "/",
        type: "internal",
      },
      {
        label: "License agreement",
        baseUrl: "/",
        type: "internal",
      },
      {
        label: "Privacy policy",
        baseUrl: "/",
        type: "internal",
      },
      {
        label: "Copyright information",
        baseUrl: "/",
        type: "internal",
      },
      {
        label: "Cookies policy",
        baseUrl: "/",
        type: "internal",
      },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      {
        label: "FAQ",
        baseUrl: "/",
        type: "internal",
      },
      {
        label: "Search guide",
        baseUrl: "/",
        type: "internal",
      },
      {
        label: "Contact",
        baseUrl: "/",
        type: "internal",
      },
    ],
  },
];

export const socialFooterLink: AppLink[] = [
  {
    label: "Facebook",
    baseUrl: "/",
    type: "external",
    icon: Facebook,
  },
  {
    label: "Whatsapp",
    baseUrl: "/",
    type: "external",
    icon: Facebook,
  },
  {
    label: "Linkedin",
    baseUrl: "/",
    type: "external",
    icon: Linkedin,
  },
  {
    label: "Skype",
    baseUrl: "/",
    type: "external",
    icon: FacebookIcon,
  },
  {
    label: "Youtube",
    baseUrl: "/",
    type: "external",
    icon: Youtube,
  },
];
