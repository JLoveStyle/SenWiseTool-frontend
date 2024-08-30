import { Route } from "@/lib/route";
import { Project } from "@/types/gestion";

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL

// THESE ARE OPTIONS OF THE NAVIGATIONMENU UNDER 'GESTION'
export const optionsGestions: { title: string; href: string; description: string }[] = [
  {
    title: "Inspection initial",
    href: "/docs/primitives/progress",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Inspection internes",
    href: Route.inspectionInterne,
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Auto-évaluation du groupe",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "mapping",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Outil d'évaluation des risques",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Plan de gestion",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
  {
    title: "Cartes",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
  {
    title: "Mécanismes de réclamation",
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
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
  {
    title: "Liste des producteurs",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  }
]

// THESE ARE OPTIONS OF THE NAVIGATIONMENU UNDER 'TRACABILITE'
export const optionsTracabilité: { title: string; href: string; description: string }[] = [
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
  }
]

// THESE ARE OPTIONS OF THE NAVIGATIONMENU UNDER 'REVENU ET RESPONSABILTE'
export const optionsRevenu: { title: string; href: string; description: string }[] = [
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

// THESE ARE OPTIONS OF TABLEHEAD IN INSPECTION INITIAL UNDER 'GESTION'
export const tableRaw: Project[] = [
  {
    id: "1",
    end_date: "2020-03-01",
    start_date: "2020-01-01",
    type: ["INITIAL_INPSECTION"],
    title: "Projet de figil ",
    description: "Campagn de distribtion des angraits bio pour la culture des oignions dans le village Figile",
    sector_activity: "",
    country: "Cameroon",
    status: ["DEPLOYED"],
    deployed_at: "2024/01/16",
    creator: "Gael",
    updated_at: "2024/03/20"
  },
  {
    id: "2",
    end_date: "2021-03-01",
    start_date: "2021-01-05",
    type: ["INITIAL_INPSECTION"],
    title: "Projet d'Akonolinga",
    description: "Projet de construcion des pépinière de pistier dans le village Akonolinga",
    sector_activity: "",
    country: "Cameroon",
    status: ["DRAFT"],
    deployed_at: "2024/01/16",
    creator: "Bigael",
    updated_at: "2024/03/20"
  },
  {
    id: "3",
    end_date: "2020-10-11",
    start_date: "2020-03-21",
    type: ["INITIAL_INPSECTION"],
    title: "Projet de Cacao",
    description: "Recolte de cacao dans le village de Yokadouma",
    sector_activity: "",
    country: "Cameroon",
    status: ["DRAFT"],
    deployed_at: "2024/01/16",
    creator: "Daniella",
    updated_at: "2024/03/20"
  }
]

export const requirements = [
  {
    chapter1: [
      {
        title: "Gestion",
        numero: "1.1",
        content: [
          {
            text: "La direction du groupe fait preuve de son engagement pour l'agriculture durable en dédiant des ressources et du personnel appropriés à la mise en oeuvre de la Norme pour l'Agriculture Durable de Rainforest Alliance.",
            num: "1.1.1",
            certif_de_group: {
              direction_du_group: "yes",
              petite_exploitation_agricole: "no",
              grande_exploitation_agricole: "no"
            }
          },
          {
            text: "La Direction du groupe améliore ses capacités de gestion et inclut des actions dans le plan de gestion.",
            num: "1.1.2",
            certif_de_group: {
              direction_du_group: "yes",
              petite_exploitation_agricole: "no",
              grande_exploitation_agricole: "no"
            }
          },
          {
            text: "La direction désigne au moins un représentant du personnel pour se charger des questions listées ci-dessous. Il sera également responsable de la création d'un ou plusieurs comités qui traiteront de ces questions. Un comité peut travailler sur plus d'une problématique :",
            num: "1.1.5",
            certif_de_group: {
              direction_du_group: "yes",
              petite_exploitation_agricole: "yes",
              grande_exploitation_agricole: "yes"
            }
          }
        ]
      },
      {
        title: "Administration",
        numero: "1.2",
        content: [
          {
            text: "La direction se conforme aux lois applicables et aux conventions collectives (CC) au sein du champ d'application de la Norme pour l'agriculture durable de Rainforest Alliance. Dans le cas où une législation applicable ou une CC est plus stricte qu'une exigence de la norme, cette législation ou cette CC prévaudra, sauf si cette législation est devenue obsolète. Dans le cas où une législation applicable ou une CC est moins stricte qu'une exigence de la norme, l’exigence de la norme prévaudra, sauf si l’exigence permet de manière explicite que cette loi ou CC s’applique.",
            num: "1.2.1",
            certif_de_group: {
              direction_du_group: "yes",
              petite_exploitation_agricole: "yes",
              grande_exploitation_agricole: "yes"
            }
          },
          {
            text: "Une liste actualisée des prestataires de services, fournisseurs, intermédiaires et sous-traitants est disponible. Des mécanismes sont mis en place pour garantir leur conformité avec les exigences applicables de la Norme pour leurs activités qui entrent dans le champ d’application de la certification.",
            num: "1.2.2",
            certif_de_group: {
              direction_du_group: "yes",
              petite_exploitation_agricole: "no",
              grande_exploitation_agricole: "yes"
            }
          }
        ]
      },

    ],
    
  },
  {
    chapitre2: [
      {
        title: "",
        numero: "",
        content: [
          {
            
          }
        ]
      }
    ]
  }
]