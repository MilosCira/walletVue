<template>
  <div class="wrapper">
    <div class="user">
      <h1>Edit Your Profile:</h1>
      <label for="">Fullname</label>
      <input type="text" v-model="name" placeholder="name and surname" />
      <label for="">Password</label>
      <div class="pass">
      <input type="text" v-model="pass" placeholder="Password" />
      <div class="tooltip">
          ?
          <span class="tooltiptext"
            >Password must contain at least 6 characters, 1 capital letter, 1
            small letter and 1 number!</span
          >
        </div>
       </div> 
      <div class="error">{{mess}}</div>
      <div class="error" v-show="this.error">You must complete both fields</div>
      <button class="editBtn" @click="editUser">Edit user</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      error: false,
      name: "",
      pass: "",
      mess: "",
      formData: new FormData(),
    };
  },
  methods: {
    editUser() {
      if (this.name == "" && this.pass == "") {
        this.error = true;
      } else {
        this.formData.append("sid", localStorage.getItem("sid")),
          this.formData.append("usr_fullname", this.name),
          this.formData.append("usr_password", this.pass),
          axios
            .patch(
              "http://181w122.e2.mars-hosting.com/wallet/user",
              this.formData,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              this.error = false;
              this.mess = res.data.message;
              console.log(res);
              this.$router.push({ path: "/" });
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
.wrapper {
  min-height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
 /* background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%); */
 background: linear-gradient(-45deg, #9cdaf8,  #98fcbd,#23d5ab , #23d5c6);
  background-size: 400% 400%;
	animation: gradient 10s ease infinite;
}
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  padding: 40px;
  box-sizing: border-box;
  /* background-color: #f4f4f4; */
  background-color:rgba(0, 0, 0, 0.3);
  border-radius: 25px;
  text-align: center;
  box-shadow: 5px 9px rgba(0, 0, 0, 0.1);

}
button {
  padding: 7px;
  background-color: aquamarine;
  border-radius: 9px;
}
label {
  font-size: 18px;
  text-align: center;
  display: block;
  margin-bottom: 5px;
  margin-top: 10px;
}
footer h5 {
  margin-top: 280px;
  text-align: center;
  margin-left: 1%;
}
input {
  border-radius: 25px;
  border: none;
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  margin: 0 10px 10px;
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
.editBtn {
  border-radius: 25px;
  height: 40px;
  width: 90px;
  background-image: linear-gradient(315deg, #9cdaf8 0%, #98fcbd 74%);
  border: none;
  transition-duration: 1s;
  transition-property: all;
  margin-top: 5px;
}
.editBtn:hover{
  animation: scaledown 0.1s linear;
  animation-fill-mode: forwards;
}
.pass{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-left: 10px;
}
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted rgb(0, 0, 0); /* If you want dots under the hoverable text */
  color:#000000 ;
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
</style>