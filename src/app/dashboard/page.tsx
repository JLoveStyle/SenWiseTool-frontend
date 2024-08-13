'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import React from 'react'

type Props = {}

export default function Home({}: Props) {
  const {user} = useUser()
  console.log(user)
  return (
    <div className='flex justify-between'>
      <h1>Hello Dashboard</h1>
      <UserButton afterSignOutUrl='/' />
    </div>
  )
}