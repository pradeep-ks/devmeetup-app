<template>
  <v-form @submit.prevent="onSubmit">
    <v-container class="col-xs-12 col-sm-6 offset-sm-3">
      <v-row>
        <v-col class="text-center">
          <h4 class="headline">Create New Meetup</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="Title" name="title" id="title" v-model="title" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="Location" name="location" id="location" v-model="location" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <!-- <v-text-field label="Image URL" name="imageUrl" id="image-url" v-model="imageUrl" required></v-text-field> -->
          <v-file-input label="Upload Image" show-size="" prepend-icon="mdi-camera" accept="image/*" @change="onFileSelect"></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <img :src="imageUrl" alt="Image Preview" height="200">
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea label="Description" name="description" id="description" v-model="description" required></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h4>Pick The Date &amp; Time:</h4>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="6">
          <v-date-picker v-model="date"></v-date-picker>
        </v-col>
        <v-col cols="6">
          <v-time-picker v-model="time" format="24hr"></v-time-picker>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn class="primary" :disabled="!formValid" type="submit">Create Meetup</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    title: '',
    location: '',
    imageUrl: '',
    description: '',
    date: new Date().toISOString().substring(0, 10),
    time: new Date(),
    image: null
  }),
  computed: {
    formValid () {
      return this.title !== '' && this.location !== '' && this.imageUrl !== '' && this.description !== ''
    },
    toLocalDateTime () {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      return date
    }
  },
  methods: {
    onSubmit () {
      if (!this.formValid) {
        return
      }
      if (!this.image) {
        return
      }
      const data = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.toLocalDateTime
      }
      this.$store.dispatch('saveMeetup', data)
      this.$router.push('/meetups')
    },
    onFileSelect (object) {
      let filename = object.name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please Select A Valid File!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(object)
      this.image = object
    }
  }
}
</script>
