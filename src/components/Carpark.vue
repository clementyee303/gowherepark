<template>
  <div id="carparkContainer">
    <div id="flex-layout">
      <h3 id="capark-name">{{ name }}</h3>
      <h5 id="carpark-distance">Distance: {{ distance }}km</h5>
      <h5 id="carpark-lots" v-bind:style="{ color: textColor }">
        {{ numLots }} Lots Available
      </h5>
      <h5 id="carpark-type">{{ carparkType }} Carpark</h5>
      <button type="button" onclick="" id="availability">
        View Historical Parking Availability
      </button>
    </div>
    <div id="flex-layout1">
      <h5 id="carpark-pricentry" v-bind:style="{ marginTop: marginTop }">
        ${{ priceEntry }}/entry
      </h5>
      <h5 id="carpark-pricehr">${{ priceHr }}/hr</h5>
      <button id="getdirection" type="button" @click="getDirections">
        Directions
      </button>
      <br />
      <button v-show="isGantry" type="button" onclick="" id="startsession">
        Start Parking
      </button>
    </div>
    <div id="flex-layout2">
      <button id="bookmark" type="button">
        <span id="bookmark-label">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              v-bind:style="{ fill: isFav }"
              d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"
            />
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Carpark",
  props: {
    name: String,
    distance: Number,
    numLots: Number,
    carparkType: String,
    marginTop: String,
    priceEntry: Number,
    priceHr: Number,
    textColor: { default: "black", type: String },
    isGantry: Boolean,
    isFav: { default: "black", type: String },
    directions: String,
    lat: Number,
    lng: Number,
  },
  methods: {
    getDirections: function () {
      let url = `https://www.google.com/maps/dir/?api=1&destination=${this.lat},${this.lng}&travelmode=driving`;
      window.open(url, "_blank");
    },
  },
};
</script>

<style>
#carparkContainer {
  display: flex;
  margin-top: 0.6rem;
  border-width: 2px;
  border-radius: 5px;
  flex-direction: row;
  padding-bottom: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
}
#flex-layout {
  margin-left: 20px;
  text-align: left;
}
h5 {
  margin: 0px;
  padding: 1px;
  font-size: 14px;
}
h3 {
  font-size: 20px;
  font-weight: bold;
  margin-top: 5px;
}
#flex-layout1 {
  margin-left: auto;
}
#bookmark {
  width: 30px;
  height: 30px;
  margin-top: 5px;
}
#flex-layout2 {
  margin-right: 20px;
}
#availability {
  /* remove default behavior */
  appearance: none;
  -webkit-appearance: none;
  /* usual styles */
  border: none;
  background-color: #3f51b5;
  color: #fff;
  border-radius: 5px;
  width: 300px;
  margin-top: 5px;
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
#startsession {
  /* remove default behavior */
  appearance: none;
  -webkit-appearance: none;
  /* usual styles */
  border: none;
  background-color: #04d010;
  color: #fff;
  border-radius: 5px;
  margin-top: 5px;
  width: 100px;
}
</style>