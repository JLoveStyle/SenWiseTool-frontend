import { ChapterMetaData } from "@/components/atoms/colums-of-tables/chapter";
import { DeployableFormMetadata } from "@/components/atoms/colums-of-tables/deployableForm";
import { Route } from "@/lib/route";
import { Project } from "@/types/gestion";
import { allRequirements } from "@/utils/requirements";

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
// export const API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;sss
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

// MAPPING DATA COLUMNS
export const MappingTableColumns: string[] = ["No", "Farmer name", "Farmer status", "Farmer contact", "NID number", "Farm creation date", "Village", "Mapper name", "Mapping date", "Farm surface area", "Farm picture", "Farmer picture", "Coordinates"]

// GEOJSON POINTS FOR POLYGON
export const tenPoints = [
  [
    [-122.4194, 37.7749], // Point 1
    [-122.4185, 37.7758], // Point 2
    [-122.4176, 37.7767], // Point 3
    [-122.4167, 37.7776], // Point 4
    [-122.4158, 37.7785], // Point 5
    [-122.4149, 37.7794], // Point 6
    [-122.4140, 37.7803], // Point 7
    [-122.4131, 37.7812], // Point 8
    [-122.4122, 37.7821], // Point 9
    [-122.4113, 37.7830], // Point 10
    [-122.4194, 37.7749] // Closing point (same as Point 1)
  ]
]
export const eightPoints = [
  [
    [-118.24, 34.05], // Vertex 1
    [-119.25, 35.06], // Vertex 2
    [-120.26, 36.05], // Vertex 3
    [-123.25, 40.04], // Vertex 4
    [-234.24, 52.05], // Vertex 5
    [-245.23, 43.06], // Vertex 6
    [-118.22, 34.05], // Vertex 7
    [-118.23, 34.04], // Vertex 8
    [-118.24, 34.05] // Back to Vertex 1 to close the polygon
  ]
]

export const thirteen = [
  [
    [-118.24, 34.05], // Point 1
    [-119.25, 31.06], // Point 2
    [-120.26, 35.05], // Point 3
    [-118.25, 31.04], // Point 4
    [-120.24, 39.05], // Point 5
    [-136.23, 30.06], // Point 6
    [-125.22, 45.05], // Point 7
    [-140.23, 29.04], // Point 8
    [-130.24, 46.05], // Point 9
    [-120.25, 43.06], // Point 10
    [-141.26, 38.05], // Point 11
    [-151.25, 40.04], // Point 12
    [-118.24, 34.05] // Point 13
  ]
]

// EXAMPLE OF MAPPING DATA FROM FIELD
export const mappingData: { [key: string]: any }[] = [
  {
    geoPoints: tenPoints,
    nom_producteur: "Onana Jeqn de Dieu",
    statut_producteur: "Propritaire",
    contact_du_producteur: "670710054",
    no_cni: 145614851135,
    date_de_creation_plant: '10/10/2001',
    village: "Ndokayo",
    code_du_planteur: '0001',
    nom_du_mappeur: "Jean Blaise Piment",
    date: '10/05/2021',
    superficie_estimé: "10ha",
    photo_plantation: 'https://edgestore/plantation.jpg',
    photo_planteur: 'https://edgestore/planteur.jpeg',
    coordinate: [
      {
        log: -122.4194,
        lat: 37.7749
      },
      {
        log: -122.4185,
        lat: 37.7758
      },
      {
        log: -122.4176,
        lat: 37.7767
      },
      {
        log: -122.4167,
        lat: 37.7776
      },
      {
        log: -122.4158,
        lat: 37.7785
      },
      {
        log: -122.4149,
        lat: 37.7794
      },

      {
        log: -122.4140,
        lat: 37.7803
      },
      {
        log: -122.4131,
        lat: 37.7812
      },
      {
        log: -122.4122,
        lat: 37.7821
      },
      {
        log: -122.4113,
        lat: 37.7830
      },
      {
        log: -122.4194,
        lat: 37.7749
      },
    ]

  },
  {
    geoPoints: eightPoints,
    nom_producteur: "Parfait Essono Bijock",
    statut_producteur: "Locataire",
    contact_du_producteur: "670710054",
    no_cni: 145614851135,
    date_de_creation_plant: '10/10/2001',
    village: "Ntui",
    code_du_planteur: '11104',
    nom_du_mappeur: "Jean pierre Fokong",
    date: '10/05/2021',
    superficie_estimé: "50ha",
    photo_plantation: 'https://edgestore/plantation.jpg',
    photo_planteur: 'https://edgestore/planteur.jpeg',
    coordinate: [
      {
        log: -118.24,
        lat: 34.05
      },
      {
        log: -119.25,
        lat: 35.06
      },
      {
        log: -120.26,
        lat: 36.05
      },
      {
        log: -123.25,
        lat: 40.04
      },
      {
        log: -234.24,
        lat: 52.05
      },
      {
        log: -245.23,
        lat: 43.06
      },
      {
        log: -118.22,
        lat: 34.05
      },
      {
        log: -135.23,
        lat: 34.04
      },
      {
        log: -118.24,
        lat: 34.05
      },
    ]

  },
  {
    geoPoints: thirteen,
    nom_producteur: "Marguerite de la fontaine",
    statut_producteur: "Propritaire",
    contact_du_producteur: "670710054",
    no_cni: 145614851135,
    date_de_creation_plant: '10/10/2001',
    village: "Mbeng",
    code_du_planteur: '014014',
    nom_du_mappeur: "Pascal Azombo",
    date: '10/05/2021',
    superficie_estimé: "80ha",
    photo_plantation: 'https://edgestore/plantation.jpg',
    photo_planteur: 'https://edgestore/planteur.jpeg',
    coordinate: [
      {
        log: -118.24,
        lat: 34.05
      },
      {
        log: -119.25,
        lat: 31.06
      },
      {
        log: -120.26,
        lat: 35.05
      },,
      {
        log: -118.25,
        lat: 31.04
      },
      {
        log: -120.24,
        lat: 39.05
      },
      {
        log: -136.23,
        lat: 30.06
      },
      {
        log: -125.22,
        lat: 45.05
      },
      {
        log: -140.23,
        lat: 29.04
      },
      {
        log: -130.24,
        lat: 46.05
      },
      {
        log: -120.25,
        lat: 43.06
      },
      {
        log: -141.26,
        lat:  38.05
      },
      {
        log: -151.25,
        lat: 40.04
      },
      {
        log: -118.24,
        lat: 34.05
      },
    ]

  }
]

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
      href: Route.mapping,
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
      title: "Reclamation mechanism",
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

export const requirements = allRequirements
