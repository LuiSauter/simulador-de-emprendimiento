'use client'
import { useRouter } from 'next/navigation'
import Modal from './ui/modal'
import { useState } from 'react'

const data = `"simulacion_resultados": {
  "nuevos_ingresos": {
    "corto_plazo": 110000,
      "largo_plazo": 120000
  },
  "nuevas_ganancias": {
    "corto_plazo": 55000,
      "largo_plazo": 70000
  },
  "nuevas_perdidas": {
    "corto_plazo": 25000,
      "largo_plazo": 20000
  },
  "impacto_demanda": 200,
    "impacto_oferta": -200,
      "equilibrio_mercado": {
    "precio_equilibrio": 210,
      "cantidad_equilibrio": 850
  },
  "elasticidad": 0.3,
    "produccion_corto_plazo": 700,
      "produccion_largo_plazo": 800,
        "rendimientos_escala": {
    "rendimientos_constantes": false,
      "rendimientos_decrecientes": true
  }
}`

const INITIAL_STATE = {
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
  const [simulationId, setSimulationId] = useState('simu123')
  const [projectId, setProjectId] = useState('project123')
  const [formData, setFormData] = useState(update ? project : INITIAL_STATE)
  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    router.push(`/projects/${projectId}/?simulation=${simulationId}`)
  }

  const handleInputChange = (e) => {
    console.log(e)
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
              <select onChange={handleInputChange} name='industry' value={formData.industry} defaultValue={formData.industry} className='select select-primary select-ghost w-full max-w-xs'>
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
          {/* <span className='loading loading-spinner' /> */}
          {!update ? 'Crear proyecto y Iniciar la simulación' : 'Actualizar'}
        </button>
      </form>
    </Modal>
  )
}

export default FormAddUpdateProject
