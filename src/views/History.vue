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
	<div class="monthlyExpenditures">
		<MonthlyExpenditures/>
	</div>
	<div class="ppTransactions">
		<PastParkingTransactions/>
	</div>
	
</template>

<style scoped>
.monthlyExpenditures{
	margin: auto;
	width: 50%;
	height: 10%;
	border: 1px solid grey;
}
.ppTransactions{
	margin: auto;
	width: 80%;
	border: 1px solid grey;
	margin-top: 2%;	
}
</style>
