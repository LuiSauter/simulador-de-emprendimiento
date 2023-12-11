/* eslint-disable space-before-function-paren */
'use client'
import { Line } from 'react-chartjs-2'
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
import { useRouter } from 'next/navigation'

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

const colors = [
  { backgroundColor: 'rgba(75,192,192,0.2)', borderColor: 'rgba(75,192,192,1)' },
  { backgroundColor: 'rgba(255,99,132,0.2)', borderColor: 'rgba(255,99,132,1)' },
  { backgroundColor: 'rgba(255, 206, 86, 0.2)', borderColor: 'rgba(255, 206, 86, 1)' }
]

const ProjectItem = ({ project, isProjectId, params }) => {
  console.log(project)
  // const routerNav = useRouterNav()
  const router = useRouter()

  const data = !isProjectId && {
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
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  const handleClick = (id) => {
    router.push(`/projects/${project._id}/?simulation=${id}`)
    router.refresh()
  }

  const handleProjetClick = (e) => {
    e.preventDefault()
    if (!isProjectId) {
      router.push(`/projects/${project._id}/?simulation=${project.simulationResults[0]._id}`)
      router.refresh()
    }
  }

  return (
    <article onClick={handleProjetClick} key={project.id} className={`${isProjectId ? 'w-full' : 'w-full'} bg-secondary/90 hover:bg-secondary/70 hover:brightness-110 h-full hover:cursor-pointer brightness-95 transition border border-secondary2 rounded-xl py-4 md:py-6 flex flex-col gap-4 snap-center backdrop-blur-xl`}>
      <header className='px-4 md:px-6 flex flex-row justify-between items-center'>
        <h3 className='text-lg font-semibold'>{project.name}</h3>
        <span className='font-semibold'>{project.prices.actualPrice * project.offerDemand.currentDemand} Bs</span>
      </header>
      {!isProjectId ? <Line data={data} options={options} /> : <p className='px-4 md:px-6 text-textSecondary'>{project.description}</p>}
      <p className='px-4 md:px-6'>Simulaciones: {project.simulationResults.length}</p>
      {project.simulationResults.length &&
        <div tabIndex={0} className='collapse collapse-arrow'>
          <div className='collapse-title px-6 text-base font-medium'>
            Ver más simulaciones
          </div>
          <ul className='collapse-content'>
            {project.simulationResults.map((simu, index) => (
              <li key={simu._id}>
                <span
                  onClick={() => {
                    handleClick(simu._id)
                  }} className='hover:bg-secondary2 px-4 py-1 rounded-xl w-full z-40'
                >Simulación {index}
                </span>
              </li>
            ))}
          </ul>
        </div>}
      {!isProjectId
        ? <p className='text-center text-textSecondary'>Ver project</p>
        : null}
    </article>
  )
}

export default ProjectItem
