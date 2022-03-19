<template>
		<form @submit.prevent class="md:flex md:justify-center mb-6" >
		<div class="col-span-1 lg:col-span-6">
			<h4 class="text-4xl text-gray-700 mb-5">Current Session</h4>
			<div class="p-10 rounded-md shadow-md bg-white">
				<h4 class="text-3xl text-gray-700 mb-5 font-bold">Time Remaining</h4>
				<h4 class="text-3xl text-gray-700 mb-5 font-bold">{{this.TimeRemain}}</h4>
				<div class="mb-6">
			</div>
			<div class="text-center ">
				<span class="inline-block text-left  font-bold">
					<img class ="float-left w-5" src="@/assets/images/location_icon.png" /> &nbsp;
					{{ total }} Carpark: {{this.CarPark}}
					<br><br>
					<img class ="float-left w-5" src="@/assets/images/car-icon.png" /> &nbsp;
					{{ total }} Carplate: {{this.CarPlateNum}}
					<br><br>
					{{ total }}Current Carpark Rate: {{this.Rates}}
					<br><br>
					{{ total }}Session Start Time: {{this.StartDate}}
					<br><br>
					{{ total }}Session End Time: {{this.EndDate}}
					<br><br>
				</span>
			</div>
				<div class="grid grid-cols-2 gap-8">
				
				<router-link :to="{ name: 'Home', }" 
				button @click="EndSession()" class="w-full text-center px-4 py-3 bg-red-500 rounded-md shadow-md text-white font-semibold">End Session</router-link>


				<router-link
			to="/Checkout"
			button class="w-full text-center px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold"
			>Proceed</router-link>
		
			</div>
		</div>
	</div>
	</form>
</template>

<script>

import firebaseApp from '../../firebase.js';
import { getFirestore } from 'firebase/firestore'
import {setDoc, doc, getDocs, collection} from 'firebase/firestore';
const db = getFirestore(firebaseApp);

export default {
name: 'ExtendParking',
data() {
    return {
		CarPlateNum: "",
		Rates: "",
		CarPark: "",
		StartDate: "",
		EndDate: "",
		TimeRemain: ""
	}
},

beforeMount(){
    this.getDisplay()
},

methods: {
	async getDisplay(){
		let z = await  getDocs(collection(db, "Luffy"))
			z.forEach((docs) => {
				let data =  docs.data()
				this.CarPlateNum = data.Carplate 
				this.Rates = data.Price
				this.CarPark = data.Carpark
				this.StartDate = data.StartTime
				this.EndDate = data.EndTime
				this.TimeRemain = '1 HR 20 MIN'
			})
	},
	async EndSession() {
	try {
		const docRef = await setDoc(doc(db, 'Luffy', 'Information'), {
			Session: false,
			})
			console.log(docRef)
			}
			catch(error) {
				console.error("Error adding document: ", error);
				}
			}
		}
	}

</script>
