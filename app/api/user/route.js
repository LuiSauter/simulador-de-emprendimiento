/* eslint-disable space-before-function-paren */

import { connectDB } from '@/backend/libs/mongodb'
import User from '@/backend/models/user.model'
import { NextResponse } from 'next/server'

export async function GET() {
  await connectDB()
  const users = await User.find()
  return NextResponse.json(users)
}

export async function POST(request) {
  await connectDB()
  const { email, name, image } = await request.json()

  try {
    const isExist = await User.findOne({ email })
    if (!isExist) {
      const newUser = new User({ email, name, image })
      await newUser.save()
      return NextResponse.json({ message: 'sign up' })
    }
    return NextResponse.json({ message: 'sign in' })
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 })
  }
}
