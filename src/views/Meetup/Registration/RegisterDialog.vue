<template>
  <v-row justify="center">
    <v-dialog persistent="" max-width="600px" v-model="showDialog">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark="" v-on="on">
          {{ isUserRegistered ? 'Unregister' : 'Register' }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h4 class="headline" v-if="isUserRegistered">Unregister from Meetup?</h4>
          <h4 class="headline" v-else>Register for Meetup</h4>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" class="text-center">
                <p class="subtitle">You can always change your decision later on</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="" color="error" @click="showDialog = false">Cancel</v-btn>
          <v-btn text="" color="success" @click="onAgree">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['meetupId'],
  data () {
    return {
      showDialog: false
    }
  },
  computed: {
    isUserRegistered () {
      return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
        return meetupId === this.meetupId
      }) >= 0
    }
  },
  methods: {
    onAgree () {
      if (this.isUserRegistered) {
        this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
      } else {
        this.$store.dispatch('registerUserForMeetup', this.meetupId)
      }
    }
  }
}
</script>
