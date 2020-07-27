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
        <button @click="openBasket(); closeSidebar()">ВАША КОРЗИНА ({{ $store.state.cartCount }})</button>
      </div>
      <input type="text" class="header_details_search" placeholder="Поиск.." />
    </div>

    <div class="header_details_btn_animals">
      <div class="btn_animals_dropdown">
        <button
          type="button"
          class="btn_animals_one"
          @mouseover="allCategoryAnimals(1)"
          @click="goToCategories(1); categoriesForOneAnimal(1)"
        >Собаки</button>
        <ul class="btn_animals_dropdown_content">
          <li v-for="allCategory in $store.state.filtredCategory" :key="allCategory.idCategory">
            <a>{{ allCategory.nameCategory }}</a>
          </li>
        </ul>
      </div>

      <div class="btn_animals_dropdown">
        <button
          type="button"
          class="btn_animals_one"
          @mouseover="allCategoryAnimals(2)"
          @click="goToCategories(2); categoriesForOneAnimal(2)"
        >Кошки</button>
        <ul class="btn_animals_dropdown_content">
          <li v-for="allCategory in $store.state.filtredCategory" :key="allCategory.idCategory">
            <a>{{ allCategory.nameCategory }}</a>
          </li>
        </ul>
      </div>

      <div class="btn_animals_dropdown">
        <button
          type="button"
          class="btn_animals_one"
          @mouseover="allCategoryAnimals(3)"
          @click="goToCategories(3); categoriesForOneAnimal(3)"
        >Птицы</button>
        <ul class="btn_animals_dropdown_content">
          <li v-for="allCategory in $store.state.filtredCategory" :key="allCategory.idCategory">
            <a>{{ allCategory.nameCategory }}</a>
          </li>
        </ul>
      </div>

      <div class="btn_animals_dropdown">
        <button
          type="button"
          class="btn_animals_one"
          @mouseover="allCategoryAnimals(4)"
          @click="goToCategories(4); categoriesForOneAnimal(4)"
        >Рыбы</button>
        <ul class="btn_animals_dropdown_content">
          <li v-for="allCategory in $store.state.filtredCategory" :key="allCategory.idCategory">
            <a>{{ allCategory.nameCategory }}</a>
          </li>
        </ul>
      </div>

      <div class="btn_animals_dropdown">
        <button
          type="button"
          class="btn_animals_one"
          @mouseover="allCategoryAnimals(5)"
          @click="goToCategories(5); categoriesForOneAnimal(5)"
        >Насекомые</button>
        <ul class="btn_animals_dropdown_content_insects">
          <li v-for="allCategory in $store.state.filtredCategory" :key="allCategory.idCategory">
            <a>{{ allCategory.nameCategory }}</a>
          </li>
        </ul>
      </div>

      <div class="btn_animals_dropdown">
        <button
          type="button"
          class="btn_animals_one"
          @mouseover="allCategoryAnimals(6)"
          @click="goToCategories(6); categoriesForOneAnimal(6)"
        >Грызуны</button>
        <ul class="btn_animals_dropdown_content_rodents">
          <li v-for="allCategory in $store.state.filtredCategory" :key="allCategory.idCategory">
            <a>{{ allCategory.nameCategory }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Header",
  components: {},
  data() {
    return {};
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
  margin-left: 5px;
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

.header_details_btn_animals {
  width: 100%;
  background-color: darkseagreen;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  box-shadow: 0 0 5px;
  /* margin-left: 140px; */
}

.btn_animals_one {
  width: 200px;
  height: 55px;
  background-color: darkseagreen;
  color: white;
  padding: 6px;
  font-size: 16px;
}

.btn_animals_one:hover {
  background-color: orange;
}

.btn_animals_one:active {
  border-radius: 10%;
  background-color: orange;
}

.btn_animals_dropdown_content {
  position: fixed;
  z-index: 10;
  display: none;
  background-color: orange;
  width: 650px;
  height: 220px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.btn_animals_dropdown_content:hover > .btn_animals_one {
  background-color: orange;
}

.btn_animals_dropdown_content li {
  width: 200px;
  margin-bottom: 5px;
  font-size: 20px;
  display: block;
  list-style-type: none;
}

.btn_animals_dropdown:hover .btn_animals_dropdown_content {
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.btn_animals_dropdown:hover .btn_animals_one {
  background-color: orange;
}

.btn_animals_dropdown_content_insects {
  position: fixed;
  z-index: 10;
  display: none;
  background-color: orange;
  width: 650px;
  height: 220px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  right: 515px;
}

.btn_animals_dropdown_content_insects li {
  display: block;
  list-style-type: none;
  margin-bottom: 5px;
  font-size: 20px;
}

.btn_animals_dropdown:hover .btn_animals_dropdown_content_insects {
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.btn_animals_dropdown_content_rodents {
  position: fixed;
  z-index: 10;
  display: none;
  background-color: orange;
  width: 650px;
  height: 220px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  right: 300px;
}

.btn_animals_dropdown_content_rodents li {
  display: block;
  list-style-type: none;
  margin-bottom: 5px;
  font-size: 20px;
}

.btn_animals_dropdown:hover .btn_animals_dropdown_content_rodents {
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
