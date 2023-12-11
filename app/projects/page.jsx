'use client'
import ProjectItem from '@/components/project-item'
import { useModal } from '@/hooks/useModal'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Projects = () => {
  const { CreateProjectModal, setShowCreateModal } = useModal({ update: false, project: null })
  const [projects, setProjects] = useState(null)
  const { data } = useSession()

  const getAllProjects = async (email) => {
    const response = await fetch(`/api/user/${email}`)
    return await response.json()
  }

  let subscribe = true
  useEffect(() => {
    if (subscribe) {
      data?.user && getAllProjects(data?.user.email).then(user => {
        console.log(user)
        setProjects(user.projects)
      })
    }

    return () => {
      subscribe = false
    }
  }, [data?.user])

  return (
    <div className='flex flex-col justify-center min-h-[calc(100vh-56px)] p-4 md:px-6 max-w-screen-xl mx-auto'>
      <CreateProjectModal />
      <section className='flex flex-row items-center gap-4 py-6'>
        <h3>Mis proyectos</h3>
        <button onClick={() => setShowCreateModal(true)} className='px-4 py-1 bg-tertiary rounded-lg hover:bg-tertiary/80'>Crear</button>
      </section>
      <section
        // className='flex flex-row overflow-x-auto p-4 my-auto h-full gap-6 snap-x snap-mandatory'
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden py-4 my-auto h-full gap-6 snap-x snap-mandatory flex-wrap justify-center w-full'
      >
        {projects
          ? projects.length !== 0
            ? projects.map(project => (
              <ProjectItem key={project._id} project={project} />
            ))
            : (
              <div className='sm:col-span-2 lg:col-span-3 w-full h-full flex flex-col justify-center items-center p-4 lg:p-10'>
                <Image src='/notcontent.svg' width={300} height={300} alt='simulador de emprendimiento' className='w-full md:w-1/2' />
                <p className='text-base text-textSecondary py-6'>Aún no ha creado ningún proyecto.</p>
              </div>)
          : (
            <div className='bg-secondary/90 hover:bg-secondary/70 hover:brightness-110 h-[395px] lg:h-[370px] brightness-95 transition border border-secondary2 rounded-xl py-4 md:py-6 flex flex-col gap-4 snap-center backdrop-blur-xl animate-pulse'>
              {/* <span>Cargando todos los proyectos</span>
              <span className='loading loading-spinner' /> */}
            </div>)}
      </section>
    </div>
  )
}

export default Projects
