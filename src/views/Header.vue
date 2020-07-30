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
        <button @click="openBasket()">ВАША КОРЗИНА ({{ $store.state.cartCount }})</button>
      </div>
      <input type="text" class="header_details_search" placeholder="Поиск.." />
    </div>

    <nav class="main_nav">
      <ul class="main_nav_btn_list">
        <li
          v-for="animal in animals"
          :key="animal.key"
          class="main_nav_btn_list_item"
          @mouseover="allCategoryAnimals(animal.key)"
          @click="goToCategories(animal.key); categoriesForOneAnimal(animal.key)"
        >
          <a>{{ animal.name }}</a>
          <ul class="main_nav_btn_list_item_dropdown">
            <li v-for="allCategory in $store.state.filtredCategory" :key="allCategory.idCategory">
              <a>{{ allCategory.nameCategory }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
    };
  },
  mounted() {
    this.$store.commit("SETProducts");
    this.$store.dispatch("SETCategory");
  },
  methods: {
    allCategoryAnimals: function (idAnimal) {
      // console.log(idAnimal, "////////");
      this.$store.commit("filterCategory", idAnimal);
    },
    categoriesForOneAnimal: function (idAnimal) {
      this.$store.commit("filterCategoryOneAnimal", idAnimal);
    },
    goToCategories: function (idAnimal) {
      this.$router.push({ name: "categories", params: { Pid: idAnimal } });
    },
    openBasket: function () {
      this.$router.push({ name: "Basket" });
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

.header_details_search {
  width: 60%;
  height: 50px;
  transition: width 0.4s ease-in-out;
  font-size: 18px;
  padding: 5px;
  border: 1px solid #ddd;
  margin-top: 20px;
}

.header_details_search:focus {
  width: 80%;
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

.main_nav_btn_list_item_dropdown li {
  margin-bottom: 10px;
  color: black !important;
  
}

.main_nav_btn_list_item_dropdown li > a{
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

.main_nav_btn_list>li:nth-child(6) .main_nav_btn_list_item_dropdown {
  left: auto;
}

</style>
