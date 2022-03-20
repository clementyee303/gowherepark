<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>
      <h1><strong>Payment Confirmation</strong></h1>
      <h2> Hi {{displayName}}, Thank you. </h2>
      <p><strong>Your Payment is Successful!</strong></p>
      <p>A confirmation email has been sent to your email.</p>
      <u>Session Details</u><br><br>
      Session Number: xx<br>
      Payment Date: {{timestamp}}<br>
      Payment Type: Visa<br>
      Carpark: Carpark<br>
      Amount Paid: SGD$6.30 <br>  <br>
      <router-link :to="{ name: 'Home'	}" 
			button @click = "getCarPlate" class="w-full text-center px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold">Go Home</router-link>


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
	name: 'Home',
	components: {
	},
	data() { 
		return {
			displayName: "",
      timestamp: "",
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
    getNow: function() {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date +' '+ time;
      this.timestamp = dateTime;
      }
      
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
