<template>
  <div class="nav_block">
    <ul class="main_nav_btn_list">
      <li
        v-for="animal in animals"
        :key="animal.key"
        class="main_nav_btn_list_item"
        @mouseover="allCategoryAnimals(animal.key)"
      >
        <div
          class="main_nav_btn_list_item_block"
          v-on:click="categoriesForOneAnimal(animal.key)"
        >
          <a class="main_nav_btn_list_item_a">{{ animal.name }}</a>
        </div>
        <ul class="main_nav_btn_list_item_dropdown">
          <li
            v-for="allCategory in $store.state.filtredCategory"
            :key="allCategory.id_category"
          >
            <div
              class="main_nav_btn_list_item_dropdown_block"
              v-on:click="
                toProductsCategory(allCategory.id_category, animal.key)
              "
            >
              <a class="main_nav_btn_list_item_dropdown_block_a">{{
                allCategory.name_category
              }}</a>
            </div>
          </li>
        </ul>
      </li>
    </ul>
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
      ],
    };
  },

  mounted() {
    this.$store.dispatch("getCategories");
  },

  methods: {
    allCategoryAnimals: function (idAnimal) {
      this.$store.commit("filterCategory", idAnimal);
    },

    categoriesForOneAnimal: function (idAnimalLocal) {
      this.$router.push({
        name: "animal",
        params: { idAnimal: idAnimalLocal },
      });
      this.$store.commit("filterCategoryOneAnimal", idAnimalLocal);
    },

    toProductsCategory(idCategoryLocal, idAnimalLocal) {
      this.$router.push({
        name: "productsCategory",
        params: {
          idCategory: idCategoryLocal,
          idAnimal: idAnimalLocal,
          pageNumber: 1,
        },
      });
    },
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
  padding-top: 0px;
  box-shadow: 0 -8px rgb(20, 163, 91) inset;
  transition: 0.2s;
}

.main_nav_btn_list_item:hover {
  background-color: rgb(33, 147, 90);
  box-shadow: 1px 1px 1px rgb(12, 12, 12) inset;
}

.main_nav_btn_list_item_block {
  height: 50px;
  padding-top: 10px;
}

.main_nav_btn_list_item_a {
  color: black !important;
  cursor: default !important;
}

.main_nav_btn_list_item_dropdown {
  display: none;
  background: rgb(33, 147, 90);
  border-radius: 2px;
  box-shadow: 1px -1px 0px rgb(34, 33, 33) inset;
  list-style-type: none;
  width: 270px;
  position: absolute;
  height: auto;
  z-index: 99999;
  align-items: space-between;
  text-align: left;
  padding: 0 !important;
}

.main_nav_btn_list_item_dropdown > li {
  height: 50px;
}

.main_nav_btn_list_item_dropdown > li:hover {
  background-color: var(--main-bg-color-nav);
}
.main_nav_btn_list_item_dropdown_block {
  width: 100%;
  height: 100%;
  padding-left: 24px;
  padding-top: 15px;
}

.main_nav_btn_list_item_dropdown_block_a {
  color: black !important;
  cursor: default !important;
}

.main_nav_btn_list_item .main_nav_btn_list_item_dropdown {
  display: none;
}

.main_nav_btn_list_item:hover .main_nav_btn_list_item_dropdown {
  display: block;
  top: 100%;
  left: auto;
}
</style>
