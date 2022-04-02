<template>
  <div id="searchform">
    <div class="layout">
      <div id="addresstextbox-item">
        <form id="addressform">
          <input
            type="search"
            id="addressbox"
            required=""
            placeholder="Enter Address"
          />
        </form>
      </div>
      <div id="geolocationbutton-item" v-if="loaded">
        <button id="geolocation" type="button" v-on:click="GetLocation()">
          <span id="geolocation-label">
            <svg id="geolocation-root" focusable="false" viewBox="0 0 24 24">
              <path
                d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
    <div class="layout" v-if="loaded">
      <div id="checkbox-item1">
        <form id="checkbox1">
          <input type="checkbox" id="evcharging" value="True" />
          <label for="evcharging"> EV Charging Station</label>
        </form>
      </div>
      <div id="checkbox-item2">
        <form id="checkbox2">
          <input type="checkbox" id="handicap" value="True" />
          <label for="handicap"> Handicap Parking</label>
        </form>
      </div>
    </div>
    <div class="layout" v-if="loaded">
      <div id="slider-item">
        <form id="slider1">
          <input
            type="range"
            id="rangeInput"
            min="1.8"
            max="4.5"
            step="0.1"
            value="1.8"
            onchange=""
            oninput="heightOutputId.value = rangeInput.value"
          />
          <br />
          <label for="rangeInput">Minimum Car Park Height Limit:</label>
          <output id="heightOutputId">1.8</output>
        </form>
      </div>
    </div>
    <div id="layout" v-if="loaded">
      <div id="button-item">
        <button id="searchButton" type="button" v-on:click="SearchCarparks()">
          Search
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import axios from "axios";
import firebaseApp from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  name: "SearchForm",
  data() {
    return {
      user: false,
      loaded: false,
    };
  },
  mounted() {
    setTimeout(() => {
      new google.maps.places.Autocomplete(
        document.getElementById("addressbox"),
        {
          bounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(1.29027, 103.851959)
          ),
        }
      );
      const auth = getAuth(firebaseApp);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      });
      this.loaded = true;
    }, 500);
  },
  methods: {
    DegtoRad: function (deg) {
      return deg * (Math.PI / 180);
    },
    GetDist: function (lat1, lon1, lat2, lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = this.DegtoRad(lat2 - lat1);
      var dLon = this.DegtoRad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.DegtoRad(lat1)) *
          Math.cos(this.DegtoRad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return Math.round((d + Number.EPSILON) * 100) / 100;
    },
    GetLocation: function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            document.getElementById("addressbox").value =
              position.coords.latitude + "," + position.coords.longitude;
          },
          (error) => {
            console.log(error.message);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
    GetCarparks: async function (lat, lng) {
      let carparks = [];
      let carpark = {};
      const config = {
        headers: {
          AccountKey: "PbRtSOrvQX6aYQSKPmJsRg==",
          accept: "application/json",
        },
      };
      let urls = [];
      urls.push("http://localhost:8080/ltaodataservice/CarParkAvailabilityv2");
      urls.push(
        "http://localhost:8080/ltaodataservice/CarParkAvailabilityv2?$skip=500"
      );
      urls.push(
        "http://localhost:8080/ltaodataservice/CarParkAvailabilityv2?$skip=1000"
      );
      urls.push(
        "http://localhost:8080/ltaodataservice/CarParkAvailabilityv2?$skip=1500"
      );
      urls.push(
        "http://localhost:8080/ltaodataservice/CarParkAvailabilityv2?$skip=2000"
      );
      for (let i = 0; i < urls.length; i++) {
        let received = await axios.get(urls[i], config);
        let array = received.data.value;
        for (const item of array) {
          let carparkLat = Number(item.Location.split(" ")[0]);
          let carparkLng = Number(item.Location.split(" ")[1]);
          if (this.GetDist(carparkLat, carparkLng, lat, lng) < 0.7) {
            carpark["name"] = item.Development;
            let distanceAway = this.GetDist(carparkLat, carparkLng, lat, lng);
            carpark["distance"] = distanceAway;
            carpark["numLots"] = item.AvailableLots;
            carpark["carparkType"] = "Gantry";
            carpark["marginTopPrice"] = "0px";
            carpark["marginTopButton"] = "110px";
            if (item.AvailableLots < 10) {
              carpark["textColor"] = "red";
            }
            carpark["isCoupon"] = false;
            carpark["isGantry"] = true;
            carpark["lat"] = carparkLat;
            carpark["lng"] = carparkLng;
            carpark["id"] = item.CarParkID;
            if (this.user) {
              let bookmarked = await this.IsBookMarked(item.CarParkID);
              if (bookmarked == true) {
                carpark["isFavColor"] = "red";
              } else {
                carpark["isFavColor"] = "black";
              }
            } else {
              carpark["isFavColor"] = "black";
            }
            carparks.push(carpark);
            carpark = {};
          }
        }
      }
      let dbCollection = await getDocs(collection(db, "Carpark"));
      //console.log(dbCollection.docs);

      for (let document of dbCollection.docs) {
        let doc = document.data();
        let carparkLat = doc.Latitude;
        let carparkLng = doc.Longitude;
        if (this.GetDist(carparkLat, carparkLng, lat, lng) < 0.7) {
          carpark["name"] = doc.Name;
          let distanceAway = this.GetDist(carparkLat, carparkLng, lat, lng);
          carpark["distance"] = distanceAway;
          carpark["numLots"] = 0;
          carpark["carparkType"] = "Coupon";
          carpark["marginTopPrice"] = "35px";
          carpark["marginTopButton"] = "0px";
          carpark["priceHr"] = doc.Price;
          carpark["isCoupon"] = true;
          carpark["isGantry"] = false;
          carpark["lat"] = doc.Latitude;
          carpark["lng"] = doc.Longitude;
          carpark["id"] = doc.Name;
          if (this.user) {
            let bookmarked = await this.IsBookMarked(doc.Name);
            if (bookmarked == true) {
              carpark["isFavColor"] = "red";
            } else {
              carpark["isFavColor"] = "black";
            }
          } else {
            carpark["isFavColor"] = "black";
          }
          carparks.push(carpark);
          carpark = {};
        }
      }

      this.$emit("addCarparks", {
        carparkList: carparks,
        Lat: lat,
        Lng: lng,
      });
      this.$emit("redirectTo", {
        carparkList: carparks,
        Lat: lat,
        Lng: lng,
      });
    },
    IsBookMarked: async function (id) {
      const docRef = doc(
        db,
        "Bookmarks",
        String(this.user.uid),
        "CarParks",
        id
      );
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return true;
      }
      return false;
    },
    SearchCarparks: async function () {
      /*
      var address = document.getElementById("addressbox").value;
      this.GetCarparks(
        Number(address.split(",")[0]),
        Number(address.split(",")[1])
      );*/

      var geocoder = new google.maps.Geocoder();
      var address = document.getElementById("addressbox").value;
      const that = this;

      geocoder.geocode(
        {
          address: address,
        },
        function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            that.GetCarparks(latitude, longitude);
          } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
            alert("Please enter a valid address");
          }
        }
      );
    },
  },
};
</script>

