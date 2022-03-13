<script>
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
      CarParks: [
        {
          id: 1,
          name: "The Star Vista",
          distance: 2.34,
          numLots: 27,
          carparkType: "Gantry",
          marginTop: "58px",
          priceEntry: 2.5,
          priceHr: 1.2,
          textColor: "red",
          isGantry: false,
          isFav: "red",
        },
        {
          id: 2,
          name: "The Star Vista",
          distance: 2.34,
          numLots: "-",
          carparkType: "Coupon",
          marginTop: "30px",
          priceEntry: 2.5,
          priceHr: 1.2,
          textColor: "green",
          isGantry: true,
        },
        {
          id: 3,
          name: "The Star Vista",
          distance: 2.34,
          numLots: 27,
          carparkType: "Gantry",
          marginTop: "58px",
          priceEntry: 2.5,
          priceHr: 1.2,
          textColor: "red",
          isGantry: false,
        },
      ],
    };
  },
};
</script>

<template>
  <div id="locate">
    <SearchForm />
    <div id="navbar">
      <h4 id="title">Nearest Car Parks</h4>
      <label for="sortoptions" id="sort">Sort By</label>
      <select name="sortoptions" id="sortoptions">
        <option value="distance">Distance</option>
        <option value="lots">No. of Lots</option>
        <option value="rates">Parking Rates</option>
      </select>
    </div>
    <div id="scrollable">
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
</style>
