'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import NotLoginMain from './components/NotLoginMain'

const UsersPage = () => {
  const { data: session, status } = useSession()
  if (status === 'unauthenticated') {
    return <NotLoginMain />
  }
  return (
    <div>
      <main></main>
    </div>
  )
}

export default UsersPage
