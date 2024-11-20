function NoteForm() {
  return (
    <form>
      <h1 className='text-3xl font-bold text-white'>Notes Form</h1>
      <input
        type='text'
        name='title'
        placeholder='Title'
        autoFocus
        className='w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2'
      />

      <textarea
        name='content'
        placeholder='Content...'
        className='w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2'
      ></textarea>

      <button className='px-5 py-2 text-white bg-blue-600 roundmd rounded-md hover:bg-blue-700'>
        Create
      </button>
    </form>
  )
}

export default NoteForm
