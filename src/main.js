// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueTouch from 'vue-touch'
import moment from 'moment'
import App from './App'
import router from './router'
import store from './store'
import 'the-grid-flexbox/css/the-grid.min.css'

Vue.config.productionTip = false
Vue.use(VueTouch, {name: 'v-touch'})

Vue.filter('datetime', (value) => {
  var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }
  return new Intl.DateTimeFormat('pt-BR', options).format(new Date(value))
})

Vue.filter('date', (value) => {
  // var options = {year: 'numeric', month: 'numeric', day: 'numeric'}
  // return new Intl.DateTimeFormat('pt-BR', options).format(new Date(value))
  return moment(value).format('DD/MM/Y')
})

// Vue.prototype.db = firebase.database()
// Vue.prototype.auth = firebase.auth
// Vue.prototype.storage = firebase.storage()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