<style>
.layout {
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 3%;
  margin: 10px 0;
}
#addresstextbox-item,
#geolocationbutton-item,
#checkbox-item1,
#checkbox-item2 {
  display: inline-block;
}
input[type="search"] {
  padding: 10px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  padding: 10px;
  border-radius: 10px;
  border: 0;
  border-bottom: 1px solid #eee;
  width: 300px;
  font-family: inherit;
  font-size: inherit;
}
#geolocation {
  width: 30px;
  height: 30px;
}
#geolocation:hover {
  background: #e7e7e7;
}
#geolocationbutton-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
}
#checkbox-item2 {
  padding-left: 20px;
}
#slider-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
#heightOutputId {
  display: inline-block;
  position: relative;
  width: 50px;
  color: #000000;
  line-height: 10px;
  text-align: center;
  border-radius: 3px;
  background: #d3d3d3;
  padding: 5px 10px;
  margin-left: 8px;
}
#searchButton {
  /* remove default behavior */
  appearance: none;
  -webkit-appearance: none;
  /* usual styles */
  padding: 10px;
  border: none;
  background-color: #6366f1;
  color: #fff;
  font-weight: 600;
  border-radius: 5px;
  width: 150px;
}
#searchButton:hover {
  background-color: #4f46e5;
}
.pac-icon {
  display: none;
}
.pac-item {
  padding: 10px;
  font-size: 12px;
  cursor: pointer;
}
.pac-item:hover {
  background-color: #ececec;
}
.pac-item-query {
  font-size: 12px;
}
</style>