import { Schema, model, models } from 'mongoose'

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  industry: { type: String, required: true },
  estimatedIncome: Number,
  costs: {
    fixed: { type: Number, required: true },
    variables: { type: Number, required: true }
  },
  production: {
    unitsProduced: { type: Number, required: true },
    productionCapacity: { type: Number, required: true }
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
