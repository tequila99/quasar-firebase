/*
export function someAction (context) {
}
*/
export function showError ({ commit }, payload) {
  commit('setError', payload)
}

export function showInfo ({ commit }, payload) {
  commit('setInfo', payload)
}
