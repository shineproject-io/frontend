import Vue from 'vue';
import VueRouter from 'vue-router';
import VueAnalytics from 'vue-analytics';

Vue.use(VueRouter);

function loadPage(pagePath) {
	return () => import(`@/features/${pagePath}`);
}

const router = new VueRouter({
	mode: 'history',
	linkActiveClass: 'active',
	routes: [
		{ path: '/', redirect: '/welcome/features' },
		{
			name: 'features',
			path: '/welcome/features',
			component: loadPage('features/features.page.vue'),
		},
		{
			name: 'sign-in',
			path: '/welcome/signin',
			component: loadPage('authentication/sign-in.page.vue'),
		},
		{
			name: 'register',
			path: '/welcome/register',
			component: loadPage('authentication/register.page.vue'),
		},
		{
			name: 'change-password',
			path: '/welcome/changepassword',
			component: loadPage('authentication/change-password.page.vue'),
		},
		{
			name: 'forgotten-password',
			path: '/welcome/forgottenpassword',
			component: loadPage('authentication/forgotten-password.page.vue'),
		},
		{
			name: 'search',
			path: '/secure/search',
			component: loadPage('search/search.page.vue'),
		},
		{
			name: 'profile',
			path: '/secure/profile',
			component: loadPage('profile/profile.page.vue'),
		},
		{
			name: 'list',
			path: '/secure/list',
			component: loadPage('lists/list.page.vue'),
		},
	],
});

Vue.use(VueAnalytics, {
	id: 'UA-130594308-1',
	router,
	debug: {
		sendHitTask: process.env.NODE_ENV === 'production',
	},
});

export default router;
