<template>
  <div class="header_details">
    <div class="header_details_nav">
      <a @click="openDelivery()" class="header_details_nav_a">ДОСТАВКА И ОПЛАТА</a>
      <a @click="openContacts()" class="header_details_nav_a">КОНТАКТЫ</a>
      <a @click="openAboutUs()" class="header_details_nav_a">О НАС</a>
    </div>
    <hr />
    

    <div class="buttons">
      <a href="/" height="190px">
        <img src="../assets/img/animalPaws.svg" class="logo_img" />
      </a>
      <div class="buttons_search_block">
        <input type="text" class="input_search" placeholder="Поиск.." />
        <i class="fa fa-search" aria-hidden="true"></i>
      </div>
      <div class="buttons_block" >
        <button class="basket_btn" @click="openBasket()">
          <i
            class="fa fa-shopping-cart"
            aria-hidden="true"
            style="margin-right: 10px"
          ></i>
          Корзина
          </br>
          <span>Товара: {{ $store.state.cartCount }} </br> На сумму: {{ totalPrice }}</span>
        </button>
      
      <div :class="$store.state.ninja ? 'sign_in_close_block' : 'sign_in'">
        <a href="#sign_in_wrapper">
          <button class="btn_sign_in">
            <i
              class="fa fa-user"
              style="margin-right: 10px"
              aria-hidden="true"
            ></i
            >Войти
          </button>
        </a>
      </div>
      </div>
      <div :class="$store.state.ninja ? 'block_profile_open' : 'block_profile'">
        <button class="block_profile_open_btn" @click="openProfile">
          Личный кабинет
        </button>
        <button class="block_profile_open_btn" @click="logout">Выйти</button>
      </div>
    </div>
    

    <div id="sign_in_wrapper" class="sign_in_overlay">
      <div id="popup" class="sign_in_popup">
        <a class="sign_in_close" href="#" @click="$emit('close')">&times;</a>
        <form id="form_sign_in" method="get" @submit.prevent="userLogin">
          <button class="form_btn_sign_in">Войти</button>
          <button class="form_btn_up" @click="openSignUp">Регистрация</button>
          <div>
            <label>Логин</label><br />
            <input
              type="text"
              required
              class="form_sign_in_input"
              v-model="info.login"
            />
            <br />
            <label>Пароль</label><br />
            <input
              type="password"
              required
              class="form_sign_in_input"
              v-model="info.password"
            />
            <div
              :class="
                $store.state.user
                  ? 'block_wrong_close'
                  : 'block_wrong_user_open'
              "
            >
              <p>*Неверный логин или пароль</p>
            </div>

            <!-- <input
              type="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Не менее восьми символов, содержащих хотя бы одну цифру и символы из верхнего и нижнего регистра"
              placeholder="*Пароль"
              required
              class="form_sign_in_input"
            /> -->
          </div>

          <button class="btn_sign_in">Войти</button>
        </form>

        <form id="form_sign_up"  method="post" @submit.prevent="recordUser">
          <button class="form_btn_sign_in" @click="closeSignUp">Войти</button>
          <button class="form_btn_up" @click="openSignUp">Регистрация</button>
          <div>
            <label>Логин</label><br />
            <input
              type="text"
              required
              class="form_sign_up_input"
              v-model="userData.login"
            />
            <br />
            <label>Номер телефона</label><br />
            <input
              type="tel"
              required
              class="form_sign_up_input"
              v-model="userData.tel"
            />
            <br />
            <label>Электронная почта</label><br />
            <input
              type="email"
              required
              class="form_sign_up_input"
              v-model="userData.email"
            />
            <br />
            <label>Пароль</label><br />
            <input
              type="password"
              required
              class="form_sign_up_input"
              v-model="userData.password"
            />

            <div
              :class="
                userExists ? 'block_userExists_close' : 'block_userExists_open'
              "
            >
              <p>*Пользователь уже существует!</p>
            </div>
            <div
              :class="
                userConfirm
                  ? 'block_userNotExists_close'
                  : 'block_userNotExists_open'
              "
            >
              <p>*Поздравляем! Вы успешно зарегистрированы!</p>
            </div>

            <!-- <input
              type="email"
              pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
              placeholder="*Электронная почта"
              required
              class="form_sign_up_input"
              v-model="userData.email"
            />
            <br />
            <input
              type="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Не менее восьми символов, содержащих хотя бы одну цифру и символы из верхнего и нижнего регистра"
              placeholder="*Пароль"
              required
              class="form_sign_up_input"
              v-model="userData.password"
            /> -->
          </div>

          <button class="form_btn_sign_up">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Axios from "axios";

