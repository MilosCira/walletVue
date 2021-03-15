<template>
  <div class="home">
    <div class="intro">
      <div class="img">
        <img src="../assets/dash.png" alt="Dash" />
      </div>
      <div class="welcome">
        <h1>
          Welcome to your <br />
          personal wallet
        </h1>
        <p>Simplest way to manage personal finances.</p>
        <p>Because money matters.</p>
        <router-link to="/register">
          <button v-if="!isLoggedIn">Try for FREE</button>
        </router-link>
        <router-link to="/accounts">
          <button v-if="isLoggedIn">Make an account</button>
        </router-link>
      </div>
    </div>

    <div class="stats">
      <div class="info">
        <h2>Track your statistics</h2>
        <p>
          Understand where your money comes <br />
          and goes with easy-to-read graphs.
        </p>
        <p>
          Save money with us and be one step <br />
          closer to that stuff you want to buy.
        </p>
      </div>
      <div class="img">
        <img src="../assets/stats.png" alt="Stats" />
      </div>
    </div>

    <div class="accounts">
      <div class="img">
        <img src="../assets/dark analytics.png" alt="Dark analytics" />
      </div>
      <div class="welcome">
        <h2>Manage your accounts</h2>
        <p>Manage as many accounts as you wish!</p>
        <p>Because money matters.</p>
      </div>
    </div>

    <div class="team">
      <h2>Our team</h2>
      <div class="row">
     
        <div>
             <a href="https://www.linkedin.com/in/milos-cirkovic-918109203" target="_blank" class="col">
          <div class="card">
            <div class="innerBox">
              <div class="cardFront front1">
                <span>Miloš</span>
              </div>
              <div class="cardBack">
                <p>Back-end developer</p>
              </div>
            </div>
          </div>
             </a>
        </div>
      
        <div>
            <a href="https://www.linkedin.com/in/miroslav-savic-2610" target="_blank" class="col">
          <div class="card">
            <div class="innerBox">
              <div class="cardFront front2">
                <span>Miroslav</span>
              </div>
              <div class="cardBack">
                <p>Frontend web developer</p>
              </div>
            </div>
          </div>
            </a>
        </div>
        <div>
           <a href="https://www.linkedin.com/in/nebojša-savić-869181205/" target="_blank" class="col">
          <div class="card">
            <div class="innerBox">
              <div class="cardFront front3">
                <span>Nebojša</span>
              </div>
              <div class="cardBack">
                <p>Frontend web developer</p>
              </div>
            </div>
          </div>
           </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
export default {
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
          console.log(res);
          localStorage.getItem("sid");
          if (res.data.message === "ok") {
            this.change_login(true);
          }
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

<style scoped>

@import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Montserrat&display=swap");

* {
  text-align: center;
}

.intro {
  background-color: #9cdaf8;
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  height: 100%;
  display: flex;
}

.intro .img img {
  margin: 50px 0 50px 50px;
  max-width: 650px;
  max-height: 650px;

}
.intro img {
  margin-top: 50px;
  margin-left: 50px;
  width: 650px;
  height: 650px;
  animation: fadeRight 1s;
}
.welcome {
  animation: fadeLeft 1s;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 60px;
  padding: 0 60px;
}
h1, h2 {
  color: black;
  font-size: 55px;
  font-family: "Abril Fatface", cursive;
  letter-spacing: 1px;
}
p {
  color: black;
  font-size: 30px;
  font-family: "Abril Fatface", cursive;
  letter-spacing: 1px;
  font-family: "Montserrat", sans-serif;
}
.welcome button {
  width: 200px;
  height: 50px;
  border-radius: 25px;
  border: none;
  background-image: radial-gradient(#ffe66e 30%, #d4af37);
  color: black;
  font-size: 19px;
  margin-bottom: 20px;
}
.welcome button:hover {
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
}
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  animation: fadeRight 1s;
}
.stats {
  display: flex;
  height: 100%;
}
.stats .img img {
  margin: 50px 50px 50px 0;
  max-width: 650px;
  max-height: 650px;
  animation: fadeLeft 1s;
}
.accounts {
  background-color: #9cdaf8;
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  height: 100%;
  display: flex;
}
.accounts .img img {
  margin: 50px 0 50px 50px;
  max-width: 650px;
  max-height: 650px;
  animation: fadeRight 1s;
}

.team {
  /*  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);*/
  background-color: #fff;
  height: 100%;
  width: 100%;
   margin-bottom: 50px;
  animation: fadeIn 1s;
}

.row {
  width: 85%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.col {
  flex-basis: 30%;
  overflow: hidden;
}
.card {
  width: 300px;
  height: 300px;
  margin: auto;
  perspective: 1000px;
  cursor: pointer;
}
.innerBox {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  border-radius: 15px;
  transition: transform 1s;
  transform-style: preserve-3d;
}
.cardFront,
.cardBack {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
}
.cardFront {
  background-position: center;
  background-size: cover;
}
.front1 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(../assets/milos.jpg);
}
.front2 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(../assets/mirko.jpg);
}
.front3 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(../assets/nebojsa.jpg);
}
span {
  display: inline-block;
  width: 100px;
  padding: 14px;
  margin-left: 180px;
  margin-top: 10px;
  border-radius: 5px;
  background: #fff;
  color: #333;
  transition: transform 1s;
}
.cardBack {
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  transform: rotateX(180deg);
}
.card:hover .innerBox {
  transform: rotateX(-180deg);
}
.card:hover span {
  transform: translateY(140px);
}
.cardBack p {
  display: inline-block;
  margin-top: 120px;
}

