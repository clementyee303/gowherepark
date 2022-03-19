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

            <label for="price">Password:</label>
            <input type="text" id="password" required="" placeholder="Enter your pasword"><br><br>
            <br>
            <Button
              title="Sign In"
              class="text-md font-general-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-md px-5 py-2.5 duration-300"
              @click="$emit('login-update', 1)"
              aria-label="Sign In"
            />
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
import Button from './reusable/Button.vue';

export default {
  name: "LoginForm",
  components: {
    Button,
  },
  methods: {
    placeholder() {
      this.$router.push('/Home');
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