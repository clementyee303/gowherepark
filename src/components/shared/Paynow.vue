<template>
  <form method="post" @submit.prevent class="md:flex md:justify-center mb-6" >
  <div class="col-span-3 lg:col-span-3 ">
    <div class="p-10 rounded-md shadow-md bg-white">
      <img class ="w-30 pl-14" src="@/assets/images/paynow.jpg" />
      
    <Modal :Rates="this.Rates" :Session_Number="this.Session_Number" :CarPark="this.CarPark" :Type="this.Pay"  v-show="showModal" @close-modal="showModal = false" />

    <br>
    <div class="save-btn">
    <button type="submit" class="w-full text-center px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold" @click="validate()">Scan to Pay</button>
    </div>
   <p class="text-1xl text-gray-700 mb-5 text-left">Please follow these instructions:
    <br>
     1. Save or screenshot the QR code to make payment.
     <br>
     2. Make sure the recipient is GoWherePark.
   </p>
  </div>
  </div>
 </form>
</template>

<script>


import Modal from '@/components/shared/Modal.vue'
import firebaseApp from '../../firebase.js';
import { getFirestore } from 'firebase/firestore'
import {setDoc, doc} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
 name: "Paynow",
 components: {
   Modal,
 },
props: ["Rates", "RatesPerMin", "CarPlate", "CarPark" ,"StartTime", "EndTime", "Session_Number"],

data() {
    return {
      showModal: false,
      displayName: "",
      Pay : "PayNow"
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
	},


methods: {
  validate() {
      this.showModal = true; 
      this.updateDB(); 
      this.updateDB2()
    },

async updateDB2() {
      var a = this.Rates
      var b = this.CarPlate
      var c = this.CarPark
      var d = this.StartTime
      var e = this.EndTime 
      var g = this.Session_Number
      const myArray  = ((e.replaceAll("/", ':') + ":00").replace(/\s/g, ':')).split(":")
      var x = myArray[1]
      if (String(x).length == 1) {
        x = "0" + String(x)
      }
      var y = myArray[2]

      const timestamp = (new Date()).getTime()

      const docRef2 = await setDoc(doc(db, "Transactions",String(this.displayName),y,x,"Payments", String(timestamp)), {
      Carplate: b,
      Carpark: c,
      EndTime: e,
      Paid: a,
      StartTime: d,
      Type: "Visa"
      })
      const docRef3 = await setDoc(doc(db, "Session",String(this.displayName), "N", String(g) ), {
        Number: String(timestamp) 
        })


        console.log(docRef2)
        console.log(docRef3)
    },

    async updateDB() {
      var a = this.Rates
      var b = this.CarPlate
      var c = this.CarPark
      var d = this.StartTime
      var e = this.EndTime 
      var f = this.RatesPerMin

      try{
      const docRef = await setDoc(doc(db, this.displayName, 'Information'), {
      Carplate: b,
      Carpark: c,
      EndTime: e,
      Price: a,
      Session: true,
      StartTime: d,
      RatesPerMin: f
      })
      console.log(docRef)
    }
    catch(error) {
      console.error("Error adding document: ", error);
    }
    } 
}


};
</script>