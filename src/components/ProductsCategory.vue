<template>
<div class="content_products_category">
  <sidebar/>
  <div class="productsOfCategory_block">
    <ul class="productsOfCategory_ul">
      <li v-for="allProducts in $store.state.filterProductsForOneCategory" :key="allProducts.idProduct">
        <div class="products_block_name"><h3>{{ allProducts.nameProduct }}</h3></div>
        <img :src="imageProduct(allProducts.urlImageProduct)" class="product_img"/>
        <p>Цена: {{ allProducts.priceProduct }}</p>
      </li> 
    </ul>
  </div>
</div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'productsCategory',
  data () {
    return {
      prodCategory: this.$route.params.Products,
      categoryAnimal: this.$route.params.Category
    }
  },
  components: {
    Sidebar
  },
  methods: {
    imageProduct(imagePath) {
      return require(`../static/${imagePath}`);
    },
  }

}
</script>

<style>
.content_products_category {
  background: rgb(230, 230, 250, 0.95);
  display: flex;
}

.productsOfCategory_block {
  height: 500px;
}

.productsOfCategory_ul {
  height: 400px;
}

.product_img {
  height: 200px;
}
</style>
