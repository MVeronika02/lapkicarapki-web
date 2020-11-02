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
            categoriesForOneAnimal(animal.key);
          "
        >
          <a class="main_nav_btn_list_item_a">{{ animal.name }}</a>
          <ul class="main_nav_btn_list_item_dropdown">
            <li
              v-for="allCategory in $store.state.filtredCategory"
              :key="allCategory.id_category"
            >
              <a class="main_nav_btn_list_item_dropdown_a">{{
                allCategory.name_category
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
      this.$router.push({ name: "categories", params: { Pid: idAnimal } })
      this.$store.commit("filterCategoryOneAnimal", idAnimal);
    },
    // goToCategories: function (idAnimal) {
    //   this.$router.push({ name: "categories", params: { Pid: idAnimal } });
    // }
  },
};
</script>

<style>

.nav_block {
  height: 50px;
  box-shadow: -1px 0, 0px 0.5px, -0.5px 0, 1px 0;
}

:root {
  --main-bg-color-nav: rgb(141, 206, 157);;
}

.main_nav {
  /* position: relative; */
  /* z-index: 0; */
  width: 100%;
  background-color: var(--main-bg-color-nav);
}
.main_nav_btn_list {
  position: relative;
  text-align: center;
}
.main_nav_btn_list_item {
  /* position: absolute; */
  display: inline-block;
  background-color: var(--main-bg-color-nav);
  width: 200px;
  height: 50px;
  padding-top: 10px;
}

.main_nav_btn_list_item_dropdown {
  display: none;
  background: rgb(141, 206, 157);
  list-style-type: none;
  width: 300px;
  position: absolute;
  height: 350px;
  z-index: 99999;
  /* margin-left: -50px; */
  align-items: space-between;
  text-align: left;
}

.main_nav_btn_list_item_dropdown > li{
  margin: 10px 0;
}

.main_nav_btn_list_item_dropdown_a {
  margin-bottom: 30px;
  color: black !important;
}

.main_nav_btn_list_item_dropdown_a:hover {
  color:white!important;
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
  /* position: absolute; */
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

</style>
