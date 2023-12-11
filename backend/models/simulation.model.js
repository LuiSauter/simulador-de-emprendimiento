import { Schema, model, models } from 'mongoose'

const simulationSchema = new Schema({
  currentResults: {
    actualIncome: Number,
    currentProfits: Number,
    currentLosses: Number,
    offerDemand: Number,
    production: {
      unitsProduced: Number,
      productionCapacity: Number
    },
    costs: {
      fixed: Number,
      variables: Number
    }
  },
  newResults: {
    newIncome: Number,
    newProfits: Number,
    newLosses: Number,
    newPrice: Number,
    demandImpact: Number,
    offerImpact: Number,
    marketEquilibrium: {
      equilibriumPrice: Number,
      equilibriumQuantity: Number
    },
    elasticity: Number,
    production: {
      shortTerm: Number,
      longTerm: Number
    }
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }

}, { timestamps: true })

export default models.Simulation || model('Simulation', simulationSchema)
