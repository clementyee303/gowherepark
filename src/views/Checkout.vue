/* eslint-disable vue/no-dupe-keys */

<script>

import Card from "@/components/shared/Card.vue";
import Paynow from "@/components/shared/Paynow.vue";
import Summary from "@/components/shared/Summary.vue";


export default {
	name: 'Checkout',
	
	props: ["Rates", "CarPlate", "CarPark" ,"StartTime", "EndTime"],


	components: {
	'Card': Card,
	'Paynow':Paynow,
	'Summary':Summary
	},
	data() {
		return {
			component: Card
		}
	},

};


</script>


<template>

	<div class="grid grid-cols-2 gap-2 md:flex md:justify-center mb-6">
		<div>
		<div class="grid grid-cols-2 gap-2 md:flex md:justify-center mb-6">
		<button v-on:click="component='Card'; " class = "text-center px-4 py-3 bg-gray-500 rounded-md shadow-md text-white font-semibold">Card</button>
		<button v-on:click="component='Paynow'" class= "text-center px-4 py-3 bg-gray-500 rounded-md shadow-md text-white font-semibold">Paynow</button>
		</div>
		<keep-alive>
			
		<component v-bind:is="component" 
		:Rates="this.Rates" 
		:CarPlate="this.CarPlate"
		:CarPark="this.CarPark"
		:StartTime="this.StartTime"
		:EndTime="this.EndTime">			
		</component>
		</keep-alive>
		</div>
		<Summary :Rates="this.Rates"></Summary>
	</div>
</template>




 