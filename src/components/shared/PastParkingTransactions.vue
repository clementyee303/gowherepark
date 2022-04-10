<template>
<div class="monthlyExpenditures">
  <div class="chart">
    <div class="header">
      <p style="font-size: x-large; text-align: left;">Daily Expenditures</p>
      <p v-if= "total!=0" id="totalAmt" style="font-size: small; text-align: left;"> {{total}} SGD ({{startDate}} - {{endDate}})</p>
      <!--
      <p style="font-size: x-small; color: #FF6161; text-align: left;">+{{increaseAmt}}({{increasePercent}}%)^past year</p>
      -->
    </div>
    <column-chart v-if="done" prefix="$" :data="barChartData" :colors="[['#482BE7']]"></column-chart>
  </div> 
</div>

<div class="ppTransactions">
  <div class="topnav">
    <h1><b>Past Parking Transactions</b></h1>
    <select name="month" id="month" @change=filter()>
      <option value="01">January</option>
      <option value="02">February</option>
      <option value="03">March</option> <!-- Default Value -->
      <option selected value="04">April</option>
      <option value="05">May</option>
      <option value="06">June</option>
      <option value="07">July</option>
      <option value="08">August</option>
      <option value="09">September</option>
      <option value="10">October</option>
      <option value="11">November</option>
      <option value="12">December</option>
    </select>
    <select name="year" id="year" @change=filter()>
      <option value="2022">2022</option>
      <option value="2021">2021</option>
      <option value="2020">2020</option>
      <option value="2019">2019</option>
      <option value="2018">2018</option>
      <option value="2017">2017</option>
      <option value="2016">2016</option>
    </select>
    <input type="text" id="searchBar" placeholder="Search by Location.." v-on:keyup.enter=filterBySearch()>
  </div>
  
  <div id = "display"> 
      <table id = "table" class = "auto-index">
          <thead>
            <th>Start Time</th>
            <th>End Time</th>
            
            <th>Amount Paid</th>
            <th>Carpark Location</th>
            <th>Payment Type</th>
            <th>Direction</th>
          </thead>
          <tbody id="tableBody"></tbody>
          
      </table><br><br>
      
      <!--
      <h1> {{this.carparkName}} </h1>
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

export default {
    data() {
      return {
        carparkName: [], 
        barChartData: {}, // data to be displayed
        startDate: "",
        endDate: "",
        total: 0,
        increaseAmt: Math.round(Math.random()*10,2),
        increasePercent:0 ,
        selectedYear: "2022",
        selectedMonth: "04",
        done: false
      }
    },

    methods: {
      sum: function (lst){
        var sum = 0;
        for(var el in lst) {
            sum += parseFloat(lst[el]);
        }
        return sum;
      },

      getTotal: function (){
        this.total = Math.round(this.sum(this.barChartData), 2)
        //console.log("this is total: " + this.total)
        this.increasePercent = Math.round(this.increaseAmt*100/ this.total);
        //console.log("this is increasePercent: " + this.increasePercent)
        this.startDate = Object.keys(this.barChartData)[0].substring(0, 9);
        this.endDate = Object.keys(this.barChartData)[Object.keys(this.barChartData).length - 1].substring(0, 9);
      },

      getData: async function(){
        let z = await getDocs(collection(db,"Transactions",String(this.displayName),"Year",this.selectedYear,"Month",this.selectedMonth,"Payments"));
        console.log(z.docs)
        z.forEach((docs) => {
          let data = docs.data()
          console.log(data);
          this.carparkName.push(data.Carpark)
          this.carparkName = [...new Set(this.carparkName)] // Distinct name
          })
      },

      display: async function(snapshot) {
        // function to display the table 
        // Initiallize everything
        this.total = 0
        this.increasePercent = 0
        this.startDate = ""
        this.endDate = ""

        // Clear table rows
        var tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";
        this.barChartData = {};
        
        // Get table ref
        var table = document.getElementById("table");

        let serialNum = 0;

        // Loop through my data
        snapshot.forEach((docs) => {
          // 1. Create table row from data 
          let yy = docs.data();
          this.barChartData[yy.EndTime] = parseFloat(yy.Paid)
          var row = table.insertRow(serialNum);

          var start = yy.StartTime;
          var end = yy.EndTime;
          //var duration = yy.EndTime;
          var paid = yy.Paid;
          var carpark = yy.Carpark;
          var type = yy.Type;

          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
          var cell6 = row.insertCell(5);
          //var cell7 = row.insertCell(6);

          cell1.innerHTML = start // Date is in string -  23/3/2022 15:47
          cell2.innerHTML = end;
          //cell3.innerHTML = duration;
          cell3.innerHTML = "$" + paid;
          cell4.innerHTML = carpark;
          cell5.innerHTML = type;
          cell5.style.color = '#00FF00';
          var navigationButton = document.createElement("button");
          navigationButton.className = "navigationButton";
          navigationButton.id = String("destination");
          navigationButton.innerHTML = `<img class ="float-left w-5" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-navigate-outline-512.png">`;
          navigationButton.addEventListener('click', function(){
              var url = "https://www.google.com/maps/dir/?api=1&destination=" + carpark + "&travelmode=driving" 
              window.open(url, "_blank");
          })
          cell6.appendChild(navigationButton);

          serialNum++;

          // 2. Aggregate my data for chart
          this.getTotal()
        })
      },

      initLoad: async function () {
        // Initial loading upon page open
        let Pptransact = await getDocs(collection(db,"Transactions",String(this.displayName),"Year",this.selectedYear,"Month",this.selectedMonth,"Payments"));
        this.display(Pptransact);
      },
      
      filter: async function(){
        let selectedMonth = document.getElementById('month').value;
        this.selectedMonth = selectedMonth;
        let selectedYear = document.getElementById('year').value;
        this.selectedYear = selectedYear;
        console.log(selectedMonth);
        // Initiallise 
        this.carparkName = []
        this.getData()
        // Get query
        const Pptransact = collection(db,"Transactions",String(this.displayName),"Year",selectedYear,"Month",selectedMonth,"Payments");  
        const q = query(Pptransact);
        const querySnapshot = await getDocs(q);
        this.display(querySnapshot);
      },

      filterBySearch: async function(){
        console.log(this.carparkName)
        // Get searchbar value 
        let searchText = document.getElementById('searchBar').value;
        searchText = searchText.toUpperCase()
        if(searchText == ""){
          this.initLoad()
        } else {
          // Loop through unique carpark name
          for (var i = 0; i < this.carparkName.length; i++){
            if((new RegExp(searchText)).test(this.carparkName[i])){
              console.log("this is loc " + this.carparkName[i])
              searchText = this.carparkName[i];
            }
          }
          // console.log(searchText);
          // Get query
          console.log("this is aft loc" + searchText)
          const Pptransact = collection(db,"Transactions",String(this.displayName),"Year",this.selectedYear,"Month",this.selectedMonth,"Payments");  
          const q = query(Pptransact, where("Carpark", "==", searchText));
          const querySnapshot = await getDocs(q);
          this.display(querySnapshot);
        }
      }
    },

    mounted(){
      
      const auth = getAuth(firebaseApp);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.displayName = user.email;
          this.getData()
          this.initLoad();
          this.done = true;         

          console.log(this.carparkName)
          // console.log((new RegExp('searchBarText')).test(CarparkLocation)))

        } else {
          this.displayName = "Guest";
        }
      });
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
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}

.ppTransactions{
	margin: auto;
	width: 80%;
	box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
	margin-top: 2%;	
}
</style>