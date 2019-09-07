<template>
  <v-container>
    <v-row v-for="meetup in meetups" :key="meetup.id">
      <v-col>
        <v-card outlined="" max-width="600" class="mx-auto">
          <v-list-item three-line="">
            <v-list-item-content>
              <!-- <div class="overline mb-4">Overline</div> -->
              <v-list-item-title class="headline mb-1">{{ meetup.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ meetup.date | local-date }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar tile="" size="180">
              <v-img class="white--text" :src="meetup.imageUrl"></v-img>
            </v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-btn color="success" :to="'/meetups/' + meetup.id">
              <v-icon left="">mdi-arrow-right-thick</v-icon>
              View Meetup
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>
