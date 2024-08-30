"use client"
import LayoutDashboard from '@/components/organisms/layoutDashboard'
import React from 'react'

type Props = {}

export default function Home({}: Props) {
  return (
    <div>
      <LayoutDashboard>
        <h1 className='text-xl font-bold'>My Projects</h1>
      </LayoutDashboard>
    </div>
  )
}