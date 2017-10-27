import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import skills from './modules/skills'

export const store = new Vuex.Store({
    modules: {
        skills
    }
})