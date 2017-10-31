import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {path: '/', component: require('./components/About')},
    {path: '/blog', component: require('./components/Blog')},
    {path: '/works', component: require('./components/Works')}
]

export default new VueRouter({ routes, mode: 'history'});