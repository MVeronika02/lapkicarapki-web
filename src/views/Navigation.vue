<template>
  <div class="nav_block">
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import Axios from "axios";

export default {
  name: "Navigation",
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
      ]
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
    }
  },
};
</script>

<style>

.nav_block {
  height: 50px;
  box-shadow: -1px 0, 0px 0.5px, -0.5px 0, 1px 0;
}

:root {
  --main-bg-color-nav: rgb(19, 138, 49);
}

.main_nav {
  width: 100%;
  background-color: var(--main-bg-color-nav);
}
.main_nav_btn_list {
  /* position: relative; */
  text-align: center;
}
.main_nav_btn_list_item {
  /* position: static; */
  display: inline-block;
  background-color: var(--main-bg-color-nav);
  width: 150px;
  height: 50px;
  padding-top: 10px;
}

.main_nav_btn_list_item_dropdown {
  display: none;
  background-color: rgb(99, 170, 40);
  list-style-type: none;
  width: 900px;
  position: absolute;
  height: 300px;
  z-index: 99999;
  /* margin-left: -200px; */
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
  background-color: rgb(99, 170, 40);
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
  margin-bottom: 10px;
  border: 1px solid black;
}
/* 
.btn_sign_in {
  width: 150px;
  height: 30px;
  border-radius: 2px;
  font-size: 16px;
  background: orange;
} */

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
  /* margin: 10px 0px; */
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


</style>
