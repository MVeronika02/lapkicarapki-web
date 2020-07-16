<template>
<div class="details-container">
  <div class="detailsProd">
    <div v-for="allProduct in $store.state.allProducts" :key="allProduct.idProduct" class="allStyle">
      <div v-if="prodId == allProduct.idProduct" class="styleInfo">
        <div class="styleImage">
          <img :src="imageProduct(allProduct.urlImageProduct)" width="400px" height="400px">
        </div>
        <div class="styleP">
          <p class="nameProduct"><span class="nubex1">{{ allProduct.nameProduct }}</span></p>
          <div class="infoHeader">
            <v-btn class="iconHeart">
              <i class="fab fa-gratipay"></i>
              <span>Отложить</span>
            </v-btn>
            <v-btn class="iconHeart">
              <i class="fas fa-sync-alt"></i>
              <span>Сравнить</span>
            </v-btn>
            <v-btn class="iconHeart">
              <i class="fas fa-share-alt-square"></i>
              <span>Купить</span>
            </v-btn>
          </div>

          <p class="stylePrice"><span class="nubex2">{{ allProduct.priceProduct }} тг</span></p>
          <div class="btn-basket">
            <v-btn class="btn-basketclick">Добавить в корзину</v-btn>
          </div>
        </div>

        <div class="cardDetails">
            <v-card>
              <v-tabs
                v-model="tab"
                background-color="deep-purple accent-4"
                started
                dark
              >
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#tab-1">
            Описание товара
          </v-tab>

          <v-tab href="#tab-2">
            Характеристики
          </v-tab>

          <v-tab href="#tab-3">
            Отзывы
          </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item id="tab-1">
              <v-card flat class="dopDetails">
                <v-card-text><p>{{ allProduct.descriptionProduct }}</p></v-card-text>
              </v-card>
            </v-tab-item>
            
            <v-tab-item id="tab-2">
              <v-card flat class="dopDetails">
                <v-card-text><p>Для животных</p></v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item id="tab-3">
              <v-card flat class="dopDetails">
                <v-card-text><p>Животное счастливо!</p></v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'detailsProduct',
  data () {
    return {
      prodId:this.$route.params.Pid,
      tab: null
    }
  },
  mounted () {
    this.$store.commit('SETProducts')
  },
  computed: mapState([
    'allProducts'
  ]),
  created () {
    this.$store.dispatch('SETContent')
  },
  methods: {
    imageProduct (imagePath) {
      return require(`../static/${imagePath}`)
    }
  }
}
</script>
<style>
.details-container {
  width: 100%;
  padding: 30px;
  border: 1px solid black;
  border-radius: 8px;
  box-shadow: 0 0 5px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: flex-start;
}

.detailsProd {
  width: 100%;
  margin: 0px;
  position: inherit;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: flex-start;
}

.styleInfo {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  align-items: flex-start;
}

.styleImage {
  height: 60%;
  width: 40%;
}

/* .styleImage img{
  height: 100%;
  width: 100%;
}  */

.nubex1 {
  font-weight: 600;
  font-size: 3em;
}

.nubex2 {
  font-size: 2em;
}

.styleP {
  width: 45%;
  height: 60%;
}

.styleP .nameProduct {
  margin-bottom: 0px;
}

.cardDetails {
  margin-top: 40px;
  position: relative;
  /* display: inline-block; */
  width: 100%;
}

.stylePrice {
  margin-top: 20px;
  width: 80%;
  font-size: 1.7em;
}

.btn-basket {
  width: 300px;
  height: 80px;
}

.btn-basketclick {
  width: 100%;
  border-radius: 5px;
}

.infoProduct {
  width: 100%;
}

.infoHeader {
  width: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.iconHeart {
  font-size: 1.5em;
  border: none;
  background-color: #4CAF50;
  padding: 3px 10px;
  cursor: pointer;
  text-align: center;
}

.iconHeart span {
  margin-left: 10px;
}

.iconHeart:hover {
  background: darkgray;
}

.text-center {
  width: 230px;
}

.dopDetails {
  position: relative;
  /* display: inline-block; */
  font-size: 28px;
  width: 100%;
  height: 200px;
}

.dopDetails p {
  /* position: fixed; */
  width: 100%;
  height: 100%;
  z-index: 1;
}

</style>
