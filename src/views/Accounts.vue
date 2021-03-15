<template>
  <!-- wapper -->
  <div id="account">
    <!-- wapper of left side including header and table -->
    <div class="accInfos">
      <!-- header that includes basic account informations and buttons for adding income and expense and delete button for that account -->
      <div class="header" v-if="accNameProp">
        <div>
          <!-- account name, amount, currency and account delete modal -->
          <div class="accNamDel">
            Account name: {{ accNameProp }}
            <!-- delete account modal -->
            <div class="errorAlert">
              <button class="button errorBtn" @click="errorAlert = true">
                Delete account
              </button>
              <transition name="fade" appear>
                <div
                  class="modal-overlay"
                  v-if="errorAlert"
                  @click="errorAlert = false"
                ></div>
              </transition>
              <transition name="slide" appear>
                <div class="modal" v-if="errorAlert">
                  <h2 class="errorH2">
                    Are you sure you want to delete this account?
                  </h2>
                  <button class="deleteButton" @click="deleteAccount">
                    Delete
                  </button>
                  <button class="cancelButton" @click="errorAlert = false">
                    Cancel
                  </button>
                </div>
              </transition>
            </div>
          </div>
          <div>Amount: {{ accAmountProp }} - {{ accAmountType }}</div>
        </div>
        <!-- add income and expense buttons -->
        <div class="buttons">
          <!-- income -->
          <div class="income">
            <button class="button incomeBtn" @click="income = true">
              Add Income
            </button>
            <transition name="fade" appear>
              <div
                class="modal-overlay"
                v-if="income"
                @click="income = false"
              ></div>
            </transition>
            <transition name="slide" appear>
              <div class="modal" v-if="income">
                <h1>Add Income</h1>
                <label>Amount</label>
                <input type="number" min="0" v-model="incomeAmount" />
                <label>Description</label>
                <input type="text" v-model="incomeDescription" />
                <div class="error" v-show="this.wrongInput">
                  You have to complete all fields
                </div>
                <button class="makeButton" @click="addIncome">
                  Make Income
                </button>
                <button class="cancelButton" @click="income = false">
                  Cancel
                </button>
              </div>
            </transition>
          </div>
          <!-- expense -->
          <div class="expense">
            <button class="button expenseBtn" @click="expense = true">
              Add Expense
            </button>
            <transition name="fade" appear>
              <div
                class="modal-overlay"
                v-if="expense"
                @click="expense = false"
              ></div>
            </transition>
            <transition name="slide" appear>
              <div class="modal" v-if="expense">
                <h1>Add expense</h1>
                <label>Choose a category</label>
                <select
                  v-model="currentCategoryId"
                  name="category"
                  id="category"
                >
                  <option disabled value="" selected>Choose category</option>
                  <option
                    v-for="cat in category"
                    :key="cat.cat_id"
                    :value="cat.cat_id"
                  >
                    {{ cat.cat_name }}
                  </option>
                </select>
                <label>Amount</label>
                <input type="number" min="0" v-model="expenseAmount" />
                <label>Description</label>
                <input type="text" v-model="expenseDescription" />
                <div class="error" v-show="wrongInput">
                  {{ mess }}
                </div>
                <button class="makeButton" @click="addExpense">
                  Make Expense
                </button>
                <button class="cancelButton" @click="expense = false">
                  Cancel
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <!-- table for transactions -->
      <div class="allInfos" v-if="accNameProp">
        <!-- header of table for transactions -->
        <div class="columnsName">
          <div class="colName">
            <div>Transaction Type</div>
          </div>
          <div class="colName">
            <div>Transaction Amount</div>
          </div>
          <div class="colName">
            <div>Description</div>
          </div>
          <div class="colName">
            <div>Date</div>
          </div>
          <div class="colName delete">
            <p>Delete</p>
          </div>
        </div>
        <!-- row of transactions with parameters and transaction delete button -->
        <div class="row" v-for="(a, index) in allData" :key="index">
        <div class="message">{{ por }}</div>
          <div class="param">{{ a.tra_type_name }}</div>
          <div class="param">{{ a.tra_amount }}</div>
          <div class="param">{{ a.tra_desc }}</div>
          <div class="param">{{ a.tra_date }}</div>
          <!-- {{ por }} -->
          <!-- delete transaction modal -->
          <div class="errorAlert param delete">
            <button
              class="button errorTransBtn"
              @click="setParams(a.tra_id, a.tra_type_id, a.acc_id)"
            >
              <img src="../assets/Delete.png" alt="Delete" />
            </button>
          </div>
        </div>
      </div>
            <transition name="fade" appear>
              <div
                class="modal-overlayTrans"
                v-if="errorAlertTrans"
                @click="errorAlertTrans = false"
              ></div>
            </transition>
            <transition name="slide" appear>
              <div class="modal" v-if="errorAlertTrans">
                <h2 class="errorH2">
                  Are you sure you want to delete this transaction?
                </h2>
                <button class="deleteButton" @click="deleteTransaction()">
                  Delete
                </button>
                <button class="cancelButton" @click="errorAlertTrans = false">
                  Cancel
                </button>
              </div>
            </transition>
    </div>

    <!-- landing page informations that is shown before clicking at certain account -->
    <div class="accountsDetails" v-if="!accNameProp">
      <div class="img">
        <img src="../assets/dark analytics.png" alt="Dark analytics" />
      </div>
      <div class="welcome">
        <h2>Manage your accounts</h2>
        <p>Manage as many accounts as you wish!</p>
        <p>Click on any account and see everything about them.</p>
      </div>
    </div>

    <!-- sidebar with add account button and list of all accounts -->
    <div class="allAccounts">
      <!-- add account modal -->
      <div class="addAccountbutton">
        <button class="button" @click="addAcc = true">Add account</button>
        <transition name="fade" appear>
          <div
            class="modal-overlay"
            v-if="addAcc"
            @click="addAcc = false"
          ></div>
        </transition>
        <transition name="slide" appear>
          <div class="modal" v-if="addAcc">
            <h1>Create new account</h1>
            <label>Choose a currency</label>
            <select v-model="getTypes" name="currency" id="currency">
              <option disabled value="" selected>Choose currency</option>
              <option
                v-for="curr in currency"
                :key="curr.acc_type_id"
                :value="curr.acc_type_id"
              >
                {{ curr.acc_type_name }}
              </option>
            </select>
            <label>Account name</label>
            <input type="text" v-model="accName" />
            <label>Amount</label>
            <input type="number" min="0" v-model="amount" />
            <div class="error" v-show="this.wrongInput">
              You have to complete all fields
            </div>
            <button class="makeButton" @click="makeAcc">Make account</button>
            <button class="cancelButton" @click="addAcc = false">Cancel</button>
          </div>
        </transition>
      </div>

      <!-- list of all accounts -->
      <div class="accounts" v-if="singleName">
        <div class="SingleAccounts">
          <button
            class="singleAccount"
            v-for="name in singleName"
            :key="name.acc_id"
            @click="getAllData(name.acc_id)"
          >
            <p>
              {{ name.acc_name }}, {{ name.acc_amount }}
              {{ name.acc_type_name }}
            </p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      addAcc: false,
      income: false,
      expense: false,
      wrongInput: false,
      errorAlert: false,
      errorAlertTrans: false,
      currency: "",
      amount: "",
      accName: "",
      getTypes: "",
      singleName: "",
      listAccounnt: "",
      accNameProp: "",
      accAmountProp: "",
      accAmountType: "",
      traTypeProp: [],
      traAmountProp: "",
      traDescProp: "",
      traDateProp: "",
      allData: [],
      id: "",
      category: "",
      expenseAmount: "",
      expenseDescription: "",
      incomeAmount: "",
      incomeDescription: "",
      currentCategoryId: "",
      singleTraId: "",
      mess:"",
      por: "",
      acc: "",
      tra: "",
      type: "",
    };
  },
  methods: {
    setParams(tra_id, tra_type_id, acc_id) {
      this.acc = acc_id;
      this.tra = tra_id;
      this.type = tra_type_id;
      this.errorAlertTrans = true;
    },
    getType() {
      axios
        .get("http://181w122.e2.mars-hosting.com/wallet/account_type", {
          params: {
            sid: localStorage.getItem("sid"),
          },
        })
        .then((res) => {
          console.log(res);
          this.currency = res.data.data;
        });
    },
    makeAcc() {
      if (
        this.accName.trim() == "" ||
        this.amount.trim() == "" ||
        this.getTypes == null
      ) {
        this.wrongInput = true;
      } else {
        this.wrongInput = false;
        axios
          .post("http://181w122.e2.mars-hosting.com/wallet/account", {
            acc_amount: this.amount,
            acc_name: this.accName,
            acc_type_id: this.getTypes,
            sid: localStorage.getItem("sid"),
          })
          .then((res) => {
            localStorage.getItem("sid");
            console.log(res.data.message);
            (this.amount = ""),
              (this.accName = ""),
              (this.currency = ""),
              (this.addAcc = false);
          });
      }
    },
    listAccounnts() {
      console.log(this.singleName);
      axios
        .get("http://181w122.e2.mars-hosting.com/wallet/account", {
          params: {
            sid: localStorage.getItem("sid"),
          },
        })
        .then((res) => {
          console.log(res.data.data);
          this.singleName = res.data.data;
        });
    },
    getAllData(acc_id) {
      axios
        .get("http://181w122.e2.mars-hosting.com/wallet/transaction", {
          params: {
            sid: localStorage.getItem("sid"),
            acc_id: acc_id,
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data.message);
          this.allData = res.data.data2;
          this.id = acc_id;
          this.getNaAm();
          this.por = res.data.message;
        });
    },
    getNaAm() {
      axios
        .get("http://181w122.e2.mars-hosting.com/wallet/account", {
          params: {
            sid: localStorage.getItem("sid"),
            acc_id: this.id,
          },
        })
        .then((res) => {
          console.log(res.data.acc_id);
          this.accNameProp = res.data.acc_id.acc_name;
          this.accAmountProp = res.data.acc_id.acc_amount;
          this.accAmountType = res.data.acc_id.acc_type_name;
        });
    },
    getCategory() {
      axios
        .get("http://181w122.e2.mars-hosting.com/wallet/categories", {
          params: {
            sid: localStorage.getItem("sid"),
          },
        })
        .then((res) => {
          console.log(res);
          this.category = res.data.data;
        });
    },
    addExpense() {
      axios
        .post("http://181w122.e2.mars-hosting.com/wallet/transaction", {
          sid: localStorage.getItem("sid"),
          tra_type_id: 1,
          tra_amount: this.expenseAmount,
          tra_desc: this.expenseDescription,
          cat_id: this.currentCategoryId,
          acc_id: this.id,
        })
        .then((res) => {
          console.log(res.data.ins);
          console.log(res.data.message);
          this.mess = res.data.message;
          localStorage.getItem("sid");

          if (this.mess == res.data.message) {
            console.log(this.mess);
            this.mess = res.data.message
            this.expense = true;
            this.wrongInput = true;
          }
          if (this.mess === "The transaction was successful") {
            this.expenseDescription = "";
            this.expenseAmount = "";
            this.expense = false;
            this.mess = "";
            this.wrongInput = false;
            // this.por = "";
          this.getAllData(this.id);
          this.listAccounnts();
          }
           if (this.mess === "You don`t have enough funds in the account") {
               this.expense = true;
            this.wrongInput = true;
           }
          
        });
    },
    addIncome() {
      axios
        .post("http://181w122.e2.mars-hosting.com/wallet/transaction", {
          sid: localStorage.getItem("sid"),
          tra_type_id: 2,
          tra_amount: this.incomeAmount,
          tra_desc: this.incomeDescription,
          acc_id: this.id,
        })
        .then((res) => {
          console.log(res.data.ins);
          localStorage.getItem("sid");
          (this.incomeAmount = ""),
            (this.incomeDescription = ""),
            (this.income = false);
          this.getAllData(this.id);
          this.listAccounnts();
        });
    },
    deleteTransaction() {
      axios
        .delete("http://181w122.e2.mars-hosting.com/wallet/transaction", {
          params: {
            sid: localStorage.getItem("sid"),
            tra_id: this.tra,
            tra_type_id: this.type,
            acc_id: this.acc,
          },
        })
        .then((res) => {
          if (this.por === "Succesful delete transaction") {
            (this.tra = ""), (this.type = ""), (this.acc = "");
          }
          console.log(res.data.allParam);
          this.errorAlertTrans = false;
          // this.getAllData();
          this.getAllData(this.id);
          this.listAccounnts();
        });
    },
    deleteAccount() {
      axios
        .delete("http://181w122.e2.mars-hosting.com/wallet/account", {
          params: {
            sid: localStorage.getItem("sid"),
            acc_id: this.id,
          },
        })
        .then((res) => {
          console.log(res);
          this.getAllData(this.id);
           this.listAccounnts();
          this.errorAlert = false;
          this.$router.push("/")
        });
    },
  },
  mounted() {
    this.getType();
    this.listAccounnts();
    this.getCategory();
    this.deleteTransaction();
    this.getAllData(this.id);
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

#account {
  position: relative;
  display: flex;
  min-height: 85vh;
  overflow-x: hidden;
}
.accInfos {
  width: 100%;
  margin: 0 30px 0 0;
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 30px 0 0 30px;
  font-size: 30px;
  animation: fadeRight 0.5s;
}
.accNamDel {
  display: flex;
  flex-direction: row;
}
.buttons {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}
.button {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: inline-block;
  padding: 15px 25px;
  background-color: #fff;
  border-radius: 8px;
  color: rgb(0, 0, 0);
  font-size: 18px;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;
  margin-top: 20px;
  height: 100%;
}
.button:hover {
  box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
}
.fade-enter-active,
.incomeBtn {
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
}
.expenseBtn {
  background-image: linear-gradient(315deg, #fa2c2c 0%, #e96a6a 74%);
  color: #fff;
  margin-left: 30px;
}
.errorBtn {
  background-image: linear-gradient(100deg, #fa2c2c 0%, #e94b4b 74%);
  color: #fff;
  margin: 0 0 0 15px;
}
.errorTransBtn {
  margin: 0;
  padding: 0;
  box-shadow: none;
}
.errorTransBtn:hover {
  box-shadow: none;
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
}
.errorTransBtn img {
  width: 30px;
}
.errorH2 {
  text-align: center;
  font-size: 30px;
}
.modal-overlayTrans {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.1);
}
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.3);
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 100%;
  max-width: 700px;
  background-color: #fff;
  border-radius: 16px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
}
.modal h1 {
  color: #222;
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 15px;
}
.modal p {
  color: #666;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
}
input {
  border-radius: 25px;
  border: none;
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  /*  margin: 10px; */
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
label {
  margin-top: 20px;
  font-size: 18px;
}
#currency,
#category {
  width: 300px;
  height: 50px;
  border-radius: 25px;
  padding-left: 20px;
  font-size: 18px;
}
.makeButton,
.deleteButton {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: inline-block;
  padding: 15px 25px;
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  border-radius: 8px;
  color: rgb(0, 0, 0);
  font-size: 18px;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;
  margin-top: 20px;
  height: 100%;
  width: auto;
}
.makeButton:hover,
.deleteButton:hover {
  z-index: 100;
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
}
.deleteButton {
  background-image: linear-gradient(100deg, #fa2c2c 0%, #e94b4b 70%);
  color: #fff;
}
.cancelButton {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: inline-block;
  padding: 15px 25px;
  background-image: linear-gradient(to right, #e7e7e7, #d3d3d3);
  border-radius: 8px;
  color: rgb(0, 0, 0);
  font-size: 18px;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;
  margin-top: 20px;
  height: 100%;
  width: auto;
}
.cancelButton:hover {
  z-index: 100;
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
}

.allInfos {
  background-color: rgb(255, 255, 255);
  margin: 25px 10px 25px 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: solid 1px black;
  border-radius: 25px;
  min-height: 30%;
  box-shadow: 5px 9px rgba(0, 0, 0, 0.1);
  animation: fadeRight 0.5s;
}
/* Column names */
.columnsName {
  display: flex;
  flex-direction: row;
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  border-radius: 25px 25px 0 0;
}
.colName {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  text-align: center;
  height: auto;
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
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid rgb(0, 0, 0);
  padding: 5px 0;
}
.row:last-child {
  border-bottom: none;
}
.param {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.param img {
  width: 30px;
}
.welcome {
  /* width: 500px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 60px;
  text-align: center;
  animation: fadeIn 1s;
}
.accountsDetails {
  height: 100%;
  display: flex;
  align-items: center;
  max-width: 100%;
  margin: 0 auto;
  /* margin-right: 300px; */
}
.accountsDetails .img img {
  margin: 50px 0 0;
  max-width: 450px;
  max-height: 500px;
  animation: fadeRight 1s;
}
.accountsDetails h2 {
  color: black;
  font-size: 55px;
  font-family: "Abril Fatface", cursive;
  letter-spacing: 1px;
}
.accountsDetails p {
  color: black;
  font-size: 30px;
  font-family: "Abril Fatface", cursive;
  letter-spacing: 1px;
  font-family: "Montserrat", sans-serif;
}
.allAccounts {
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  display: flex;
  display: table-row;
  margin: auto;
  margin: 25px 30px 0 0;
  padding: 0 15px 15px;
  text-align: center;
  border-radius: 25px;
  max-width: 300px;
  height: 60%;
  box-shadow: 5px 9px rgba(0, 0, 0, 0.1);
  animation: fadeLeft 1s;
}
.addAccountbutton {
  display: flex;
  justify-content: center;
}
.accounts {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  width: 250px;
}
.accounts button {
  width: 90%;
}
.singleAccount {
  display: inline-block;
  background-color: #fff;
  border: none;
  border-radius: 8px;
  color: rgb(0, 0, 0);
  font-size: 18px;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;
  margin: 10px 10px;
}
.singleAccount:hover {
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
}
.singleAccount:focus {
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
}
/* .SingleAccount {
  display: flex;
  flex-direction: row;
} */
.accounts img {
  width: 30px;
}
.message {
  margin: 0 auto;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@media only screen and (max-width: 600px) {
  #account{
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: flex-end;
    max-width: 599px;
  }
  .accountsDetails {
    flex-direction: column-reverse;
    max-width: 100%;
    /* display: none; */
  }
  .accountsDetails .img img {
    margin: 0;
    max-width: 350px;
    max-height: 350px;
    animation: fadeRight 1s;
    /* display: none; */
  }
  .accountsDetails .img{
    margin: 0 auto;
  }
  .allAccounts{
    display: flex;
    flex-direction: column;
    max-width: 100%;
    margin: 10px;
    min-height: 100px;
  }
  .accounts{
    width: 100%;
  }
  .singleAccount{
    max-width: 150px;
  }
  .accounts .SingleAccounts{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .accNamDel{
display: flex;
flex-wrap: wrap;
margin: 20px 0;
  }
  .header{
    flex-direction: column;
    margin-right: 20px;
  }
  .accInfos{
    justify-content: center;
    margin: 0;
  }
  .allInfos{
    max-width: 95%;
  }
}
@media only screen and (max-width: 800px) and (min-width: 600px) {
  #account{
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: flex-end;
    max-width: 799px;
  }
  .accountsDetails {
    flex-direction: column-reverse;
    max-width: 100%;
    /* display: none; */
  }
  .accountsDetails .img img {
    margin: 0;
    max-width: 350px;
    max-height: 350px;
    animation: fadeRight 1s;
    /* display: none; */
  }
  .accountsDetails .img{
    margin: 0 auto;
  }
  .allAccounts{
    display: flex;
    flex-direction: column;
    max-width: 100%;
    justify-content: center;
    margin: 10px;
    min-height: 100px;
  }
  .accounts{
    width: 100%;
  }
  .singleAccount{
    max-width: 150px;
  }
  .accounts .SingleAccounts{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .header{
    flex-direction: column;
    margin-right: 20px;
  }
  .accInfos{
    justify-content: center;
    margin: 0;
  }
  .allInfos{
    max-width: 95%;
  }
}
@media only screen and (max-width: 1200px) and (min-width: 800px) {
  #account{
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: flex-end;
    max-width: 1199px;
  }
  .accountsDetails {
    flex-direction: column-reverse;
    max-width: 100%;
    /* display: none; */
  }
  .accountsDetails .img img {
    margin: 0 auto;
    max-width: 450px;
    max-height: 450px;
    animation: fadeRight 1s;
    /* display: none; */
  }
  .accountsDetails .img{
    margin: 0 auto;
  }
  .allAccounts{
    display: flex;
    flex-direction: column;
    max-width: 100%;
    justify-content: center;
    margin: 10px;
    min-height: 100px;
  }
  .accounts{
    width: 100%;
  }
  .singleAccount{
    max-width: 150px;
  }
  .accounts .SingleAccounts{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .header{
    flex-direction: column;
    margin-right: 20px;
  }
  .accInfos{
    justify-content: center;
    margin: 0;
  }
  .allInfos{
    max-width: 95%;
  }
}
</style>
