import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://c1.hiqcdn.com/customcdn/1300x512/destreviewimages/shareiq_264_1443767202.850242.JPG',
        id: '1',
        title: 'AngularJS Meetup',
        location: 'Prayagraj, Uttar Pradesh',
        description: 'An awesome meeting on the future of AngularJS MVW Framework',
        date: new Date().toLocaleString()
      },
      {
        imageUrl: 'https://www.dwih-newdelhi.org/files/2019/05/iStock-474239634_1600x907.jpg',
        id: '2',
        title: 'Vue Meetup',
        location: 'Grand Venice, Greater Noida, U.P.',
        description: 'A meeting on projects on Vue',
        date: new Date().toLocaleString()
      }
    ]
  },
  mutations: {
    saveMeetup: (state, payload) => {
      state.loadedMeetups.push(payload)
    },
    updateMeetup: (state, payload) => {
      const oldMeetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        oldMeetup.title = payload.title
      }
      if (payload.description) {
        oldMeetup.description = payload.description
      }
      if (payload.date) {
        oldMeetup.date = payload.date
      }
    },
    setLoadedMeetups: (state, payload) => {
      state.loadedMeetups = payload
    }
  },
  actions: {
    loadMeetups: ({ commit }) => {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value').then(
        data => {
          const meetupsList = []
          const obj = data.val()
          for (let key in obj) {
            meetupsList.push({
              id: key,
              title: obj[key].title,
              location: obj[key].location,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetupsList)
          commit('setLoading', false)
        }
      ).catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    saveMeetup: ({ commit, getters }, payload) => {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('meetups').push(meetup).then(
        data => {
          key = data.key
          return key
        }
      ).then(key => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
      }).then(snapshot => {
        const fullPath = snapshot.metadata.fullPath
        return firebase.storage().ref(fullPath).getDownloadURL()
      }).then(data => {
        imageUrl = data
        return firebase.database().ref('meetups').child(key).update({ imageUrl: imageUrl })
      }).then(() => {
        commit('saveMeetup', {
          ...meetup,
          imageUrl: imageUrl,
          id: key
        })
      }).catch(
        error => {
          console.log(error)
        }
      )
    },
    updateMeetup: ({ commit }, payload) => {
      commit('setLoading', true)
      const updatedMeetup = {}
      if (payload.title) {
        updatedMeetup.title = payload.title
      }
      if (payload.description) {
        updatedMeetup.description = payload.description
      }
      if (payload.date) {
        updatedMeetup.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updatedMeetup).then(
        () => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
        }
      ).catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
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
    }
  },
  getters: {
    loadedMeetups: state => {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups: (state, getters) => {
      return getters.loadedMeetups.slice(0, 5)
    },
    getMeetupById: state => meetupId => {
      return state.loadedMeetups.find(meetup => meetup.id === meetupId)
    }
  }
}
