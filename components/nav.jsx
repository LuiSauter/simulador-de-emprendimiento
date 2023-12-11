/* eslint-disable space-before-function-paren */
'use client'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import DropdownMenu from './ui/dropdown-menu'
import { useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const { status, data } = useSession()
  const [openPopover, setOpenPopover] = useState(false)
  return (
    <nav className='sticky top-0 bg-primary left-0 right-0 w-full z-40'>
      <ul className='flex flex-row w-full items-center max-w-screen-xl mx-auto py-2 justify-between px-4 sm:px-6'>
        <Link href='/projects' className='flex flex-row gap-4 items-center flex-nowrap'>
          <figure className='overflow-hidden flex flex-shrink-0 rounded-full shadow-lg shadow-tertiary/30'>
            <Image src='/logo.svg' width={40} height={40} alt='Simulador de Emprendimiento' />
          </figure>
          <span className='text-sm sm:text-base font-medium '>/ Simulador de Emprendimiento</span>
        </Link>
        {
          status === 'authenticated'
            ? (
              <li className='flex flex-row gap-2 items-center'>
                <DropdownMenu
                  openPopover={openPopover}
                  setOpenPopover={setOpenPopover}
                  content={
                    <div className='w-full rounded-md p-2'>
                      <div className='w-full flex flex-col rounded-md p-2 text-sm hover:bg-secondary cursor-default [&>span]:hover:bg-secondary'>
                        <span className=''>{data?.user.name}</span>
                        <span className='text-textSecondary'>{data?.user.email}</span>
                      </div>
                      <hr className='border-secondary2 my-2' />
                      <button
                        onClick={() => signOut({ redirect: '/login' })}
                        className='flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-secondary active:bg-secondary2'
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  }
                >
                  <button
                    onClick={() => setOpenPopover(!openPopover)}
                    className={`${openPopover && 'dark:text-white'
                      } flex gap-2 w-fit items-center justify-between transition-all hover:text-black dark:hover:text-white flex-shrink-0`}
                  >
                    <Image src={data?.user.image} width={30} height={30} alt='Simulador de Emprendimiento' className='rounded-full flex flex-shrink-0' />
                    <span className='hidden text-base md:flex'>{data?.user.name}</span>
                  </button>
                </DropdownMenu>
              </li>)
            : <li>cargando...</li>
        }
      </ul>
    </nav>
  )
}
