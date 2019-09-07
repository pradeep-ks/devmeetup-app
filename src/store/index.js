import Vue from 'vue'
import Vuex from 'vuex'
import MeetupModule from './meetup'
import SharedModule from './shared'
import UserModule from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    meetup: MeetupModule,
    shared: SharedModule,
    user: UserModule
  }
})
