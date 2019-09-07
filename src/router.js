import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import CreateMeetup from './views/Meetup/CreateMeetup'
import Meetups from './views/Meetup/Meetups'
import MeetupDetails from './views/Meetup/MeetupDetails'
import Profile from './views/User/Profile'
import SignIn from './views/User/SignIn'
import SignUp from './views/User/SignUp'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/meetups', name: 'Meetups', component: Meetups },
    { path: '/meetups/:id', name: 'MeetupDetails', props: true, component: MeetupDetails },
    { path: '/meetup/create', name: 'CreateMeetup', component: CreateMeetup, beforeEnter: AuthGuard },
    { path: '/profile', name: 'Profile', component: Profile, beforeEnter: AuthGuard },
    { path: '/sign-in', name: 'SignIn', component: SignIn },
    { path: '/sign-up', name: 'SignUp', component: SignUp }
  ]
})
