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
}

};
</script>

<template>
	<div v-if = "Display === 1">
		<LoginForm/>
	</div>
	<div v-else-if = "Display === 2">
		<LoginForm/>
	</div>
</template>

<style scoped></style>



