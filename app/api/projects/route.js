/* eslint-disable space-before-function-paren */

import { connectDB } from '@/backend/libs/mongodb'
import Project from '@/backend/models/project.model'
import User from '@/backend/models/user.model'
import Simulation from '@/backend/models/simulation.model'
import calcularSimulacion from '@/logic/simulation'
import { NextResponse } from 'next/server'

export async function GET() {
  await connectDB()
  try {
    const projects = await Project.find().populate({ path: 'simulationResults' })
    return NextResponse.json(projects, { status: 200 })
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 })
  }
}

export async function POST(request) {
  const body = await request.json()
  await connectDB()
  try {
    const resultSimulation = calcularSimulacion(body)
    const findUser = await User.findOne({ email: body.email })
    if (!findUser) {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 })
    }
    const newProject = await new Project({ ...body, user: findUser._id })
    await newProject.save()
    await User.findOneAndUpdate({ email: body.email }, { $push: { projects: newProject._id } })
    const firstSimulation = await new Simulation({ ...resultSimulation, project: newProject._id })
    await firstSimulation.save()
    await Project.findByIdAndUpdate(newProject._id, { $push: { simulationResults: firstSimulation._id } })
    return NextResponse.json({ projectId: newProject._id, simulationId: firstSimulation._id }, { status: 201 })
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 })
  }
}
