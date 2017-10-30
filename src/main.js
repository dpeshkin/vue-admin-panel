import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import { store } from './store'

export const $eventBus = new Vue(); // заводим $eventBus для передачи событий между компонентами


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
