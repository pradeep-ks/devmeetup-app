import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#607d8b',
        accent: '#9c27b0',
        error: '#f44336',
        warning: '#ff9800',
        info: '#00bcd4',
        success: '#4caf50'
      }
    }
  }
})
