'use client'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const LoginPage = () => {
  const { status, data } = useSession()
  const [loading, setLoading] = useState(false)
  const [enable, setEnable] = useState(false)
  const router = useRouter()

  const SignInUser = async (user) => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      const data = await response.json()
      if (data && (data.message === 'sign in' || data.message === 'sign up')) {
        router.push('/projects')
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      setLoading(true)
      SignInUser(data?.user).finally(() => setLoading(false))
    }
  }, [status])

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnable(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='min-h-full md:min-h-screen flex md:flex-row justify-center items-center bg-tertiary'>
      <div className='flex min-h-screen w-full flex-col justify-center px-6 py-12 lg:px-8 md:rounded-r-3xl transition bg-primary'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <figure className='mx-auto h-52 w-52 flex items-center justify-center rounded-full overflow-hidden shadow-xl shadow-tertiary/30'>
            <Image
              priority
              className='' src='/logo.svg' alt='Simulador de emprendimiento'
              width={208} height={208}
            />
          </figure>
          <h2 className='mt-10 text-left text-lg font-normal leading-9 tracking-tight'>Iniciar sesión para continuar al</h2>
          <h1 className='text-2xl md:text-3xl font-bold leading-9 tracking-tight'>Simulador de emprendimiento</h1>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <div>
            <button
              disabled={!enable} onClick={() => {
                enable && signIn('google')
              }} className='flex w-full justify-center rounded-xl bg-tertiary px-4 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-tertiary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary'
            >{enable ? loading ? <span className='loading loading-spinner' /> : 'Iniciar sesión con Google' : 'Espere un momento...'}
            </button>
          </div>
        </div>
        <footer className='text-center text-sm text-textSecondary pt-4'>
          <p>Feria Semilleros 2-2023</p>
        </footer>
      </div>
      <div className='bg-tertiary md:h-screen w-full hidden md:flex flex-col justify-center items-center p-6 lg:p-20'>
        <Image
          priority
          className='bg-transparent h-auto w-auto' src='/login.svg' alt='Simulador de emprendimiento'
          width={400} height={279.94}
        />
      </div>
    </div>
  )
}

export default LoginPage
