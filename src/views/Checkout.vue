/* eslint-disable vue/no-dupe-keys */

<script>

import Card from "@/components/shared/Card.vue";
import Paynow from "@/components/shared/Paynow.vue";
import Summary from "@/components/shared/Summary.vue";
import firebaseApp from '../firebase.js';
import { getFirestore, getDocs, collection} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
	name: 'Checkout',
	
	props: ["Rates", "CarPlate", "CarPark" ,"StartTime", "EndTime", "RatesPerMin"],


	components: {
	'Card': Card,
	'Paynow':Paynow,
	'Summary':Summary
	},
	data() {
		return {
			component: Card,
			displayName: "",
			size: ""
		}
	},
	mounted() {
		const auth = getAuth(firebaseApp);
		onAuthStateChanged(auth, (user) => {
			if (user) {
				this.displayName = user.displayName;
			} else {
				this.displayName = "Guest"
			}
		})
		this.getData(db)
	},
methods: {
	async getData(db){
		const collect = collection(db, String(String(this.displayName)+'_'))
		const Snapshot = await getDocs(collect)
		console.log(Snapshot.docs.map(doc => doc.data() ))
		console.log(Snapshot.docs.map(doc => doc.data() ).size)
		console.log(Snapshot.size)
		this.size = Snapshot.size + 1

		return this.carParkArray, this.size
	},
}
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
		:RatesPerMin='this.RatesPerMin'
		:CarPlate="this.CarPlate"
		:CarPark="this.CarPark"
		:StartTime="this.StartTime"
		:EndTime="this.EndTime"
		:Session_Number="this.size"
		>			
		</component>
		</keep-alive>
		</div>
		<Summary :Rates="this.Rates" :Session_Number="this.size"></Summary>
	</div>
</template>




 