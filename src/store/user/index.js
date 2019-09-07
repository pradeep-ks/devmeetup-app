import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    registerUserForMeetup: (state, payload) => {
      const meetupId = payload.id
      if (state.user.registeredMeetups.findIndex(meetup => meetup.id === meetupId) >= 0) {
        return
      }
      state.user.registeredMeetups.push(meetupId)
      state.user.mkeys[meetupId] = payload.mkeys
    },
    unregisterUserFromMeetup: (state, payload) => {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
      Reflect.deleteProperty(state.user.mkeys, payload)
    },
    setUser: (state, payload) => {
      state.user = payload
    }
  },
  actions: {
    registerUserForMeetup: ({ commit, getters }, payload) => {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registrations/').push(payload).then((data) => {
        commit('setLoading', false)
        commit('registerUserForMeetup', { id: payload, mkey: data.key })
      }).catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    unregisterUserFromMeetup: ({ commit, getters }, payload) => {
      commit('setLoading', true)
      const user = getters.user
      if (!user.mkeys) {
        return
      }
      const mkey = user.mkeys[payload]
      firebase.database().ref('/users/' + user.id + '/registrations/').child(mkey).remove().then(() => {
        commit('setLoading', false)
        commit('unregisterUserFromMeetup', payload)
      }).catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    signUpUser: ({ commit }, payload) => {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
        data => {
          commit('setLoading', false)
          const newUser = {
            id: data.uid,
            registeredMeetups: [],
            mkeys: {}
          }
          commit('setUser', newUser)
        }
      ).catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
    },
    signInUser: ({ commit }, payload) => {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
        data => {
          commit('setLoading', false)
          const loggedInUser = {
            id: data.uid,
            registeredMeetups: [],
            mkeys: {}
          }
          commit('setUser', loggedInUser)
        }
      ).catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
    },
    autoSignIn: ({ commit }, payload) => {
      commit('setUser', { id: payload.uid, registeredMeetups: [], mkeys: {} })
    },
    fetchUserData: ({ commit, getters }) => {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value').then(data => {
        const valuesMap = data.val()
        let registeredMeetups = []
        let swappedValuesMap = {}
        for (let key in valuesMap) {
          registeredMeetups.push(valuesMap[key])
          swappedValuesMap[valuesMap[key]] = key
        }
        const updatedUserData = {
          id: getters.user.id,
          registeredMeetups: registeredMeetups,
          mkeys: swappedValuesMap
        }
        commit('setLoading', false)
        commit('setUser', updatedUserData)
      }).catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    signOut: ({ commit }) => {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user: state => {
      return state.user
    }
  }
}
