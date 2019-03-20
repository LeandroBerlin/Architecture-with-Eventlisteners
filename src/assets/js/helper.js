// Helper
import { noteStorage } from "./Storage"
export const $ = selector => document.querySelector(selector)

export const domElements = {
  addNoteInput: $("#add-note"),
  addAuthorInput: $("#add-author"),
  addNoteButton: $("#add-note-button"),
  noteContainer: $("#notes"),
  noteDiv: null,
  statusIcon: null,
  removeIcon: null,
}

export const renderNotes = notes => {
  domElements.noteContainer.innerHTML = notes
    .map(
      (note, index) => {
        return `
        <div class="note col-lg-3 ${note.status}"  id=${index}>
          ${note.note} <span> <i class="fa fa-user assigned"></i> ${note.assigned} 
          <i class="${note.status == "pending" ? "fa fa-check-circle" : "far fa-edit "} statusIcon" title="Change status"></i> 
          <i class="fas fa-times-circle removeIcon" title="Click to remove"></i></span>
        </div>
      `
      }
    )
    .join("")

  // Only if I have the notes I can target them and add the eventListners
  domElements.removeIcon = document.querySelectorAll(".removeIcon")
  domElements.statusIcon = document.querySelectorAll(".statusIcon")

  targetNotes();
  removeIcons();
}

const removeIcons = () => {
  // Check if we have a note and eventually attach an eventlistner
  if (domElements.removeIcon !== null)
    domElements.removeIcon.forEach(oneDiv => {
      oneDiv.addEventListener("click", () => {
        const id = oneDiv.offsetParent.id;
        console.log(id)
        // trigger
        noteStorage.emit("removeItem", id)
      })
    })
}

const targetNotes = () => {
  // Check if we have a note and eventually attach an eventlistner
  if (domElements.statusIcon !== null)
    domElements.statusIcon.forEach(oneDiv => {
      oneDiv.addEventListener("click", () => {
        const id = oneDiv.offsetParent.id;
        const isPending = oneDiv.offsetParent.classList.contains("pending");
        const status = (isPending ? "completed" : "pending")
        const note = { id, status }
        console.log(note)
        // trigger
        noteStorage.emit("changeStatus", note)
      })
    })
}