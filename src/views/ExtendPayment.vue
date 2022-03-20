<template>
		<form @submit.prevent class="md:flex md:justify-center mb-6" >
		<div class="col-span-1 lg:col-span-6">
			<h4 class="text-3xl text-gray-700 mb-5">Select Session</h4>
			<div class="p-10 rounded-md shadow-md bg-white  text-center">
				<div class="mb-6">
                    <span class="inline-block text-left  font-bold">
					<label class="block mb-3 text-black-600" for="">Car Park: <strong>{{this.Carpark}}</strong></label>
					<label class="block mb-3 text-black-600" for="">Car Number: <strong>{{this.Carplate}}</strong> </label>
                    </span>

					<label class=" text-2xl block mb-3 text-black-600" for="">Duration</label>
					<div class="grid grid-cols-3 gap-1">
                        <button @click = "decrease" class="text-xl text-center border border-gray-500 rounded-md inline-block py-1 px-1 w-full text-gray-600 tracking-widest mr-4">
						-</button>
						<select class="text-center border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-widest mr-6">
						<option>{{DisplayH}}HR {{DisplayM}}MIN</option>
						</select>
						<button @click = "increase" class="text-xl text-center border border-gray-500 rounded-md inline-block py-1 px-1 w-full text-gray-600 tracking-widest mr-4">
						+</button>
				</div>
			</div>
			<div class="text-center ">
				<span class="inline-block text-left  font-bold">
					Current Carpark Rate: ${{this.price}}
					<br><br>
					Session Start Time: {{this.start}}
					<br><br>
					Session End Time: {{this.end}}
					<br><br>
				</span>
			</div>
			<div>
            
			<router-link :to="{ name: 'Checkout', params: { 
				Rates: this.price,
				RatesPerMin: this.RatesPerMin,
				CarPlate: this.Carplate,
				CarPark:  this.Carpark,
				StartTime:  start,
				EndTime: end,
			}}" 
			button class="w-full text-center px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold">Proceed</router-link>

			</div>
		</div>
	</div>
	</form>
</template>


<script>



export default {
 name: "ExtendPayment",
 props: ["Rate", "Carplate", "Carpark" ,"StartTime", "EndTime", "RatesPerMin"],
 
 data() {
     return {
        price : this.RatesPerMin,
        start : this.EndTime,
        end : this.EndTime,
        DisplayH: "0",
		DisplayM: "30",
        Minute: 30
		}
	},
beforeMount(){
	this.getEndTime()
 },

methods: {
	decrease() {
		if(this.Minute >= 60) {
			this.Minute -= 30
			this.DisplayH = parseInt(this.Minute / 60) ;
			this.DisplayM = parseInt(this.Minute % 60);
			this.end = this.getDateFormat(-30)
			if(this.DisplayM == 0)
				this.DisplayM = "00"
            this.price = (this.price/(this.Minute+30)  * (this.Minute)).toFixed(2)
        }
	
		return this.DisplayM, this.DisplayH, this.end, this.price
	},
    getEndTime(){
		this.end = this.getDateFormat(30)
		return this.EndTime
	},

	getDateFormat(cal) {
		const myArray  = ((this.end.replaceAll("/", ':') + ":00").replace(/\s/g, ':')).split(":")
		const today = new Date(myArray[2], myArray[1], myArray[0], myArray[3], myArray[4], myArray[5], 0)
		today.setMinutes(today.getMinutes() + cal);
        const date = +today.getDate()+'/'+(today.getMonth())+'/'+today.getFullYear();
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
        return dateTime;
	},
	
	increase() {
		this.Minute += 30
		this.DisplayH = parseInt(this.Minute / 60);
		this.DisplayM = parseInt(this.Minute % 60);
		if(this.DisplayM == 0)
				this.DisplayM = "00"
		
		this.end = this.getDateFormat(30)
		this.price = (this.price/(this.Minute-30)  * (this.Minute)).toFixed(2)
        console.log(this.price)
		return this.DisplayM, this.DisplayH, this.end, this.price
	},
}
};
</script>



