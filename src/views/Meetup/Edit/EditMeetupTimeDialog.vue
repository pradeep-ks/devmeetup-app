<template>
  <v-row justify="center">
    <v-dialog persistent="" max-width="600px" v-model="showDialog">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark="" v-on="on">
          Edit Time
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h4 class="headline">Edit Meetup Time</h4>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" class="text-center">
                <v-time-picker v-model="editableTime" actions format="24hr">
                  <template>
                    <v-btn text="" color="blue darken-1" @click.native="showDialog = false">Close</v-btn>
                    <v-btn text="" color="blue darken-1" @click.native="saveChange">Save</v-btn>
                  </template>
                </v-time-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      showDialog: false,
      editableTime: null
    }
  },
  methods: {
    saveChange () {
      const newDate = new Date(this.meetup.date)
      const hours = this.editableTime.match(/^(\d+)/)[1]
      const minutes = this.editableTime.match(/:(\d+)/)[1]

      newDate.setHours(hours)
      newDate.setMinutes(minutes)
      this.$store.dispatch('updateMeetup', { id: this.meetup.id, date: newDate })
    }
  },
  created () {
    this.editableTime = new Date(this.meetup.date)
  }
}
</script>
