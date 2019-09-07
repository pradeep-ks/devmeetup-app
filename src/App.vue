<template>
  <v-app>
    <div>
      <v-navigation-drawer v-model="sidenav" absolute temporary class="deep-purple accent-4" dark>
        <v-list flat color="primary">
          <v-list-item v-for="item in getMenuItems" :key="item.title" :to="item.link">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="isUserAuthenticated" @click="onSignOut">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar class="deep-purple accent-4" dark>
        <v-app-bar-nav-icon @click.stop="sidenav = !sidenav" class="d-sm-none"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">DevMeetup</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="d-none d-sm-flex">
          <v-btn text v-for="item in getMenuItems" :key="item.title" :to="item.link">
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
          <v-btn text v-if="isUserAuthenticated" @click="onSignOut">
            <v-icon left="">mdi-logout</v-icon>
            Sign Out
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>
    </div>
    <main class="mt-4">
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    sidenav: false
  }),
  computed: {
    getMenuItems () {
      let menuItems = [
        { icon: 'mdi-account-plus', title: 'Sign Up', link: '/sign-up' },
        { icon: 'mdi-lock-open', title: 'Sign In', link: '/sign-in' }
      ]

      if (this.isUserAuthenticated) {
        menuItems = [
          { icon: 'mdi-account-multiple', title: 'View Meetups', link: '/meetups' },
          {
            icon: 'mdi-calendar-text',
            title: 'Organize Meetup',
            link: '/meetup/create'
          },
          { icon: 'mdi-account-circle', title: 'Profile', link: '/profile' }
        ]
      }
      return menuItems
    },
    isUserAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onSignOut () {
      this.$store.dispatch('signOut')
    }
  }
}
</script>
