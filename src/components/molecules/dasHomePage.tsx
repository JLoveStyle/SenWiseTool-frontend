"use client";

import { Route } from "@/lib/route";
import { ProjectType, TrainingType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";

export const DasHomePage = () => {
  const [allProjects, setAllProjects] = useState<ProjectType[]>([]);
  const [archiveProjects, setArchiveProjects] = useState<ProjectType[]>([]);
  const [allTrainings, setAllTrainigs] = useState<Array<TrainingType>>([]);

  async function fetchAllActiveProjects() {
    await fetchApiData(Route.projects, "?status=DEPLOYED", "")
      .then((response) => {
        if (response.status === 200 && response.data.length) {
          const filteredData = response.data.filter((p: ProjectType) => p.code.length < 5);
          setAllProjects(filteredData);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    await fetchApiData(Route.projects, "?status=ARCHIVED", "")
      .then((response) => {
        if (response.status === 200 && response.data.length) {
          const filteredData = response.data.filter((p: ProjectType) => p.code.length < 5);
          setArchiveProjects(filteredData);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    await fetchApiData(Route.training, "")
      .then((response) => {
        if (response.status === 200 && response.data.length) {
          let filteredData = response.data.filter((t: TrainingType) => t.code.length < 5);
          setAllTrainigs(filteredData);
        }
      }
      )
      .catch((error) => {
        console.log(error);
      }
      );
  }

  useEffect(() => {
    fetchAllActiveProjects();
  }, []);

  return (
    <div className=" font-sans min-h-screen flex flex-col mb-5">
      <main className="p-6 space-y-8 flex-grow">
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl flex justify-between items-center"
        >
          <div>
            <h2 className="text-3xl font-semibold mb-3 text-orange-700 dark:text-orange-400">
              Bienvenue sur le Tableau de Bord
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Gérer la digitalisation des processus de traçabilité de manière
              efficace, du champ à l'usine de transformation.
            </p>
          </div>
          <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg shadow-md flex gap-3 items-center">
            <FaCrown className="text-yellow-600 text-5xl mx-auto" />
            <div>
              <p className="font-semibold">Forfait Gold</p>
              <p className="text-sm">Accédez à des fonctionnalités avancées</p>
            </div>
          </div>
        </motion.section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Projets Actifs", value: allProjects?.length },
            { title: "Projets Archivés", value: archiveProjects?.length },
            { title: "Projets de formation", value: allTrainings?.length ?? 0 },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-orange-800 dark:text-orange-300">
                {stat.title}
              </h3>
              <p className="text-4xl font-bold text-orange-700 dark:text-orange-400">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </section>

        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-orange-700 dark:text-orange-300">
            Chapitres
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Gestion",
                description: "Inspection, mapping, formations...",
              },
              {
                title: "Traçabilité",
                description: "Reçus, fiches, bordereaux...",
              },
              {
                title: "Revenus et Responsabilités",
                description: "Partage des revenus...",
              },
              {
                title: "Agriculture",
                description: "Suivi des pratiques agricoles...",
              },
              { title: "Social", description: "Impact social..." },
              {
                title: "Environnement",
                description: "Protection de l’environnement...",
              },
            ].map((chapter, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-700 dark:to-gray-800 rounded-lg hover:bg-orange-200 dark:hover:bg-gray-700 transition"
              >
                <h3 className="font-semibold text-orange-800 dark:text-orange-400">
                  {chapter.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {chapter.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-orange-700 dark:text-orange-300">
            Projets
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-orange-100 dark:bg-gray-700">
                <th className="p-3 text-left">Nom du Projet</th>
                <th className="p-3 text-left">Statut</th>
                <th className="p-3 text-left">Dernière Mise à Jour</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Projet Alpha",
                  status: "Draft",
                  date: "2024-12-10",
                },
                { name: "Projet Beta", status: "Deploy", date: "2024-12-09" },
                {
                  name: "Projet Gamma",
                  status: "Archiv",
                  date: "2024-11-30",
                },
              ].map((project, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="hover:bg-orange-50 dark:hover:bg-gray-600 transition"
                >
                  <td className="p-3">{project.name}</td>
                  <td className="p-3">{project.status}</td>
                  <td className="p-3">{project.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </section> */}
      </main>
    </div>
  );
};
