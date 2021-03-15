<template>
  <div class="wrapper">
    <!-- calendar with 3 buttons and today's date -->
    <div class="calendar">
      <!-- <date-picker v-model="time3" range>Pick a date</date-picker> -->
      <input type="date" name="datum" v-model="datum" id="date1" />
      <input type="date" name="datum2" v-model="datum2" id="date2" />
      <button class="calBtn" @click="rangeTrans">Show</button>
      <button class="calBtn" @click="reset">Reset Date</button>
      <button class="calBtn" @click="resetAll">Reset All</button>
      <p>Today is: {{ new Date() | dateFormat("DD-MM-YYYY") }}</p>

      <!-- dodao sam - npm install vue-filter-date-format ,  
        na strani https://vuejsexamples.com/simple-datetime-filter-for-vue-js/ 
        jer vue nema ugradjeno formatiranje datuma-->
    </div>
    <!-- body contains all under the calendar -->
    <div class="body">
      <!-- transactions contains 3 types of tables depending on the content that is searched -->
      <div class="transactions">
        <!-- all column names are in this header -->
        <div class="header">
          <div class="colName">
            <div>Account Name</div>
          </div>
          <div class="colName">
            <div>Transaction Amount</div>
          </div>
          <div class="colName">
            <div>Transaction Type</div>
          </div>
          <div class="colName">
            <div>Category</div>
          </div>
          <div class="colName">
            <div>Description</div>
          </div>
          <div class="colName">
            <div>Date</div>
          </div>
        </div>
        <!-- here are all transactions for all accounts -->
        <div class="allData" v-if="showAll">
          <div class="row" v-for="(a, index) in dataArray" :key="index">
            <div class="param">{{ a.acc_name }}</div>
            <div class="param">{{ a.tra_amount }}</div>
            <div class="param">{{ a.tra_type_name }}</div>
            <div class="param">{{ a.cat_name }}</div>
            <div class="param">{{ a.tra_desc }}</div>
            <div class="param">{{ a.tra_date }}</div>
          </div>
        </div>

        <!-- here are all transactions for certain account -->
        <div class="oneAccData" v-if="showRow">
          <div class="row" v-for="(a, index) in singleAcc" :key="index">
            <div class="param">{{ a.acc_name }}</div>
            <div class="param">{{ a.tra_amount }}</div>
            <div class="param">{{ a.tra_type_name }}</div>
            <div class="param">{{ a.cat_name }}</div>
            <div class="param">{{ a.tra_desc }}</div>
            <div class="param">{{ a.tra_date }}</div>
          </div>
        </div>
        <div class="message">{{ por }}</div>

        <!-- here are all transactions searched by date from calendar -->
        <div class="rangeTransactions" v-if="showRange">
          <div class="row" v-for="(a, index) in range" :key="index">
            <div class="param">{{ a.acc_name }}</div>
            <div class="param">{{ a.tra_amount }}</div>
            <div class="param">{{ a.tra_type_name }}</div>
            <div class="param">{{ a.cat_name }}</div>
            <div class="param">{{ a.tra_desc }}</div>
            <div class="param">{{ a.tra_date }}</div>
          </div>
        </div>
      </div>

      <!-- here is sidebar with buttons for every account and button for all transactions -->
      <div class="sidebar">
        <div>
          <h3>Choose an account to filter their transactions</h3>
          <button class="button" @click="getTransactions">
            All Transactions
          </button>
        </div>
        <div class="buttons">
          <button
            class="button"
            v-for="(mm, index) in allMyAcc"
            :key="index"
            @click="funcAcc(mm.acc_id)"
          >
            {{ mm.acc_name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
// import DatePicker from "vue2-datepicker";
// import "vue2-datepicker/index.css";

export default {
  // components: { DatePicker },
  data() {
    return {
      text: new Date("MMM DD YYYY"),
      datum: null,
      datum2: null,
      // time1: null,
      // time2: null,
      // time3: null,
      showAll: true,
      showRow: false,
      showRange: false,
      baseURL: "http://181w122.e2.mars-hosting.com",
      dataArray: [],
      allMyAcc: "",
      singleAcc: [],
      range: [],
      acc_id: "",
      por: "",
      por2: "",
    };
  },
  methods: {
    ...mapActions(["change_login"]),
    getTransactions() {
      axios
        .get(this.baseURL + "/wallet/transaction", {
          params: {
            sid: localStorage.getItem("sid"),
          },
        })
        .then((res) => {
          console.log(res);
          this.por = res.data.message;
          this.dataArray = res.data.data;
          this.acc_id = res.data.data.acc_id;
          this.showAll = true;
          this.showRow = false;
          this.showRange = false;
          this.por = res.data.message;
        });
    },
    getAccounts() {
      axios
        .get(this.baseURL + "/wallet/account", {
          params: {
            sid: localStorage.getItem("sid"),
          },
        })
        .then((res) => {
          console.log(res);
          this.allMyAcc = res.data.data;
        });
    },

    funcAcc(acc_id) {
      axios
        .get(this.baseURL + "/wallet/transaction", {
          params: {
            sid: localStorage.getItem("sid"),
            acc_id: acc_id,
          },
        })
        .then((res) => {
          console.log(res);
          this.singleAcc = res.data.data2;
          this.por = res.data.message;
          if (res.data.data2.lenght == 0) {
            this.singleAcc.tra_ammount = "no transaction";
            alert("No trans");
          }
          this.showAll = false;
          this.showRow = true;
          this.showRange = false;
        });
    },

    rangeTrans() {
      axios
        .get(this.baseURL + "/wallet/transaction", {
          params: {
            sid: localStorage.getItem("sid"),
            tra_date: this.datum,
            tra_date2: this.datum2,
          },
        })
        .then((res) => {
          console.log(res);
          this.por = res.data.message2;
          this.range = res.data.dataDate;
          this.showAll = false;
          this.showRow = false;
          this.showRange = true;
          this.por = res.data.message;
        });
    },
    reset() {
      this.datum = "";
      this.datum2 = "";
    },
    resetAll() {
      this.getTransactions();
      this.datum = "";
      this.datum2 = "";
    },
  },
  mounted() {
    this.getTransactions();
    this.getAccounts();
    // this.rangeTrans();
  },
};
</script>

 <style scoped>
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
#date1,
#date2 {
  border-radius: 25px;
  border: solid green 1px;
  padding: 0 15px;
  text-transform: uppercase;
}
#date2 {
  margin: 0 10px;
}
input:hover {
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
}
.calBtn {
  border-radius: 25px;
  padding: 0 15px;
  font-size: 15px;
  margin-left: 10px;
  height: 40px;
  width: 150px;
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  border: none;
  margin: auto 10px;
}
.calBtn:nth-last-child(2) {
  background-image: linear-gradient(100deg, #fa2c2c 0%, #e94b4b 74%);
  color: #fff;
}
.calBtn:hover {
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid black;
  padding: 5px 0;
}
.param {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.row:last-child {
  border-bottom: none;
}
.wrapper {
  min-height: 85vh;
  margin-bottom: 25px;
}
.body {
  display: flex;
  background-color: rgb(255, 255, 255);
}
.calendar {
  margin: 10px 0 0 30px;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  /* align-items: center; */
  background-color: #ffffff;
  animation: fadeRight 0.5s;
}
.cell {
  background-color: #3d4379;
}
.mx-calendar-header {
  background-color: rgb(167, 6, 6);
  color: rgb(32, 9, 136);
  text-align: center;
  z-index: 1;
}
.mx-calendar-panel-date {
  border: black solid;
  border-radius: 15px;
}
.sidebar {
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
.transactions {
  display: flex;
  background-color: rgb(255, 255, 255);
  margin: 25px 10px 0 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: solid 1px black;
  border-radius: 25px;
  min-height: 80%;
  box-shadow: 5px 9px rgba(0, 0, 0, 0.1);
  animation: fadeRight 0.5s;
}
/* .trans {
  margin: 15px 0 0 0;
  text-align: start;
  background-color: rgb(255, 255, 255);
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
} */
.button {
  margin: auto;
  font-size: 20px;
  padding: 15px;
  width: 75%;
  height: auto;
  border-radius: 8px;
  border: none;
  background-color: #fff;
}
.button:hover {
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
}
.button:focus {
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
}
.header {
  display: flex;
  flex-direction: row;
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  border-radius: 25px 25px 0 0;
}
.transactions .colName {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  text-align: center;
  height: auto;
  padding: 20px 0;
}
.colName:hover:first-child {
  background-color: rgb(128, 216, 165);
  border-top-left-radius: 25px;
}
.colName:hover {
  background-color: rgb(128, 216, 165);
}
.colName:hover:last-child {
  background-color: rgb(128, 216, 165);
  border-top-right-radius: 25px;
}
.row .param {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
}
.param p {
  margin: 5px;
  width: 100%;
}
.sidebar button {
  margin-top: 20px;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
}
p {
  margin: 15px;
}
input[type="button"] {
  margin: 15px;
}
.message {
  margin: 0 auto;
}
@media only screen and (max-width: 600px) {
  .wrapper {
    max-width: 599px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .calendar {
    display: flex;
    flex-wrap: wrap;
  }
  .body {
    display: flex;
    flex-direction: column-reverse;
  }
  .sidebar {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    margin: 10px;
    min-height: 100px;
    
  }
  .buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .button {
    max-width: 150px;
    margin: 10px;
  }
  .transactions {
    max-width: 95%;
    margin: 0 auto;
    min-height: 200px;
    border: none;
  }
  #date2,
  #date1 {
    height: 44px;
    margin: 0 0 10px 0;
  }
  .calBtn {
    margin: 5px;
  }
  .colName {
    font-size: 10px;
  }
}
@media only screen and (max-width: 800px) and (min-width: 600px) {
}
</style>
