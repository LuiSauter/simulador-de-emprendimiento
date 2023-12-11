'use client'
/* eslint-disable space-before-function-paren */

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login')
    }
    return () => {
    }
  }, [status])

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Simulador de Emprendimiento</h1>
    </main>
  )
}
