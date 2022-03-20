<script>
import feather from 'feather-icons';
import AppHeaderLinks from './AppHeaderLinks.vue';
// import Button from '../reusable/Button.vue';

export default {
	components: {
		AppHeaderLinks,
		// Button,
	},
	data() {
		return {
			isOpen: false,
			theme: '',
		};
	},

	created() {
		this.theme = localStorage.getItem('theme') || 'light';
	},
	mounted() {
		feather.replace();
		this.theme = localStorage.getItem('theme') || 'light';
	},
	methods: {
		updateTheme(theme) {
			this.theme = theme;
		},
		showModal() {
			if (this.modal) {
				// Stop screen scrolling
				document
					.getElementsByTagName('html')[0]
					.classList.remove('overflow-y-hidden');
				this.modal = false;
			} else {
				document
					.getElementsByTagName('html')[0]
					.classList.add('overflow-y-hidden');
				this.modal = true;
			}
		},
	},
	updated() {
		feather.replace();
	},
};
</script>



<template>
	
	<nav class="container flex justify-around py-8 mx-auto bg-white">
  <div class="flex items-center">
    <div> <router-link to="/Home"
						><img
							src="@/assets/images/logo-light.png"
							class="w-36"
							alt="Light Logo"
						/>
					</router-link>
				</div>
  </div>
  <!-- left header section -->
  <div class="items-center hidden space-x-8 lg:flex">
	<AppHeaderLinks :showModal="showModal" :isOpen="isOpen" />
  </div>
  <!-- right header section -->
  <div class="flex items-center space-x-2">
   <!-- <Button
						title="Logout"
						class="text-md font-general-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-md px-3 py-2.5 duration-300"
						@click="$emit('logout-update', 1)"
						aria-label="Log out"
					/> -->
	<button 
		class="text-md font-general-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-md px-3 py-2.5 duration-300"
		@click="$emit('logout-update', 2)"> Logout </button>

      
    
    
  </div>
</nav>
</template>





<style scoped>
#nav a.router-link-exact-active {
	@apply text-indigo-700;
	@apply 2xl:text-indigo-400; /* @apply dark:text-indigo-400; */
	@apply font-medium;
}
</style>
