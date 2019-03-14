import Vue from 'vue';
import Axios from 'axios';
import router from '@/startup/routes-manifest.js';
import store from '@/startup/setup-store.js';

Vue.prototype.$http = Axios;
Axios.defaults.baseURL = process.env.VUE_APP_AXIOS_BASE_URL;

Axios.interceptors.request.use(function(config) {
	if (typeof window === 'undefined') {
		return config;
	}

	const token = store.getters.getAuthenticationToken;

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

Axios.interceptors.response.use(
	response => {
		return response;
	},
	function(error) {
		if (error.response && error.response.status === 401) {
			store.dispatch("signOut");
			store.dispatch("clearStore");
			router.push({ name: 'sign-in' });
			return;
		}
		return Promise.reject(error);
	}
);
