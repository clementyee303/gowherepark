<script>
import firebaseApp from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SearchForm from "@/components/SearchForm.vue";

export default {
  name: "Home",
  components: {
    SearchForm,
  },
  data() {
    return {
      displayName: "",
    };
  },
  mounted() {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.displayName = user.displayName;
      } else {
        this.displayName = "Guest";
      }
    });
    // fetch("https://yee.miim.club/data")
    //   .then(response => response.json())
    //   .then(result => {
    //     console.log(result);
    //   });
  },
  methods: {
    redirectTo: function (val) {
      this.$router.push({
        name: "Locate",
        params: {
          CarParks: JSON.stringify(val.carparkList),
          lat: val.Lat,
          lng: val.Lng,
          from: 1,
        },
      });
    },
  },
};
</script>

<template>
  <div class="container mx-auto">
    <h1>Welcome to the Home Page {{ displayName }}</h1>
    <SearchForm @redirectTo="redirectTo" />
  </div>
</template>

<style scoped>
h1 {
  display: block;
  font-size: 2em;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
</style>
