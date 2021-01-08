<template>
<div class="content_categories">
  <div class="categories_block" >
    <ul class="categories_block_ul">
      <li 
        class="categories_block_li"
        v-for="allCategory in $store.state.filterCategoryOneAnimal" 
        :key="allCategory.id_category" 
        @click="toProductsCategory(allCategory.id_category)" 
      >
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
    return {}
  },
  methods:  {
    imageCategory(imagePath) {
      return require(`../static/categoryImg/${imagePath}`);
    },
    toProductsCategory(idCategory) {
      this.$router.push({ name: "productsCategory", params: {idCategory: idCategory, pageNumber: 1} })
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
  margin: 20px 0 0 160px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.categories_block_li {
  list-style-type: none;
  width: 280px;
  height: 330px;
  border-radius: 3px;
  box-shadow: 0 0 5px;
  margin: 10px 0 20px 60px;
  text-align: center;
}

.categories_block_li:hover {
  box-shadow: 0 0 8px rgb(34, 33, 33);
  border-radius: 2px;

}

.categories_block_name {
  font-size: 14px;
  height: 50px;
  padding-top: 10px;
  background: rgb(141, 206, 157);
  text-align: center;
  cursor: default;
}

.categories_block_name:hover {
  background: rgb(53, 167, 110);
}

.categories_block_img {
  width: 280px;
  height: 270px;
}


</style>