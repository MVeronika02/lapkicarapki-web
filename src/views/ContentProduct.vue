<template>
<div>

  <div class="contentProduct">
    <div id="content-main" class="contentGroup">
      <ul class="content_allProducts">
          <li v-for="allProduct in  $store.state.allProducts" :key="allProduct.idProduct">
          <div class="oneProduct">
            <div @click="goDetails(allProduct.idProduct)">
            <p>{{ allProduct.nameProduct }}</p>
            <img :src="imageProduct(allProduct.urlImageProduct)" height="70%">
            <p>Цена: {{ allProduct.priceProduct }}</p>
            </div>
            <button @click="addToBasket(allProduct)">Добавить в корзину</button>
          </div>
        </li>
      </ul>
    </div>

    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              
              <v-pagination
                v-model="page"
                class="my-4"
                :length="length"
                total-visible="5"
                @input="showPage(page)"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>

  </div>
  
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Content',
  data () {
    return {
      page: 1,
      length: 5
    }
  },
  mounted () {},
  computed: mapState([
    'allProducts'
  ]),
  created () {
    this.$store.dispatch('ProductsOnPage', 1)

  },
  methods: {
    imageProduct (imagePath) {
      return require(`../static/${imagePath}`)
    },
    goDetails (idProduct) {
      this.$router.push({name: 'detailsProduct', params:{Pid:idProduct}})
    },
    // goDetails (idProduct) {
    //   this.$store.dispatch('DetailsContent', idProduct)
    // },
    // closeSidebar () {
    //   document.getElementById("sidebar").className = "sidebarClose"
    //   document.getElementById("mainPage").className = "newMainPage"
    // },
    addToBasket (allProduct) {
      this.$store.commit('SETProductToBasket', allProduct)
    },
    showPage (page) {
      this.$store.dispatch('ProductsOnPage', page)
    }
  }
}
</script>

<style>
.contentProduct {
  height: 1700px;
  margin: auto;
  padding: 0;
  background: rgb(230, 230, 250, 0.95);
  border-radius: 8px;
  box-shadow: 0 0 5px;
}

.contentGroup {
  width: 100%;
  height: 1500px;
  margin: 0;
  padding: 0;
  list-style: none;
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
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  list-style: none;
}

.oneProduct {
  width: 100%;
  height: 340px;
  cursor: pointer;
  padding: 20px;
}

.content_allProducts li {
  width: 20%;
  height: 340px;
  margin-bottom: 15px;
  /* padding: 20px; */
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

.content_allProducts li:hover {
  width: 20%;
  height: 350px;
  border: orange;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}

.content_allProducts li img {
  width: 80%;
  height: 70%;
  object-fit: cover;
}

.content_allProducts li p {
  margin-bottom: 5px;
}

.content-main-filter{
  top: 20%;
  height: 100%;
  position: absolute;
  display: inline;
}
</style>