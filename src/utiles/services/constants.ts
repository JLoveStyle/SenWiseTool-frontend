import { Route } from "@/lib/route";
import { DashboardStatPanelData } from "@/types/app-link";
import { allRequirements } from "@/utils/requirements";
import { Archive, FilePenLine, Rocket } from "lucide-react";
import { receiptStatData } from "../tracability.const/statistics";
import { IJsonSheet } from "json-as-xlsx";

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
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



// EXAMPLE OF MAPPING DATA FROM FIELD
export const mappingData: { [key: string]: any }[] = [
  {
    nom_producteur: "Onana Jeqn de Dieu",
    statut_producteur: "Propritaire",
    contact_du_producteur: "670710054",
    no_cni: 145614851135,
    date_de_creation_plant: "10/10/2001",
    village: "Ndokayo",
    code_du_planteur: "0001",
    nom_du_mappeur: "Jean Blaise Piment",
    date: "10/05/2021",
    superficie_estimé: "10ha",
    photo_plantation:
      "https://senwisetool.s3.eu-west-1.amazonaws.com/inspectioninterne1728044055501-3032c6d8-a26a-467e-bc1a-2f0ab9526bed-16.03.2023_06.32.03_REC.png",
    photo_planteur:
      "https://senwisetool.s3.eu-west-1.amazonaws.com/inspectioninterne1728044055502-3c9bf794-6794-4678-9e0e-d2fedd661755-automate-autom.PNG",
    coordinate: [
      {
        log: -122.4194,
        lat: 37.7749,
      },
      {
        log: -122.4185,
        lat: 37.7758,
      },
      {
        log: -122.4176,
        lat: 37.7767,
      },
      {
        log: -122.4167,
        lat: 37.7776,
      },
      {
        log: -122.4158,
        lat: 37.7785,
      },
      {
        log: -122.4149,
        lat: 37.7794,
      },

      {
        log: -122.414,
        lat: 37.7803,
      },
      {
        log: -122.4131,
        lat: 37.7812,
      },
      {
        log: -122.4122,
        lat: 37.7821,
      },
      {
        log: -122.4113,
        lat: 37.783,
      },
      {
        log: -122.4194,
        lat: 37.7749,
      },
    ],
  },
  {
    nom_producteur: "Parfait Essono Bijock",
    statut_producteur: "Locataire",
    contact_du_producteur: "670710054",
    no_cni: 145614851135,
    date_de_creation_plant: "10/10/2001",
    village: "Ntui",
    code_du_planteur: "11104",
    nom_du_mappeur: "Jean pierre Fokong",
    date: "10/05/2021",
    superficie_estimé: "50ha",
    photo_plantation:
      "https://senwisetool.s3.eu-west-1.amazonaws.com/inspectioninterne1728044055502-3c44b0c9-9f79-496b-8d49-673ad6fbd836-Capture1.PNG",
    photo_planteur:
      "https://senwisetool.s3.eu-west-1.amazonaws.com/inspectioninterne1728044055502-3c9bf794-6794-4678-9e0e-d2fedd661755-automate-autom.PNG",
    coordinate: [
      {
        log: -118.24,
        lat: 34.05,
      },
      {
        log: -119.25,
        lat: 35.06,
      },
      {
        log: -120.26,
        lat: 36.05,
      },
      {
        log: -123.25,
        lat: 40.04,
      },
      {
        log: -234.24,
        lat: 52.05,
      },
      {
        log: -245.23,
        lat: 43.06,
      },
      {
        log: -118.22,
        lat: 34.05,
      },
    ],
  },
  {
    nom_producteur: "Marguerite de la fontaine",
    statut_producteur: "Propritaire",
    contact_du_producteur: "670710054",
    no_cni: 145614851135,
    date_de_creation_plant: "10/10/2001",
    village: "Mbeng",
    code_du_planteur: "014014",
    nom_du_mappeur: "Pascal Azombo",
    date: "10/05/2021",
    superficie_estimé: "80ha",
    photo_plantation:
      "https://senwisetool.s3.eu-west-1.amazonaws.com/inspectioninterne1728044055502-df237f7b-308f-4f16-beb4-e713b91d3525-cahier.bmp",
    photo_planteur:
      "https://senwisetool.s3.eu-west-1.amazonaws.com/inspectioninterne1728044055502-3c9bf794-6794-4678-9e0e-d2fedd661755-automate-autom.PNG",
    coordinate: [
      {
        log: -118.24,
        lat: 34.05,
      },
      {
        log: -119.25,
        lat: 31.06,
      },
      {
        log: -120.26,
        lat: 35.05,
      },
      ,
      {
        log: -118.25,
        lat: 31.04,
      },
      {
        log: -120.24,
        lat: 39.05,
      },
      {
        log: -136.23,
        lat: 30.06,
      },
      {
        log: -125.22,
        lat: 45.05,
      },
      {
        log: -140.23,
        lat: 29.04,
      },
      {
        log: -130.24,
        lat: 46.05,
      },
      {
        log: -120.25,
        lat: 43.06,
      },
      {
        log: -141.26,
        lat: 38.05,
      },
      {
        log: -151.25,
        lat: 40.04,
      },
      {
        log: -118.24,
        lat: 34.05,
      },
    ],
  },
];

// COLUMNS FOR EXCELL SHEET
export const columns: IJsonSheet[] = [
  {
    sheet: "Données_Mapping",
    columns: [
      {
        label: "Nom du producteur",
        value: "nom_producteur",
      },
      {
        label: "statut du producteur",
        value: "statut_producteur",
      },
      {
        label: "N° CNI",
        value: "no_cni",
      },
      {
        label: "Date de creation de la plantation",
        value: "date_de_creation_plant",
      },
      {
        label: "Village",
        value: "village",
      },
      {
        label: "Nom du mappeur",
        value: "nom_du_mappeur",
      },
      {
        label: "Date",
        value: "date",
      },
      {
        label: "Superficie estimé",
        value: "superficie_estimé",
      },
      {
        label: "Photo de la plantation",
        value: "photo_plantation",
      },
      {
        label: "Photo planteur",
        value: "photo_planteur",
      },
      {
        label: "Coordonées",
        value: "coordinate",
      },
    ],
    content: mappingData,
  },
];

// META DATA OPTIONS
export const metaDataOptions: { [key: string]: string }[] = [
  {
    name: "Nom du planteur",
    value: "nom_planteur",
  },
  {
    name: "Contact planteur",
    value: "contact_planteur",
  },
  {
    name: "Code du planteur",
    value: "code_planteur",
  },
  {
    name: "N° CNI",
    value: "cni",
  },
  {
    name: "Date de l'inspection",
    value: "date_de_inspection",
  },
  {
    name: "Village",
    value: "village",
  },
  {
    name: "Annee de certification",
    value: "annee_de_certification",
  },
  {
    name: "Nom de inspecteur",
    value: "nom_de_inspecteur",
  },
  {
    name: "Contact de inspecteur",
    value: "contact_de_inspecteur",
  },
  {
    name: "Angrais appliqué",
    value: "angrais_appliqué",
  },
  {
    name: "Quantité d'angrais appliqué",
    value: "qte_angrais_appliqué",
  },
  {
    name: "Pesticide utiliser",
    value: "pesticide_utiliser",
  },
  {
    name: "Quantité de Pesticide",
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
    title: "Justificatifs de payement de l'investissement de durabilité",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Plan de gestion de l'investissement de durabilité",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Différentiel de durabilité",
    href: "/docs/primitives/alert-dialog",
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
