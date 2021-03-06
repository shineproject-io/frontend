import Axios from 'axios';
import router from '@/startup/routes-manifest.js';
import store from '@/startup/setup-store.js';
import authenticationService from '@/features/authentication/authentication.service.js';

Axios.defaults.baseURL = process.env.VUE_APP_AXIOS_BASE_URL;

Axios.interceptors.request.use(function (config) {
	if (typeof window === 'undefined') {
		return config;
	}

	const token = store.state.authenticationModule.authenticationToken;

	if (token) {
		const expiry = store.state.authenticationModule.authenticationExpiry;
		let isExpired = authenticationService.isAuthorisationExpired(expiry);
		if (isExpired === true) {
			signOut();
			return;
		}

		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

Axios.interceptors.response.use(
	response => {
		return response;
	},
	function (error) {
		if (error.response && error.response.status === 401) {
			signOut()
			return;
		}
		return Promise.reject(error);
	}
);

function signOut() {
	store.dispatch('authenticationModule/signOut');
	store.dispatch('listsModule/signOut');
	store.dispatch('todoModule/signOut');
	store.dispatch('profileModule/signOut');
	store.dispatch("suggestionsModule/signOut");
	router.push({
		name: 'sign-in'
	});
}