<template>
<div class="content_categories">
  <sidebar/>
  <div class="categories_block" >
    <ul class="categories_block_ul">
      <li v-for="allCategory in $store.state.filterCategoryOneAnimal" :key="allCategory.id_category" class="categories_block_li">
          <p class="categories_block_name">{{ allCategory.name_category }}</p>
          <img :src="imageCategory(allCategory.url_image_category)" class="categories_block_img"/>
      </li> 
    </ul>
  </div>
</div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
export default {
  name: 'categories',
  data () {
    return {
      prodCategory: this.$route.params.Pid,
      allCateegoriesAnimal: {}
    }
  },
  components: {
    Sidebar
  },
  methods:  {
    imageCategory(imagePath) {
      return require(`../static/categoryImg/${imagePath}`);
    },
  }
}
</script>
<style>

.content_categories {
  background: rgb(230, 230, 250, 0.95);
  display: flex;
  flex-direction: row;
}

/* .categories_block {
  width: 85%;
} */

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
  width: 40%;
  height: 330px;
  border-radius: 3px;
  /* border-width: 1.5px;
  border-style: ridge; */
  margin: 10px 0 20px 20px;
  text-align: center;
  background: rgb(188, 208, 209);
}

.categories_block_name {
  font-size: 22px;
  margin: 5px 0px 15px 0;
}

.categories_block_img {
  width: 280px;
  height: 250px;
}


</style>