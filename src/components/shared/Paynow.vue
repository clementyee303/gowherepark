<template>
  <form class="md:flex md:justify-center mb-6" >
  <div class="col-span-3 lg:col-span-3 ">
    <div class="p-10 rounded-md shadow-md bg-white">
      <img class ="w-30 pl-14" src="@/assets/images/paynow.jpg" /> ;
  
    <button @click="finishPayment" class="w-full text-ceenter px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold">
     Scan to Pay
    </button>
   <p class="text-1xl text-gray-700 mb-5 text-left">Please follow these instructions:
    <br>
     1. Save or screenshot the qr code to make payment
     <br>
     2. Make sure the recipient is gowherepark
   </p>
  </div>
  </div>
 </form>
</template>

<script>
export default {
 name: "Payment",
data() {
    return {
      Method: 1
	}
 },
methods: {
  set1: function () {
        this.$set(this.Method, 1)
    },
    set2: function () {
        this.$set(this.Method, 2)
    },
    set3: function () {
        this.$set(this.Method, 3)
    }
}


};
</script>