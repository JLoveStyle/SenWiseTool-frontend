import LayoutDashboardTemplate from '@/components/templates/layout-dashboard-template'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <LayoutDashboardTemplate title='Plan de Management'>
      <p>management-plan</p>
    </LayoutDashboardTemplate>
  )
}