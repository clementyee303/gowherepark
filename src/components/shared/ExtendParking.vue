<template>
		<form class="md:flex md:justify-center mb-6" >
		<div class="col-span-1 lg:col-span-6">
			<h4 class="text-4xl text-gray-700 mb-5">Current Session</h4>
			<div class="p-10 rounded-md shadow-md bg-white">
				<h4 class="text-3xl text-gray-700 mb-5 font-bold">Time Remaining</h4>
				<h4 class="text-3xl text-gray-700 mb-5 font-bold">01:20:58</h4>
				<div class="mb-6">
			</div>
			<div class="text-center ">
				<span class="inline-block text-left  font-bold">
					<img class ="float-left w-5" src="@/assets/images/location_icon.png" /> &nbsp;
					{{ total }} Carplate Number
					<br><br>
					<img class ="float-left w-5" src="@/assets/images/car-icon.png" /> &nbsp;
					{{ total }} Carplate Name
					<br><br>
					{{ total }}Current Carpark Rate: $xx
					<br><br>
					{{ total }}Session Start Time: Date
					<br><br>
					{{ total }}Session End Time: Date
					<br><br>
				</span>
			</div>
				<div class="grid grid-cols-2 gap-8">
				<button @click="finishPayment" class="w-full text-center px-4 py-3 bg-red-500 rounded-md shadow-md text-white font-semibold">
				End Session
				</button>
				<router-link
			to="/Checkout"
			button class="w-full text-center px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold"
			>Proceed</router-link>
		
			</div>
		</div>
	</div>
	</form>
</template>

