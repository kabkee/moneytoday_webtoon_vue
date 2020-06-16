import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        toons: [],
        chapters: [],
    },
    mutations: {
        setToons(state, payload) {
            state.toons = payload;
        },
        setChapters(state, payload) {
            state.chapters = payload;
        },
    },
    actions: {
        setToons(context, payload) {
            context.commit('setToons', payload);
        },
        setChapters(context, payload) {
            context.commit('setChapters', payload);
        }
    },
    getters: {
        getToons(state) {
            return state.toons;
        },
        getChapters(state) {
            return state.chapters;
        }
    }
})
