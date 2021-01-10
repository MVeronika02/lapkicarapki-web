<template>
  <div class="main_content">
    <div class="content_wrapper">
      <div
        class="product_unit"
        v-for="allProduct in $store.state.allProducts"
        :key="allProduct.id_product">
        <div class="product_unit_info" @click="goDetails(allProduct.id_product)">
          <p class="product_unit_name">{{ allProduct.name_product }}</p>
          <img :src="imageProduct(allProduct.url_image_product)" class="product_unit_img" />
          <p>Цена: {{ allProduct.price_product }}</p>
        </div>
        <button class="btn_add_basket" @click="addToBasket(allProduct)">Добавить в корзину</button>
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
  name: "homeProducts",
  data() {
    return {
      page: 1,
    };
  },
  // mounted() {console.log(this.$store.state.allProducts, 'homeProducts')},
  computed: mapState(["allProducts"]),
  created() {
    this.$store.dispatch("getProductsOnPage", 1);
    this.$router.push({ name: "homeProducts", params: {pageNumber: 1} })
  },
  methods: {
    imageProduct(imagePath) {
      return require(`../static/${imagePath}`);
    },
    goDetails(idProductLocal) {
      this.$router.push({ name: "detailsProduct", params: { idProduct: idProductLocal } });
    },
    addToBasket(allProduct) {
      this.$store.commit("SETProductToBasket", allProduct);
    },
    showPage(page) {
      this.$router.push({ name: "homeProducts", params: {pageNumber: page} })
      this.$store.dispatch("getProductsOnPage", page);
    },
  },
};
</script>

<style>
.main_content {
  height: 100%;
  padding: 10px 5px 0px 5px;
  background: rgb(230, 230, 250, 0.95);
  box-shadow: 0 0px, 0 1px, -1px 0, 1px 0;
}
.content_wrapper {
  width: 85%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom:30px;
  margin-left: 130px;
}

.product_unit {
  height: 355px;
  width: 250px;
  margin-top: 12px;
  padding-top: 10px;
  box-shadow: 0 0 5px;
  border-radius: 2px;
  background: rgb(141, 206, 157);
  text-align: center;
}

.product_unit_info {
  height: 300px;
  width: 250px;
  text-align: center;
}

.product_unit_name {
  height: 40px;
  margin-bottom: 10px !important;
}

.product_unit_img {
  height: 210px;
  width: 210px;
  margin-bottom: 2px;
  border-radius: 4px;
}

.btn_add_basket {
  height: 30px;
  width: 180px;
}

.btn_add_basket:hover {
  background: rgb(33, 147, 90);
}

.product_unit:hover {
  box-shadow: 0 0 10px rgb(34, 33, 33);
  border-radius: 4px;
}

</style>