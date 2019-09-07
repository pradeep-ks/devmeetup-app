<template>
  <v-container>
    <v-row>
      <v-col class="col-xs-12 col-sm-6 offset-sm-3 text-center">
        <v-progress-circular indeterminate color="purple" :width="7" :size="70" v-if="loading"></v-progress-circular>
      </v-col>
    </v-row>
    <v-card class="mx-auto" max-width="600" v-if="!loading">
      <v-img class="white--text" height="300px" :src="meetup.imageUrl">
        <v-card-title class="align-end fill-height">
          {{ meetup.title }}
          <template v-if="isCreator">
            <v-spacer></v-spacer>
            <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
          </template>
        </v-card-title>
      </v-img>

      <v-card-text>
        <span>{{ meetup.date | local-date }}</span>
        <v-row>
          <v-col cols="6">
            <app-edit-meetup-date-dialog :meetup="meetup" v-if="isCreator"></app-edit-meetup-date-dialog>
          </v-col>
          <v-col cols="6">
            <app-edit-meetup-time-dialog :meetup="meetup" v-if="isCreator"></app-edit-meetup-time-dialog>
          </v-col>
        </v-row>
        <br />
        <span class="text--primary">
          <span>{{ meetup.location }}</span>
          <br />
          <span>{{ meetup.description }}</span>
        </span>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <app-register-dialog :meetupId="meetup.id" v-if="isUserAuthenticated && !isCreator"></app-register-dialog>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    meetup () {
      return this.$store.getters['getMeetupById'](this.id)
    },
    isUserAuthenticated () {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      )
    },
    isCreator () {
      if (!this.isUserAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.meetup.creatorId
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
