/* eslint-disable space-before-function-paren */

import { connectDB } from '@/backend/libs/mongodb'
import User from '@/backend/models/user.model'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  await connectDB()
  try {
    console.log(params)
    const isUserExist = await User.findOne(params)
    if (!isUserExist) {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 })
    }
    if (isUserExist.projects.length > 0) {
      const fullUser = await User.findOne({ email: params.email })
        .populate({
          path: 'projects',
          populate: { path: 'simulationResults' }
        })
      return NextResponse.json(fullUser)
    }
    // const getUser = await User.findOne({ email: params.email }).populate({ path: 'projects' })
    return NextResponse.json(isUserExist)
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 })
  }
}
