<script>
import EnterParkingInfo from "@/components/shared/EnterParkingInfo.vue";
import ExtendParking from "@/components/shared/ExtendParking.vue";
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore'
import {getDocs, collection} from 'firebase/firestore';
const db = getFirestore(firebaseApp);

export default {
	name: 'Payment',
	components: {
	EnterParkingInfo,
	ExtendParking
	},
data() {
    return {
      Display: ""
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
				this.Display = data.Session
			})
		return this.Display
	},
}
}
</script>

<template>
	<div v-if = "Display === false">
		<EnterParkingInfo/>
	</div>
	<div v-else-if = "Display === true">
		<ExtendParking/>
	</div>
</template>

<style scoped></style>



