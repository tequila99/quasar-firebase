import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const providerGoogle = new firebase.auth.GoogleAuthProvider()

export const firestore = () => firebase.firestore()

export const auth = () => firebase.auth()

export const storage = () => firebase.storage()

export const isAuthenticated = store => store.state.auth.isAuthenticated
export const currentUser = store => store.state.auth.user

export const logoutUser = () => auth().signOut()

export const createUserWithEmail = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password)

export const loginWithEmail = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password)

export const loginGooglePopup = () => firebase.auth().signInWithPopup(providerGoogle)

export const sendResetEmail = email => firebase.auth().sendPasswordResetEmail(email)

export const ensureAuthIsInitialized = async store => {
  if (store.state.auth.isReady) return true
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      resolve()
      unsubscribe()
    }, () => {
      reject(new Error('имеются проблемы с сервисом авторизации. Повторите попытку позднее.'))
    })
  })
}

export default async ({ store, Vue, router, redirect }) => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  }
  const firebaseService = firebase.initializeApp(firebaseConfig)
  router.beforeEach(async (to, from, next) => {
    // Check to see if the route has the meta field "authRequired" set to true
    const authRequired = to.matched.some(route => route.meta.authRequired)

    const isAuthenticated = async () => await firebaseService.auth().currentUser !== null
    try {
      await ensureAuthIsInitialized(store)
      if (authRequired) {
        if (isAuthenticated) {
          next()
        } else {
          next({ path: '/auth/login' })
        }
      } else {
        next()
      }
    } catch (error) {
      store.dispatch('logs/showError', error)
    }
  })
  firebaseService.auth().onAuthStateChanged(async user => {
    const initialAuthState = isAuthenticated(store)
    store.commit('auth/setAuthState', {
      isAuthenticated: user !== null,
      isReady: true,
      uid: user?.uid || null
    })
    if (user?.uid) store.dispatch('user/getCurrentUser', { id: user.uid })
    if (user && initialAuthState) {
      router.push({ path: '/' })
    } else {
      router.push({ path: '/auth/login' })
    }
  })
  if (!currentUser(store) || !isAuthenticated(store)) {
    // redirect({ path: '/auth/login' })
  }
  Vue.prototype.$fb = firebaseService
  return firebaseService
}
