'use client'

import { useNotes } from '@/context/NoteContext'
import { useState, useRef, useEffect } from 'react'

function NoteForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const titleRef = useRef<HTMLInputElement>(null)

  const { createNotes, selectedNote, setSelectedNote, updateNote } = useNotes()

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title)
      setContent(selectedNote.content || '')
    }
  }, [selectedNote])

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()

        if (selectedNote) {
          await updateNote(selectedNote.id, { title, content })
          setSelectedNote(null)
        } else {
          await createNotes({ title, content })
        }

        setTitle('')
        setContent('')

        titleRef.current?.focus()
      }}
    >
      <h1 className='text-3xl font-bold text-white'>Notes Form</h1>
      <input
        type='text'
        name='title'
        placeholder='Title'
        autoFocus
        className='w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        ref={titleRef}
      />

      <textarea
        name='content'
        placeholder='Content...'
        className='w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2'
        onChange={(e) => setContent(e.target.value)}
        value={content}
      ></textarea>
      <div className='flex justify-end gap-x-2'>
        <button
          type='submit'
          disabled={!title || !content}
          className='px-5 py-2 text-white bg-blue-600 roundmd rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {selectedNote ? 'Update' : 'Create'}
        </button>

        {selectedNote && (
          <button
            className='px-5 py-2 text-white bg-red-600 roundmd rounded-md hover:bg-red-700'
            onClick={() => {
              setSelectedNote(null)
              setTitle('')
              setContent('')
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default NoteForm
