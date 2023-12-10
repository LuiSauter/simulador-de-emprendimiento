function calcularSimulacion(project) {
  const actualIncome = project.prices.actualPrice * project.offerDemand.currentDemand
  const newIncome = project.prices.newPrice * project.offerDemand.newDemand
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
    currentResults: {
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

export default calcularSimulacion
