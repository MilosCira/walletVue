<template>
  <div class="body">
    <!-- **** naslov *** -->

    <div class="mainHeader">
      <div class="sav">
        <button class="button addBtn" @click="savings = true">
          Add Savings
        </button>
        <transition name="fade" appear>
          <div
            class="modal-overlay"
            v-if="savings"
            @click="savings = false"
          ></div>
        </transition>
        <transition name="slide" appear>
          <div class="modal" v-if="savings">
            <h2>Add Saving</h2>
            <label class="label">Choose a currency</label>
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
            <input
              class="input"
              type="number"
              min="0"
              v-model="amount"
              placeholder="Saving Amount"
            />
            <input
              class="input"
              type="number"
              min="0"
              v-model="period"
              placeholder="Saving period (in months)"
            />
            <input
              class="input"
              type="text"
              v-model="desc"
              placeholder="Description"
            />
            <input
              class="picture input"
              type="file"
              @change="getFile"
              v-if="!url"
            />
            <img v-else :src="url" alt="Picture" />
            <button class="deletePic" v-if="url" @click="url = false">
              Delete Picture
            </button>
            <input
              class="input"
              type="text"
              v-model="imgDesc"
              placeholder="Image Description"
            />
            <div class="error" v-show="this.wrongInput">
            {{this.message}}
          </div>
            <button class="makeButton" @click="addSavings">Make Saving</button>
            <button class="cancelButton" @click="savings = false">
              Cancel
            </button>
          </div>
        </transition>
      </div>
    </div>
    <div class="savingsList">
      <div class="savings" v-for="a in savingsData" :key="a.sav_id">
        <div class="oneSaving">
          <h2 class="rowName">Goal {{ a.sav_amount }} {{ a.acc_type_name }}</h2>
          <div class="rowName">Period {{ a.sav_period }} months</div>
          <div class="rowName">Description {{ a.sav_desc }}</div>
          <div class="rowName"></div>

          <div class="buttons">
            <div class="btnWrapper">
              <div class="rowName">
                <!-- add funds to savings -->
                <div class="details">
                  <button
                    class="button"
                    id="detailsBtn"
                    @click="openFundsModal(a.sav_id)"
                  >
                    Add Funds
                  </button>
                </div>
              </div>

              <div class="rowName">
                <!-- see details of savings -->
                <div class="details">
                  <button
                    class="button"
                    id="detailsBtn"
                    @click="getDetails(a.sav_id)"
                  >
                    See Details
                  </button>
                </div>
              </div>
            </div>
            <div class="btnWrapper">
              <div class="rowName">
                <!-- show image of savings -->
                <div class="details">
                  <button
                    class="button"
                    id="detailsBtn"
                    @click="openPicModal(a.slikaStednje)"
                  >
                    Show Image
                  </button>
                </div>
              </div>
              <div class="rowName">
                <!-- delete savings -->
                <div class="details">
                  <button
                    class="button"
                    id="detailsBtn"
                    @click="openDeleteModal(a.sav_id)"
                  >
                    Delete Savings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ADD FUNDS MODAL -->
    <transition name="fade" appear>
      <div
        class="modal-overlay-special"
        v-if="addFunds"
        @click="addFunds = false"
      ></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal" v-if="addFunds">
        <h2>Add Funds</h2>
        <select v-model="pickAccount" name="category" id="category">
          <option disabled value="" selected>Choose Account</option>
          <option
            v-for="acc in savingsAccounts"
            :key="acc.acc_id"
            :value="acc.acc_id"
          >
            {{ acc.acc_name }}, {{ acc.acc_amount }}, {{ acc.acc_type_name }}
          </option>
        </select>
        <label>Amount</label>
        <input v-model="traAmount" type="number" min="0" />
        <button class="makeButton" @click="addSavingsFunds(pickAccount)">
          Make Transaction
        </button>
        <button class="cancelButton" @click="addFunds = false">Cancel</button>
      </div>
    </transition>

    <!-- SEE DETAILS MODAL -->
    <transition name="fade" appear>
      <div
        class="modal-overlay-special"
        v-if="seeDetails"
        @click="seeDetails = false"
      ></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal" v-if="seeDetails">
        <h2>Savings Details</h2>
        <div class="params">
          <div class="nameColumn">
            <div class="nameParam">Goal</div>
            <div class="nameParam">Paid</div>
            <div class="nameParam">Difference</div>
            <div class="nameParam">Monthly payment</div>
            <div class="nameParam">Savings period</div>
            <div class="nameParam">Number of payments</div>
            <div class="nameParam">Date of start</div>
          </div>
          <div class="paramColumn" v-for="d in getAllDetails" :key="d.sav_id">
            <div class="detailParam">{{ d.stanje_racuna }} {{ d.valuta }}</div>
            <div class="detailParam">{{ d.placanje_stednje }}</div>
            <div class="detailParam">{{ d.ostalo_za_uplatu }}</div>
            <div class="detailParam">{{ d.Rata }}</div>
            <div class="detailParam">{{ d.period_stednje }}</div>
            <div class="detailParam">{{ d.broj_uplata }}</div>
            <div class="detailParam">{{ d.pocetak_stednje }}</div>
          </div>
        </div>
        <button class="cancelButton" @click="openPayModal">
          See all payments
        </button>
        <button class="cancelButton" @click="seeDetails = false">Cancel</button>
      </div>
    </transition>

    <!-- SEE PAYMENTS IN DEATILS MODAL -->
    <transition name="fade" appear>
      <div
        class="modal-overlay-special"
        v-if="seePayments"
        @click="seePayments = false"
      ></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal" v-if="seePayments">
        <h2>All payments</h2>
        <div class="paramsCol">
          <div class="nameCol">
            <div class="namePar">Account</div>
            <div class="namePar">Paid</div>
            <div class="namePar">Date</div>
          </div>
          <div class="paramCol" v-for="d in getTransactions" :key="d.sav_id">
            <div class="detailPar">{{ d.acc_name }} {{ d.valuta }}</div>
            <div class="detailPar">{{ d.sav_pay_amount }}</div>
            <div class="detailPar">{{ d.sav_pay_date }}</div>
          </div>
        </div>
        <button class="cancelButton" @click="closePayModal">Back</button>
      </div>
    </transition>

    <!-- SHOW IMAGE MODAL -->
    <transition name="fade" appear>
      <div
        class="modal-overlay-special"
        v-if="showImage"
        @click="showImage = false"
      ></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal" v-if="showImage">
        <h2>Image</h2>
        <div class="param">
          <img :src="pictureInModal" alt="You don't have picture for this savings" />
          <!-- {{a.slikaStednje}} -->
        </div>
        <button class="cancelButton" @click="showImage = false">Cancel</button>
      </div>
    </transition>

    <!-- DELETE SAVINGS MODAL -->
    <transition name="fade" appear>
      <div
        class="modal-overlay-special"
        v-if="deleteSavings"
        @click="deleteSavings = false"
      ></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal" v-if="deleteSavings">
        <h2>Are you shure you want to delete this savings?</h2>
        <button class="makeButton" @click="deleteOneSavings">
          YES
        </button>
        <button class="cancelButton" @click="deleteSavings = false">
          Cancel
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      wrongInput: false,
      savings: false,
      addFunds: false,
      showImage: false,
      seeDetails: false,
      deleteSavings: false,
      seePayments: false,
      type_id: "",
      amount: "",
      period: "",
      desc: "",
      img: "",
      imgDesc: "",
      baseURL: "http://181w122.e2.mars-hosting.com",
      savingsData: "",
      savingsAccounts: [],
      savingsData: [],
      savingsData: "",
      savingsAccounts:[],
      savingsAccounts: [],
      getTypes: "",
      currency: "",
      url: null,
      formData: new FormData(),
      getAllDetails: [],
      getTransactions: [],
      savingsId: "",
      pictureInModal: "",
      savAccs: "",
      listOfAcconts: "",
      pickAccount: "",
      traAmount: "",
      savId: "",
      message:"",
    };
  },
  methods: {
    openPayModal() {
      this.seePayments = true;
      this.seeDetails = false;
    },
    closePayModal() {
      this.seeDetails = true;
      this.seePayments = false;
    },
    openDeleteModal(sav_id) {
      this.savId = sav_id;
      this.deleteSavings = true;
      console.log("Savings ID gornji", this.savId);
    },
    openFundsModal(savAcc) {
      this.savAccs = savAcc;
      this.addFunds = true;
      this.showSavingsAccount(savAcc);
    },
    openPicModal(certainPicture) {
      this.pictureInModal = certainPicture;
      console.log(this.pictureInModal);
      this.showImage = true;
    },
    showSavingsAccount(sav_id) {
      console.log(sav_id);
      axios
        .get(this.baseURL + "/wallet/savings", {
          params: {
            sid: localStorage.getItem("sid"),
            sav_id: sav_id,
          },
        })
        .then((res) => {
          console.log("Ovde izvlačiš acc_id iz data 2", res);
          this.savingsAccounts = res.data.data2;
          this.savingsId = sav_id;
        });
    },
    showSavings() {
      axios
        .get(this.baseURL + "/wallet/savings", {
          params: {
            sid: localStorage.getItem("sid"),
          },
        })
        .then((res) => {
          console.log(res);
          localStorage.getItem("sid");
          this.savingsData = res.data.data;
        });
    },
    addSavingsFunds() {
      axios
        .post("http://181w122.e2.mars-hosting.com/wallet/sav_payments", {
          sid: localStorage.getItem("sid"),
          tra_amount: this.traAmount,
          tra_type_id: 3,
          sav_id: this.savingsId,
          acc_id: this.pickAccount,
        })
        .then((res) => {
          console.log(res);
          localStorage.getItem("sid");
        });
    },
    getFile(e) {
      this.img = e.target.files[0];
      this.url = URL.createObjectURL(this.img);

      this.formData.append("pic_img", e.target.files[0]);
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
    addSavings() {
      if (this.getTypes === "" || this.amount ==="" || this.period === "" || this.desc === "") {
        this.wrongInput = true
        this.message = "You have to complete all fields"
      }
      else{
        this.formData.append("sid", localStorage.getItem("sid"));
        if (this.getTypes != "") {
          this.formData.append("acc_type_id", this.getTypes);
        }
        if (this.amount != "") {
          this.formData.append("sav_amount", this.amount);
        }
        if (this.period != "") {
          this.formData.append("sav_period", this.period);
        }
        if (this.desc != "") {
          this.formData.append("sav_desc", this.desc);
        }
        if (this.imgDesc != "") {
          this.formData.append("pic_desc", this.imgDesc);
        }
        axios
          .post(this.baseURL + "/wallet/savings", this.formData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log(res.data.id);
            this.savings = false;
            this.$router.push("/savings")
          });
      }
    },
    getDetails(sav_id) {
      axios
        .get("http://181w122.e2.mars-hosting.com/wallet/sav_payments", {
          params: {
            sid: localStorage.getItem("sid"),
            sav_id: sav_id,
          },
        })
        .then((res) => {
          console.log(res.data.data2);
          // console.log(res.data.data2);
          this.getAllDetails = res.data.data2;
          this.getTransactions = res.data.data3;
          this.savingsId = sav_id;
          this.seeDetails = true;
        });
    },
    deleteOneSavings() {
      console.log("Savings ID donji", this.savId);
      axios
        .delete("http://181w122.e2.mars-hosting.com/wallet/sav_payments", {
          params: {
            sid: localStorage.getItem("sid"),
            tra_type_id: 3,
            sav_id: this.savId,
          },
        })
        .then((res) => {
          console.log(res);
          this.deleteSavings = false
        });
    },
  },
  mounted() {
    this.getType();
    this.showSavings();
    this.showSavingsAccount(this.sav_id);
  
  },
};
</script>

