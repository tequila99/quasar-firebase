/*
export function someGetter (state) {
}
*/
export const currentNote = ({ currentNote }) => currentNote
export const listNotes = ({ listNotes }) => listNotes
export const listTags = ({ listNotes }) => [...new Set(listNotes.reduce((acc, note) =>
  [...acc, ...(note.tags && Array.isArray(note.tags) ? note.tags : [])], []))]
