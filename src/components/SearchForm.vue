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
      <div id="geolocationbutton-item">
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
    <div class="layout">
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
    <div class="layout">
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
    <div id="layout">
      <div id="button-item">
        <button id="searchButton" type="button" v-on:click="GetAddressLatLng()">
          Search
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  name: "SearchForm",
  mounted() {
    new google.maps.places.Autocomplete(document.getElementById("addressbox"), {
      bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(1.29027, 103.851959)
      ),
    });
  },
  methods: {
    GetLocation: function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            alert(
              "Latitude: " +
                position.coords.latitude +
                " Longitude: " +
                position.coords.longitude
            );
          },
          (error) => {
            console.log(error.message);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
    GetAddressLatLng: function () {
      var geocoder = new google.maps.Geocoder();
      var address = document.getElementById("addressbox").value;

      geocoder.geocode(
        {
          address: address,
        },
        function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            alert("Latitude: " + latitude + " Longitude: " + longitude);
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