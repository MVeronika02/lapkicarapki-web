<template>
  <div class="header_details">
    <a href="/" height="190px">
      <img src="../assets/img/logo.jpeg" class="header_details_img" />
    </a>
    <div class="header_details_nav">
      <a class="header_details_nav_a">ДОСТАВКА И ОПЛАТА</a>
      <a class="header_details_nav_a">КОНТАКТЫ</a>
      <a class="header_details_nav_a">НАШИ АДРЕСА</a>

      <div class="header_details_basket">
        <i class="fas fa-cart-arrow-down"></i>
        <button @click="openBasket()">
          ВАША КОРЗИНА ({{ $store.state.cartCount }})
        </button>
      </div>

      <div class="search_and_sign">
        <input
          type="text"
          class="header_details_search"
          placeholder="Поиск.."
        />

        <div class="sign_in">
          <a href="#sign_in_wrapper">
            <button class="btn_sign_in">Войти</button>
          </a>
          <a href="#sign_up_wrapper">
            <button class="btn_sign_up">Регистрация</button>
          </a>
        </div>
      </div>
    </div>

    <nav class="main_nav">
      <ul class="main_nav_btn_list">
        <li
          v-for="animal in animals"
          :key="animal.key"
          class="main_nav_btn_list_item"
          @mouseover="allCategoryAnimals(animal.key)"
          @click="
            goToCategories(animal.key);
            categoriesForOneAnimal(animal.key);
          "
        >
          <a class="main_nav_btn_list_item_a">{{ animal.name }}</a>
          <ul class="main_nav_btn_list_item_dropdown">
            <li
              v-for="allCategory in $store.state.filtredCategory"
              :key="allCategory.idCategory"
            >
              <a class="main_nav_btn_list_item_dropdown_a">{{
                allCategory.nameCategory
              }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <div id="sign_in_wrapper" class="sign_in_overlay">
      <div class="sign_in_popup">
        <a class="sign_in_close" href="#" @click="$emit('close')">&times;</a>
        <form id="form_sign_in" method="get" @submit.prevent="userLogin">
          <h2>Форма входа</h2>
          <div>
            <input
              type="text"
              placeholder="*Логин"
              required
              class="form_sign_in_input"
              v-model="info.login"
            />
            <br />
            <input
              type="password"
              placeholder="*Пароль"
              required
              class="form_sign_in_input"
              v-model="info.password"
            />

            <!-- <input
              type="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Не менее восьми символов, содержащих хотя бы одну цифру и символы из верхнего и нижнего регистра"
              placeholder="*Пароль"
              required
              class="form_sign_in_input"
            /> -->
          </div>

          <!-- <input type="submit" value="Войти в аккаунт" class="btn_sign_in" @click="openLogin()" /> -->
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
            <input
              type="text"
              placeholder="*Имя"
              required
              class="form_sign_up_input"
            />
            <br />
            <input
              type="tel"
              placeholder="*Номер телефона"
              required
              class="form_sign_up_input"
            />
            <br />
            <input
              type="email"
              pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
              placeholder="*Электронная почта"
              required
              class="form_sign_up_input"
            />
            <br />
            <input
              type="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Не менее восьми символов, содержащих хотя бы одну цифру и символы из верхнего и нижнего регистра"
              placeholder="*Пароль"
              required
              class="form_sign_up_input"
            />
          </div>

          <input type="submit" value="Регистрация" class="btn_sign_up" />
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
      animals: [
        { key: 1, name: "Собаки" },
        { key: 2, name: "Кошки" },
        { key: 3, name: "Птицы" },
        { key: 4, name: "Рыбы" },
        { key: 5, name: "Насекомые" },
        { key: 6, name: "Грызуны" },
      ],
      info: {
        login: "",
        password: "",
      },
      userData: {
        user_name: "",
        user_tel: "",
        user_email: "",
        user_password: "",
      },
    };
  },
  mounted() {
    this.$store.commit("SETProducts");
    this.$store.dispatch("SETCategory");
  },
  methods: {
    allCategoryAnimals: function (idAnimal) {
      this.$store.commit("filterCategory", idAnimal);
    },
    categoriesForOneAnimal: function (idAnimal) {
      this.$store.commit("filterCategoryOneAnimal", idAnimal);
    },
    goToCategories: function (idAnimal) {
      this.$router.push({ name: "categories", params: { Pid: idAnimal } });
    },
    openBasket: function () {
        let config = {
        headers: {},
      }
      if (localStorage.getItem("key") != 'undefined') {
          config.headers = {TOKEN:  localStorage.getItem("key")}
      }
      Axios.get(
        "http://localhost:5000/check_access",
        config
      ).then((response) => {
        console.log(response.data, " key2");
        if (response.data.success == true) {
          this.$router.push("/basket");
        } else {
          alert("Вам необходимо зарегистрироваться");
        }
      }),
        (error) => {
          console.log(error);
        };
    },
    recordUser(event) {
      console.log(this.content);
      Axios.post("http://localhost:5000/registration", this.userData).then(
        (response) => {
          console.log(response);
        }
      ),
        (error) => {
          console.log(error);
        };
    },
    userLogin(event) {
      console.log(this.info, " login");
      this.$store
        .dispatch("UserLogin", this.info)
        .then(() => this.$router.push("/login"));
    },
  },
};
</script>

