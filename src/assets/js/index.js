import "@scss/styles.scss"
import { noteStorage } from "./Storage"
import { domElements } from "./helper"

const { addNoteButton, addNoteInput, addAuthorInput } = domElements

addNoteButton.addEventListener("click", () => {
  const note = { note: addNoteInput.value, author: addAuthorInput.value }
  if (note.note && note.author) {
    noteStorage.emit("addItem", note)
    addNoteInput.value = ""
  }
})

