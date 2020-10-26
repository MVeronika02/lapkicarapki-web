<template>
<div class="contentCategories">
  <!-- <div> -->
    <sidebar/>
  <!-- </div> -->
  <h2>Товары для </h2>
  <div class="block-content">
    <ul>
      <li v-for="allCategory in $store.state.filterCategoryOneAnimal" :key="allCategory.idCategory">
        <div class="categories">
          <a>{{ allCategory.nameCategory }}</a>
        </div>
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
      
  }
//   mounted () {
//     Axios.get('http://localhost:5000/categoryanimal?id=' + this.$route.params.Pid)
//       .then(categories => {
//         this.allCateegoriesAnimal = categories.data.result[0]
//         console.log(this.allDetailProduct, '555555')
//       })
//   },
}
</script>
<style>

.contentCategories {
  background: rgb(230, 230, 250, 0.95);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  align-items: flex-start;
}

.block-content {
  width: 85%;
  height: 1700px;
}

.block-content ul {
  width: 100%;
  height: 1700px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-around;
  align-items: flex-start;
}

.categories {
  width: 100%;
  height: 500px;
}

.block-content li {
  list-style-type: none;
  width: 40%;
  height: 300px;
  border-width: 2px;
  border-style: ridge;
  margin-left: 20px;
}
</style>