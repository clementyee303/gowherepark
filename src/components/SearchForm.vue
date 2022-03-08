<template>
  <div class="home-non-registered home-non-registered-block layout">
    <div id="home-non-registered-flex-layout">
      <div id="home-non-registered-flex-item">
        <form id="addressform">
          <input
            type="text"
            id="addressbox"
            required=""
            placeholder="Enter Address"
          />
        </form>
      </div>
      &nbsp;
      <div id="home-non-registered-flex-item1">
        <button id="getgeolocation" type="button">
          <span id="getgeolocation-label">
            <svg
              class="getgeolocation-root"
              focusable="false"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
    <div id="home-non-registered-flex1-layout">
      <div id="home-non-registered-flex1-item">
        <form id="checkbox1">
          <input type="checkbox" id="evcharging" value="True" />
          <label for="evcharging"> EV Charging Station</label>
        </form>
      </div>
      &nbsp;
      <div id="home-non-registered-flex1-item1">
        <form id="checkbox2">
          <input type="checkbox" id="handicap" value="True" />
          <label for="handicap"> Handicap Parking</label>
        </form>
      </div>
    </div>
    <div id="home-non-registered-flex2-layout">
      <div id="home-non-registered-flex2-item">
        <form id="slider1">
          <input
            type="range"
            id="rangeInput"
            min="1.8"
            max="100"
            onchange=""
            oninput="heightOutputId.value = rangeInput.value"
          />
          <output id="heightOutputId">24</output>
          <br />
          <label for="rangeInput"> Car Park Height Limit</label>
        </form>
      </div>
    </div>
    <div id="home-non-registered-flex3-layout">
      <div id="home-non-registered-flex3-item">
        <button type="button" onclick="">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchForm",
};
</script>

<style>
#home-non-registered-flex-layout {
  text-align: center;
}
#home-non-registered-flex1-layout {
  text-align: center;
}
#home-non-registered-flex-item,
#home-non-registered-flex-item1 {
  display: inline-block;
}
#home-non-registered-flex1-item,
#home-non-registered-flex1-item1 {
  display: inline-block;
}
#getgeolocation {
  width: 30px;
  height: 30px;
}
#heightOutputId {
  display: inline-block;
  position: relative;
  width: 30px;
  color: #000000;
  line-height: 10px;
  text-align: center;
  border-radius: 3px;
  background: #d3d3d3;
  padding: 5px 10px;
  margin-left: 8px;
}
#rangeInput {
  direction: rtl;
}
</style>