<style>
.header_details {
  height: 250px;
  margin: auto;
  background: rgb(230, 230, 250, 0.95);
  border-radius: 2px 2px 0px 0px;
  box-shadow: 0 0px, 0 -0.5px, -0.5px 0, 1px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.header_details_img {
  border-radius: 3px;
  margin: 5px 50px 5px 5px;
}

.header_details_nav {
  width: 70%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.header_details_nav_a {
  margin: 15px;
  width: 270px;
  font-size: 22px;
  color: green !important;
  text-align: center;
}

.header_details_basket {
  width: 200px;
  height: 50px;
  margin-top: 20px;
}

.header_details_basket i {
  color: darkseagreen;
  font-size: 26px;
}

.header_details_basket button {
  height: 50px;
  width: 160px;
  margin-left: 10px;
  padding: 5px;
  background-color: darkseagreen;
}

.header_details_basket button:hover {
  color: white;
}

.search_and_sign {
  width: 100%;
}

.header_details_search {
  width: 40%;
  height: 50px;
  transition: width 0.4s ease-in-out;
  font-size: 18px;
  padding: 5px;
  border: 1px solid grey;
  border-radius: 4px;
}

.header_details_search:focus {
  width: 60%;
}

.sign_in {
  float: right;
}

.btn_sign_in {
  width: 60px;
  height: 30px;
  border-radius: 5px;
  background: orange;
  color: rgba(0, 0, 0, 0.7);
}

.btn_sign_up {
  width: 120px;
  height: 30px;
  border-radius: 5px;
  background: green;
  margin-left: 10px;
  color: rgba(0, 0, 0, 0.7);
}

:root {
  --main-bg-color-nav: rgb(19, 138, 49);
}

.main_nav {
  width: 100%;
  background-color: var(--main-bg-color-nav);
}
.main_nav_btn_list {
  position: relative;
  text-align: center;
}
.main_nav_btn_list_item {
  display: inline-block;
  background-color: var(--main-bg-color-nav);
  width: 150px;
  height: 50px;
  padding-top: 10px;
}

.main_nav_btn_list_item_dropdown {
  display: none;
  background-color: darkorange;
  list-style-type: none;
  width: 400px;
  height: 300px;
  text-align: left;
}

.main_nav_btn_list_item_dropdown_a {
  margin-bottom: 10px;
  color: black !important;
}

.main_nav_btn_list_item_a {
  color: black !important;
}

.main_nav_btn_list_item:hover {
  background-color: darkorange;
}

.main_nav_btn_list_item .main_nav_btn_list_item_dropdown {
  display: none;
}

.main_nav_btn_list_item:hover .main_nav_btn_list_item_dropdown {
  position: absolute;
  display: block;
  top: 100%;
  left: auto;
}

.main_nav_btn_list_item:hover .main_nav_btn_list_item_dropdown {
  position: absolute;
  display: block;
  top: 100%;
  left: auto;
}

.main_nav_btn_list > li:nth-child(6) .main_nav_btn_list_item_dropdown {
  left: auto;
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
}

.sign_in_popup {
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 20%;
  position: relative;
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
  margin: 10px 0px;
  border: 1px solid black;
}

.btn_sign_in {
  width: 150px;
  height: 30px;
  border-radius: 2px;
  font-size: 16px;
  background: orange;
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
  margin: 10px 0px;
  border: 1px solid black;
}

.btn_sign_up {
  width: 150px;
  height: 30px;
  border-radius: 2px;
  font-size: 16px;
  background: orange;
}
</style>
