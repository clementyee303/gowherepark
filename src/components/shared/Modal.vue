<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>
      <h1>Payment Confirmation</h1>
      <p><strong>Your Payment is Successful!</strong></p>
      <p>A confirmation email has been sent to your email.</p>
      <router-link :to="{ name: 'Home'	}" 
			button @click = "getCarPlate" class="w-full text-center px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold">Go Home</router-link>


    </div>
    <div class="close" @click="$emit('close-modal')">
      <img class="close-img" src="@/assets/images/close_icon.svg" alt="" />
    </div>
  </div>
</template>


<script>
  export default {
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
