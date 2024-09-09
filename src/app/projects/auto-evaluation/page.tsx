"use client"
import LayoutDashboard from '@/components/organisms/layoutDashboard'
import ProjectDisplay from '@/components/organisms/projectsDisplay'
import React, { useEffect } from 'react'

type Props = {}

export default function Home({}: Props) {

  // Fetch all projects with type ["AUTO_EVALUATION"] and pass it as props to Layout
  useEffect(() => {
    console.log("Auto-evaluation")
  }, [])

  return (
    <LayoutDashboard projectsPerType={[]} typeOfProject={["AUTO_EVALUATION"]}>
      <ProjectDisplay projects={[]}/>
    </LayoutDashboard>
  )
}