<script>
import EnterParkingInfo from "@/components/shared/EnterParkingInfo.vue";
import ExtendParking from "@/components/shared/ExtendParking.vue";
import firebaseApp from '../firebase.js';
import {  getFirestore } from 'firebase/firestore'
import {getDocs, collection} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
		

export default {
	name: 'Payment',
	components: {
	EnterParkingInfo,
	ExtendParking
	},
data() {
    return {
    Display: false,
	displayName: ""
	}
},

mounted(){
		onAuthStateChanged(auth, (user) => {
			if (user) {
				this.displayName = user.displayName;
				this.getDisplay(this.displayName)
			} else {
				this.displayName = "Guest"
			}
		})
},





methods: {
	async getDisplay(u){
		let z = await getDocs(collection(db, u))
		z.forEach((docs) => {
			let d =  docs.data()
			this.Display = d.Session
			})
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



