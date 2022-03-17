<template>
  <form class="md:flex md:justify-center mb-6" >
  <div class="col-span-1 lg:col-span-6">
  <h4 class="text-3xl text-gray-700 mb-5">Payment information</h4>
  <div class="p-10 rounded-md shadow-md bg-white">
   <div class="mb-6">
    <label class="block mb-3 text-gray-600" for="">Name on Card</label>
    <input type="text" class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-wider"/>
   </div>
   <div class="mb-6">
    <label class="block mb-3 text-gray-600" for="">Card Number</label>
    <input
     type="tel" :id="fields.cardNumber" 
     class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest"
     :maxlength="19" pattern="\d*" :value ="formatCardNumber" @input="updateValue"/>
   </div>
   <div class="mb-6 flex flex-wrap -mx-3w-full">
    <div class="w-2/3 px-3">
     <label class="block mb-3 text-gray-600" for="">Expiration date</label>
     <div class="flex">
      <select class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest mr-6">
       <option disabled selected>Month</option>
       <option v-bind:value="n < 10 ? '0' + n : n" v-for="n in 12" v-bind:disabled="n < minCardMonth" v-bind:key="n">
      {{generateMonthValue(n)}} </option>
      </select>
      <select class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest">
       <option diabled selected>Year</option>
       <option v-bind:value="$index + minCardYear" v-for="(n,$index) in 12" v-bind:key="n">
      {{$index + minCardYear}}</option>
      </select>
     </div>
    </div>
    <div class="w-1/3 px-3">
     <label class="block mb-3 text-gray-600" for="">CVC</label>
     <input type="tel" class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest" 
     :maxlength ="4"/>
    </div>
   </div>

    <Modal v-show="showModal" @close-modal="showModal = false" />
    <div class="save-btn">
    <button class="w-full text-center px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold" @click="showModal = true">Confirm Payment</button>
</div>

   </div>
  </div>
 </form>
</template>

<script>
import Modal from '@/components/shared/Modal.vue'

export default {
 name: "Payment",
 components: {
   Modal,
 },
data() {
    return {
      fields: {
        cardNumber: '',
        cardName: '',
        cardMonth: '',
        cardYear: '',
        cardCvv: '',
      },
      showModal: false,
      minCardYear: new Date().getFullYear(),
	}
 },
computed: {
  minCardMonth() {
    if (this.cardYear == this.minCardYear) return new Date().getMonth() +1
    return 1
  },
  formatCardNumber(){
    return this.cardNumber ? this.cardNumber.match(/.{1,4}/g).join(' ') : '';
  }
 },
 watch: {
   cardYear() {
     if (this.cardMonth < this.minCardMonth) {
       this.cardMonth = ''
     }
   }
 },

methods: {
  set1: function () {
        this.$set(this.Method, 1)
    },
    set2: function () {
        this.$set(this.Method, 2)
    },
    generateMonthValue(n) {
      return n < 10 ? `0${n}` : n
    },
    updateValue(e) {
      this.cardNumber = e.target.value.replace(/ /g,'');
    },

}
};
</script>