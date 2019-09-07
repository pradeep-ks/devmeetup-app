<template>
  <v-container>
    <v-row>
      <v-col class="col-md-6 text-center text-sm-right">
        <v-btn color="info" large router to="/meetups">Explore Meetups</v-btn>
      </v-col>
      <v-col class="col-md-6 text-center text-sm-left">
        <v-btn color="info" large router to="/meetup/create">Organize Meetups</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-xs-12 col-sm-6 offset-sm-3 text-center">
        <v-progress-circular indeterminate="" color="purple" :width="7" :size="70" v-if="loading"></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-if="!loading">
      <v-col>
        <v-card class="mx-auto" max-width="75%">
        <v-carousel style="cursor: pointer;">
          <v-carousel-item v-for="item in items" :key="item.id" :src="item.src"
            reverse-transition="fade-transition" transition="fade-transition"
            @click="onloadMeetup(item.id)"
          >
            <div class="heading text-center">{{ item.title }}</div>
          </v-carousel-item>
        </v-carousel>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-xs-12 text-center">
        <p>Join Our Awesome Meetups!</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    items () {
      return this.$store.getters.featuredMeetups
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onloadMeetup: function (id) {
      console.log('Inside onloadMeetup')
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>

<style scoped>
  .heading {
    position: absolute;
    bottom: 60px;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 2em;
    text-align: center;
    padding: 20px;
    width: 100%;
    border-radius: 5px;
    color: white;
  }
</style>
