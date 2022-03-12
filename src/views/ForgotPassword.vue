<script>
import ForgotPasswordForm from "@/components/ForgotPasswordForm.vue";

export default {
	name: 'ForgotPassword',
	components: {
	ForgotPasswordForm,
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
		<ForgotPasswordForm/>
	</div>
	<div v-else-if = "Display === 2">
		<ForgotPasswordForm/>
	</div>
</template>

<style scoped></style>



