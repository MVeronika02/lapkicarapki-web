<template>
  <div class="details_container">
    <!-- <div class="images_product_block">
    <img
      :src="imageProduct(allDetailProduct.urlImageProduct)"
      width="400px"
      height="400px"
    /> -->
    <div class="slider_product_image">

        <div class="slider_block_top">
      <VueSlickCarousel ref="c1"
        :asNavFor="$refs.c2"
        :focusOnSelect="true"
        slidesToShow: 1,
        slidesToScroll: 1
        arrows: false
        fade: true>
        <img :src="imageProduct(allDetailProduct.urlImageProduct)" />
      </VueSlickCarousel>
    </div>
    <div class="slider_block_bottom"> 
      <VueSlickCarousel
        ref="c2"
        :asNavFor="$refs.c1"
        :focusOnSelect="true"
        slidesToShow: 2,
        slidesToScroll: 1,
        centerPadding='10px'
        variableWidth:true,
        dots: true,
        autoplay: false,
        centerMode: true
        infinite: false>
        <div class="slider_block_bottom_img">
          <img
            :src="imageProduct(allDetailProduct.urlImageProduct)"
            width="80px"
            height="80px"
          />
        </div>
        <div class="slider_block_bottom_img">
          <img
            :src="imageProduct(allDetailProduct.urlImageProduct)"
            width="80px"
            height="80px"
          />
        </div>
        <div class="slider_block_bottom_img">
          <img
            :src="imageProduct(allDetailProduct.urlImageProduct)"
            width="80px"
            height="80px"
          />
        </div>
      </VueSlickCarousel>
    </div>
    </div>

    <div class="details_container_info">
      <span class="details_container_info_nameProduct">{{
        allDetailProduct.nameProduct
      }}</span>
      <div class="details_container_info_actions">
        <v-btn class="info_actions_btn">
          <i class="fab fa-gratipay"></i>
          <span>Отложить</span>
        </v-btn>
        <v-btn class="info_actions_btn">
          <i class="fas fa-sync-alt"></i>
          <span>Сравнить</span>
        </v-btn>
        <v-btn class="info_actions_btn">
          <i class="fas fa-share-alt-square"></i>
          <span>Купить</span>
        </v-btn>
      </div>

      <span class="details_container_info_price"
        >{{ allDetailProduct.priceProduct }} тг</span
      >
      <button
        class="details_container_info_btn_basket"
        @click="addToBasket(allDetailProduct)"
      >
        Добавить в корзину
      </button>
    </div>

    <div class="details_container_cards">
      <v-card>
        <v-tabs
          v-model="tab"
          background-color="green darken-3"
          color="teal lighten-5"
        >
          <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
          <v-tab href="#tab-1">Описание товара</v-tab>
          <v-tab href="#tab-2">Характеристики</v-tab>
          <v-tab href="#tab-3">Отзывы</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item id="tab-1">
            <v-card flat class="details_container_cards_content">
              <v-card-text>
                <p class="details_container_cards_content_p">
                  {{ allDetailProduct.descriptionProduct }}
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item id="tab-2">
            <v-card flat class="details_container_cards_content">
              <v-card-text>
                <p class="details_container_cards_content_p">Для животных</p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item id="tab-3">
            <v-card flat class="details_container_cards_content">
              <Reviews v-bind:product-id="allDetailProduct.idProduct" />
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import Reviews from "../components/Reviews.vue";
import { mapState } from "vuex";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "detailsProduct",
  components: {
    Reviews,
    VueSlickCarousel,
  },
  data() {
    return {
      prodId: this.$route.params.Pid,
      tab: null,
      allDetailProduct: {},
      // settings: {
      //   focusOnSelect: false,
      // },
    };
  },
  mounted() {
    Axios.get(
      "http://localhost:5000/detailsproduct?id=" + this.$route.params.Pid
    ).then((detailsOnProduct) => {
      this.allDetailProduct = detailsOnProduct.data.result[0];
    });
  },
  methods: {
    imageProduct(imagePath) {
      return require(`../static/${imagePath}`);
    },
    addToBasket(allDetailProduct) {
      this.$store.commit("SETProductToBasket", allDetailProduct);
    },
  },
};
</script>

<style>
.details_container {
  width: 100%;
  border: 1px solid black;
  box-shadow: 0 0 5px;
  background: rgba(115, 115, 211, 0.95);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: space-around; */
}

/* .images_product_block {
  width: 50%;
  display: flex;
  flex-direction: column;
}
*/

/* .slick-track {
  display: flex;
  flex-direction: row; */
/* width: 500px !important; */
/* transform: translate3d(150px, 0px, 0px) */
/* } */

.slider_product_image {
  width: 50%;
  display: flex;
  margin-right: 50px;
  flex-direction: column;
}
.slider_block_top {
  width: 60% !important;
  height: 300px;
}

.slider_block_bottom {
  margin-top: 15px;
  width: 40%;
  margin: 10px 20px 0 20px;
  height: 100px;
  border: solid;
  /* background: rgb(90, 138, 90); */
}

/* .slider_block_bottom .slick-slide {
  width: 90px !important;
} */

.slider_block_top img {
  width: 80% !important;
  height: 300px;
}

.slider_block_bottom_img {
  width: 30% !important;
  height: 90px;
  display: flex;
  flex-direction: row;
}

.details_container_info {
  display: flex;
  flex-direction: column;
}

.details_container_info_nameProduct {
  font-weight: 400;
  font-size: 3em;
  margin-bottom: 20px;
}

.details_container_info_actions {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.info_actions_btn {
  font-size: 1.5em;
  background-color: #2e7d32 !important;
  margin-right: 30px;
}

.info_actions_btn:hover {
  background: darkgray !important;
}

.details_container_info_price {
  font-size: 2.5em;
  font-weight: 400;
}

.details_container_info_btn_basket {
  width: 200px;
  height: 50px;
  border-radius: 5px;
  margin-top: 40px;
  background-color: #2e7d32;
  font-size: 18px;
}

.details_container_cards {
  margin-top: 40px;
  width: 100%;
}

.details_container_cards_content_p {
  width: 100%;
  height: 40%;
  z-index: 1;
  font-size: 20px;
}
</style>
