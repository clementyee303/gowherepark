<script>
import firebaseApp from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import Carpark from "@/components/Carpark.vue";
const db = getFirestore(firebaseApp);

export default {
  name: "Bookmark",
  components: {
    Carpark,
  },
  mounted() {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.LoadTable();
      }
    });
  },
  data() {
    return {
      CarParks: [],
    };
  },
  methods: {
    LoadTable: async function () {
      let dbCollection = await getDocs(
        collection(db, "Bookmarks", String(this.user.uid), "CarParks")
      );
      let carpark = {};
      dbCollection.forEach((docs) => {
        let doc = docs.data();
        carpark["name"] = doc.name;
        carpark["carparkType"] = doc.carparkType;
        carpark["marginTopPrice"] = doc.marginTopPrice;
        carpark["marginTopButton"] = doc.marginTopButton;
        carpark["priceHr"] = doc.priceHr;
        carpark["isCoupon"] = doc.isCoupon;
        carpark["isGantry"] = doc.isGantry;
        carpark["lat"] = doc.lat;
        carpark["lng"] = doc.lng;
        carpark["id"] = doc.CarParkID;
        carpark["isFavColor"] = doc.isFavColor;
        carpark["isHandicap"] = doc.isHandicap;
        carpark["isCharging"] = doc.isCharging;
        carpark["carparkHeight"] = doc.carparkHeight;
        this.CarParks.push(carpark);
        carpark = {};
      });
    },
    refreshBookmarks: function () {
      this.CarParks = [];
      this.LoadTable();
    },
  },
};
</script>

<template>
  <div id="scrollable">
    <ul>
      <li v-for="carpark in CarParks" :key="carpark.id">
        <Carpark
          :name="carpark.name"
          :distance="carpark.distance"
          :numLots="carpark.numLots"
          :carparkType="carpark.carparkType"
          :marginTopPrice="carpark.marginTopPrice"
          :marginTopButton="carpark.marginTopButton"
          :priceHr="carpark.priceHr"
          :textColor="carpark.textColor"
          :isCoupon="carpark.isCoupon"
          :isGantry="carpark.isGantry"
          :isFavColor="carpark.isFavColor"
          :lat="carpark.lat"
          :lng="carpark.lng"
          :id="carpark.id"
          :isCharging="carpark.isCharging"
          :isHandicap="carpark.isHandicap"
          :iconDivHeight="carpark.iconDivHeight"
          :carparkHeight="carpark.carparkHeight"
          @refreshBookmarks="refreshBookmarks"
        ></Carpark>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  overflow-y: scroll;
  height: 350px;
  width: 100%;
  text-align: center;
  display: inline-block;
}
#scrollable {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 5%;
  padding-right: 5%;
}
</style>
