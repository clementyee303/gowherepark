<template>
    <div id="formContainer">
        <form id="forms">
            <br>
            <br>
            <h1 class="font-general-medium block text-left text-5xl font-medium text-primary-dark dark:text-ternary-light sm:mx-4 mb-2 sm:py-2">
              Please enter your email to reset password
            </h1>
            <br>
            <br>
            <label for="email">Email:</label>
            <input type="text" id="email" required="" placeholder="Enter your email address"><br><br>
            <br>
            
            <button class = "text-md font-general-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-md px-5 py-2.5 duration-300"
             type="button" @click="resetAccount()">Reset Password</button>
             <br><br><br>
            <h2>
              Return back to login page?
              <router-link to="/Login" button class="text-blue-600 hover:text-indigo-600 font-medium"> Log In</router-link>
            </h2>
        </form>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default {
  name: "ForgotPasswordForm",
  components: {

  },
  methods: {
    placeholder() {
      console.log("test");
    },
    async resetAccount() {
    const auth = getAuth(firebaseApp);
    const userEmail = document.getElementById("email").value;
    console.log(userEmail);
    await sendPasswordResetEmail(auth, userEmail)
    .then(() => {
      console.log();
      alert("Email has been sent to reset your password")
      this.$router.push('/Login');
    })
    .catch((error) => {
      console.log(error.message);
      alert(error.message);
    })
  }
  }
};
</script>

<style>
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
</style>