<template>
    <div id="formContainer">
        <form id="forms">
            <br>
            <br>
            <h1 class="font-general-medium block text-left text-5xl font-medium text-primary-dark dark:text-ternary-light sm:mx-4 mb-2 sm:py-2">
              Welcome. We Exist to Make Parking Easier
            </h1>
            <br>
            <br>
            <label for="name">Name:</label>
            <input type="text" id="name" required="" placeholder="Enter your name"><br><br>
            <label for="email">Email:</label>
            <input type="text" id="email" required="" placeholder="Enter your email address"><br><br>

            <label for="password">Password:</label>
            <input type="text" id="password" required="" placeholder="Enter your pasword"><br><br>
            <br>
            
            <button class = "text-md font-general-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-md px-5 py-2.5 duration-300"
             type="button" @click="createAccount()">Sign Up</button>
            <br><br><br>
            <h2>
              Have an account already?
              <router-link to="/Login" button class="text-blue-600 hover:text-indigo-600 font-medium"> Log In</router-link>
            </h2>
        </form>
    </div>
</template>

<script>
// import firebase from '../uiFirebase.js';
import firebaseApp from '../firebase.js';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// const createAccount = async () => {
//   const userEmail = email.value;
//   const userPassword = password.value;
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
//     console.log(userCredential.user);
//   }
//   catch(error) {
//     console.log(error);
//   }
// }
export default {
  name: "SignUpForm",
  components: {
  },
  methods: {
    placeholder() {
      console.log(document.getElementById("email").value);
    },
    // async createAccount() {
    //   const auth = firebase.auth();
    //   const userEmail = document.getElementById("email").value;
    //   const userPassword = document.getElementById("password").value;
    //   try {
    //     const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
    //     console.log(userCredential.user);
    //   }
    //   catch(error) {
    //     console.log(error);
    //   }
    // }
    async createAccount() {
      const auth = getAuth(firebaseApp);
      const userEmail = document.getElementById("email").value;
      const userPassword = document.getElementById("password").value;
      console.log(userEmail);
      await createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((user) => {
        console.log(user);
        this.$router.push('/Home');
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      })
    }
  },
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

<<<<<<< HEAD
=======
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
>>>>>>> c4a8c07cbf184345fdfb6f96bec814ad79a61624
</style>