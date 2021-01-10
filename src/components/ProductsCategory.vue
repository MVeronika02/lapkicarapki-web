<template>
  <div class="content_products_category">
    <div class="content_products_category_block">
      <sidebar />
      <div class="productsOfCategory_block">
        <ul class="productsOfCategory_ul">
          <li
            v-for="allProducts in $store.state.filterProductsForOneCategory"
            :key="allProducts.id_product"
            class="productsOfCategory_ul_li"
          >
            <div
              class="productsOfCategory_ul_li_div"
              @click="goDetails(allProducts.id_product)"
            >
              <p class="products_block_name">{{ allProducts.name_product }}</p>
              <img
                :src="imageProduct(allProducts.url_image_product)"
                class="product_img"
              />
              <p>Цена: {{ allProducts.price_product }}</p>
            </div>
            <button class="btn_add_basket" @click="addToBasket(allProducts)">
              Добавить в корзину
            </button>
          </li>
        </ul>
      </div>
      <v-pagination
        v-model="pageLocal"
        class="pt-4 pb-2"
        :length="$store.state.countCategoryProductPage"
        total-visible="5"
        @input="showPage(page)"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";

export default {
  name: "productsCategory",
  data() {
    return {
      pageLocal: 1
    };
  },
  components: {
    Sidebar,
  },
  computed: {
    routeParams() {
      return this.$route.params;
    },
  },

  watch: {
    routeParams() {
      this.$store.dispatch("getProductsForOneCategoryOnPage", {
        page: this.$route.params.pageNumber,
        idAnimal: this.$route.params.idAnimal,
        idCategory: this.$route.params.idCategory,
      });
    },
  },

  created() {
    this.$store.dispatch("getProductsForOneCategoryOnPage", {
      page: this.$route.params.pageNumber,
      idAnimal: this.$route.params.idAnimal,
      idCategory: this.$route.params.idCategory,
    });
  },

  methods: {
    imageProduct(imagePath) {
      return require(`../static/${imagePath}`);
    },
    goDetails(idProductLocal) {
      this.$router.push({
        name: "detailsProduct",
        params: { idProduct: idProductLocal },
      });
    },
    addToBasket(allProducts) {
      this.$store.commit("SETProductToBasket", allProducts);
    },
    showPage(page) {
      this.$router.push({
        name: "productsCategory",
        params: { pageNumber: page },
      });
      this.$store.dispatch("getProductsForOneCategoryOnPage", {
        page: page,
        idAnimal: this.$route.params.idAnimal,
        idCategory: this.$route.params.idCategory,
      });
    },
  },
};
</script>

<style>
.content_products_category {
  background: rgb(230, 230, 250, 0.95);
}

.content_products_category_block {
  width: 80%;
  margin-left: 160px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.productsOfCategory_block {
  width: 1000px;
  margin: 20px 0 0 100px;
  padding: 0;
}

.productsOfCategory_ul {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.productsOfCategory_ul_li {
  list-style-type: none;
  height: 365px;
  width: 250px;
  margin-bottom: 20px;
  margin-right: 50px;
  padding-top: 10px;
  box-shadow: 0 0 5px;
  border-radius: 2px;
  background: rgb(141, 206, 157);
  text-align: center;
}

.productsOfCategory_ul_li:hover {
  box-shadow: 0 0 10px rgb(34, 33, 33);
  border-radius: 4px;
}

.product_img {
  height: 200px;
  width: 240px;
  margin-bottom: 10px;
}
</style>
