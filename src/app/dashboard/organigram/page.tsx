import LayoutDashboardTemplate from '@/components/templates/layout-dashboard-template'
import React from 'react'

type Props = {}

export default function Home({}: Props) {
  return (
    <LayoutDashboardTemplate title='SGI ORGANIGRAM'>
      <p>Organigramme</p>
    </LayoutDashboardTemplate>
  )
}