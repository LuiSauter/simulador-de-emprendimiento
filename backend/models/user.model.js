import { Schema, model, models } from 'mongoose'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'El correo electronico es requerido'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'El correo electronico es invalido'
      ]
    },
    image: { type: String, required: true },
    projects: [{
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }]
  }, { timestamps: true })

export default models.User || model('User', userSchema)
