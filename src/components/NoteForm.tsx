'use client'

import { useNotes } from '@/context/NoteContext'
import { useState, useRef } from 'react'

function NoteForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { createNotes } = useNotes()
  const titleRef = useRef<HTMLInputElement>(null)

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        await createNotes({ title, content })
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

      <button className='px-5 py-2 text-white bg-blue-600 roundmd rounded-md hover:bg-blue-700'>
        Create
      </button>
    </form>
  )
}

export default NoteForm
