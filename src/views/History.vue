<script>
import MonthlyExpenditures from "@/components/shared/MonthlyExpenditures.vue";
import PastParkingTransactions from "@/components/shared/PastParkingTransactions.vue";


export default {
	name: 'History',
	components: {
		MonthlyExpenditures,
		PastParkingTransactions
	},
};
</script>

<template>
	<div>
		<MonthlyExpenditures/>
	</div>
	<div>
		<PastParkingTransactions/>
	</div>
	
</template>

<style scoped></style>
