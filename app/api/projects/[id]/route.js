/* eslint-disable space-before-function-paren */
import { connectDB } from '@/backend/libs/mongodb'
import Project from '@/backend/models/project.model'
import Simulation from '@/backend/models/simulation.model'
import calcularSimulacion from '@/logic/simulation'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    await connectDB()
    const isExist = await Project.findById(params.id)
      .populate({ path: 'simulationResults' })
    if (!isExist) {
      return NextResponse.json({ message: 'Proyecto no encontrado' }, { status: 404 })
    }
    return NextResponse.json(isExist)
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 })
  }
}

export async function PUT(request, { params }) {
  const body = await request.json()
  await connectDB()
  try {
    const resultSimulation = calcularSimulacion(body)
    const firstSimulation = await new Simulation({ ...resultSimulation, project: params.id })
    await firstSimulation.save()
    await Project.findByIdAndUpdate(params.id, { $push: { simulationResults: firstSimulation._id } })
    return NextResponse.json({ projectId: params.id, simulationId: firstSimulation._id }, { status: 200 })
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 })
  }
}
