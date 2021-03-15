<template>
  <div class="main">
    <!-- *** dodato apex charts 
      ne treba -> npm install apexcharts --save  - nema uputstvo kako treba 
      ne treba ->npm install vue-svg-charts    ***
      
      treba ->npm install hchs-vue-charts  
      npm i chart.js vue-chartjs 
      ovo je komponenta za graf -->
    <div>
      <h2  >
        <span v-show="this.mirko == null">Statistics for <span style="color: blue">"{{ accName }}"</span> account</span>
        <span v-show="this.mirko != null ">Must have expences to have statistic</span>
        </h2>

      <div class="grid">
        <ChartDoughnut ref="foo"  :cat-name="category" :accName="accName" class="krofna-main"/>
        <ChartBar ref="foobar" :poruka="fromStatistic" :accName="accName"
        :income="prihod" :expense="rashod"  class="bar-main" />
        <!-- <ChartLine /> -->
        <div class="accounts">
          <h3 class="buttonAccounts">Choose an account to see their statistics</h3>
          <div class="SingleAccounts">
            <button id="button"
              class="singleAccount"
              v-for="(name, index) in singleName"
              :key="index"
              @mouseover="getStatistic(name.acc_id)" 
              
            >
              <div class="btn-content">
                           {{ name.acc_name }} <br />
                            Current state ={{ name.acc_amount }} {{ name.acc_type_name }}
                  </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartBar from "@/components/ChartBar";
import ChartDoughnut from "@/components/ChartDoughnut";

import axios from "axios";
export default {
  // props: ["accNameProp"],
  components: {
    ChartBar,
    ChartDoughnut,
  },
  data() {
    return {
      fromStatistic: "prop iz statistike",
      singleName: "",
      statistic: "",
      acc_id: "",
      category: "",
      rashod: "",
      prihod: "",
      accName: "",
      mirko: ""
      
    };
  },
  methods: {
    //izlistava accounts
    listAccounnts() {
      axios
        .get("http://181w122.e2.mars-hosting.com/wallet/account", {
          params: {
            sid: localStorage.getItem("sid"),
          },
        })
        .then((res) => {
          console.log(res.data.acc_id);
          this.singleName = res.data.data;
        });
    },
    // cita podatke sa marsa prvi upit  statistic, aktivira se klikom na dugme kej pokazuje accounts
    getStatistic(acc_id) {
      
      axios
        .get("http://181w122.e2.mars-hosting.com/wallet/statistics", {
          params: {
            sid: localStorage.getItem("sid"),
            acc_id: acc_id,
            tra_type_id1: 1,
            tra_type_id2: 2,
            tra_type_id3: 3
          },
        })
        .then((res) => {
          this.mirko = res.data.por;
          console.log(res);
          this.statistic = res.data.statistics;
          this.acc_id = acc_id;
          this.accName = res.data.statistics2[0].acc_name,
          this.category = res.data.statistics2;

          let income = res.data.Rashod.values();
          for(let value of income){
              this.rashod = value['sve_transakcije']
          }

          let p = res.data.Prihod.values();
          for(let value of p){
            this.prihod = value['sve_transakcije']
          }
          this.por = "empty";
          this.$refs.foo.addLabel();
        });
          this.$refs.foo.addLabel();
          this.$refs.foobar. addData();
        },

  },
  mounted() {
    this.listAccounnts();
  },
};
</script>

<style scoped>
.main {
  min-height: 80vh;
  /* background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%); */
}
.accounts{
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  display: flex;
  display: table-row;
  margin: auto;
  margin: 25px 30px 0 0;
  padding: 0 15px 15px;
  text-align: center;
  border-radius: 25px;
  max-width: 300px;
  box-shadow: 5px 9px rgba(0, 0, 0, 0.1);
  animation: fadeLeft 0.5s;
}
.singleAccount{
  display: flex;
  flex-direction: column;
  margin: auto;
}
#buttonAccounts{
  margin-left: 30%;
  font-size: 20px;
  padding: 10px;
  width: 60%;
  height: auto;
  border-radius: 8px;
  border: none;
  /* background-color: #fff; */
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
}

.btn-content {
  position: relative;
  margin: auto;
  background-color: #FFF;
  color: black;
  padding: 5px;
  border-radius: 10px;
  /* padding-left: 20px;
  padding-right: 20px; */
}
#button {
  margin-top: 20px;
  font-size: 20px;
  padding: 8px;
  /* width: 60%; */
  background-color: #FFF;
  height: auto;
  border-radius: 8px;
  border: none;
}
#button:hover {
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
}
/* #button:focus {
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
} */
.krofna-main{
  /* width: 100%; */
}
.bar-main{
  width: 30%;
}
.grid {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  /* max-width: 500px; */
  /*   
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  } */
}
h2 {
  padding: 15px;
  margin-top: 0px;
  color: rgb(43, 6, 177);
  margin-left: 30%;
}
</style>
