import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { Prisma } from '@prisma/client'

interface Params {
  params: { id: string }
}

export async function GET(req: Request, { params }: Params) {
  try {
    const note = await prisma.note.findFirst({
      where: {
        id: Number(params.id),
      },
    })
    if (!note)
      return NextResponse.json({ message: 'note not found' }, { status: 404 })
    return NextResponse.json(note)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ message: 'note not found' }, { status: 404 })
      }
    }
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 })
    }
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const deleteNote = await prisma.note.delete({
      where: {
        id: Number(params.id),
      },
    })
    if (!deleteNote)
      return NextResponse.json({ message: 'note not found' }, { status: 404 })
    return NextResponse.json(deleteNote)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ message: 'note not found' }, { status: 404 })
      }
    }
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 })
    }
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const { title, content } = await req.json()
    const updateNote = await prisma.note.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title,
        content,
      },
    })

    if (!updateNote)
      return NextResponse.json({ message: 'note not found' }, { status: 404 })
    return NextResponse.json(updateNote)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ message: 'note not found' }, { status: 404 })
      }
    }
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 })
    }
  }
}
