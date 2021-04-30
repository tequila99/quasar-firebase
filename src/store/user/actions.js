import { firestoreAction } from 'vuexfire'
import { firestore } from '../../boot/firebase'

export const getCurrentUser = firestoreAction(({ bindFirestoreRef }, { id }) => bindFirestoreRef('currentUser', firestore().collection('users').doc(id)))

export const updateUserData = async (_, payload) => firestore().collection('users').doc(payload.id).update(payload)
