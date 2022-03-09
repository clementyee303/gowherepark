<script>
import feather from 'feather-icons';
import FooterCopyright from './FooterCopyright.vue';
export default {
	components: { FooterCopyright },
	
	mounted() {
		feather.replace();
	},
	updated() {
		feather.replace();
	},
};
</script>

<template>
	<div class="container mx-auto ">
		<div
			class="pt-20 sm:pt-30 pb-8 mt-20 border-t-2 border-primary-light dark:border-secondary-dark"
		>
			<!-- Footer social links -->
			<div
				class="flex flex-col justify-center items-center mb-12 sm:mb-20"
			>
				<p
					class="font-general-semibold text-3xl sm:text-4xl font-semibold text-primary-dark dark:text-primary-light mb-5"
				>
				
				</p>
				
			</div>

			<!-- Footer copyright -->
			<FooterCopyright />
		</div>
	</div>
</template>

<style scoped></style>