/* eslint-disable space-before-function-paren */
'use client'
import { useRouter } from 'next/navigation'
import Modal from './ui/modal'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

export const INITIAL_STATE = {
  name: '',
  description: '',
  industry: '',
  estimatedIncome: 0.0,
  costs: {
    fixed: 0.0,
    variables: 0.0
  },
  production: {
    unitsProduced: 0.0,
    productionCapacity: 0.0
  },
  prices: {
    actualPrice: 0.0,
    newPrice: 0.0
  },
  offerDemand: {
    currentDemand: 0.0,
    newDemand: 0.0,
    currentOffer: 0.0,
    newOffer: 0.0
  }

}

const FormAddUpdateProject = ({ showCreateModal, setShowCreateModal, project, update = false }) => {
  const [formData, setFormData] = useState(update ? project || INITIAL_STATE : INITIAL_STATE)
  const { data } = useSession()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const createProject = async (obj) => {
    try {
      setLoading(true)
      const response = await fetch('/api/projects', {
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      return await response.json()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const addSimulation = async (obj) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/projects/${project._id}`, {
        method: 'PUT',
        header: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      return await response.json()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (update) {
      const responseUpdated = data?.user && await addSimulation(formData)
      router.push(`/projects/${responseUpdated.projectId}/?simulation=${responseUpdated.simulationId}`)
      router.refresh()
    } else {
      const response = data?.user && await createProject({ ...formData, email: data?.user.email })
      router.push(`/projects/${response.projectId}/?simulation=${response.simulationId}`)
    }
  }

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleInputChangeObj = (target, attribute) => {
    setFormData((prev) => ({ ...prev, [attribute]: { ...prev[attribute], [target.name]: target.value } }))
  }
  return (
    <Modal setShowModal={setShowCreateModal} showModal={showCreateModal}>
      <form onSubmit={handleSubmit} className='p-6 flex flex-col gap-4 md:gap-0 overflow-y-auto min-h-fit'>
        <div className='flex flex-col md:flex-row gap-4 md:gap-0 pb-5'>
          <div className='w-full flex flex-col gap-2'>
            {!update && <h2 className='text-2xl font-bold pb-2'>Crear Proyecto</h2>}
            <label className='flex flex-col gap-2'>
              <span className='label-text'>Nombre del proyecto</span>
              <input
                type='text' name='name'
                placeholder=''
                onChange={handleInputChange}
                value={formData.name}
                className='input input-primary input-ghost w-full max-w-xs bg-secondary'
              />
            </label>

            <label className='flex flex-col gap-2'>
              <span className='label-text'>Descripción</span>
              <input
                type='text' name='description'
                placeholder=''
                onChange={handleInputChange}
                value={formData.description}
                className='input input-primary input-ghost w-full max-w-xs bg-secondary'
              />
            </label>

            <label className='flex flex-col gap-2'>
              <span className='label-text'>Industria</span>
              <select onChange={handleInputChange} name='industry' value={formData.industry} className='select select-primary select-ghost w-full max-w-xs'>
                <option value='Tecnología'>Tecnología</option>
                <option value='Salud'>Salud</option>
                <option value='Finanzas'>Finanzas</option>
                <option value='Educación'>Educación</option>
                <option value='Entretenimiento'>Entretenimiento</option>
                <option value='Automotriz'>Automotriz</option>
                <option value='Venta al por menor'>Venta al por menor</option>
                <option value='Alimentos y Bebidas'>Alimentos y Bebidas</option>
                <option value='Viajes y Hospitalidad'>Viajes y Hospitalidad</option>
                <option value='otro'>Otro</option>
              </select>
            </label>
            <label className='flex flex-col gap-2 join-item'>
              <span className='label-text'>Ingresos Estimados</span>
              <input
                type='number' name='estimatedIncome'
                placeholder='0.0'
                onChange={handleInputChange}
                value={formData.estimatedIncome}
                className='input input-primary input-ghost w-full max-w-xs bg-secondary'
              />
            </label>
          </div>

          <div className='w-full flex flex-col gap-2'>
            <div className='join join-horizontal space-x-3'>
              <label className='flex flex-col gap-2 join-item'>
                <span className='label-text'>Costos Fijos</span>
                <input
                  type='number' name='fixed'
                  placeholder='0.0'
                  onChange={(e) => handleInputChangeObj(e.target, 'costs')}
                  value={formData.costs.fixed}
                  className='input input-primary input-ghost w-full max-w-xs bg-secondary'
                />
              </label>
              <label className='flex flex-col gap-2 join-item'>
                <span className='label-text'>Costos Variables</span>
                <input
                  type='number' name='variables'
                  placeholder='0.0'
                  onChange={(e) => handleInputChangeObj(e.target, 'costs')}
                  value={formData.costs.variables}
                  className='input input-primary input-ghost w-full max-w-xs bg-secondary'
                />
              </label>
            </div>

            <span className='label-text pt-2 font-semibold text-textPrimary'>Producción</span>
            <div className='join join-horizontal space-x-3'>
              <label className='flex flex-col gap-2 join-item'>
                <span className='label-text'>Unid. producidas</span>
                <input
                  type='number' name='unitsProduced'
                  placeholder='0.0'
                  onChange={(e) => handleInputChangeObj(e.target, 'production')}
                  value={formData.production.unitsProduced}
                  className='input input-primary input-ghost w-full max-w-xs bg-secondary'
                />
              </label>
              <label className='flex flex-col gap-2 join-item'>
                <span className='label-text'>Capac. de producción</span>
                <input
                  type='number' name='productionCapacity'
                  placeholder='0.0'
                  onChange={(e) => handleInputChangeObj(e.target, 'production')}
                  value={formData.production.productionCapacity}
                  className='input input-primary input-ghost w-full max-w-xs bg-secondary'
                />
              </label>
            </div>

            <span className='label-text pt-2 font-semibold text-textPrimary'>Precios</span>
            <div className='join join-horizontal space-x-3'>
              <label className='flex flex-col gap-2 join-item'>
                <span className='label-text'>Precio actual</span>
                <input
                  type='number' name='actualPrice'
                  placeholder='0.0'
                  onChange={(e) => handleInputChangeObj(e.target, 'prices')}
                  value={formData.prices.actualPrice}
                  className='input input-primary input-ghost w-full max-w-xs bg-secondary'
                />
              </label>
              <label className='flex flex-col gap-2 join-item'>
                <span className='label-text'>Nuevo precio</span>
                <input
                  type='number' name='newPrice'
                  placeholder='0.0'
                  onChange={(e) => handleInputChangeObj(e.target, 'prices')}
                  value={formData.prices.newPrice}
                  className='input input-primary input-ghost w-full max-w-xs bg-secondary'
                />
              </label>
            </div>

            <span className='label-text pt-2 font-semibold text-textPrimary'>Demanda y Oferta</span>
            <div className='join join-horizontal space-x-3'>
              <label className='flex flex-col gap-2 join-item'>
                <span className='label-text'>Demanda actual</span>
                <input
                  type='number' name='currentDemand'
                  placeholder='0.0'
                  onChange={(e) => handleInputChangeObj(e.target, 'offerDemand')}
                  value={formData.offerDemand.currentDemand}
                  className='input input-primary input-ghost w-full max-w-xs bg-secondary'
                />
              </label>
              <label className='flex flex-col gap-2 join-item'>
                <span className='label-text'>Nueva Demanda</span>
                <input
                  type='number' name='newDemand'
                  placeholder='0.0'
                  onChange={(e) => handleInputChangeObj(e.target, 'offerDemand')}
                  value={formData.offerDemand.newDemand}
                  className='input input-primary input-ghost w-full max-w-xs bg-secondary'
                />
              </label>
            </div>
            <div className='join join-horizontal space-x-3'>
              <label className='flex flex-col gap-2 join-item'>
                <span className='label-text'>Oferta actual</span>
                <input
                  type='number' name='currentOffer'
                  placeholder='0.0'
                  onChange={(e) => handleInputChangeObj(e.target, 'offerDemand')}
                  value={formData.offerDemand.currentOffer}
                  className='input input-primary input-ghost w-full max-w-xs bg-secondary'
                />
              </label>
              <label className='flex flex-col gap-2 join-item'>
                <span className='label-text'>Nueva Oferta</span>
                <input
                  type='number' name='newOffer'
                  placeholder='0.0'
                  onChange={(e) => handleInputChangeObj(e.target, 'offerDemand')}
                  value={formData.offerDemand.newOffer}
                  className='input input-primary input-ghost w-full max-w-xs bg-secondary'
                />
              </label>
            </div>
          </div>
        </div>
        <button className='bg-tertiary hover:bg-tertiary/80 w-full rounded-md text-center px-4 py-3 flex flex-row items-center justify-center gap-3'>
          {loading && <span className='loading loading-spinner' />}
          {!update ? 'Crear proyecto e Iniciar la simulación' : 'Actualizar'}
        </button>
      </form>
    </Modal>
  )
}

export default FormAddUpdateProject
