/* eslint-disable space-before-function-paren */
'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useModal } from '@/hooks/useModal'
import ProjectItem from '@/components/project-item'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Bar, Line, Pie } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
  Tooltip,
  Legend,
  ArcElement
)

export const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart - Multi Axis'
    }
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left'
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false
      }
    }
  }
}

const colors = [
  { backgroundColor: 'rgba(75,192,192,0.2)', borderColor: 'rgba(75,192,192,1)' },
  { backgroundColor: 'rgba(255,99,132,0.2)', borderColor: 'rgba(255,99,132,1)' },
  { backgroundColor: 'rgba(255, 206, 86, 0.2)', borderColor: 'rgba(255, 206, 86, 1)' }
]

const ProjectIdPage = ({ params }) => {
  const getProject = async (id) => {
    const response = await fetch(`/api/projects/${id}`)
    return await response.json()
  }

  const [project, setProject] = useState(null)
  const [simulation, setSimulation] = useState(null)
  const searchParams = useSearchParams()
  const { CreateProjectModal, setShowCreateModal } = useModal({ update: true, project })

  useEffect(() => {
    getProject(params.id)
      .then(res => {
        setProject(res)
        searchParams.get('simulation') && setSimulation(res.simulationResults.find(simu => simu._id === searchParams.get('simulation')))
      })
    return () => {
    }
  }, [])

  if (!project) {
    return (
      <div className='grid place-content-center place-items-center h-full min-h-[calc(100vh-56px)]'>
        <div className='flex items-center gap-4'>
          <span>Cargando la simulación</span>
          <span className='loading loading-spinner bg-tertiary' />
        </div>
      </div>
    )
  }

  return (
    <div className='grid place-content-center place-items-center min-h-screen w-full'>
      <CreateProjectModal />
      <section className='p-5 md:p-6 w-full grid grid-cols-none md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-hidden relative place-content-center place-items-center max-w-screen-xl mx-auto'>
        <div className='bg-secondary w-full flex-col gap-4 h-full rounded-xl border border-secondary2 p-5 min-h-[300px] flex justify-center items-center'>
          <ProjectItem project={project} isProjectId />
          {/* {features.map((feat, index) => (
            <article className={`${feat.size} relative w-full flex justify-center items-center`} key={index}>{feat.demo}</article>
          ))} */}
          <button onClick={() => setShowCreateModal(true)} className='w-full px-4 py-2 bg-tertiary hover:bg-tertiary/70 transition rounded-lg'>Editar</button>
        </div>
        {!searchParams.get('simulation') && (
          <div className='col-span-1 lg:col-span-2 bg-secondary w-full h-full rounded-xl border border-secondary2 p-5 min-h-[300px] flex justify-center items-center'>
            <Line
              className='w-full h-full'
              data={{
                labels: ['Ingresos', 'Ganancias', 'Pérdidas'],
                datasets: [
                  ...project.simulationResults.map(({ newResults }, index) => ({
                    label: `Simulación ${index}`,
                    data: [newResults.newIncome, newResults.newProfits, newResults.newLosses],
                    backgroundColor: colors[index].backgroundColor,
                    borderColor: colors[index].borderColor,
                    borderWidth: 1
                  }))
                ]
              }} options={{
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>)}
        {simulation && (
          <>
            <div className='col-span-1 lg:col-span-2 bg-secondary w-full h-full rounded-xl border border-secondary2 p-5 min-h-[300px] flex justify-center items-center'>
              <Bar
                className='w-full' data={{
                  labels: ['Ingresos Actuales', 'Ingresos Nuevos', 'Ganancias Actuales', 'Ganancias Nuevas'],
                  datasets: [
                    {
                      label: 'Bolivianos',
                      data: [
                        simulation.currentResults.actualIncome,
                        simulation.newResults.newIncome,
                        simulation.currentResults.currentProfits,
                        simulation.newResults.newProfits
                      ],
                      backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(113, 112, 243, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                      ],
                      borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(113, 112, 243, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)'
                      ],
                      borderWidth: 1
                    }
                  ]
                }} options={{
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </div>
            <div className='bg-secondary w-full h-full rounded-xl border border-secondary2 p-5 min-h-[300px] lg:col-span-2 flex justify-center items-center'>
              <Bar
                className='w-full' data={{
                  labels: ['Ganancias y Pérdidas Actuales', 'Ganancias y Pérdidas Nuevas'],
                  datasets: [
                    {
                      label: 'Ganancias',
                      data: [simulation.currentResults.currentProfits, simulation.newResults.newProfits],
                      backgroundColor: 'rgba(33,196, 106, 0.5)'
                    },
                    {
                      label: 'Pérdidas',
                      data: [simulation.currentResults.currentLosses, simulation.newResults.newLosses],
                      backgroundColor: 'rgba(241, 55, 122, 0.5)'
                    }
                  ]
                }}
              />
            </div>
            <div className='bg-secondary w-full h-full rounded-xl border border-secondary2 p-5 min-h-[300px] flex justify-center items-center'>
              <Pie
                className='w-full' data={{
                  labels: ['Impacto en la Demanda', 'Impacto en la Oferta'],
                  datasets: [
                    {
                      label: 'Impacto',
                      data: [simulation.newResults.demandImpact, simulation.newResults.offerImpact],
                      backgroundColor: ['rgba(255, 206, 86, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                      borderColor: ['rgba(255, 206, 86, 1)', 'rgba(54, 162, 235, 1)'],
                      borderWidth: 1
                    }
                  ]
                }}
              />
            </div>
            <div className=' bg-secondary w-full h-full rounded-xl border border-secondary2 p-5 min-h-[300px] flex justify-center items-center'>
              <Bar
                className='w-full' data={{
                  labels: ['Precio de Equilibrio', 'Cantidad de Equilibrio'],
                  datasets: [
                    {
                      label: 'Equilibrio de Mercado',
                      data: [simulation.newResults.marketEquilibrium.equilibriumPrice, simulation.newResults.marketEquilibrium.equilibriumQuantity],
                      backgroundColor: 'rgba(75,192,192,0.2)',
                      borderColor: 'rgba(75,192,192,1)',
                      borderWidth: 1,
                      fill: false
                    }
                  ]
                }}
              />
            </div>
            <div className=' bg-secondary lg:col-span-2 w-full h-full rounded-xl border border-secondary2 p-5 min-h-[300px] flex justify-center items-center'>
              <Line
                className='w-full' data={{
                  labels: ['Ingresos', 'Ganancias', 'Pérdidas'],
                  datasets: [
                    {
                      label: 'Resultados Actuales',
                      data: [simulation.currentResults.actualIncome, simulation.currentResults.currentProfits, simulation.currentResults.currentLosses],
                      backgroundColor: 'rgba(75,192,192,0.2)',
                      borderColor: 'rgba(75,192,192,1)',
                      borderWidth: 1,
                      fill: false
                    },
                    {
                      label: 'Resultados Nuevos',
                      data: [simulation.newResults.newIncome, simulation.newResults.newProfits, simulation.newResults.newLosses],
                      backgroundColor: 'rgba(255,99,132,0.2)',
                      borderColor: 'rgba(255,99,132,1)',
                      borderWidth: 1,
                      fill: false
                    }
                  ]
                }} options={{
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </div>
          </>)}
      </section>
    </div>
  )
}

export default ProjectIdPage
