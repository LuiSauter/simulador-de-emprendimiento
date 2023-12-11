/* eslint-disable space-before-function-paren */
import { connectDB } from '@/backend/libs/mongodb'
import project from '@/backend/models/project.model'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    await connectDB()
    const isExist = await project.findById(params.id)
      .populate({ path: 'simulationResults' })
    if (!isExist) {
      return NextResponse.json({ message: 'Proyecto no encontrado' }, { status: 404 })
    }
    return NextResponse.json(isExist)
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 })
  }
}
