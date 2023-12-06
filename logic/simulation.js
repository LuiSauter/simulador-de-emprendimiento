// function calcularSimulacion(project) {
//   const resultadosActuales = calcularResultados(project)

//   // Crear una copia del proyecto con los nuevos precios para la simulación
//   const proyectoSimulacion = {
//     ...project,
//     prices: {
//       actualPrice: project.prices.newPrice,
//       newPrice: project.prices.newPrice
//     }
//   }

//   const nuevosResultados = calcularResultados(proyectoSimulacion)

//   return { resultadosActuales, nuevosResultados }
// }

function calcularSimulacion(project) {
  // Cálculos
  const actualIncome = project.prices.actualPrice * project.offerDemand.currentDemand
  const newIncome = project.prices.newPrice * project.offerDemand.newDemand
  // const costosVariables = project.costs.variables
  // const costosFijos = project.costs.fixed

  // Resultados Actuales
  const currentProfits = actualIncome - (project.costs.fixed + project.costs.variables)
  const currentLosses = (project.costs.fixed + project.costs.variables) - actualIncome
  const newProfits = newIncome - (project.costs.fixed + project.costs.variables)
  const newLosses = (project.costs.fixed + project.costs.variables) - newIncome

  // Impacto en la Demanda y Oferta
  const demandImpact = project.offerDemand.newDemand - project.offerDemand.currentDemand
  const offerImpact = (project.offerDemand.currentDemand + project.offerDemand.newDemand) / 2

  // Equilibrio de Mercado
  const equilibriumPrice = (project.prices.actualPrice + project.prices.newPrice) / 2
  const equilibriumQuantity = project.offerDemand.currentOffer

  // Elasticidad
  const elasticity = demandImpact / ((project.offerDemand.currentDemand + project.offerDemand.newDemand) / 2)

  // Producción a Corto Plazo y Largo Plazo
  const shortTerm = project.production.unitsProduced
  const longTerm = project.production.productionCapacity

  return {
    resultadosActuales: {
      actualIncome,
      currentProfits,
      currentLosses,
      offerDemand: project.offerDemand,
      production: project.production,
      costs: project.costs
    },
    nuevosResultados: {
      newIncome,
      newProfits,
      newLosses,
      newPrice: project.prices.newPrice,
      demandImpact,
      offerImpact,
      marketEquilibrium: {
        equilibriumPrice,
        equilibriumQuantity
      },
      elasticity,
      production: {
        shortTerm,
        longTerm
      }
    }
  }
}

// function calcularSimulacion(project) {
//   const resultadosSimulacion = calcularResultados(project)
//   const nuevosDatos = obtenerNuevosDatos(project)
//   const nuevosResultados = calcularResultados(nuevosDatos)

//   return { resultadosSimulacion, nuevosResultados }
// }

// function calcularResultados(project) {
//   // Cálculos
//   const income = project.estimatedIncome
//   const costosVariables = project.costs.variables
//   const costosFijos = project.costs.fixed

//   // Resultados Actuales
//   const Profits = income - (costosVariables + costosFijos)
//   const losses = Math.max(0, (costosVariables + costosFijos) - income)

//   // Datos para la simulación
//   const nuevaDemanda = project.offerDemand.newDemand
//   const nuevaOferta = project.offerDemand.newOffer

//   // Impacto en la Demanda y Oferta
//   const demandImpact = nuevaDemanda - project.offerDemand.currentDemand
//   const offerImpact = nuevaOferta - project.offerDemand.currentOffer

//   // Equilibrio de Mercado
//   const equilibriumPrice = project.prices.actualPrice
//   const equilibriumQuantity = project.offerDemand.currentOffer

//   // Elasticidad
//   const elasticity = demandImpact / nuevaDemanda

//   // Producción a Corto Plazo y Largo Plazo
//   const shortTerm = project.production.unitsProduced
//   const longTerm = project.production.productionCapacity

//   return {
//     income,
//     Profits,
//     losses,
//     demandImpact,
//     marketEquilibrium: {

//       equilibriumPrice,
//       equilibriumQuantity
//     },
//     offerImpact,
//     elasticity,
//     production: {
//       shortTerm,
//       longTerm
//     }
//   }
// }

// function obtenerNuevosDatos(project) {
//   // Aquí deberías implementar la lógica para obtener los nuevos datos, por ejemplo, modificando los precios, la demanda, etc.
//   // En este ejemplo, simplemente duplico los datos existentes, pero deberías ajustar esto según tus requisitos específicos.
//   return {
//     ...project,
//     prices: {
//       ...project.prices,
//       newPrice: project.prices.newPrice // Modifica según tus necesidades
//     },
//     offerDemand: {
//       ...project.offerDemand,
//       newDemand: project.offerDemand.newDemand // Modifica según tus necesidades
//     }
//   }
// }

export default calcularSimulacion

// function getSimulation(project) {
//   // Resultados Actuales
//   const calculateResults = (productionUnits, price) => {
//     const income = productionUnits * price
//     const profit = income - project.costs.variables - project.costs.fixed
//     const losses = 0 // Suponemos que no hay pérdidas en este ejemplo
//     const equilibriumPrice = project.prices.actualPrice
//     const equilibriumQuantity = project.offerDemand.currentOffer

//     return { income, profit, losses, marketEquilibrium: { equilibriumPrice, equilibriumQuantity } }
//   }

//   // Resultados Actuales
//   const currentResults = calculateResults(project.production.unitsProduced, project.prices.actualPrice)

//   // Resultados Nuevos (Simulación)
//   const newResults = calculateResults(project.production.unitsProduced, project.prices.newPrice)

//   // Impacto en la Demanda y Oferta
//   const demandImpact = project.offerDemand.newDemand - project.offerDemand.currentDemand
//   const offerImpact = project.offerDemand.newOffer - project.offerDemand.currentOffer

//   return {
//     currentResults,
//     newResults: { ...newResults, demandImpact, offerImpact }
//   }
// }

// export default getSimulation

// function getSimulation(project, isShortTerm) {
//   // Función para calcular los resultados
//   const calculateResults = (productionUnits, price) => {
//     const income = productionUnits * price
//     const profit = income - project.costs.variables - project.costs.fixed
//     const losses = 0 // Suponemos que no hay pérdidas en este ejemplo
//     const equilibriumPrice = project.prices.actualPrice
//     const equilibriumQuantity = project.offerDemand.currentOffer

//     return { income, profit, losses, marketEquilibrium: { equilibriumPrice, equilibriumQuantity } }
//   }

//   // Calcular los resultados actuales
//   const currentResults = calculateResults(project.production.unitsProduced, project.prices.actualPrice)

//   // Calcular los resultados nuevos (simulación)
//   const newPrice = isShortTerm ? project.prices.newPrice : project.prices.actualPrice // Ajuste para corto o largo plazo
//   const newResults = calculateResults(project.production.unitsProduced, newPrice)

//   // Calcular el impacto en la Demanda y Oferta
//   const demandImpact = project.offerDemand.newDemand - project.offerDemand.currentDemand
//   const offerImpact = project.offerDemand.newOffer - project.offerDemand.currentOffer

//   return {
//     current: currentResults,
//     new: { ...newResults, demandImpact, offerImpact }
//   }
// }

// export default getSimulation
