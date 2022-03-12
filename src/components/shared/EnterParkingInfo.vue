<template>
		<form class="md:flex md:justify-center mb-6" >
		<div class="col-span-1 lg:col-span-6">
			<h4 class="text-3xl text-gray-700 mb-5">Select Session</h4>
			<div class="p-10 rounded-md shadow-md bg-white">
				<div class="mb-6">
					<label class="block mb-3 text-gray-600" for="">Car Park</label>
					<input type="text" class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-wider"/>
				</div>
				<div class="mb-6">
					<label class="block mb-3 text-gray-600" for="">Car Number</label>
					<input
					type="tel" class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest"/>
				</div>
				<div class="mb-6">
					
					<label class="block mb-3 text-gray-600" for="">Start Duration</label>
					<div class="grid grid-cols-3 gap-1">
						
						<button class="text-xl text-center border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest mr-6">
						-
						</button>
						<select class="text-center border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest mr-6">
						<option>4 HR 0 MIN</option>
						</select>
						<button class="text-xl text-center border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest mr-6">
						+
						</button>
				
				</div>
			</div>
			<div class="text-center ">
				<span class="inline-block text-left  font-bold">
					{{ total }}Current Carpark Rate: $xx
					<br><br>
					{{ total }}Session Start Time: Date
					<br><br>
					{{ total }}Session End Time: Date
					<br><br>
				</span>
			</div>
			<div>
            <router-link
			to="/Checkout"
			button class="w-full text-center px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold"
			>Proceed</router-link>
			</div>
		</div>
	</div>
	</form>
</template>


