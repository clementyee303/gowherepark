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
            <input type="password" id="password" required="" placeholder="Enter your pasword"><br>
            <input type="checkbox" @click="showPassword()"><label id="checkbox" for="checkbox">Show Password</label>
            <br><br>
            <!-- <input type="checkbox" @click="myFunction()">Show Password  -->
            
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
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";

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
      const userName = document.getElementById("name").value;
      if (userName == "") {
        alert("Please enter your display name");
        return;
      }
      if (userEmail == "") {
        alert("Please enter an email");
        return;
      }
      if (userPassword == "") {
        alert("Please enter a password");
        return;
      }
      console.log(userEmail);
      await createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((user) => {
        console.log(user);
        const userName = document.getElementById("name").value;
        updateProfile(auth.currentUser, {
          displayName: userName
        })
        .then(() => {
          this.$router.push('/Home');
        })
        .catch((error) => {
          console.log(error.message);
          alert(error.message);
        })
          // this.$router.push('/Home');
        })
      .catch((error) => {
        console.log(error.message);
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
    // nameAccount() {
    //   const auth = getAuth(firebaseApp);
    //   const userName = document.getElementById("name").value;
    //   updateProfile(auth.currentUser, {
    //     displayName: userName
    //   })
    //   .then(() => {
    //     this.$router.push('/Home');
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //     alert(error.message);
    //   })
    // },
  },
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
  margin-left: 35px;
  text-align: right;
}

#checkbox{
    display:inline-block;
    text-align:left;
    width: 200px;
    font-size:15px;
}

</style>