<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>
      <h1 style="font-size:30px; color:rgb(59,130,246);"><strong>Payment Confirmation</strong></h1>
      <h2> Hi {{this.displayName}}, Thank you. </h2>
      <p><strong>Your Payment is Successful!</strong></p>
      <u>Session Details</u><br><br>
      Session Number: {{this.Session_Number}}<br>
      Payment Date: {{getNow()}} <br>
      Payment Type: {{this.Type}}<br>
      Carpark: {{this.CarPark}}<br>
      Amount Paid: SGD{{this.Rates}} <br>  <br>
      <router-link :to="{ name: 'Payment'	}" 
			button @click = "getCarPlate" class="w-full text-center px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold">OK</router-link>


    </div>
    <div class="close" @click="$emit('close-modal')">
      <img class="close-img" src="@/assets/images/close_icon.svg" alt="" />
    </div>
  </div>
</template>

<script>
import firebaseApp from '../../firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
	name: 'Modal',
  props: ['Session_Number','CarPark','Rates', "Type"],
	components: {
	},
	data() { 
		return {
		displayName: "",
    paymentTimestamp: "",
    email: "",
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
      this.email = user.email
		})
	},
  methods: {
    getNow() {
      const today = new Date();
      const date = + today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
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
      this.paymentTimestamp = dateTime
      return dateTime
      },

  }
  }

</script>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
}
.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

button {
  background-color: #ac003e;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}
</style>
