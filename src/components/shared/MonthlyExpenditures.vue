<template>
  <div class="chart">
    <div class="header">
      <p style="font-size: x-large; text-align: left;">Monthly Expenditures</p>
      <p style="font-size: small; text-align: left;">{{total}} 969 SGD (January 2021 - January 2022)</p>
      <p style="font-size: x-small; color: #FF6161; text-align: left;">+xxx(y%)^past year</p>
    </div>
    <column-chart prefix="$" :data="barChartData" :legend="false" :colors="[['#482BE7']]"></column-chart>
  </div>
</template>

<script>
function sum( obj ) {
  var sum = 0;
  for( var el in obj ) {
      sum += parseFloat( obj[el] );
  }
  return sum;
}

// Will eventually draw data from firestore
var barChartData = {"january": Math.random()*500, "february": Math.random()*500, 
        "march": Math.random()*500, 
        "april": Math.random()*500, "may": Math.random()*500, "june": Math.random()*500, 
        "july": Math.random()*500, "august": Math.random()*500, "september": Math.random()*500, 
        "october": Math.random()*500, "november": Math.random()*500, "december": Math.random()*500}

const total = sum(barChartData)
console.log("this is total: " + total)

  export default {
    name:'MonthlyExpenditures',
    props: ['total'],
    data () {
      return {
        barChartData,
      }
    }
  }
</script>

<style>
  .chart {
    margin: auto;
    background-color: #FAFAFA;
  }

  .header {
    width: 60%;
  }
  
</style>