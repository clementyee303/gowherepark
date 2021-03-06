import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () =>
		import('../views/Home.vue'),
		meta: {
			title: 'Home',
		},
	},
	{
		path: '/Home',
		name: 'Home',
		component: () =>
		import('../views/Home.vue'),
		meta: {
			title: 'Home',
		},
	},
	{
		path: '/Locate',
		name: 'Locate',
		component: () =>
			import('../views/Locate.vue'),
		meta: {
			title: 'Locate',
		},
	},
	{
		path: '/Payment',
		name: 'Payment',
		component: () =>
			import('../views/Payment.vue'),
		meta: {
			title: 'Payment',
		},
		props: true
	},
	{
		path: '/ExtendPayment',
		name: 'ExtendPayment',
		component: () =>
			import('../views/ExtendPayment.vue'),
		meta: {
			title: 'ExtendPayment',
		},
		props: true
	},
	{
		path: '/History',
		name: 'History',
		component: () =>
			import( '../views/History.vue'),
		meta: {
			title: 'History',
		},
	},
	{
		path: '/Bookmark',
		name: 'Bookmark',
		component: () =>
			import( '../views/Bookmark.vue'),
		meta: {
			title: 'Bookmark',
		},
	},
	{
		path: '/Checkout',
		name: 'Checkout',
		component: () =>
			import( '../views/Checkout.vue'),
		meta: {
			title: 'Checkout',
		},
		props: true
	},
	{
		path: '/Login',
		name: 'Login',
		component: () =>
			import( '../views/Login.vue'),
		meta: {
			title: 'Login',
		},
	},
	{
		path: '/SignUp',
		name: 'SignUp',
		component: () =>
			import( '../views/SignUp.vue'),
		meta: {
			title: 'SignUp',
		},
	},
	{
		path: '/ForgotPassword',
		name: 'ForgotPassword',
		component: () =>
			import( '../views/ForgotPassword.vue'),
		meta: {
			title: 'ForgotPassword',
		},
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior() {
		document.getElementById('app').scrollIntoView();
	},
});

export default router;

/**
 * Below code will display the component/active page title
 * Powered by: Nangialai Stoman
 */

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
	// This goes through the matched routes from last to first, finding the closest route with a title.
	// e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
	// `/nested`'s will be chosen.
	const nearestWithTitle = to.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.title);

	// Find the nearest route element with meta tags.
	const nearestWithMeta = to.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.metaTags);

	const previousNearestWithMeta = from.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.metaTags);

	// If a route with a title was found, set the document (page) title to that value.
	if (nearestWithTitle) {
		document.title = nearestWithTitle.meta.title;
	} else if (previousNearestWithMeta) {
		document.title = previousNearestWithMeta.meta.title;
	}

	// Remove any stale meta tags from the document using the key attribute we set below.
	Array.from(
		document.querySelectorAll('[data-vue-router-controlled]')
	).map((el) => el.parentNode.removeChild(el));

	// Skip rendering meta tags if there are none.
	if (!nearestWithMeta) return next();

	// Turn the meta tag definitions into actual elements in the head.
	nearestWithMeta.meta.metaTags
		.map((tagDef) => {
			const tag = document.createElement('meta');

			Object.keys(tagDef).forEach((key) => {
				tag.setAttribute(key, tagDef[key]);
			});

			// We use this to track which meta tags we create so we don't interfere with other ones.
			tag.setAttribute('data-vue-router-controlled', '');

			return tag;
		})
		// Add the meta tags to the document head.
		.forEach((tag) => document.head.appendChild(tag));

	next();
});
