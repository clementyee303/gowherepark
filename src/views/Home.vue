<script>
import firebaseApp from '../firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
	name: 'Home',
	components: {
	},
	data() { 
		return {
			displayName: "",
		}
	},
	mounted() {
		const auth = getAuth(firebaseApp);
		onAuthStateChanged(auth, (user) => {
			if (user) {
				this.displayName = user.displayName;
			} else {
				this.displayName = "test"
			}
		})
	},
};
</script>

<template>
	<div class="container mx-auto">
	<h1> Home Page Info {{displayName}}</h1>

	</div>
</template>

<style scoped></style>
