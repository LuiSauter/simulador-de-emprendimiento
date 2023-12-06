'use client'
import { useSearchParams } from 'next/navigation'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useModal } from '@/hooks/useModal'
import ProjectItem from '@/components/project-item'
import calcularSimulacion from '@/logic/simulation'
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

const DynamicCardProject = dynamic(() => import('@/components/project-item'))

const allCards = [DynamicCardProject]

const project = {
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
    newPrice: 100
  },
  offerDemand: {
    currentDemand: 700,
    newDemand: 800,
    currentOffer: 800,
    newOffer: 700
  },
  simulationResults: ['1', '2']
}

const ProjectIdPage = ({ params }) => {
  const [cards, setCards] = useState(allCards)
  const { nuevosResultados, resultadosActuales } = calcularSimulacion(project)
  const searchParams = useSearchParams()
  const { CreateProjectModal, setShowCreateModal } = useModal({ update: true, project })

  console.log({ params, query: searchParams.get('simulation') })
  console.log({ resultadosActuales, nuevosResultados })
  const data = {
    labels: ['Ingresos', 'Ganancias', 'Pérdidas'],
    datasets: [
      {
        label: 'Resultados Actuales',
        data: [nuevosResultados.newIncome, nuevosResultados.newProfits, nuevosResultados.newLosses],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        fill: false
      },
      {
        label: 'Resultados Nuevos',
        data: [resultadosActuales.actualIncome, resultadosActuales.currentProfits, resultadosActuales.currentLosses],
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        fill: false
      }
    ]
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  const profitLossData = {
    labels: ['Ganancias y Pérdidas Actuales', 'Ganancias y Pérdidas Nuevas'],
    datasets: [
      {
        label: 'Ganancias',
        data: [resultadosActuales.currentProfits, nuevosResultados.newProfits],
        backgroundColor: 'rgba(33,196, 106, 0.5)'
      },
      {
        label: 'Pérdidas',
        data: [resultadosActuales.currentLosses, nuevosResultados.newLosses],
        backgroundColor: 'rgba(241, 55, 122, 0.5)'
      }
    ]
  }

  const equilibriumData = {
    labels: ['Precio de Equilibrio', 'Cantidad de Equilibrio'],
    datasets: [
      {
        label: 'Equilibrio de Mercado',
        data: [nuevosResultados.marketEquilibrium.equilibriumPrice, nuevosResultados.marketEquilibrium.equilibriumQuantity],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        fill: false
      }
    ]
  }

  const dataBar = {
    labels: ['Ingresos Actuales', 'Ingresos Nuevos', 'Ganancias Actuales', 'Ganancias Nuevas'],
    datasets: [
      {
        label: 'Bolivianos',
        data: [
          resultadosActuales.actualIncome,
          nuevosResultados.newIncome,
          resultadosActuales.currentProfits,
          nuevosResultados.newProfits
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  const optionsBar = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  const demandOfferData = {
    labels: ['Impacto en la Demanda', 'Impacto en la Oferta'],
    datasets: [
      {
        label: 'Impacto',
        data: [nuevosResultados.demandImpact, nuevosResultados.offerImpact],
        backgroundColor: ['rgba(255, 206, 86, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 206, 86, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1
      }
    ]
  }

  return (
    <div>
      <CreateProjectModal />
      <section className='p-5 md:p-6 flex flex-col sm:flex-row flex-wrap md:grid grid-cols-none sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-x-hidden relative'>
        <div className='bg-secondary w-full flex-col  gap-4 h-full rounded-xl border border-secondary2 p-5 min-h-[300px] flex justify-center items-center'>
          <ProjectItem project={project} isProjectId />
          {/* {features.map((feat, index) => (
            <article className={`${feat.size} relative w-full flex justify-center items-center`} key={index}>{feat.demo}</article>
          ))} */}
          <button onClick={() => setShowCreateModal(true)} className='w-full px-4 py-2 bg-tertiary hover:bg-tertiary/70 transition rounded-lg'>Editar</button>
        </div>
        <div className='col-span-2 lg:col-span-3 bg-secondary w-full h-full rounded-xl border border-secondary2 p-5 min-h-[300px] flex justify-center items-center'>
          <Bar data={dataBar} options={optionsBar} />
        </div>
        <div className='bg-secondary col-span-1 lg:col-span-2 w-full h-full rounded-xl border border-secondary2 p-5 min-h-[300px] flex justify-center items-center'>
          <Bar data={profitLossData} />
        </div>
        <div className='bg-secondary w-fit h-full rounded-xl border border-secondary2 p-5 min-h-[300px] flex justify-center items-center'>
          <Pie data={demandOfferData} />
        </div>
        <div className='col-span-1 bg-secondary w-full h-full rounded-xl border border-secondary2 p-5 min-h-[300px] flex justify-center items-center'>
          <Bar data={equilibriumData} />
        </div>
        <div className='col-span-2 bg-secondary w-full h-full rounded-xl border border-secondary2 p-5 min-h-[300px] flex justify-center items-center'>
          <Line data={data} options={options} />
        </div>
        {/* <div className='bg-secondary w-fit h-full rounded-xl border border-secondary2 p-5'><Line data={incomeData} /></div> */}
      </section>
    </div>
  )
}

const features = [
  {
    title: project.name,
    description: project.description,
    size: 'col-span-2',
    demo: (
      <div className='bg-secondary w-fit h-full rounded-xl border border-secondary2 p-5'>
        {/* <Line /> */}
      </div>
    )
  }
]

export default ProjectIdPage
