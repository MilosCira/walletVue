<template>
  <b-card title="Doughnut" class="krofna">
    <b-card img-bottom id="krofna">
      <ChartDoughnutBase :chart-data="chartData" /> </b-card
    >
    <button  @click="addLabel()" id="button">Pie Chart for "{{accountName}}" account Expenses  </button>
    <!-- <h3>Acc_id ={{ propAccId }}{{ catName }}</h3>
    <p>{{ data }}</p>
    <p>{{ label }}</p> -->
  </b-card>
</template>

<script>
import ChartDoughnutBase from "@/components/ChartDoughnutBase";
// import axios from "axios"
export default {
  
  components: {
    ChartDoughnutBase,
  },
  props: [
    "accName",
    // cat_name iz button upita po acc_id
    "catName",
  ],
  data() {
    return {
      chartData: null,
      data: [1],
      label: [],
      array: [],
      q: "",
      accountName: ""
    };
  },

  mounted() {
    this.fillData();
    //  this.getCategory();
    //  this.addLabel()
  },

  methods: {
    fillData() {
      this.chartData = {
        labels: this.label,
        datasets: [
          {
            backgroundColor: [
              "#29B6F6",
              "#D32F2F",
              "#4CAF50",
              "#7B1FA2",
              "#FFEB3B",
              "#BCAAA4",
              "#FF5722",
              "#82E0AA",
              "#0D47A1",
              "#C39BD3",
              "#D4E157",
              "#212F3D",
              "#F06292",
              "#873600",
            ],
            hoverBackgroundColor: [
              "#FFCC99",
              "#fef5c9",
              "#d1e3f7",
              "#fbd2cd",
              "#fef5c9",
              "#FFCC99",
              "#fef5c9",
              "#d1e3f7",
              "#fbd2cd",
              "#fef5c9",
              "#FFCC99",
              "#fef5c9",
              "#d1e3f7",
              "#fbd2cd",
            ],
            data: this.data,
          },
        ],
      };
    },
    // dodaje?
    addLabel() {
      this.label = [];
      this.data = [];
      let q = this.catName;
      for (let i = 0; i < q.length; i++) {
        let d = this.catName[i].cat_name;
        let p = this.catName[i].tra_amount;
        this.label.push(d);
        this.data.push(p);
      }
     
      this.fillData();
       this.accountName = this.accName;
    },
  },
};
</script>

<style scoped>
.krofna {
   margin-left: 50px; 
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 500px;
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
