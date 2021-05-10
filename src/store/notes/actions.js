import { firestoreAction } from 'vuexfire'
import { firestore } from 'boot/firebase'
// const ownerRef = firestore().doc(`users/${currentUser.id}`)

export const getCurrentNote = firestoreAction(({ bindFirestoreRef }, { id }) =>
  bindFirestoreRef(
    'currentNote',
    firestore().collection('notes').doc(id)
  )
)
export const getListNotes = firestoreAction(({ bindFirestoreRef }, { id }) => {
  const userRef = firestore().doc(`users/${id}`)
  bindFirestoreRef(
    'listNotes',
    firestore().collection('notes')
      .where('sharedWith', 'array-contains', userRef)
      .orderBy('updatedAt', 'desc')
  )
})
export const delNoteData = async (_, { id }) => {
  firestore().collection('notes')
    .doc(id)
    .delete()
}

export const updateNote = async (_, { id, ...data }) => {
  firestore().collection('notes')
    .doc(id)
    .update({
      ...data,
      updatedAt: Date.now()
    })
}

export const addNote = async ({ rootGetters }, payload) => {
  const userRef = firestore().doc(`users/${rootGetters['user/currentUser'].id}`)
  firestore().collection('notes')
    .add({
      ...payload,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      owner: userRef,
      sharedWith: [
        userRef
      ]
    })
}
