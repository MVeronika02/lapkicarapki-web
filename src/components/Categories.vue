<template>
<div class="content_categories">
  <div class="categories_block" >
    <ul class="categories_block_ul">
      <li v-for="allCategory in $store.state.filterCategoryOneAnimal" :key="allCategory.id_category" @click="toProductsCategory(allCategory.id_category)" class="categories_block_li">
          <div class="categories_block_name"><h3>{{ allCategory.name_category }}</h3></div>
          <img :src="imageCategory(allCategory.url_image_category)" class="categories_block_img"/>
      </li> 
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'categories',
  data () {
    return {
      productCategory: this.$route.params.Products,
      allCateegoriesAnimal: {}
    }
  },
  // mounted() {
  //   this.$store.commit("saveIdAnimal");
  // },
  methods:  {
    imageCategory(imagePath) {
      return require(`../static/categoryImg/${imagePath}`);
    },
    toProductsCategory(idCategory) {
      this.$router.push({ name: "productsCategory", params: {idSubCategory: idCategory } })
    }
  }
}
</script>
<style>

.content_categories {
  background: rgb(230, 230, 250, 0.95);
  display: flex;
  flex-direction: row;
}


.categories_block_ul {
  width: 80%;
  margin: 20px 0 0 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.categories_block_li {
  list-style-type: none;
  width: 280px;
  height: 300px;
  border-radius: 3px;
  margin: 10px 0 20px 20px;
  text-align: center;
}

.categories_block_name {
  font-size: 14px;
  height: 30px;
  background: rgb(141, 206, 157);
}

.categories_block_name:hover {
  background: rgb(53, 167, 110);
}

.categories_block_img {
  width: 280px;
  height: 250px;
}


</style>