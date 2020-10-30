<template>
  <div class="header_details">
    <a href="/" height="190px">
      <img src="../assets/img/animalPaws.svg" class="header_details_img" />
    </a>
    <div class="header_details_nav">
      <a class="header_details_nav_a">ДОСТАВКА И ОПЛАТА</a>
      <a class="header_details_nav_a">КОНТАКТЫ</a>
      <a @click="openSlider()" class="header_details_nav_a">НАШИ АДРЕСА</a>

      <div class="header_details_basket">
        <!-- <i class="fas fa-cart-arrow-down"></i> -->
        <button @click="openBasket()">
          <!-- <img src="../assets/img/basket.svg" class="header_details_basket_img"/> -->
          КОРЗИНА ({{ $store.state.cartCount }})
        </button>
      </div>

      <div class="search_and_sign">
        <input
          type="text"
          class="header_details_search"
          placeholder="Поиск.."
        />
      </div>
      <div :class="$store.state.ninja ? 'sign_in_close_block' : 'sign_in'">
        <a href="#sign_in_wrapper">
          <button class="btn_sign_in">Войти</button>
        </a>
        <a href="#sign_up_wrapper">
          <button class="btn_sign_up">Зарегистрироваться</button>
        </a>
      </div>
      <div :class="$store.state.ninja ? 'block_profile_open' : 'block_profile'">
        <button class="block_profile_open_btn" @click="openProfile">
          Личный кабинет
        </button>
        <button class="block_profile_open_btn" @click="logout">Выйти</button>
      </div>
    </div>

    <div id="sign_in_wrapper" class="sign_in_overlay">
      <div class="sign_in_popup">
        <a class="sign_in_close" href="#" @click="$emit('close')">&times;</a>
        <form id="form_sign_in" method="get" @submit.prevent="userLogin">
          <h2>Форма входа</h2>
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
      </div>
    </div>

    <div id="sign_up_wrapper" class="sign_up_overlay">
      <div class="sign_up_popup">
        <a class="sign_up_close" href="#">&times;</a>
        <form id="form_sign_up" method="post" @submit.prevent="recordUser">
          <h2>Новый пользователь</h2>
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

            <div :class="userExists ? 'block_userExists_close' : 'block_userExists_open'">
              <p>*Пользователь уже существует!</p>
            </div>
            <div :class="userConfirm ? 'block_userNotExists_close' : 'block_userNotExists_open'">
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

          <button class="btn_sign_up">Зарегистрироваться</button>
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
    this.$store.commit("SETProducts");
  },
  methods: {
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
    openSlider: function () {
      this.$router.push("/slider");
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
  box-shadow: 0 0px, 0 -0.5px, -0.5px 0, 1px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.header_details_img {
  width: 70%;
  margin: 25px 5px 5px 50px;
}

.header_details_nav {
  width: 75%;
  margin-left: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.header_details_nav_a {
  margin: 20px 15px 10px 15px;
  width: 270px;
  height: 30px;
  font-size: 18px;
  color: black !important;
  text-align: center;
}

.header_details_nav_a:hover {
  color: rgb(99, 170, 40) !important;
}

.header_details_basket_img {
  width: 25px;
  margin-top: 5px;
  margin-right: 5px;
  color: darkseagreen;
}

.header_details_basket button {
  height: 30px;
  width: 140px;
  margin-top: 20px;
  border-radius: 2px;
  font-size: 14px;
  vertical-align: middle;
  background-color: rgb(141, 206, 157);
}

.header_details_basket button:hover {
  color: white;
}

.search_and_sign {
  width: 70%;
  height: 40px;
  margin-left: 20px;
}

.header_details_search {
  width: 60%;
  /* height: 30px; */
  transition: width 0.4s ease-in-out;
  font-size: 18px;
  padding: 5px;
  border: 1px solid grey;
  border-radius: 4px;
  margin-left: 30px;
}

.header_details_search:focus {
  width: 90%;
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
  margin-right: 10px;
  background: rgb(141, 206, 157);
  color: rgba(0, 0, 0, 0.9);
}
.close_form_sign_in {
  display: none;
}
.btn_sign_up {
  width: 150px;
  height: 30px;
  border-radius: 2px;
  font-size: 14px;
  background: rgb(141, 206, 157);
  color: black;
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
  margin-right: 10px;
  font-size: 14px;
  background: orange;
  color: black;
}

.sign_in_overlay {
  position: absolute;
  width: 100%;
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
  top: 20px;
  right: 30px;
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

.sign_up_overlay {
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
.sign_up_overlay:target {
  visibility: visible;
  opacity: 1;
}

.sign_up_popup {
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 20%;
  position: relative;
  transition: all 5s ease-in-out;
}

.sign_up_popup h2 {
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}

.sign_up_close {
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}

.sign_up_close:hover {
  color: #06d85f;
}

.form_sign_up_input {
  width: 200px;
  height: 40px;
  margin-bottom: 10px;
  border: 1px solid black;
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
</style>