export default {
  name: "Header",
  components: {},
  data() {
    return {
      userExists: Boolean,
      userConfirm: Boolean,
      info: {
        login: "",
        password: "",
      },
      userData: {
        login: "",
        tel: "",
        email: "",
        password: "",
      },
    };
  },
  mounted() {
    this.$store.commit("saveBasket");
  },
  computed: {
    totalPrice() {
      let total = 0;
      for (let allProduct of this.$store.state.basketContent) {
        total += allProduct.totalPrice;
      }
      if (total == 0) {
        this.totalCheck = false
      }
      return total.toFixed(2);
    },
  },
  methods: {
    openDelivery: function () {
      this.$router.push("/delivery");
    },
    openContacts: function () {
      this.$router.push("/contacts");
    },
    openAboutUs: function () {
      this.$router.push("/aboutUs");
    },
    openBasket: function () {
      this.$router.push("/basket");
      // let config = {
      //   headers: {},
      // };
      // if (localStorage.getItem("key") != "undefined" && localStorage.getItem("key") != null) {
      //   config.headers = { TOKEN: localStorage.getItem("key") };
      // }
      // Axios.get("http://localhost:5000/check_access", config).then(
      //   (response) => {
      //     if (response.data.success == true) {
      //       this.$router.push("/basket");
      //     } else {
      //       alert("Вам необходимо зарегистрироваться");
      //     }
      //   }
      // ),
      //   (error) => {
      //     console.log(error);
      //   };
    },
    openSignUp() {
      document.getElementById('form_sign_up').style.display = 'block';
      document.getElementById('form_sign_in').style.display = 'none';
    },
    closeSignUp() {
      document.getElementById('form_sign_up').style.display = 'none';
      document.getElementById('form_sign_in').style.display = 'block';
    },
    recordUser(event) {
      console.log(this.userData);
      Axios.post("http://localhost:5000/registration", this.userData).then(
        (response) => {
          this.userExists = response.data.success;
          this.userConfirm = response.data.confirm;
          console.log(response);
        }
      ),
        (error) => {
          console.log(error);
        };
    },
    userLogin(event) {
      this.$store.dispatch("UserLogin", this.info);
      console.log(localStorage.getItem("key"));
      if (
        localStorage.getItem("key") != "undefined" &&
        localStorage.getItem("key") != null
      ) {
        this.$store.state.ninja = true;
        document.getElementById("sign_in_wrapper").className =
          "close_form_sign_in";
      } else {
        this.$store.state.ninja = false;
      }
    },
    logout() {
      localStorage.removeItem("key");
      var localValue = localStorage.getItem("key");
      this.$store.state.ninja = false;
      this.$router.push("/");
    },
    openProfile: function () {
      if (
        localStorage.getItem("key") != "undefined" &&
        localStorage.getItem("key") != null
      ) {
        this.$router.push("/profile");
      }
    },
  },
};
</script>

<style>
.header_details {
  height: 200px;
  margin: auto;
  background: rgb(230, 230, 250, 0.95);
  border-radius: 2px 2px 0px 0px;
  box-shadow: 0 0px, 0 -1px, -1px 0, 1px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center ;
  position: relative;
}

