import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
    key: 'shine-storage',
    storage: localStorage
  })

const store = new Vuex.Store({
    plugins: [vuexPersist.plugin],
	state: {
		userProfile: null,
	},
	getters: {
		userProfile: state => state.userProfile,
	},
	mutations: {
		setUserProfile: (state, userProfile) => {
			state.userProfile = userProfile;
        },
        clearStore: (state) => {
            state.userProfile = null;
        }
	},
})

export default store