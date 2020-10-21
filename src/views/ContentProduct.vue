<template>
  <div class="main_content">
    <div class="content_wrapper">
      <div
        class="product_unit"
        v-for="allProduct in  $store.state.allProducts"
        :key="allProduct.idProduct"
      >
        <div class="product_unit_block" @click="goDetails(allProduct.idProduct)">
          <div class="product_unit_title">{{ allProduct.nameProduct }}</div>
          <img :src="imageProduct(allProduct.urlImageProduct)" class="product_unit_img" />
          <p>Цена: {{ allProduct.priceProduct }}</p>
        </div>

        <button class="btn_addBasket" @click="addToBasket(allProduct)">Добавить в корзину</button>
      </div>
    </div>
    <v-pagination
      v-model="page"
      class="pt-4 pb-2"
      :length="$store.state.countProductPage"
      total-visible="5"
      @input="showPage(page)"
    ></v-pagination>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Content",
  data() {
    return {
      page: 1,
    };
  },
  mounted() {},
  computed: mapState(["allProducts"]),
  created() {
    this.$store.dispatch("ProductsOnPage", 1);
  },
  methods: {
    imageProduct(imagePath) {
      return require(`../static/${imagePath}`);
    },
    goDetails(idProduct) {
      this.$router.push({ name: "detailsProduct", params: { Pid: idProduct } });
    },
    addToBasket(allProduct) {
      this.$store.commit("SETProductToBasket", allProduct);
    },
    showPage(page) {
      this.$store.dispatch("ProductsOnPage", page);
    },
  },
};
</script>

<style>
.main_content {
  height: 100%;
  margin-top: -10px;
  padding: 10px 5px 0px 5px;
  background: rgb(230, 230, 250, 0.95);
  border-radius: 2px;
  border-top-left-radius: 0%;
  border-top-right-radius: 0%;
  box-shadow: 0 0px, 0 1px, -0.5px 0, 1px 0;
}
.content_wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom:30px;
}

.product_unit_block {
  height: 290px;
  width: 240px;
}

.product_unit {
  height: 345px;
  width: 250px;
  margin-top: 12px;
  padding: 12px;
  box-shadow: 0 0 5px;
  background: rgba(20, 95, 1, 0.4);
}

.product_unit_title {
  height: 50px;
  margin-bottom: 2px;
}

.product_unit_img {
  height: 190px;
  width: 190px;
  margin-bottom: 10px;
}

.btn_addBasket {
  height: 30px;
  width: 180px;
}

.btn_addBasket:hover {
  background: chocolate;
}

.pagination_style {
  height: 90px;
}
</style>