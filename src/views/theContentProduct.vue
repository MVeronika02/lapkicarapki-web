<template>
  <div class="contentProduct">

      <div class="contentGroup">
        <ul class="content_allProducts">
        <li v-for="allProduct in allProducts" :key="allProduct.idproduct">
          <a>{{ allProduct.nameproduct }}</a>
          <img :src="require('@/static/' + allProduct.urlimageproduct)">
          <p>{{ allProduct.priceproduct }}</p>
          <button>Купить</button>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'thecontent',
  data () {
    return {
      // allProducts: []
    }
  },
  mounted () {
    // this.$store.dispatch('loadCategory')
    this.$store.commit('GetProducts')
    console.log(this.$store.state.allProducts)
  },
  computed: mapState([
    'allProducts'
  ]),
  methods: {

  }
}
</script>

<style>
.contentProduct {
  height: 1500px;
  margin: auto;
  padding: 0;
  background: rgb(230, 230, 250, 0.95);
  border-radius: 8px;
  box-shadow: 0 0 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
}

.contentGroup {
  width: 100%;
  height: 1500px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  list-style: none;
  /*overflow: scroll;*/
  transition: transform 0.9s;
  transform: translateX(-20px);
}

.content_allProducts {
  width: 100%;
  height: 1500px;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  /*align-content: flex-start;*/
  /*align-content: center;*/
  list-style: none;
}

.content_allProducts li {
  width: 20%;
}

.content_allProducts li img {
  width: 80%;
}
</style>
