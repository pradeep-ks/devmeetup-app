<template>
  <v-container>
    <v-row v-if="error">
      <v-col class="col-xs-12 col-sm-6 offset-sm-3">
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-xs-12 col-sm-6 offset-sm-3">
        <v-card>
          <v-card-text>
            <v-container>
              <v-form @submit.prevent="onSignUp">
                <v-text-field label="Email" id="email" v-model="email" type="email" required></v-text-field>
                <v-text-field
                  label="Password"
                  id="password"
                  v-model="password"
                  type="password"
                  required
                ></v-text-field>
                <v-text-field
                  label="Confirm Password"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  :rules="[validatePassword]"
                ></v-text-field>
                <br />
                <v-btn type="submit" class="ma-2" :disabled="loading" :loading="loading" color="secondary">
                  Sign Up
                </v-btn>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: '',
    confirmPassword: ''
  }),
  computed: {
    validatePassword () {
      return this.password !== this.confirmPassword
        ? 'Password Mismatch!'
        : 'Password Matched!'
    },
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignUp () {
      this.$store.dispatch('signUpUser', { email: this.email, password: this.password })
    },
    onDismissed () {
      console.log('Alert Dismissed!')
      this.$store.dispatch('clearError')
    }
  }
}
</script>
