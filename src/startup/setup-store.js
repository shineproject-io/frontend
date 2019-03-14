import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import profileModule from '@/features/profile/profile.store.js';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
	key: 'shine-storage',
	storage: localStorage,
});

const store = new Vuex.Store({
	plugins: [vuexPersist.plugin],
	modules: {
		profileModule
	}
});

export default store;
