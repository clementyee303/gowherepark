<template>
  <div class="topnav">
    <a class="active" href="#home">Past Parking Transactions</a>
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
          <tr>
            <th>Session ID/ Date</th>
            <th>Amount Paid</th>
            <th>Carpark Location</th>
            <th>Payment Type</th>
            <th>Direction</th>
          </tr>
      </table><br><br>
  </div>
</template>

<script>
// To be linked to firestore
import firebaseApp from '../../firebase.js';
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs , query, where} from 'firebase/firestore';
const db = getFirestore(firebaseApp);

export default {
    mounted(){
      async function display() {
        let Pptransact = await getDocs(collection(db, "Pptransact"));
        let serialNum = 1;

        Pptransact.forEach((docs) => {
          let yy = docs.data();
          var table = document.getElementById("table");
          var row = table.insertRow(serialNum);

          var session = yy.Date;
          var paid = yy.Paid;
          var location = yy.Location;
          var type = yy.Type;
          var directions = yy.Directions;


          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);

          cell1.innerHTML = session.toDate(); //.toDateString();
          cell2.innerHTML = "$" + paid;
          cell3.innerHTML = location;
          cell4.innerHTML = type;
          cell4.style.color = '#00FF00'
          var navigationButton = document.createElement("button");
          navigationButton.className = "navigationButton";
          navigationButton.id = String("destination");
          navigationButton.innerHTML = "navigate";
          navigationButton.addEventListener('click', function(){
              var url = "https://www.google.com/maps/dir/?api=1&destination=" + directions + "&travelmode=driving" 
              window.open(url, "_blank");
          })
          cell5.appendChild(navigationButton);
          cell5.style.backgroundColor= '#b22222';
        })
      }
      display();
    },
    methods:{
      filterMonth: async function(){
        let selected = document.getElementById('month').value;
        let Pptransact = await getDocs(collection(db, "Pptransact"));
        Pptransact.forEach((docs) => {
          let yy = docs.data();
          // TO DO-----------
          var month = yy.Date.toDate().toMonth();
          console.log(month);
          console.log(selected)
        })
      },
      filterLocation: async function(){
        var table = document.getElementById("table");
        table.innerHTML = "";
        let serialNum = 0;
        let searchText = document.getElementById('searchBar').value;
        const Pptransact = collection(db, "Ppatransact");
        const q = query(Pptransact, where("Location", "==", searchText));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          var row = table.insertRow(serialNum);

          var session = doc.data().Date.toDate();
          var paid = doc.data().Paid;
          var location = doc.data().Location;
          var type = doc.data().Type;
          var directions = doc.data().Directions;

          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);

          cell1.innerHTML = session; //.toDateString();
          cell2.innerHTML = "$" + paid;
          cell3.innerHTML = location;
          cell4.innerHTML = type;
          cell4.style.color = '#00FF00'
          var navigationButton = document.createElement("button");
          navigationButton.className = "navigationButton";
          navigationButton.id = String("destination");
          navigationButton.innerHTML = "navigate";
          navigationButton.addEventListener('click', function(){
              var url = "https://www.google.com/maps/dir/?api=1&destination=" + directions + "&travelmode=driving" 
              window.open(url, "_blank");
          })
        cell5.appendChild(navigationButton);
        });   
      }
    }
  }
</script>


<style scoped>
/* Add a black background color to the top navigation bar */
.topnav, select{
  overflow: hidden;
  background-color: #e9e9e9;
}

/* Style the links inside the navigation bar */
.topnav a, select {
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
  float: right;
  padding: 6px;
  border: none;
  margin-top: 8px;
  margin-right: 16px;
  font-size: 17px;
}

/* When the screen is less than 600px wide, stack the links and the search field vertically instead of horizontally */
@media screen and (max-width: 600px) {
  .topnav a, .topnav input[type=text] {
    float: none;
    display: block;
    text-align: left;
    width: 100%;
    margin: 0;
    padding: 14px;
  }
  .topnav input[type=text] {
    border: 1px solid #ccc;
  }
}

#table{
    border-collapse: collapse;
    width: 100%;
}

td, th {
  border: 1px solid #999;
  padding: 0.5rem;
  text-align: center;
}

th{
  font-size: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
}

tr:nth-child(even){
    background-color: pink;
}

tr:hover {
	background: #777;
}

.navigationButton{
    background-color: darkred;
    color: white;
}

#destination {
  /* remove default behavior */
  appearance: none;
  -webkit-appearance: none;
  /* usual styles */
  border: none;
  background-color: #b22222;
  color: #fff;
  border-radius: 5px;
  margin-top: 5px;
  width: 100px;
}

</style>