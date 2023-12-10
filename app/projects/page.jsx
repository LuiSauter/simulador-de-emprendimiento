'use client'
import ProjectItem from '@/components/project-item'
import { useModal } from '@/hooks/useModal'
import Image from 'next/image'
import React, { useState } from 'react'

const projectsData = [
  {
    id: '14124ada214',
    name: 'Green Harvest',
    description: 'Green Harvest se dedica a la producción y comercialización de productos orgánicos y sostenibles. Nuestra misión es proporcionar alimentos saludables y respetuosos con el medio ambiente, promoviendo prácticas agrícolas sostenibles. Buscamos satisfacer la creciente demanda de productos ecológicos en el mercado.',
    industry: 'Agricultura Sostenible',
    estimatedIncome: 50000,
    costs: {
      fixed: 12000,
      variables: 18000
    },
    production: {
      unitsProduced: 600,
      productionCapacity: 800
    },
    prices: {
      actualPrice: 80,
      newPrice: 85
    },
    offerDemand: {
      currentDemand: 700,
      newDemand: 800,
      currentOffer: 800,
      newOffer: 700
    },
    simulationResults: ['1', '2']
  },
  {
    id: '11241zxc244',
    name: 'Tech Innovators',
    description: 'Tech Innovators se dedica al desarrollo de soluciones tecnológicas innovadoras. Nos especializamos en aplicaciones móviles y plataformas web de última generación. Nuestro objetivo es transformar ideas en productos digitales impactantes.',
    industry: 'Agricultura Sostenible',
    estimatedIncome: 100000,
    costs: {
      fixed: 12000,
      variables: 18000
    },
    production: {
      unitsProduced: 600,
      productionCapacity: 800
    },
    prices: {
      actualPrice: 80,
      newPrice: 85
    },
    offerDemand: {
      currentDemand: 700,
      newDemand: 800,
      currentOffer: 800,
      newOffer: 700
    },
    simulationResults: ['1']
  },
  {
    id: '11241xcbxcb244',
    name: 'Tech Innovators',
    description: 'Tech Innovators se dedica al desarrollo de soluciones tecnológicas innovadoras. Nos especializamos en aplicaciones móviles y plataformas web de última generación. Nuestro objetivo es transformar ideas en productos digitales impactantes.',
    industry: 'Agricultura Sostenible',
    estimatedIncome: 100000,
    costs: {
      fixed: 12000,
      variables: 18000
    },
    production: {
      unitsProduced: 600,
      productionCapacity: 800
    },
    prices: {
      actualPrice: 80,
      newPrice: 85
    },
    offerDemand: {
      currentDemand: 700,
      newDemand: 800,
      currentOffer: 800,
      newOffer: 700
    },
    simulationResults: ['1']
  },
  {
    id: '112412dfgfdasd44',
    name: 'Tech Innovators',
    description: 'Tech Innovators se dedica al desarrollo de soluciones tecnológicas innovadoras. Nos especializamos en aplicaciones móviles y plataformas web de última generación. Nuestro objetivo es transformar ideas en productos digitales impactantes.',
    industry: 'Agricultura Sostenible',
    estimatedIncome: 100000,
    costs: {
      fixed: 12000,
      variables: 18000
    },
    production: {
      unitsProduced: 600,
      productionCapacity: 800
    },
    prices: {
      actualPrice: 80,
      newPrice: 85
    },
    offerDemand: {
      currentDemand: 700,
      newDemand: 800,
      currentOffer: 800,
      newOffer: 700
    },
    simulationResults: ['1']
  },
  {
    id: '112412asd4asd4',
    name: 'Tech Innovators',
    description: 'Tech Innovators se dedica al desarrollo de soluciones tecnológicas innovadoras. Nos especializamos en aplicaciones móviles y plataformas web de última generación. Nuestro objetivo es transformar ideas en productos digitales impactantes.',
    industry: 'Agricultura Sostenible',
    estimatedIncome: 100000,
    costs: {
      fixed: 12000,
      variables: 18000
    },
    production: {
      unitsProduced: 600,
      productionCapacity: 800
    },
    prices: {
      actualPrice: 80,
      newPrice: 85
    },
    offerDemand: {
      currentDemand: 700,
      newDemand: 800,
      currentOffer: 800,
      newOffer: 700
    },
    simulationResults: ['1']
  },
  {
    id: '1124asd1244asd',
    name: 'Tech Innovators',
    description: 'Tech Innovators se dedica al desarrollo de soluciones tecnológicas innovadoras. Nos especializamos en aplicaciones móviles y plataformas web de última generación. Nuestro objetivo es transformar ideas en productos digitales impactantes.',
    industry: 'Agricultura Sostenible',
    estimatedIncome: 100000,
    costs: {
      fixed: 12000,
      variables: 18000
    },
    production: {
      unitsProduced: 600,
      productionCapacity: 800
    },
    prices: {
      actualPrice: 80,
      newPrice: 85
    },
    offerDemand: {
      currentDemand: 700,
      newDemand: 800,
      currentOffer: 800,
      newOffer: 700
    },
    simulationResults: ['1']
  }
]

const Projects = () => {
  const [projects, setProjects] = useState(projectsData)
  const { CreateProjectModal, setShowCreateModal } = useModal({ update: false, project: null })
  return (
    <div className='flex flex-col justify-center min-h-[calc(100vh-56px)] p-4 md:px-6'>
      <CreateProjectModal />
      <section className='flex flex-row items-center gap-4'>
        <h3>Mis proyectos</h3>
        <button onClick={() => setShowCreateModal(true)} className='px-4 py-1 bg-tertiary rounded-lg hover:bg-tertiary/80'>Crear</button>
      </section>
      <section className='flex flex-row overflow-x-auto p-4 my-auto h-full gap-6 snap-x snap-mandatory'>
        {projects.map(project => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </section>
    </div>
  )
}

export default Projects
