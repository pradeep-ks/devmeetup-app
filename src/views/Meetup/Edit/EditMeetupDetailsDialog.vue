<template>
  <v-row justify="center">
    <v-dialog persistent="" max-width="600px" v-model="showDialog">
      <template v-slot:activator="{ on }">
        <v-btn fab="" color="primary" dark="" v-on="on">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h4 class="headline">Edit Meetup</h4>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Title" name="title" id="title" v-model="editedTitle" required></v-text-field>
                <v-textarea label="Description" name="description" id="description" v-model="editedDescription" required></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn text="" outlined="" color="indigo" @click="saveChanges">Save</v-btn>
          <v-btn text="" outlined="" color="warning" @click="showDialog = false">Close</v-btn>
        </v-card-actions>
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
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description
    }
  },
  methods: {
    saveChanges () {
      if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
        return
      }
      this.showDialog = false
      this.$store.dispatch('updateMeetup', {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription
      })
    }
  }
}
</script>
