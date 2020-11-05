<template>
  <div class="contentProduct">
    <div id="content-main" class="contentGroup">
      <ul class="content_allProducts">
        <li v-for="allProduct in $store.state.filtredProductData" :key="allProduct.idProduct">
          <div class="oneProduct">
            <div @click="goDetails(allProduct.idProduct); closeSidebar();">
              <p>{{ allProduct.nameProduct }}</p>
              <img
                :src="imageProduct(allProduct.urlImageProduct)"
                height="70%"
              />
              <p>Цена: {{ allProduct.priceProduct }}</p>
            </div>
            <button @click="addToBasket(allProduct)">Добавить в корзину</button>
          </div>
        </li>
      </ul>
    </div>

    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                v-model="page"
                class="my-4"
                :length="length"
                total-visible="5"
                @input="getFilterValues(page)"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "filtredProducts",
  data() {
    return {
      page: 1,
      length: 5,
    };
  },
  mounted() {},
  computed: mapState(["allProducts"]),
  created() {},
  methods: {
    imageProduct(imagePath) {
      return require(`../static/${imagePath}`);
    },
    goDetails(idProduct) {
      this.$router.push({ name: "detailsProduct", params: { Pid: idProduct } });
    },
    closeSidebar() {
      document.getElementById("sidebar").className = "sidebarClose";
      document.getElementById("mainPage").className = "newMainPage";
    },
    addToBasket(allProduct) {
      this.$store.commit("SETProductToBasket", allProduct);
    },
    getFilterValues: function (pageproduct) {
      console.log(this.$store.state.valueMin);
      console.log(this.$store.state.valueMax);
      this.$store.dispatch("ProductsFilter", {
        min: this.$store.state.valueMin,
        max: this.$store.state.valueMax,
        page: pageproduct,
      });
    },
  },
};
</script>

<style>
</style>