<template>
<div class="monthlyExpenditures">
  <div class="chart">
    <div class="header">
      <p style="font-size: x-large; text-align: left;">Monthly Expenditures</p>
      <p id="totalAmt" style="font-size: small; text-align: left;"> {{total}} SGD ({{startDate}} - {{endDate}})</p>
      <p style="font-size: x-small; color: #FF6161; text-align: left;">+{{increaseAmt}}({{increasePercent}}%)^past year</p>
    </div>
    <column-chart prefix="$" :data="this.barChartData" :colors="[['#482BE7']]"></column-chart>
  </div> 
</div>

<div class="ppTransactions">
  <div class="topnav">
    <h1><b>Past Parking Transactions</b></h1>
    <select name="month" id="month" @change=filterMonth()>
      <option value="01">January</option>
      <option value="02">February</option>
      <option value="03">March</option>
      <option value="04">April</option>
      <option value="05">May</option>
      <option value="06">June</option>
      <option value="07">July</option>
      <option value="08">August</option>
      <option value="09">September</option>
      <option value="10">October</option>
      <option value="11">November</option>
      <option value="12">December</option>
    </select>
    <select name="year" id="year">
      <option value="2022">2022</option>
      <option value="2021">2021</option>
      <option value="2020">2020</option>
      <option value="2019">2019</option>
      <option value="2018">2018</option>
      <option value="2017">2017</option>
      <option value="2016">2016</option>
    </select>
    <input type="text" id="searchBar" placeholder="Search by Location.." v-on:keyup.enter=filterLocation()>
  </div>
  
  <div id = "display"> 
      <table id = "table" class = "auto-index">
          <thead>
            <th>Session ID/ Date</th>
            <th>Amount Paid</th>
            <th>Carpark Location</th>
            <th>Payment Type</th>
            <th>Direction</th>
          </thead>
          <tbody id="tableBody"></tbody>
      </table><br><br>
      
      <!--
      <h1> {{this.dataArray}} </h1>
      <h1> {{this.barChartData}} </h1>
      -->
  </div>
</div>
</template>

<script>
import firebaseApp from '../../firebase.js';
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs , query, where} from 'firebase/firestore';
const db = getFirestore(firebaseApp);
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Chart Display
let startDate = "February 2022";
let endDate = "March 2022";
let increaseAmt = Math.round(Math.random()*500);


/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Drawing data from firebase
let drawnData = [];

db.collection("preferences").get().then(querySnapshot => {
    console.log(`Found ${querySnapshot.size} documents.`);
    querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        const engineerDetails = doc.data();
        drawnData.push(engineerDetails);
    });

    // Here the engineers array is fully populated
    console.log(drawnData.length);
    res.json(drawnData);
});

// Grouping by month
// eslint-disable-next-line no-unused-vars
var drawnData2 = {"22/02/2022": Math.random()*500, "23/02/2022": Math.random()*500,"26/03/2022": Math.random()*500}
  ,groupKey = 0;
      groups = myArray.reduce(function (r, o) {
          var m = o.date.split(('-'))[1];
          (r[m])? r[m].data.push(o) : r[m] = {group: String(groupKey++), data: [o]};
          return r;
      }, {});

  var result = Object.keys(groups).map(function(k){ return groups[k]; });

  console.log(result);
*/

// Will eventually draw data from firestore
var cc = {"22/02/2022": Math.random()*500, "26/03/2022": Math.random()*500}
        // "march": Math.random()*500, 
        // "april": Math.random()*500, "may": Math.random()*500, "june": Math.random()*500, 
        // "july": Math.random()*500, "august": Math.random()*500, "september": Math.random()*500, 
        // "october": Math.random()*500, "november": Math.random()*500, "december": Math.random()*500}

//const total = Math.round(sum(barChartData))
//const total = 11;
//console.log("this is total: " + total)
//let increasePercent = Math.round(increaseAmt*100/ total);
//document.getElementById("totalAmt").innerHTML = (String(total) + " SGD (January 2021 - January 2022)");

