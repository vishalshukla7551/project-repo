import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, skill, portfolio } = body

    if (!name || !email || !skill || !portfolio) {
      return NextResponse.json(
        { success: false, error: 'All fields are required.' },
        { status: 400 }
      )
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        skill,
        portfolio,
      },
    })

    return NextResponse.json({ success: true, user }, { status: 200 })

  } catch (error:unknown) {
    console.error('Signup error:', error)
    let message;
    if (error instanceof Error) {
        message=error.message
      }
    return NextResponse.json(
      { success: false, error:message},
      { status: 500 }
    )
  }
}
