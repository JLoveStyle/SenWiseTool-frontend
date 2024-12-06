import { Route } from "@/lib/route";
import { DashboardStatPanelData } from "@/types/app-link";
import { allRequirements } from "@/utils/requirements";
import { IJsonSheet } from "json-as-xlsx";
import { Archive, FilePenLine, Rocket } from "lucide-react";
import { receiptStatData } from "../tracability.const/statistics";

// export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
export const API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;
// export const API_URL = process.env.NEXT_PUBLIC_LOCAL_API_URL;

// BUSINESS ACTIVITIES
export const businessActivity: string[] = [
  "Cocoa",
  "Coffee",
  "Banana",
  "Tee",
  "Wood",
  "Other",
];

// MAPPING DATA COLUMNS
export const MappingTableColumns: string[] = [
  "No",
  "Farmer name",
  "Farmer status",
  "Farmer contact",
  "ID card number",
  "Farm creation date",
  "Village",
  "Mapper name",
  "Mapping date",
  "Farm surface area",
  "Farm picture",
  "Farmer picture",
  "Coordinates",
];

// META DATA OPTIONS
export const metaDataOptions: { name: string, value: string, isChecked: boolean }[] = [
  {
    name: "Nom du planteur",
    isChecked: false,
    value: "nom_planteur",
  },
  {
    name: "Contact planteur",
    isChecked: false,
    value: "contact_planteur",
  },
  {
    name: "Code du planteur",
    isChecked: false,
    value: "code_planteur",
  },
  {
    name: "N° CNI",
    isChecked: false,
    value: "cni",
  },
  {
    name: "Date de l'inspection",
    isChecked: false,
    value: "date_de_inspection",
  },
  {
    name: "Village",
    isChecked: false,
    value: "village",
  },
  {
    name: "Nom de la copérative",
    isChecked: false,
    value: "nom_de_la_coperative"
  },
  {
    name: "Annee de certification",
    isChecked: false,
    value: "annee_de_certification",
  },
  {
    name: "Nom de inspecteur",
    isChecked: false,
    value: "nom_de_inspecteur",
  },
  {
    name: "Contact de inspecteur",
    isChecked: false,
    value: "contact_de_inspecteur",
  },
  {
    name: "Angrais appliqué",
    isChecked: false,
    value: "angrais_appliqué",
  },
  {
    name: "Quantité d'angrais appliqué",
    isChecked: false,
    value: "qte_angrais_appliqué",
  },
  {
    name: "Pesticide utiliser",
    isChecked: false,
    value: "pesticide_utiliser",
  },
  {
    name: "Quantité de Pesticide",
    isChecked: false,
    value: "qte_pesticide",
  },
];

// THESE ARE OPTIONS OF THE NAVIGATIONMENU UNDER 'GESTION'
export const optionsGestions: {
  title: string;
  href: string;
  description: string;
}[] = [
    {
      title: "Initial inspection",
      href: Route.inspectionInitial,
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Internal inspection",
      href: Route.inspectionInterne,
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Auto evaluation of group",
      href: Route.autoEvaluation,
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Mapping",
      href: Route.mapping,
      description: "Visually or semantically separates content.",
    },
    {
      title: "Evalution risks tools",
      href: Route.riskEvaluation,
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Management plan",
      href: Route.managementPlan,
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
    {
      title: "Maps",
      href: Route.map,
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
    {
      title: "Reclamation mechanism",
      href: Route.reclamationMecanism,
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
    {
      title: "Organigramme du SGI",
      href: Route.organigram,
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
    {
      title: "Training",
      href: Route.trainingProject,
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
    {
      title: "List of farmers",
      href: Route.listOfFarmers,
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ];

export const optionsTracabilité: {
  title: string;
  href: string;
  description: string;
}[] = [
    {
      title: "Reçus",
      href: Route.receipt,
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Fiche d'accompagnement à l'usine",
      href: Route.factoryAccompaniementSheet,
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Bordereaux de vente",
      href: Route.saleSlip,
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Fiche de transmission et de déclaration",
      href: Route.transmissionAndDeclarationSheet,
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Bon d'entrée au magasin",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
  ];

// pannel for sidebar of layoutDashboardTemplate component
export const statPanelDatas: DashboardStatPanelData[] = [
  {
    structure: {
      label: "Ventes",
      baseUrl: "",
      icon: Rocket,
    },
    data: () => {
      return receiptStatData.totalSale;
    },
  },
  {
    structure: {
      label: "Marchés",
      baseUrl: "",
      icon: FilePenLine,
    },
    data: () => {
      return receiptStatData.distinctMarketCount;
    },
  },
  {
    structure: {
      label: "Quantités",
      baseUrl: "",
      icon: Archive,
    },
    data: () => {
      return receiptStatData.totalQuantity;
    },
  },
  {
    structure: {
      label: "Poids.Net",
      baseUrl: "",
      icon: Archive,
    },
    data: () => {
      return receiptStatData.totalNetWeight;
    },
  },
];

// THESE ARE OPTIONS OF THE NAVIGATIONMENU UNDER 'REVENU ET RESPONSABILTE'
export const optionsRevenu: {
  title: string;
  href: string;
  description: string;
}[] = [
    {
      title: "Investissement de durabilité",
      href: Route.incomeAndSharedResponsabilityProofOfPaiement,
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Plan de gestion de l'investissement de durabilité",
      href: Route.incomeAndSharedResponsabilityManagementPlan,
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Différentiel de durabilité",
      href: Route.incomeAndSharedResponsabilityDifferential,
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
  ];

// THESE ARE OPTIONS OF TABLEHEAD IN INSPECTION INITIAL UNDER 'GESTION'
export const tableHead: string[] = [
  "Project name",
  "Status",
  "Creator",
  "Last update",
  "Deployment date",
  "Start date",
];

// DIFFERENTS CHAMPTERS
export const chapters: string[] = [
  "Chapter 1",
  "Chapter 2",
  "Chapter 3",
  "Chapter 4",
  "Chapter 5",
  "Chapter 6",
];

export const requirements = allRequirements;
