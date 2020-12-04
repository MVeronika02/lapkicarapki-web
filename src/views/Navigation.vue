<template>
  <div class="nav_block">
    <!-- <nav class="main_nav"> -->
      <ul class="main_nav_btn_list">
        <li
          v-for="animal in animals"
          :key="animal.key"
          class="main_nav_btn_list_item"
          @mouseover="allCategoryAnimals(animal.key)"
          @click="categoriesForOneAnimal(animal.key);">
          <a class="main_nav_btn_list_item_a">{{ animal.name }}</a>
          <ul class="main_nav_btn_list_item_dropdown">
            <li v-for="allCategory in $store.state.filtredCategory" :key="allCategory.id_category">
              <a class="main_nav_btn_list_item_dropdown_a">{{ allCategory.name_category }}</a>
            </li>
          </ul>
        </li>
      </ul>
    <!-- </nav> -->

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
    // this.$store.commit("SETProducts");
    this.$store.commit("saveIdAnimal");
    this.$store.dispatch("SETCategory");
  },
  methods: {
    allCategoryAnimals: function (idAnimal) {
      this.$store.commit("filterCategory", idAnimal);
    },
    categoriesForOneAnimal: function (idAnimal) {
      this.$router.push({ name: "categories", params: { idAnimal: idAnimal } })
      this.$store.commit("filterCategoryOneAnimal", idAnimal);
    }
  },
};
</script>

<style>

.nav_block {
  height: 50px;
  box-shadow: -1px 0, 0px 0px, 0px 0, 1px 0;
  background-color: var(--main-bg-color-nav);
}

:root {
  --main-bg-color-nav: rgb(141, 206, 157);
}

.main_nav_btn_list {
  width: 100%;
  height: 50px;
  position: relative;
  text-align: center;
  box-shadow: 0 -8px rgb(20, 163, 91) inset;
  transition: 0.2s;
}
.main_nav_btn_list_item {
  display: inline-block;
  background-color: var(--main-bg-color-nav);
  width: 200px;
  height: 50px;
  padding-top: 10px;
  box-shadow: 0 -8px rgb(20, 163, 91) inset;
  transition: 0.2s;
}

.main_nav_btn_list_item:hover {
  background-color: rgb(33, 147, 90);
  box-shadow: 1px 1px 1px rgb(12, 12, 12) inset;
}

.main_nav_btn_list_item_dropdown {
  display: none;
  background: rgb(33, 147, 90);
  border-radius: 2px;
  box-shadow: 1px -1px 0px rgb(34, 33, 33) inset;
  list-style-type: none;
  width: 300px;
  position: absolute;
  height: 350px;
  z-index: 99999;
  align-items: space-between;
  text-align: left;
}

.main_nav_btn_list_item_dropdown > li{
  /* margin: 10px 0; */
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

.main_nav_btn_list_item .main_nav_btn_list_item_dropdown {
  display: none;
}

.main_nav_btn_list_item:hover .main_nav_btn_list_item_dropdown {
  display: block;
  top: 100%;
  left: auto;
}


/* .main_nav_btn_list_item:hover .main_nav_btn_list_item_dropdown {
  position: absolute;
  display: block;
  top: 100%;
  left: auto;
}

.main_nav_btn_list > li:nth-child(6) .main_nav_btn_list_item_dropdown {
  left: auto;
} */

</style>
