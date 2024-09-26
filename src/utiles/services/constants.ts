import { DeployableFormMetadata } from "@/components/atoms/colums-of-tables/deployableForm";
import { Route } from "@/lib/route";
import { Project } from "@/types/gestion";
import { allRequirements } from "@/utils/requirements";

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
// export const API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;
export const API_URL = process.env.NEXT_PUBLIC_LOCAL_API_URL;

// BUSINESS ACTIVITIES
export const businessActivity: string[] = [
  "Cocoa",
  "Coffee",
  "Banana",
  "Tee",
  "Wood",
  "Other",
];

// META DATA OPTIONS
export const metaDataOptions: { [key: string]: string }[] = [
  {
    name: "Nom du planteur",
    value: "nom_planteur"
  },
  {
    name: "Contact planteur",
    value: "contact_planteur"
  },
  {
    name: "Code du planteur",
    value: "code_planteur"
  },
  {
    name: "N° CNI",
    value: "cni"
  },
  {
    name: "Date de l'inspection",
    value: "date_de_inspection"
  },
  {
    name: "Village",
    value: "village"
  },
  {
    name: "Annee de certification",
    value: "annee_de_certification"
  },
  {
    name: "Nom de inspecteur",
    value: "nom_de_inspecteur"
  },
  {
    name: "Contact de inspecteur",
    value: "contact_de_inspecteur"
  },
  {
    name: "Angrais appliqué",
    value: "angrais_appliqué"
  },
  {
    name: "Quantité d'angrais appliqué",
    value: "qte_angrais_appliqué"
  },
  {
    name: "Pesticide utiliser",
    value: "pesticide_utiliser"
  },
  {
    name: "Quantité de Pesticide",
    value: "qte_pesticide"
  },
]

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
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Evalution risks tools",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Management plan",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
    {
      title: "Maps",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
    {
      title: "Reclamation mechanosms",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
    {
      title: "Organigramme du SGI",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
    {
      title: "Formation",
      href: Route.trainingProject,
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
    {
      title: "Lists of farmers",
      href: "/docs/primitives/tooltip",
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
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Fiche d'accompagnement à l'usine",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Bordereaux de vente",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Fiche de transmission et de déclaration",
      href: "/docs/primitives/alert-dialog",
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
  ]

// THESE ARE OPTIONS OF TABLEHEAD IN INSPECTION INITIAL UNDER 'GESTION'
export const tableHead: string[] = [
  'Project name', "Status", "Creator", "Last update", "Deployment date", "Start date"
]

// DIFFERENTS CHAMPTERS
export const chapters: string[] = ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6"]

// THESE ARE OPTIONS OF TABLEHEAD IN INSPECTION INITIAL UNDER 'GESTION'
export let tableRaw: Project[] = [
  {
    id: "1",
    end_date: "2020-03-01",
    start_date: "2020-01-01",
    type: "INITIAL_INSPECTION",
    title: "Projet de figil",
    description: "Campagn de distribtion des angraits bio pour la culture des oignions dans le village Figile",
    sector_activity: "",
    country: "Cameroon",
    status: "DEPLOYED",
    deployed_at: "2024/01/16",
    creator: "Gael",
    updated_at: "2024/03/20",
    city: "",
    state: ""
  },
  {
    id: "2",
    end_date: "2021-03-01",
    start_date: "2021-01-05",
    type: "INITIAL_INSPECTION",
    title: "Projet d'Akonolinga",
    description: "Projet de construcion des pépinière de pistier dans le village Akonolinga",
    sector_activity: "",
    country: "Cameroon",
    status: "DRAFT",
    deployed_at: "2024/01/16",
    creator: "Bigael",
    updated_at: "2024/03/20",
    city: "",
    state: ""
  },
  {
    id: "3",
    end_date: "2020-10-11",
    start_date: "2020-03-21",
    type: "INITIAL_INSPECTION",
    title: "Projet de Cacao",
    description: "Recolte de cacao dans le village de Yokadouma",
    sector_activity: "",
    country: "Cameroon",
    status: "DRAFT",
    deployed_at: "2024/01/16",
    creator: "Daniella",
    updated_at: "2024/03/20",
    city: "",
    state: ""
  }
]


export const requirements = allRequirements;


export const deployedPro: DeployableFormMetadata[] = [
  {
    // id: "1",
    principal_requirement: "La direction du groupe collecte les données sur les facteurs déterminants des coûts de production (ex : coûts des engrais, des produits agrochimiques, travail payé, équipement) et calcule le revenu net d'un culture agricole certifié pour un échantillon des membres du groupe (c’est-à-dire : revenu brut – coûts de production = revenu net) . La direction du groupe partage les données analysées avec les membres du groupe.",
    number: "2.1.1",
    certication_de_group: {
      direction_de_group: "yes",
      petit_exp_agri: "no",
      grande_exp_agri: "no"
    },
    comment: "",
    status: {
      C: false,
      NC: false,
      NA: false
    }
  },
  {
    // id: "2",
    principal_requirement: "Dans le cas où une législation applicable ou une CC est plus stricte qu'une exigence de la norme, cette législation ou cette CC prévaudra, sauf si cette législation est devenue obsolète. Dans le cas où une législation applicable ou une CC est moins stricte qu'une exigence de la norme, l’exigence de la norme prévaudra, sauf si l’exigence permet de manière explicite que cette loi ou CC s’applique.",
    number: "2.1.2",
    certication_de_group: {
      direction_de_group: "yes",
      petit_exp_agri: "no",
      grande_exp_agri: "no"
    },
    comment: "",
    status: {
      C: false,
      NC: false,
      NA: false
    }
  },
  {
    // id: "3",
    principal_requirement: "Le revenu net réel des ménages des membres du groupe est évalué sur la base de la valeur de référence du revenu vital appliqué à un échantillon de membres.",
    number: "2.1.3",
    certication_de_group: {
      direction_de_group: "yes",
      petit_exp_agri: "no",
      grande_exp_agri: "no"
    },
    comment: "",
    status: {
      C: false,
      NC: false,
      NA: false
    }
  },
  {
    // id: "4",
    principal_requirement: "Le revenu net réel des ménages des membres du groupe est évalué sur la base de la valeur de référence du revenu vital appliqué à un échantillon de membres.",
    number: "2.1.4",
    certication_de_group: {
      direction_de_group: "yes",
      petit_exp_agri: "no",
      grande_exp_agri: "no"
    },
    comment: "jkdbvsdv osdv usdvu",
    status: {
      C: false,
      NC: false,
      NA: false
    }
  },

]
