<template>
  <div class="small">
    <h1>Monthly Expenditures</h1>
    <h2>{{total}} 969 SGD (January 2021 - January 2022)</h2>
    <h3>+xxx(y%)^past year</h3>
    <column-chart prefix="$" :data="barChartData" :legend="false"></column-chart>
    <!-- 
      <bar-chart class='user' width=500px :height="200" :data= "barChartData" :options= "barChartOptions"> </bar-chart>
      <button @click="fillData()">Update chart</button>
    -->
  </div>
</template>

<script>
  // import LineChart from './LineChart.js'
  // import BarChart from '@/components/shared/BarChart.vue'

// const barLabels = ['risky', 'go', 'wait']
// const barBackgroundColors = ['red', 'green', 'yellow']


// total_payment += parseFloat(total.innerHTML);

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
        /*
        barChartData: {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [
          {
            label: barLabels,
            backgroundColor: barBackgroundColors,
            data: [10, 15, 20]
          }
        ]
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: true,
          labels: {
            generateLabels() {
              return barLabels.map((label, index) => ({
                text: label,
                fillStyle: barBackgroundColors[index]
              }))
            }
          }
        },
        title: {
          display: true,
          text: 'Monthly Income'
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    }
  }
}
*/
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }

  h1 {
    left: 150px;
  }
  
</style>