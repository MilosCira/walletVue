<template>
  <b-card title="Bar" class="bar">
    <b-card img-bottom>
      <ChartBarBase :chart-data="chartData" /> 
        <!-- <p :e="expense">{{expense}}<br>{{income}}<br>{{dataIncome}}<br>{{dataExpense}}</p> -->
    </b-card>
        <button @click="addData()" id="button">Chart Bar for "{{accountName}}" account</button>
  </b-card>
</template>

<script>
import ChartBarBase from "@/components/ChartBarBase";
export default {
  props: [
            'accName',
            'expense',
            'income'
  ],
  components: {
    ChartBarBase,
  },
  data() {
    return {
      chartData: null,
      accNameProp: "",
      accAmountProp: "",
      accAmountType: "",
      singleName: "",
      statistic: "",
      prikaz: false,
      accountName: "",
      dataIncome: [],
      dataExpense: []
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.chartData = {
        labels: ["Account types "],
        datasets: [
          {
            backgroundColor: "#FFFF00",
            borderColor: "#0c0306",
            data: this.dataIncome,
            label: "Income"
          },
          {
            backgroundColor: "#FF0000",
            borderColor: "#0c0306",
            data: this.dataExpense,
            label: "Expense"
          },
          // {
          //   backgroundColor: "#3333FF",
          //   borderColor: "#0c0306",
          //   data: this.data[2],
          //   label: "Savings"
          // }
        ]
      }
      },
      // dodaje?
    addData() {
      this.dataIncome = [];
      this.dataExpense = [];
      this.dataIncome.push(this.income);
      this.dataExpense.push(this.expense);
      this.fillData();
      this.accountName = this.accName;
    },
    
    }
}

</script>
<style scoped>
.bar{
    /* width: 50%; */
    margin-left: 35px;
    /* display: flex;
    flex-flow: row; */
    display: flex;
   flex-direction: column;
   align-items: center;
}

#button{
  margin: 15px;
  font-size: 20px;
  padding: 10px;
  /* width: 75%; */
  height: auto;
  border-radius: 8px;
  border: none;
  /* background-color: #fff; */
    background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);  

}
#button:hover {
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
}
/* #button:focus {
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
} */

</style>