.header_details_nav {
  width: 95%;
  height: 20px;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.header_details_nav_a {
  width: 150px;
  font-size: 12px;
  color: black !important;
  text-align: center;
}

.header_details_nav_a:hover {
  color: rgb(33, 147, 90) !important;
}

hr {
  background-color: black;
  color: black;
  height: 1px;
  width: 100%;
}

.logo_img {
  width: 150px;
}

.buttons {
  width: 85%;
  height: 180px;
  display: flex;
  align-items: center;
}

.buttons_block {
  width: 18%;
  display: inline-block;
  margin-left: 100px;
} 

.buttons_search_block {
  width: 45%;
  height: 44px;
  margin-left: 180px;
  background: rgb(33, 147, 90);
  border-radius: 4px;
  display: inline-block;
}

.input_search {
  width: 94%;
  transition: width 0.4s ease-in-out;
  font-size: 18px;
  padding: 5px;
  margin: 2px 6px 0 2px;
  border: 1px solid black;
  border-radius: 4px;
  background: white;
}

.basket_btn {
  height: 70px;
  width: 180px;
  padding-left: 10px;
  border-radius: 2px;
  font-size: 14px;
  background-color: rgb(141, 206, 157);
  box-shadow: 0 -3px rgb(20, 163, 91) inset;
  transition: 0.2s;
  color: black;
  text-align: left;
}

.basket_btn:hover {
  background: rgb(53, 167, 110);
}

.basket_btn:active {
  background: rgb(33, 147, 90);
  box-shadow: 0 3px rgb(33, 147, 90) inset;
}

.sign_in {
  height: 50px;
  float: right;
  display: flex;
}

.sign_in_close_block {
  display: none;
}

.btn_sign_in {
  width: 80px;
  height: 30px;
  border-radius: 2px;
  font-size: 14px;
  margin-right: 15px;
  background: rgb(141, 206, 157);
  box-shadow: 0 -3px rgb(20, 163, 91) inset;
  transition: 0.2s;
  color: black;
}

.btn_sign_in:hover {
  background: rgb(53, 167, 110);
}

.btn_sign_in:active {
  background: rgb(33, 147, 90);
  box-shadow: 0 3px rgb(33, 147, 90) inset;
}

.close_form_sign_in {
  display: none;
}

.form_btn_sign_in {
  width: 80px;
  height: 30px;
  border-radius: 2px;
  font-size: 14px;
  background: rgb(145, 155, 148);
  margin-right: 10px;
}

.form_btn_up {
  width: 130px;
  height: 30px;
  border-radius: 2px;
  font-size: 14px;
  background: rgb(145, 155, 148);
  margin-bottom: 15px;
}

.block_profile {
  display: none;
  color: #06d85f;
}

.block_profile_open {
  float: right;
  display: flex;
}

.block_profile_open_btn {
  width: 120px;
  height: 30px;
  margin-right: 10px;
  font-size: 14px;
  background: rgb(141, 206, 157);
  box-shadow: 0 -3px rgb(20, 163, 91) inset;
  transition: 0.2s;
  color: black;
}

.block_profile_open_btn:hover {
  background: rgb(53, 167, 110);
}

.block_profile_open_btn:active {
  background: rgb(33, 147, 90);
  box-shadow: 0 3px rgb(33, 147, 90) inset;
}

.sign_in_overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  visibility: hidden;
  opacity: 0;
}
.sign_in_overlay:target {
  visibility: visible;
  opacity: 1;
  z-index: 999999;
}

.sign_in_popup {
  position: relative;
  z-index: 100000;
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 20%;
  transition: all 5s ease-in-out;
}

.sign_in_popup h2 {
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}

.sign_in_close {
  position: absolute;
  top: 0px;
  right: 20px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}

.sign_in_close:hover {
  color: #06d85f;
}

.form_sign_in_input {
  width: 200px;
  height: 40px;
  margin-bottom: 10px;
  border: 1px solid black;
}

.form_sign_up_input {
  width: 200px;
  height: 40px;
  margin-bottom: 10px;
  border: 1px solid black;
}

.form_btn_sign_up {
  width: 170px;
  height: 30px;
  border-radius: 2px;
  font-size: 14px;
  background: rgb(141, 206, 157);
  box-shadow: 0 -3px rgb(20, 163, 91) inset;
  transition: 0.2s;
  color: black;
}

.form_btn_sign_up:hover {
  background: rgb(53, 167, 110);
}

.form_btn_sign_up:active {
  background: rgb(33, 147, 90);
  box-shadow: 0 3px rgb(33, 147, 90) inset;
}

.false_login {
  display: none;
}

.block_wrong_user_open {
  display: block;
}

.block_wrong_close {
  display: none;
}

.block_userExists_close {
  display: none;
}

.block_userExists_open {
  display: block;
}
.block_userNotExists_close {
  display: none;
}

.block_userNotExists_open {
  display: block;
}

#form_sign_up {
  display: none;
}

#form_sign_in {
  display: block;
}
</style>
