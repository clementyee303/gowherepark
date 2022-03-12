<script>
import EnterParkingInfo from "@/components/shared/EnterParkingInfo.vue";
import ExtendParking from "@/components/shared/ExtendParking.vue";

export default {
	name: 'Payment',
	components: {
	EnterParkingInfo,
	ExtendParking
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
		<EnterParkingInfo/>
	</div>
	<div v-else-if = "Display === 2">
		<ExtendParking/>
	</div>
</template>

<style scoped></style>



