<script>
import SignUpForm from "@/components/SignUpForm.vue";

export default {
	name: 'SignUp',
	components: {
	SignUpForm,
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
		<SignUpForm/>
	</div>
	<div v-else-if = "Display === 2">
		<SignUpForm/>
	</div>
</template>

<style scoped></style>



