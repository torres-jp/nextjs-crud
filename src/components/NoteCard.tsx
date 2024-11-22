import { useNotes } from '@/context/NoteContext'
import { Note } from '@prisma/client'

function NoteCard({ note }: { note: Note }) {
  const { deleteNote } = useNotes()

  return (
    <div className='bg-slate-400 p-4 my-2 rounded-md flex justify-between'>
      <div>
        <h1 className='text-2xl font-bold'>{note.title}</h1>
        <p>{note.content}</p>
      </div>

      <div className='flex gap-x-2'>
        <button
          onClick={async () => {
            if (confirm('Are you sure?')) {
              await deleteNote(Number(note.id))
            }
          }}
        >
          Delete
        </button>
        <button>Edit</button>
      </div>
    </div>
  )
}

export default NoteCard
