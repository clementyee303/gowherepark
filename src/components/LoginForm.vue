<template>
    <div id="formContainer">
        <form id="forms">
            <br>
            <br>
            <h1 class="font-general-medium block text-left text-5xl font-medium text-primary-dark dark:text-ternary-light sm:mx-4 mb-2 sm:py-2">
              Welcome Back. We Exist to Make Parking Easier
            </h1>
            <br>
            <br>
            <label for="email">Email:</label>
            <input type="text" id="email" required="" placeholder="Enter your email address"><br><br>

            <label for="password">Password:</label>
            <input type="password" id="password" required="" placeholder="Enter your pasword"><br>
            <input type="checkbox" @click="showPassword()"><label id="checkbox" for="checkbox">Show Password</label>
            <br><br>
            <!-- <Button
              title="Sign In"
              class="text-md font-general-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-md px-5 py-2.5 duration-300"
              @click="$emit('login-update', 1)"
              aria-label="Sign In"
            /> -->
            <button class = "text-md font-general-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-md px-5 py-2.5 duration-300"
             type="button" @click="signInAccount">Sign In</button>
            <br><br><br>
            <router-link to="/ForgotPassword" button class="text-blue-600 hover:text-indigo-600 font-medium"> Forgot Password?</router-link>
            <br><br>
            <h2>
              Don't have an account?
              <router-link to="/SignUp" button class="text-blue-600 hover:text-indigo-600 font-medium"> Sign up</router-link>
            </h2>
        </form>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "LoginForm",
  components: {

  },
  methods: {
    placeholder() {
      this.$router.push('/Home');
    },
    async signInAccount() {
      const auth = getAuth(firebaseApp);
      const userEmail = document.getElementById("email").value;
      const userPassword = document.getElementById("password").value;
      console.log(userEmail);
      await signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((user) => {
        console.log(user);
        this.$router.push('/Home');
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      })
    },
    showPassword() {
      const x = document.getElementById("password");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    } 
  },
  // mounted() {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       this.user = user;
  //     }
  //   })
  // },
};
</script>

<style scoped>
#formContainer {
  display: flex;
  margin-top: 0.6rem;
  border-width: 2px;
  border-radius: 5px;
  flex-direction: row;
  padding-bottom: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  justify-content: center;
}

label{
    display:inline-block;
    text-align:center;
    width: 100px;
    font-size:20px;
}

input[type = text] {
  border: 2px solid lightslategrey;
  border-radius: 4px;
  width: 30%;
  height: 10%;
  padding: 12px 20px;
}

input[type = password] {
  border: 2px solid lightslategrey;
  border-radius: 4px;
  width: 30%;
  height: 10%;
  padding: 12px 20px;
}

input[type = checkbox] {
  width: 3%;
  height: 3%;
  margin-top:10px;
  /* margin-left: 0px; */
  text-align: right;
}

#checkbox{
    display:inline-block;
    text-align:left;
    width: 200px;
    font-size:15px;
}

</style>