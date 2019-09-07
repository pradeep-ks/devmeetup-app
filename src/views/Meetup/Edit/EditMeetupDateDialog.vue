<template>
  <v-row justify="center">
    <v-dialog persistent="" max-width="600px" v-model="showDialog">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark="" v-on="on">
          Edit Date
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h4 class="headline">Edit Meetup Date</h4>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" class="text-center">
                <v-date-picker v-model="editableDate" actions>
                  <template>
                    <v-btn text="" color="blue darken-1" @click.native="showDialog = false">Close</v-btn>
                    <v-btn text="" color="blue darken-1" @click.native="saveChange">Save</v-btn>
                  </template>
                </v-date-picker>
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
      editableDate: null
    }
  },
  methods: {
    saveChange () {
      const newDate = new Date(this.meetup.date)
      const newDay = new Date(this.editableDate).getUTCDate()
      const newMonth = new Date(this.editableDate).getUTCMonth()
      const newYear = new Date(this.editableDate).getUTCFullYear()

      newDate.setUTCDate(newDay)
      newDate.setUTCMonth(newMonth)
      newDate.setUTCFullYear(newYear)
      this.$store.dispatch('updateMeetup', { id: this.meetup.id, date: newDate })
    }
  },
  created () {
    this.editableDate = new Date(this.meetup.date).toISOString().substring(0, 10)
  }
}
</script>
