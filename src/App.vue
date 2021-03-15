<template>
  <div id="app">
    <div class="nav">
      <input type="checkbox" id="nav-check" />
      <div class="nav-header">
        <router-link to="/">
          <img class="nav-header" src="./assets/logo.png" alt="Logo" />
        </router-link>
      </div>
      <div class="nav-btn">
        <label for="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link v-if="isLoggedIn" to="/accounts">Accounts</router-link>
        <router-link to="/transaction" v-if="isLoggedIn"
          >Transaction</router-link
        >
        <router-link to="/savings" v-if="isLoggedIn">Savings</router-link>
        <router-link to="/statistic" v-if="isLoggedIn">Statistic</router-link>
        <router-link to="#" class="userSettings" v-if="isLoggedIn">
          User
          <div class="dropdownMenu">
            <router-link to="/profil" v-if="isLoggedIn">Profile</router-link>
             <a href="#" @click="logout" v-if="isLoggedIn">Logout</a>
          </div>
        </router-link>
        <!-- dugme show hide -->
        <!-- <a v-if="!isLoggedIn" @click="loginActive = !loginActive">
          Log in
        </a> -->
        <router-link to="/login" v-if="!isLoggedIn">Log in</router-link>
        <router-link to="/register" v-if="!isLoggedIn">Register</router-link>
      </div>
    </div>
    <!-- <div v-if="loginActive" class="modalLogin">
      <div class="komponenta" >
        <LoginComponent></LoginComponent>
      </div>
    </div> -->
    <router-view />

    <footer>
      <div class="footerContent">
        <h3>Wallet</h3>
        <p>Designed and developed in associate with ITPC & ENON Solutions</p>
        <ul class="socials">
          <li>
            <a target="_blank" href="http://www.facebook.com/CCD.razvojkarijere"
              ><img src="./assets/facebook.png" alt="Facebook"
            /></a>
          </li>
          <li>
            <a target="_blank" href="https://twitter.com/razvoj_karijere"
              ><img src="./assets/twitter.png" alt="Twitter"
            /></a>
          </li>
          <li>
            <a
              target="_blank"
              href="http://www.linkedin.com/groups/Center-Career-Development-4564437?gid=4564437&trk=hb_side_g"
              ><img src="./assets/linkedin.png" alt="Linkedin"
            /></a>
          </li>
        </ul>
      </div>
      <div class="footerBottom">
        <p>
          copyright &copy;2020/2021 Wallet designed by
          <span>Miloš, Miroslav & Nebojša</span>
        </p>
      </div>
    </footer>
  </div>
</template>


<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";


// import LoginComponent from "./components/LoginComponent.vue";
export default {
  // components: { LoginComponent },
  data() {
    return {
      baseURL: "http://181w122.e2.mars-hosting.com",
      loginActive: false,
    };
  },
  methods: {
    ...mapActions(["change_login"]),
    isLogged() {
      axios
        .get(this.baseURL + "/wallet/auth/isLogged", {
          params: {
            sid: localStorage.getItem("sid"),
          },
        })
        .then((res) => {
          if (res.data.message === "ok") {
            this.change_login(true);
          }
          if (res.data.message === "You are not logged in") {
            this.change_login(false);
          }
          console.log(res);
        });
    },
    logout() {
      axios
        .get(this.baseURL + "/wallet/auth/logout", {
          params: {
            sid: localStorage.getItem("sid"),
          },
        })
        .then((res) => {
          console.log(res.data.message);
          if (res.data.message === "Logout success.") {
            this.change_login(false);
          }
          console.log(res);
          localStorage.removeItem("sid");
          this.$router.push({ path: "/" });
        });
    },
  },
  computed: {
    ...mapState(["isLoggedIn"]),
  },
  
  mounted() {
    this.isLogged();
  },
};
</script>

<style>
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
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeRight {
  0% {
    transform: translateX(-40px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}
@keyframes fadeLeft {
  0% {
    transform: translateX(+40px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}
.dropdownMenu {
  display: none;
  position: absolute;
  background-color: #4d4d4d;
  min-width: 158px;
  right: 1px;
  top: 55px;
  padding: 10px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: 5;
}
.dropdownMenu a {
  color: rgb(255, 255, 255);
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdownMenu a:hover {
  background-color: #000;
  color: #fff;
}
.userSettings:hover .dropdownMenu {
  display: block;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  min-height: 100%;
}
* {
  box-sizing: border-box;
  outline: none;
}

body {
  margin: 0px;
  font-family: "segoe ui";
}
/* .modalLogin {
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
} */
.nav {
  height: 100%;
  width: 100%;
  background-color: #4d4d4d;
  position: relative;
}

.nav-header {
  width: 50px;
  margin: 5px 0 5px 30px;
}
.nav > .nav-header {
  display: inline;
}
.nav-links a {
  border-radius: 25px;
  margin-right: 10px;
}

.nav > .nav-header > .nav-title {
  display: inline-block;
  font-size: 22px;
  color: #fff;
  padding: 10px 10px 10px 10px;
}

.nav > .nav-btn {
  display: none;
}

.nav > .nav-links {
  display: inline;
  float: right;
  font-size: 18px;
  z-index: 4;
}

.nav > .nav-links > a {
  display: inline-block;
  padding: 13px;
  margin-top: 10px;
  text-decoration: none;
  color: #efefef;
}

.nav > .nav-links > a:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.nav > #nav-check {
  display: none;
}

@media (max-width: 800px) {
  .nav > .nav-btn {
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .nav > .nav-btn > label {
    display: inline-block;
    width: 50px;
    height: 50px;
    padding: 13px;
  }
  .nav > .nav-btn > label:hover,
  .nav #nav-check:checked ~ .nav-btn > label {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .nav > .nav-btn > label > span {
    display: block;
    width: 25px;
    height: 10px;
    border-top: 2px solid #eee;
  }
  .nav > .nav-links {
    position: absolute;
    display: block;
    width: 100%;
    background-color: #333;
    height: 0px;
    transition: all 0.3s ease-in;
    overflow-y: hidden;
    top: 50px;
    left: 0px;
  }
  .nav > .nav-links > a {
    display: block;
    width: 100%;
  }
  .nav > #nav-check:not(:checked) ~ .nav-links {
    height: 0px;
  }
  .nav > #nav-check:checked ~ .nav-links {
    height: 400px;
    overflow-y: auto;
    margin-top: 12px;
  }
}
footer {
  background-color: #4d4d4d;
  color: #fff;
  height: auto;
  font-family: "Open Sans";
  padding-top: 10px;
}
footer img {
  width: 30px;
}
.footerContent {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
.footerContent h3 {
  font-size: 1.8rem;
  font-weight: 400;
  text-transform: capitalize;
  line-height: 3rem;
  margin: 0;
}
.footerContent p {
  line-height: 28px;
  font-size: 15px;
  margin: 0;
}
.socials {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}
.socials li {
  margin: 0 10px;
}
.footerBottom {
  background-color: rgb(27, 26, 26);
  padding: 10px 0;
  text-align: center;
}
.footerBottom p {
  font-size: 14px;
  word-spacing: 2px;
  text-transform: capitalize;
  margin: 0;
}
.footerBottom span {
  text-transform: uppercase;
  opacity: 0.4;
  font-weight: 200;
}
.error {
  /* background-color: #d83c3c; */
  /* margin-top: 10px; */
  padding: 10px;
  border-radius: 25px;
  color: #d83c3c;
  animation: fade-in 2s;
  font-size: 15px;
}
</style>
