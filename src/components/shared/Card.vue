<template>
  <form method="post" @submit.prevent class="md:flex md:justify-center mb-6" >
  <div class="col-span-1 lg:col-span-6">
  <h4 class="text-3xl text-gray-700 mb-5">Payment information</h4>
  <div class="p-10 rounded-md shadow-md bg-white">
   <div class="mb-6">
    <label class="block mb-3 text-gray-600" for="">Name on Card</label>
    <input id="name" type="text" required class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-wider"/>
   </div>
   <div class="mb-6">
    <label class="block mb-3 text-gray-600" for="">Card Number</label>
    <input id="number" v-model="cardNumber" required type="text" pattern="[0-9 ]+" @keypress="isNumber($event); formatCard()" 
     class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest"
     :maxlength="19" >
   </div>
   <div class="mb-6 flex flex-wrap -mx-3w-full">
    <div class="w-2/3 px-3">
     <label class="block mb-3 text-gray-600" for="">Expiration date</label>
     <div class="flex">
      <select id="month" name="month" required class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest mr-6">
       <option disabled selected>Month</option>
       <option v-bind:value="n < 10 ? '0' + n : n" v-for="n in 12" v-bind:disabled="n < minCardMonth" v-bind:key="n">
      {{generateMonthValue(n)}} </option>
      </select>
      <select id="year" class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest">
       <option diabled selected>Year</option>
       <option v-bind:value="$index + minCardYear" v-for="(n,$index) in 12" v-bind:key="n">
      {{$index + minCardYear}}</option>
      </select>
     </div>
    </div>
    <div class="w-1/3 px-3">
     <label class="block mb-3 text-gray-600" for="">CVC</label>
     <input id ="cvc" type="tel" required class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest" 
     :maxlength ="4"/>
    </div>
   </div>
   <span id="error"></span>


    <Modal :Rates="this.Rates" :Session_Number="this.Session_Number" :CarPark="this.CarPark" :Type="this.Pay"  v-show="showModal" @close-modal="showModal = false" />
    <div class="save-btn">
    <button type="submit" class="w-full text-center px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold" @click="validate()">Confirm Payment</button>
</div>

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
 name: "Card",
 components: {
   Modal,
 },
props: ["Rates", "RatesPerMin", "CarPlate", "CarPark" ,"StartTime", "EndTime", "Session_Number"],

data() {
    return {
      fields: {
        cardNumber: '',
        cardName: '',
        cardMonth: '',
        cardYear: '',
        cardCvv: '',
        displayName: ""
      },
      showModal: false,
      minCardYear: new Date().getFullYear(),
      displayName: "",
      cardNumber: "",
      Pay :"Visa",
	}
 },
mounted() {
		const auth = getAuth(firebaseApp);
		onAuthStateChanged(auth, (user) => {
			if (user) {
				this.displayName = user.email;
			} else {
				this.displayName = "Guest"
			}
		})
	},
computed: {
  minCardMonth() {
    if (this.cardYear == this.minCardYear) return new Date().getMonth() +1
    return 1
  },
 },
 watch: {
   cardYear() {
     if (this.cardMonth < this.minCardMonth) {
       this.cardMonth = ''
     }
   }
 },

methods: {
  validate() {
    var error = document.getElementById("error")
    if (document.getElementById("name").value=="") {
      error.textContent = "Please enter a valid name"
      error.style.color = "red"
    } else if (document.getElementById("number").value=="") {
      error.textContent = "Please enter a valid card number"
      error.style.color = "red"
    } else if (document.getElementById("cvc").value=="") {
      error.textContent = "Please enter a valid cvc"
      error.style.color = "red"
    } else if (document.getElementById("month").value=="Month" || document.getElementById("year").value=="Year") {
      error.textContent = "Please select a valid expiration date"
      error.style.color = "red"
    } else {
      error.textContent = ""
      this.showModal = true; 
      this.updateDB(); 
      this.updateDB2()
    }
  },
  formatCard() {
    let nn = this.cardNumber;
    (nn.length - (nn.split(" ").length - 1)) % 4 === 0 ? this.cardNumber += ' ' : ''
  },
    generateMonthValue(n) {
      return n < 10 ? `0${n}` : n
    },
    isNumber(evt) {
      const charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !==46
      ) {
        evt.preventDefault();
      }
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
}
</script>