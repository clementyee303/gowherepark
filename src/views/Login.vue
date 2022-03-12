<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
	name: 'Login',
	components: {
	LoginForm,
	},
data() {
    return {
      Display: 1
	}
},
methods: {
	goToHome() {
		this.$router.push('/Home');
	}
},

};
</script>

<template>
	<div v-if = "Display === 1">
		<LoginForm @login-update="$emit('login-success', 2)"/>
	</div>
</template>

<style scoped></style>