export default {
    data() {
      return {
        dataArray: [], // data to be displayed
        barChartData: {},
        //total,
        cc,
        startDate,
        endDate,
        increaseAmt,
        //increasePercent
      }
    },

    // computed: {
    //   chartData() {
    //     return {
    //       datasets: this.barChartData
    //     }
    //   }
    // },

    methods: {
      getData: async function(u){
        let z = await getDocs(collection(db, u))
        z.forEach((docs) => {
          let data = docs.data()
          this.dataArray.push({Carpark : data.Carpark, EndTime: data.EndTime, Paid: data.Paid, Type: data.Type})
          this.barChartData[data.EndTime] = parseFloat(data.Paid)
          })
      },

      // sum: function (obj){
      //   var sum = 0;
      //   for(var el in obj) {
      //       sum += parseFloat(obj[el]);
      //   }
      //   return sum;
      // },

      getTotal: function (){},


      display: function(snapshot) {
        // function to display the table 
        
        //snapshot is my data

        // Clear table rows
        var tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";
        
        // Get table ref
        var table = document.getElementById("table");

        let serialNum = 0;

        // Loop through my data
        snapshot.forEach((docs) => {
           
          // 1. Create table row from data 
          let yy = docs.data();
          var row = table.insertRow(serialNum);
          //row.style.backgroundColor = "pink";

          var session = yy.EndTime;
          var paid = yy.Paid;
          var carpark = yy.Carpark;
          var type = yy.Type;

          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);

          cell1.innerHTML = session // Date is in string -  23/3/2022 15:47
          cell1.style.border = 'thin solid #999';
          cell2.innerHTML = "$" + paid;
          cell2.style.border = 'thin solid #999';
          cell3.innerHTML = carpark;
          cell3.style.border = 'thin solid #999';
          cell4.innerHTML = type;
          cell4.style.color = '#00FF00';
          cell4.style.border = 'thin solid #999';
          var navigationButton = document.createElement("button");
          navigationButton.className = "navigationButton";
          navigationButton.id = String("destination");
          navigationButton.innerHTML = "navigate";
          navigationButton.addEventListener('click', function(){
              var url = "https://www.google.com/maps/dir/?api=1&destination=" + carpark + "&travelmode=driving" 
              window.open(url, "_blank");
          })
          cell5.appendChild(navigationButton);
          cell5.style.backgroundColor= '#6366f1';
          //cell5.style.borderRadius = "5";

          serialNum++;

          // 2. Aggregate my data for chart
          
        })
      },
      initLoad: async function (u) {
        // Initial loading upon page open
        let Pptransact = await getDocs(collection(db, u));
        this.display(Pptransact);
      },
      
      filterMonth: async function(){
        let selected = document.getElementById('month').value;
        let Pptransact = await getDocs(collection(db, this.displayName));
        Pptransact.forEach((docs) => {
          let yy = docs.data();
          // TO DO-----------
          var month = yy.Date;
          console.log(yy.Date);
          console.log(month)
          console.log(selected)
        })
      },
      filterLocation: async function(){
        // Get searchbar value 
        let searchText = document.getElementById('searchBar').value;
        console.log(searchText);
        // Get query
        const Pptransact = collection(db, this.displayName);  
        const q = query(Pptransact, where("Carpark", "==", searchText));
        const querySnapshot = await getDocs(q);
        this.display(querySnapshot);
      }
    },
    // beforeMount(){
    //   this.getData(this.user.displayName)
    // },
    mounted(){
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.displayName = user.displayName + "_";
          this.initLoad(this.displayName);
          this.getData(this.displayName);
         
          console.log(this.dataArray) // Check data
          // 0: {Carpark: '11A BOON TIONG ROAD', EndTime: '24/3/2022 22:06', Paid: '2.80', Type: 'Visa'}
          // 1: {Carpark: '121 CANBERRA ST', EndTime: '25/3/2022 22:06', Paid: '3.5', Type: 'Visa'}
          console.log(Object.assign({}, this.chartData.datasets))
        }
      })
    },
  }
</script>


<style scoped>
.chart {
  margin: auto;
  background-color: #FAFAFA;
}

.header {
  width: 70%;
}
  
#month {
  overflow: hidden;
  background-color: #e9e9e9;
  margin-left: 20%;
  width: 12%;
}

#year {
  overflow: hidden;
  background-color: #e9e9e9;
  margin-left: 1%;
  width: 12%;
}

select{
  float: left;
  display: block;
  color: black;
  text-align: center;
  margin: 14px 16px;
  padding: 3px 0 3px 0;
  text-decoration: none;
  font-size: 14px;
}

/* Style the box inside the navigation bar */
.topnav h1{
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Style the search box inside the navigation bar */
.topnav input[type=text] {
  background-color: #F8F8F8;
  float: right;
  padding: 6px;
  border: none;
  margin-top: 8px;
  margin-right: 16px;
  font-size: 17px;
}

#table{
    border-collapse: collapse;
    width: 100%;
}

th, td {
  border: 1px solid #999;
  padding: 0.5rem;
  text-align: center;
}

th{
  font-size: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.monthlyExpenditures{
	margin: auto;
	width: 50%;
	height: 10%;
	border: 1px solid grey;
}

.ppTransactions{
	margin: auto;
	width: 80%;
	border: 1px solid grey;
	margin-top: 2%;	
}
</style>