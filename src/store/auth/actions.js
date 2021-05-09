import User from 'src/models/User'
import { firestore, createUserWithEmail, loginWithEmail, logoutUser, sendResetEmail, loginGooglePopup } from '../../boot/firebase'
import router from '../../router'

export const createUser = async function (_, { email, password }) {
  const { user } = await createUserWithEmail(email, password)
  const id = user.uid
  await firestore().collection('users').doc(id).set(new User({ id, email }))
  router.push({ path: '/user/profile' })
}

export const login = async function (_, { email, password }) {
  await loginWithEmail(email, password)
  router.push({ path: '/' })
}

export const loginGoogle = async function (_) {
  const { user } = await loginGooglePopup()
  const id = user.uid
  firestore().collection('users').doc(id).get()
    .then(snapshot => {
      if (!snapshot.exists) {
        firestore().collection('users').doc(id).set(new User({ id, ...user }))
        if (user.phoneNumber) {
          return router.push({ path: '/user/profile' })
        }
      }
      return router.push({ path: '/' })
    })
}

export const logout = async function (_) {
  await logoutUser()
}
export const sendEmail = async function (_, { email }) {
  return sendResetEmail(email)
}