<style scoped>
.wrapper {
  padding: 0 5%;
}
.btnWrapper {
  margin: 0 20px;
}
.savingsList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 30px;
}
.savings {
  min-width: 500px;
  display: inline-block;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  margin: 25px 25px 0 30px;
  border-radius: 25px;
  padding: 15px;
  box-shadow: 5px 9px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s;
}
.rowName {
  margin-top: 10px;
}
.buttons {
  display: flex;
  flex-direction: row;
}
.body {
  display: flex;
  flex-direction: column;
  min-height: 90vh;
}
.header {
  display: flex;
  flex-direction: row;
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  border-radius: 25px 25px 0 0;
}
.row {
  display: flex;
  flex-direction: row;
}
.row .param {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
}
.param img {
  width: 300px;
  border-radius: 15px;
  margin: 0;
}
img {
  margin-top: 20px;
  width: 200px;
}
.addSaving {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  flex-direction: column;
  position: absolute;
  top: 30%;
  left: 25%;
  z-index: 1;
  width: 100%;
  max-width: 700px;
  border-radius: 16px;
  padding: 25px;
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
}
.addSaving img {
  max-width: 150px;
  max-height: 150px;
}
.input {
  border-radius: 25px;
  border: none;
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  height: 50px;
  width: 300px;
  padding: 0 25px;
  font-size: 15px;
  animation: scale 0.1s linear;
  animation-fill-mode: forwards;
}
.input:hover {
  z-index: 100;
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
}
.input:focus {
  z-index: 100;
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
}
input {
  margin-top: 20px;
  font-size: 18px;
}
.picture {
  font-size: 15px;
  padding-top: 12px;
  padding-left: 20px;
}
.deletePic {
  background-image: linear-gradient(100deg, #fa2c2c 0%, #e94b4b 74%);
  color: #fff;
  /* margin: 0 0 0 15px; */
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  box-shadow: 3px 3px rgb(0 0 0 / 40%);
  transition: 0.4s ease-out;
  margin-top: 10px;
  height: 100%;
}
#category,
#currency {
  width: 300px;
  height: 50px;
  border-radius: 25px;
  padding-left: 20px;
  font-size: 18px;
}
input {
  border-radius: 25px;
  border: none;
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  margin: 0;
  height: 50px;
  width: 300px;
  padding: 0 25px;
  font-size: 15px;
  animation: scale 0.1s linear;
  animation-fill-mode: forwards;
}
.input {
  margin-top: 10px;
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
.addBtn,
.cacnel,
#detailsBtn {
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
.cacnel {
  background-image: linear-gradient(100deg, #fa2c2c 0%, #e94b4b 74%);
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
  width: 300px;
}
.sidebar button {
  margin-top: 20px;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
}
.colName {
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
.mainHeader {
  margin: 30px 0 0 30px;
  font-size: 30px;
  display: flex;
  justify-content: center;
  animation: fadeRight 0.5s;
}
.button {
  margin: auto;
  font-size: 20px;
  padding: 15px;
  height: auto;
  border-radius: 8px;
  border: none;
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
}
#detailsBtn {
  background-color: #fff;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.modal-overlay-special {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
.params {
  display: flex;
  flex-direction: row;
}
.nameColumn {
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  padding: 20px;
  border-radius: 20px;
}
.nameParam {
  padding: 5px;
  border-bottom: 0.2px solid #000;
  height: 30px;
}
.paramColumn {
  padding: 20px;
}
.detailParam {
  padding: 5px;
  border-bottom: 0.2px solid #000;
  height: 30px;
}
.paramsCol{
  box-shadow: 7px 10px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
}
.nameCol {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 350px;
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.namePar {
  padding: 5px;
  height: 30px;
  width: 100%;
  text-align: center;
  font-size: 20px;
}
.paramCol {
  display: flex;
  justify-content: space-between;
  border-bottom: 0.1px solid rgb(85, 85, 85);
  padding: 5px;
}
.paramCol:last-child {
  border: none;
}
.detailPar {
  width: 100%;
  text-align: center;
}
.makeButton {
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
.makeButton:hover {
  z-index: 100;
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
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
</style>
