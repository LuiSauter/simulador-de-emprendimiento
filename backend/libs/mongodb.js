import mongoose from 'mongoose'

const { MONGODB_URI } = process.env

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI must be defined')
}

const conn = {
  isConnected: false
}

export async function connectDB() {
  if (conn.isConnected) {
    return
  }
  const db = await mongoose.connect(MONGODB_URI)
  conn.isConnected = db.connections[0].readyState
}

mongoose.connection.on('connected', () => console.log('Mongodb connected to db'))
mongoose.connection.on('error', (error) => console.error('Mongodb Error:', error.message))
