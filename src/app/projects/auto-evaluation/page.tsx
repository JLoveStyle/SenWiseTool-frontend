"use client"
import LayoutDashboard from '@/components/organisms/layoutDashboard'
import ProjectDisplay from '@/components/organisms/projectsDisplay'
import { Project } from '@/types/gestion'
import { LOCAL_STORAGE } from '@/utiles/services/storage'
import React, { useEffect } from 'react'

type Props = {}

export default function Home({}: Props) {

  const allProject: Project[] = LOCAL_STORAGE.get('all_projects')
  const projects = allProject.filter((item) => item?.type[0] === "AUTO_EVALUATION")
  console.log('allPro =>', allProject)

  // Fetch all projects with type ["AUTO_EVALUATION"] and pass it as props to Layout
  useEffect(() => {
    console.log("Auto-evaluation")
  }, [])

  return (
    <LayoutDashboard projectsPerType={projects} typeOfProject={["AUTO_EVALUATION"]}>
      <ProjectDisplay projects={projects}/>
    </LayoutDashboard>
  )
}