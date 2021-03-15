<template>
  <div class="logIn">
    <div class="Container">
      <h1>Log in</h1>

      <input type="text" v-model="emailInput" placeholder="Email" />
      <input
        @keypress.enter="login"
        type="password"
        v-model="passwordInput"
        placeholder="Password"
      />
      <!--       
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
      <div class="password" v-show="this.showpassword"><i @click="showPassword()" class="fa fa-eye" aria-hidden="true"></i></div>
      <div class="password" v-show="!this.showpassword"><i @click="showPassword()" class="fa fa-eye-slash" aria-hidden="true"></i></div>
         -->
      <div class="error" v-show="this.wrong">Wrong username or password</div>
      <div class="error" v-show="this.wrongInput">
        You have to complete both fields
      </div>
      <button class="loginBtn" @click="login()">Log in</button>
      <button>Cancle</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
    props:{},
  data() {
    return {
      loginp: false,
      showpassword: false,
      emailInput: "",
      passwordInput: "",
      wrong: false,
      wrongInput: false,
    };
  },
  methods: {
    ...mapActions(["change_login"]),
    login() {
      if (this.emailInput.trim() == "" || this.passwordInput.trim() == "") {
        this.wrongInput = true;
        this.wrong = false;
      } else {
        axios
          .post("http://181w122.e2.mars-hosting.com/wallet/auth/login", {
            password: this.passwordInput,
            email: this.emailInput,
          })
          .then((res) => {
            console.log(res);
            localStorage.setItem("sid", res.data.sid);
            this.change_login(true);
            this.$root.$router.push({ path: "/" });
          })
          .catch((error) => {
            console.log(error);
            this.wrongInput = false;
            this.wrong = true;
          });
      }
    },
  },
};
</script>

<style scoped>
.logIn {
  height: 100%;
  /* width: 10%; */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.Container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  border-radius: 15px;
  background-color: rgb(255, 255, 255);
  padding: 10px;
}
h1 {
  color: rgb(59, 59, 59);
}
input {
  border-radius: 25px;
  border: none;
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  margin: 10px;
  height: 50px;
  width: 300px;
  padding: 0 25px;
  font-size: 15px;
  animation: scale 0.1s linear;
  animation-fill-mode: forwards;
}
input:hover {
  z-index: 100;
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
}
input:focus {
  z-index: 100;
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
}
@keyframes scale {
  0% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes scaledown {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.loginBtn {
  border-radius: 25px;
  height: 40px;
  width: 90px;
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  border: none;
  transition-duration: 1s;
  transition-property: all;
  margin-top: 20px;
  animation: scale 0.1s linear;
}
.loginBtn:hover {
  z-index: 100;
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
}
</style>