import Image from 'next/image'

const ProjectItem = ({ project, isProjectId }) => {
  return (
    <article key={project.id} className={`${isProjectId ? 'w-full' : 'min-w-[calc(100vw-2rem)] sm:min-w-[300px] max-w-[300px] sm:max-w-[300px] md:min-w-[300px]'} bg-secondary/90 hover:bg-secondary/70 hover:brightness-110 hover:cursor-pointer brightness-95 transition border border-secondary2 rounded-xl py-4 md:py-6 flex flex-col gap-4 snap-center backdrop-blur-xl`}>
      <header className='px-4 md:px-6 flex flex-row justify-between'>
        <h3>{project.name}</h3>
        <span>{project.estimatedIncome} Bs</span>
      </header>
      {!isProjectId ? <Image src='/statistic.png' className='min-w-[calc(100vw-2rem)] sm:min-w-[300px] max-w-[300px]' alt='xd' width={300} height={200} /> : <p className='px-4 md:px-6 text-textSecondary'>{project.description}</p>}
      <p className='px-4 md:px-6'>Simulaciones: {project.simulationResults.length}</p>
      {!isProjectId
        ? <p className='text-center text-textSecondary'>Ver project</p>
        : null}
    </article>
  )
}

export default ProjectItem
