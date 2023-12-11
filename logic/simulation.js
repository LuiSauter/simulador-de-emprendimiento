function calcularSimulacion(project) {
  // Calcular los resultados actuales
  const actualIncome = project.prices.actualPrice * project.offerDemand.currentDemand
  const totalCosts = project.costs.fixed + project.costs.variables

  // Calcular los resultados nuevos
  const demandImpact = project.offerDemand.newDemand - project.offerDemand.currentDemand
  const offerImpact = project.offerDemand.newOffer - project.offerDemand.currentOffer
  const newIncome = project.prices.newPrice * project.offerDemand.newDemand
  const percentChangeInDemand = (project.offerDemand.newDemand - project.offerDemand.currentDemand) / project.offerDemand.currentDemand
  const shortTermProduction = project.production.unitsProduced + offerImpact
  const longTermProduction = project.production.productionCapacity + offerImpact

  return {
    currentResults: {
      actualIncome,
      currentProfits: Math.max(0, actualIncome - totalCosts),
      currentLosses: Math.max(0, totalCosts - actualIncome),
      offerDemand: project.offerDemand.currentDemand,
      production: {
        unitsProduced: Math.min(project.production.unitsProduced, project.production.productionCapacity),
        productionCapacity: project.production.productionCapacity
      },
      costs: {
        fixed: project.costs.fixed,
        variables: project.costs.variables * project.production.unitsProduced
      }
    },
    newResults: {
      newIncome,
      newProfits: Math.max(0, newIncome - totalCosts),
      newLosses: Math.max(0, totalCosts - newIncome),
      newPrice: project.prices.newPrice,
      demandImpact,
      offerImpact,
      marketEquilibrium: {
        equilibriumPrice: (project.prices.actualPrice + project.prices.newPrice) / 2,
        equilibriumQuantity: (project.offerDemand.currentDemand + project.offerDemand.newDemand) / 2
      },
      elasticity: percentChangeInDemand,
      production: {
        shortTerm: shortTermProduction,
        longTerm: longTermProduction
      }
    }
  }
}

export default calcularSimulacion
