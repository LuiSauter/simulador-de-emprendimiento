import { Schema, model, models } from 'mongoose'

const simulationSchema = new Schema({
  currentResults: {
    actualIncome: {
      type: Number,
      
    },
    currentProfits,
    currentLosses,
    offerDemand: project.offerDemand,
    production: project.production,
    costs: project.costs
  },
  newRevenue: { // nuevos_ingresos
    shortTerm: Number, // corto y largo plazo
    longTerm: Number
  },
  newProfits: { // nuevas_ganancias
    shortTerm: Number, // corto y largo plazo
    longTerm: Number
  },
  newLosses: { // nuevas_perdidas
    shortTerm: Number, // corto y largo plazo
    longTerm: Number
  },
  demandImpact: Number, // impacto_demanda
  offerImpact: Number, // impacto_oferta
  marketEquilibrium: {
    equilibriumPrice: Number,
    equilibriumQuantity: Number
  },
  elasticity: Number,
  production: {
    shortTerm: Number,
    longTerm: Number
  },
  scalePerformance: {
    constantPerformance: Number,
    decreasingPerformance: Number
  },
  entrepreneurship: {
    type: Schema.Types.ObjectId,
    ref: 'Entrepreneurship'
  }

}, { timestamps: true })

export default models.Simulation || model('Simulation', simulationSchema)
