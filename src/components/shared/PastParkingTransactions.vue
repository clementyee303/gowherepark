<template>
  <div class="topnav">
    <a class="active" href="#home">Past Parking Transactions</a>
    <select name="month" id="month">
      <option value="January">January</option>
      <option value="Feburary">Feburary</option>
      <option value="March">March</option>
    </select>
    <select name="year" id="year">
      <option value="2020">2020</option>
      <option value="2021">2021</option>
      <option value="2022">2022</option>
    </select>
    <input type="text" placeholder="Search by Date/Location..">
  </div>

  <div id = "display"> 
      <table id = "table" class = "auto-index" style = "width: 100%;">
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
export default {
    mounted(){
      function display() {
        let serialNum = 1;
        var table = document.getElementById("table");
        var row = table.insertRow(serialNum);

        var session = "250168 15 February 22 20:05:22";
        var paid = "$6.30";
        var location = "Adam Road (A0025)";
        var type = "Visa";
        var geoLat = "1.3070951997851268";
        var geoLong = "103.78838833991956"


        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.innerHTML = session;
        cell2.innerHTML = paid;
        cell3.innerHTML = location;
        cell4.innerHTML = type;
        var navigationButton = document.createElement("button");
        navigationButton.className = "navigationButton";
        navigationButton.id = String("destination");
        navigationButton.innerHTML = "navigate";
        navigationButton.addEventListener('click', function(){
            var url = "https://www.google.com/maps/dir/?api=1&destination=" + geoLat + "," + geoLong + "&travelmode=driving" 
            window.open(url, "_blank");
        })
        cell5.appendChild(navigationButton);
      }
      display();
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

table, td, th {
  border: 1px solid #999;
  padding: 0.5rem;
  text-align: center;
}

.navigationButton{
    background-color: darkred;
    color: white;
}
</style>