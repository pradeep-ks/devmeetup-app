import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import DateFilter from './filters/date'
import AlertComponent from './views/Shared/Alert.vue'
import EditMeetupDetailsDialog from './views/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditMeetupDateDialog from './views/Meetup/Edit/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from './views/Meetup/Edit/EditMeetupTimeDialog.vue'
import RegisterDialog from './views/Meetup/Registration/RegisterDialog.vue'

Vue.config.productionTip = false

Vue.filter('local-date', DateFilter)
Vue.component('app-alert', AlertComponent)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog)
Vue.component('app-register-dialog', RegisterDialog)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCMQugcvYRPNfWwKcOHd8Lubu0iztJyHk4',
      authDomain: 'devmeetup-e5455.firebaseapp.com',
      databaseURL: 'https://devmeetup-e5455.firebaseio.com',
      projectId: 'devmeetup-e5455',
      storageBucket: 'gs://devmeetup-e5455.appspot.com/',
      messagingSenderId: '252961548784',
      appId: '1:252961548784:web:9489a037f887a1b0'
    })
    // checking authenticated user
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')
