import { Schema, model, models } from 'mongoose'

const projectSchema = new Schema({
  name: { type: String },
  description: { type: String },
  industry: { type: String },
  estimatedIncome: Number,
  costs: {
    fixed: { type: Number },
    variables: { type: Number }
  },
  production: {
    unitsProduced: { type: Number },
    productionCapacity: { type: Number }
  },
  prices: {
    actualPrice: { type: Number },
    newPrice: { type: Number }
  },
  offerDemand: {
    currentDemand: Number,
    newDemand: Number,
    currentOffer: Number,
    newOffer: Number
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  simulationResults: [{
    type: Schema.Types.ObjectId,
    ref: 'Simulation'
  }]
}, { timestamps: true })

export default models.Project || model('Project', projectSchema)
