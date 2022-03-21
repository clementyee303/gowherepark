<template>
	<form class="md:flex md:justify-center mb-6" >
          <div class="pl-20 col-span-3 lg:col-span-3 ">
            <div class=" p-10 rounded-md shadow-md bg-white">
            <h4 class="text-3xl text-gray-700 mb-5">Payment Details</h4>
			<span class="inline-block text-left  font-bold">
				Session Number: {{Session_Number}}
				<br><br>
                Total Price: ${{Rates}}
			</span>
		</div>
        </div>
	</form>
</template>

<script>

 export default {
    name:'Summary',
    props: ["Rates", "Session_Number"]
    }
</script>



  