<template>
<div class="content_products_category">
  <div class="content_products_category_block">
    <sidebar/>
    <div class="productsOfCategory_block">
      <ul class="productsOfCategory_ul">
        <li v-for="allProducts in $store.state.filterProductsForOneCategory" :key="allProducts.idProduct" class="productsOfCategory_ul_li">
          <p class="products_block_name">{{ allProducts.nameProduct }}</p>
          <img :src="imageProduct(allProducts.urlImageProduct)" class="product_img"/>
          <p>Цена: {{ allProducts.priceProduct }}</p>
          <button class="btn_add_basket" @click="addToBasket(allProducts)">Добавить в корзину</button>
        </li> 
      </ul>
    </div>
    <v-pagination
      v-model="page"
      class="pt-4 pb-2"
      :length="$store.state.countCategoryProductPage"
      total-visible="5"
      @input="showPage(page)"
    ></v-pagination>
  </div>
</div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'productsCategory',
  data () {
    return {
      page: 1,
      idCategory: this.$route.params.Category,
      idAnimal: this.$route.params.Animal,
      pid: this.$route.params.Pid
    }
  },
  components: {
    Sidebar
  },
  created() {
    console.log(this.idAnimal, this.idCategory, this.pid, 'tototo')
    console.log(this.$route, 'sssss')

    this.$store.dispatch("ProductsForOneCategoryPage", { page: 1, idAnimal: this.idAnimal, idCategory: this.idCategory });
  },
  mounted() {
    this.$store.commit("saveIdCategory");
  },
  methods: {
    imageProduct(imagePath) {
      return require(`../static/${imagePath}`);
    },
    addToBasket(allProducts) {
      this.$store.commit("SETProductToBasket", allProducts);
    },
    showPage(page) {
      this.$store.dispatch("ProductsForOneCategoryPage", { page: page, idAnimal: this.idAnimal, idCategory: this.idCategory });
    },
  }

}
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
  margin-bottom: 10px;
}
</style>
