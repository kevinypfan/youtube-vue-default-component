import Vue from 'vue'
import Router from 'vue-router'

import Auth from '../pages/Auth.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/auth', component: Auth }
  ],
  mode: 'history'
})
