'use client'
import { CreateNote } from '@/interfaces/note'
import { createContext, useContext, useState } from 'react'
import { Note } from '@prisma/client'

export const NoteContext = createContext<{
  notes: Note[]
  loadNotes: () => Promise<void>
  createNotes: (note: CreateNote) => Promise<void>
  deleteNote: (id: number) => Promise<void>
}>({
  notes: [],
  loadNotes: async () => {},
  createNotes: async (note: CreateNote) => {},
  deleteNote: async (id: number) => {},
})

export const useNotes = () => {
  const context = useContext(NoteContext)
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider')
  }
  return context
}

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([])

  async function loadNotes() {
    const res = await fetch('/api/notes')
    const data = await res.json()
    setNotes(data)
  }

  async function createNotes(note: CreateNote) {
    const res = await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const newNote = await res.json()
    setNotes([...notes, newNote])
  }

  async function deleteNote(id: number) {
    const res = await fetch('http://localhost:3000/api/notes/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    setNotes(notes.filter((note) => note.id !== id))
  }

  return (
    <NoteContext.Provider value={{ notes, loadNotes, createNotes, deleteNote }}>
      {children}
    </NoteContext.Provider>
  )
}
