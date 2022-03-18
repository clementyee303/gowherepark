<script>
/* eslint-disable no-undef */
import SearchForm from "@/components/SearchForm.vue";
import Carpark from "@/components/Carpark.vue";

export default {
  name: "Locate",
  components: {
    SearchForm,
    Carpark,
  },
  data() {
    return {
      CarParks: [],
      lat: null,
      lng: null,
      componentKey: 0,
      map: null,
    };
  },
  mounted() {
    this.LoadMap();
    window.getDirections = this.getDirections;
  },
  methods: {
    addCarparks: function (val) {
      document.getElementById("sortoptions").value = "distance";
      this.CarParks = val.carparkList;
      this.lat = val.Lat;
      this.lng = val.Lng;
      this.CarParks.sort(this.GetSortOrder("distance"));
      this.AddLocationsToGoogleMaps(this.lat, this.lng);
    },
    LoadMap: function () {
      this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: new google.maps.LatLng(1.29027, 103.851959),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
    },
    AddLocationsToGoogleMaps: function (lat, lng) {
      const blueDot = {
        fillColor: "#4285F4",
        fillOpacity: 1,
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: "rgb(255,255,255)",
        strokeWeight: 2,
      };
      this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: new google.maps.LatLng(lat, lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
      new google.maps.Marker({
        icon: blueDot,
        position: new google.maps.LatLng(lat, lng),
        map: this.map,
      });
      let infowindow = new google.maps.InfoWindow();
      this.CarParks.forEach((carpark) => {
        lat = carpark.lat;
        lng = carpark.lng;
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          map: this.map,
        });
        google.maps.event.addListener(marker, "click", () => {
          infowindow.setContent(
            `<div class="name">${carpark.name}</div>
            <div class="lots">${carpark.numLots} Lots</div>
            <button type="button" onclick="getDirections(${carpark.lat}, ${carpark.lng})" id="getdirection">Directions</button>`
          );
          infowindow.open(this.map, marker);
        });
      });
    },
    getDirections: function (lat, lng) {
      let url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
      window.open(url, "_blank");
    },
    SortList: function () {
      let selected = document.getElementById("sortoptions").value;
      if (selected == "distance") {
        this.CarParks.sort(this.GetSortOrder("distance"));
      } else if (selected == "lots") {
        this.CarParks.sort(this.GetSortOrder("numLots")).reverse();
      }
      this.componentKey += 1;
    },
    GetSortOrder: function (property) {
      return function (a, b) {
        if (a[property] > b[property]) {
          return 1;
        } else if (a[property] < b[property]) {
          return -1;
        }
        return 0;
      };
    },
  },
};
</script>

<template>
  <div id="locate">
    <SearchForm @addCarparks="addCarparks" />
    <div id="map"></div>
    <div id="navbar">
      <h4 id="title">Nearest Car Parks</h4>
      <label for="sortoptions" id="sort">Sort By</label>
      <select name="sortoptions" id="sortoptions" @change="SortList">
        <option value="distance">Distance</option>
        <option value="lots">No. of Lots</option>
        <option value="rates">Parking Rates</option>
      </select>
    </div>
    <div id="scrollable" :key="componentKey">
      <ul>
        <li v-for="carpark in CarParks" :key="carpark.id">
          <Carpark
            :name="carpark.name"
            :distance="carpark.distance"
            :numLots="carpark.numLots"
            :carparkType="carpark.carparkType"
            :marginTop="carpark.marginTop"
            :priceEntry="carpark.priceEntry"
            :priceHr="carpark.priceHr"
            :textColor="carpark.textColor"
            :isGantry="carpark.isGantry"
            :isFav="carpark.isFav"
            :lat="carpark.lat"
            :lng="carpark.lng"
          ></Carpark>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
h4 {
  font-size: 25px;
  font-weight: bold;
  margin-top: 5px;
}
#locate {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 5%;
  padding-right: 5%;
}
#navbar {
  display: flex;
  flex-direction: row;
  padding: 10px;
  align-items: center;
}
#title {
  text-align: left;
}
#sort {
  padding-right: 10px;
  margin-left: auto;
}
#sortoptions {
  padding: 5px;
  border-radius: 10px;
  width: 130px;
  border: 1px solid black;
  height: 35px;
}
ul {
  list-style-type: none;
  overflow-y: scroll;
  height: 350px;
  width: 100%;
  text-align: center;
  display: inline-block;
}
#map {
  position: static;
  height: 300px;
  width: 100%;
}
#getdirection {
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
