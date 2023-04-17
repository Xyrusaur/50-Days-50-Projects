// You can also use markdown commands such as:
// # Hello = Creates an unordered list with the header of "hello"
// - "Insert text here" = Adds a list element to an unordered list
// ![Alt text]("Insert image here" "a title") = Adds an image via url

const addBtn = document.getElementById('add')

const notes = JSON.parse(localStorage.getItem('notes'))

// Upload saved notes
if (notes) {
  notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click', () => addNewNote())

// Create a new note
function addNewNote(text = '') {
  const note = document.createElement('div')
  note.classList.add('note')

  note.innerHTML = `
    <div class="tools disable-select">
        <button class="edit disable-select"><i class="fas fa-edit disable-select"></i></button>
        <button class="delete disable-select"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}" placeholder="Press publish button to save once finished..."></textarea>
    `

    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked(text)

  deleteBtn.addEventListener('click', () => {
    note.remove()
    updateLS()
  })

  // Publish note
  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden')
    textArea.classList.toggle('hidden')
  })

  textArea.addEventListener('input', (e) => {
    const { value } = e.target

    main.innerHTML = marked(value)

    updateLS()
})

  document.body.appendChild(note)
}

// Update localstorage to save when refreshed
function updateLS() {
  const notesText = document.querySelectorAll('textarea')

  const notes = []

  notesText.forEach(note => notes.push(note.value))

  localStorage.setItem('notes', JSON.stringify(notes))
}