@media only screen and (max-width: 600px) {
  .home {
    display: flex;
    flex-direction: column;
  }
  .intro {
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-bottom: 20px;
  }
  .intro .img img {
    margin: 30px 0 0 0;
    max-width: 250px;
    max-height: 250px;
  }
  h1 {
    font-size: 30px;
  }
  p {
    font-size: 15px;
  }
  .welcome {
    margin: 0;
    padding: 0;
  }
  .welcome button {
    width: 200px;
    height: 40px;
    font-size: 15px;
  }
  .stats {
    flex-direction: column-reverse;
    height: 100%;
  }
  .stats .img img {
    margin: 20px 0 0;
    max-width: 250px;
    max-height: 250px;
  }
  .accounts {
    flex-direction: column;
    height: 100%;
  }
  .accounts .img img {
    margin: 20px 0 0;
    max-width: 250px;
    max-height: 250px;
  }

  .team {
    /*  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);*/
    height: 100%;
    width: 100%;
    padding: 0;
  }
  .row {
    padding: 0;
    flex-direction: column;
  }
  .col {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .card {
    width: 270px;
    height: 270px;
    margin: auto;
    perspective: 1000px;
    cursor: pointer;
    margin: 10px 0;
  }
  .cardBack p{
    margin-top: 100px;
    font-size: 30px;
  }
  span {
    margin-left: 150px;
    margin-top: 10px;
  }
}

@media only screen and (max-width: 800px) and (min-width: 600px) {
  .home {
    display: flex;
    flex-direction: column;
  }
  .intro {
    flex-direction: row;
    width: 100%;
    height: 100%;
  }
  .intro .img img {
    margin: 30px 0 30px 30px;
    width: 300px;
    height: 300px;
  }
  h1 {
    font-size: 30px;
  }
  p {
    font-size: 15px;
  }
  .welcome {
    margin: 0;
    padding: 0;
  }
  .welcome button {
    width: 200px;
    height: 40px;
    font-size: 15px;
  }
  .stats {
    flex-direction: row;
    height: 100%;
  }
  .stats .img img {
    margin: 20px 30px 30px 0;
    max-width: 300px;
    max-height: 300px;
  }
  .accounts {
    flex-direction: row;
    height: 100%;
  }
  .accounts .img img {
    margin: 20px 0 30px 30px;
    max-width: 300px;
    max-height: 300px;
  }

  .team {
    /*  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);*/
    height: 100%;
    width: 100%;
    padding: 0;
  }
  .row {
    padding: 0;
    flex-direction: column;
  }
  .col {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .card {
    width: 270px;
    height: 270px;
    margin: auto;
    perspective: 1000px;
    cursor: pointer;
    margin: 10px 0;
  }
  .cardBack p{
    margin-top: 100px;
    font-size: 30px;
  }
  span {
    margin-left: 150px;
    margin-top: 10px;
  }
}

@media only screen and (max-width: 1200px) and (min-width: 800px) {
  .home {
    display: flex;
    flex-direction: column;
  }
  .intro {
    width: 100%;
    height: 100%;
    padding-bottom: 20px;
  }
  .intro .img img {
    margin: 30px 0 30px 30px;
    max-width: 350px;
    max-height: 350px;
  }
  h1 {
    font-size: 45px;
  }
  p {
    font-size: 20px;
  }
  .welcome {
    width: 100%;
    margin: 0;
    padding: 0;
  }
.row{
  display: flex;
  flex-wrap: wrap;
}
  .stats {
    display: flex;
    height: 100%;
  }
  .stats .img img {
    margin: 30px 30px 30px 0;
    width: 350px;
    height: 350px;
  }
  .accounts {
    height: 100%;
  }
  .accounts .img img {
    margin: 30px 0 30px  30px;
    width: 350px;
    height: 350px;
  }

  .team {
    /*  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);*/
    height: 100%;
    width: 100%;
    padding: 0;
  }
  /* .row {
    padding: 0;
    flex-direction: column;
  } */
  .col {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .card {
    width: 270px;
    height: 270px;
    margin: auto;
    perspective: 1000px;
    cursor: pointer;
    margin: 10px 0;
  }
  span {
    margin-left: 150px;
    margin-top: 10px;
  }
}
</style>