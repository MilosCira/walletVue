<template>
  <div class="register">
    <div class="container">
      <h1>Create an accoount</h1>
      <input type="text" v-model="fullnameInput" placeholder="Fullname" />
      <input type="text" v-model="emailInput" placeholder="Email" />
      <div class="pass">
        <input type="password" v-model="passwordInput" placeholder="Password" />
        <div class="tooltip">
          ?
          <span class="tooltiptext"
            >Password must contain at least 6 characters, 1 capital letter, 1
            small letter and 1 number!</span
          >
        </div>
      </div>
        <input
          @keypress.enter="register"
          type="password"
          v-model="repeatpasswordInput"
          placeholder="Repeat password"
        />
        <div class="error">
          {{message}}
        </div>
      <div class="error" v-show="this.error">
        You have to complete all fields!
      </div>
      <button id="registerBtn" @click="register">Register</button>
    </div>
  </div>
</template>

<script>
// import VueSimpleAlert from "vue-simple-alert";
import axios from "axios";
export default {
  data() {
    return {
      fullnameInput: "",
      emailInput: "",
      passwordInput: "",
      repeatpasswordInput: "",
      message: "",
      error: false,
    };
  },
  methods: {
    register() {
      if (
        this.fullnameInput === "" ||
        this.emailInput == "" ||
        this.passwordInput == "" ||
        this.repeatpasswordInput == ""
      ) {
        this.error = true;
      } else if (this.passwordInput != this.repeatpasswordInput) {
        this.error = false;
      } else {
        axios
          .post("http://181w122.e2.mars-hosting.com/wallet/auth/register", {
            fullname: this.fullnameInput,
            password: this.passwordInput,
            password2: this.repeatpasswordInput,
            email: this.emailInput,
          })
          .then((res) => {
            console.log(res);
            this.message = res.data.message
            this.error = false;
            // this.$root.$router.push({ path: "/login" });
          })
          .catch((error) => {
            this.error = false;
            console.log(error);
          });
      }
    },
  },
};
</script>

<style scoped>
@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
*:focus {
  outline: none;
}
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted rgb(255, 255, 255); /* If you want dots under the hoverable text */
  color: #FFF;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 160px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -80px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow */
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
.pass{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-left: 10px;
}
.register {
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(-45deg, #9cdaf8,  #98fcbd, #23a6d5, #23d5ab);
  background-size: 400% 400%;
	animation: gradient 7s ease infinite;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  box-shadow: 5px 9px rgba(0, 0, 0, 0.1);
}
#registerBtn {
  border-radius: 25px;
  height: 40px;
  width: 90px;
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  border: none;
  transition-duration: 1s;
  transition-property: all;
  margin-top: 20px;
}
#registerBtn:hover {
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
}
/* .error {
  background-color: #ff0000;
  padding: 10px 20px;
  border-radius: 25px;
  margin-bottom: 10px;
  color: #fff;
  animation: fade-in 2s;
} */
h1 {
  color: white;
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
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
</style>