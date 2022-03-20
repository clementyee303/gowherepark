/* eslint-disable no-undef */
/* eslint-disable vue/require-v-for-key */

<template>
		<form @submit.prevent class="md:flex md:justify-center mb-6" >
		<div class="col-span-1 lg:col-span-6">
			<h4 class="text-3xl text-gray-700 mb-5">Select Session</h4>
			<div class="p-10 rounded-md shadow-md bg-white">
				<div class="mb-6">
					<label class="block mb-3 text-gray-600" for="">Car Park</label>
	
					<select v-model="selectedValue" @change="onChange($event)" class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest">
					<option 
					v-for="carPark in carParkArray" v-bind:key="carPark.Name" v-bind:value="carPark.Name">{{ carPark.Name }}
					</option>
					</select>
				
				</div>
				<div class="mb-6">
					<label class="block mb-3 text-gray-600" for="">Car Number</label>
					<input type="text" v-model="CarNum" class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest"/>
				</div>
				<div class="mb-6">
					
					<label class="block mb-3 text-gray-600" for="">Duration</label>
					<div class="grid grid-cols-3 gap-1">
						
						<button @click = "decrease" class="text-xl text-center border border-gray-500 rounded-md inline-block py-1 px-1 w-full text-gray-600 tracking-widest mr-4">
						-
						</button>
						<select class="text-center border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest mr-6">
						<option>{{DisplayH}}HR {{DisplayM}}MIN</option>
						</select>
						<button @click = "increase" class="text-xl text-center border border-gray-500 rounded-md inline-block py-1 px-1 w-full text-gray-600 tracking-widest mr-4">
						+
						</button>
				
				</div>
			</div>
			<div class="text-center ">
				<span class="inline-block text-left  font-bold">
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Current Carpark Rate: ${{Rates}}
					<br><br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Session Start Time: {{StartTime}}
					<br><br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Session End Time: {{EndTime}}
					<br><br>
				</span>
			</div>
			<div>
            
			<router-link :to="{ name: 'Checkout', params: { 
				Rates: this.Rates,
				RatesPerMin: (this.Rates/this.Minute)*30,
				CarPlate: this.CarNum,
				CarPark:  this.selectedCarpark,
				StartTime:  this.StartTime,
				EndTime: this.EndTime,
			}}" 
			button @click = "getCarPlate" class="w-full text-center px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold">Proceed</router-link>

			</div>
		</div>
	</div>
	</form>
</template>


<script>
import firebaseApp from '../../firebase.js';
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs} from 'firebase/firestore';
const db = getFirestore(firebaseApp);


export default {
 name: "EnterParking",


data() {
    return {
		Minute: 30,
		DisplayH: "0",
		DisplayM: "30",
		StartTime: "",
		Endtime: "",
		Rates: 0,
		selectedCarpark: "",
		carplate: "",
		carParkArray: []
	}
 },

beforeMount(){
    this.getData()
	this.getEndTime()
 },

 created() {
	setInterval(this.getNow, 1000);
 },
methods: {
	async getData(){
		let z = await getDocs(collection(db, "Carpark"))
		z.forEach((docs) => {
			let data =   docs.data()
			this.carParkArray.push({Name : data.Name, Price: data.Price})
			})
		return this.carParkArray
	},

	getCarPlate() {
		this.carplate = this.CarNum
		return this.carplate
	},

	getEndTime(){
		this.EndTime = this.getDateFormat(30)
		return this.EndTime
	},

	decrease() {
		if(this.Minute >= 60) {
			this.Minute -= 30
			this.DisplayH = parseInt(this.Minute / 60) ;
			this.DisplayM = parseInt(this.Minute % 60);
			this.EndTime = this.getDateFormat(this.Minute)
			if(this.DisplayM == 0)
				this.DisplayM = "00"
			this.Rates = (this.Rates/(this.Minute+30)  * (this.Minute)).toFixed(2)
		}
		return this.DisplayM, this.DisplayH, this.EndTime, this.Rates
	},
	getDateFormat(cal) {
		const today = new Date();
		today.setMinutes(today.getMinutes() + cal);
        const date = +today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
		var h = today.getHours()
		var m = today.getMinutes()
		if(h.toString().length == 1) {
			h = '0'+h;
		}
		if(m.toString().length == 1) {
			m = '0'+m;
		}
		const time = h + ":" + m;
		const dateTime = date +' '+ time;
        return dateTime;
	},
	
	increase() {
		this.Minute += 30
		this.DisplayH = parseInt(this.Minute / 60);
		this.DisplayM = parseInt(this.Minute % 60);
		if(this.DisplayM == 0)
				this.DisplayM = "00"
		
		this.EndTime = this.getDateFormat(this.Minute)
		this.Rates = (this.Rates/(this.Minute-30)  * (this.Minute)).toFixed(2)
		return this.DisplayM, this.DisplayH, this.EndTime, this.Rates
	},
	
	async onChange(event) {
		let z = await getDocs(collection(db, "Carpark"))
		z.forEach((docs) => {
			let data =  docs.data()
			if ( String(data.Name) === String(event.target.value)) {
				this.Rates = (data.Price * (this.Minute/30)).toFixed(2)
			} 
			})
		this.selectedCarpark = String(event.target.value)
		return this.Rates, this.selectedCarpark
	},

	getNow: function() {
                    const today = new Date();
                    const date = +today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
                    var h = today.getHours()
					var m = today.getMinutes()
					if(h.toString().length == 1) {
						h = '0'+h;
						}
					if(m.toString().length == 1) {
						m = '0'+m;
						}
					const time = h + ":" + m;
					const dateTime = date +' '+ time;
                    this.StartTime = dateTime;
                },	
}
};
</script>