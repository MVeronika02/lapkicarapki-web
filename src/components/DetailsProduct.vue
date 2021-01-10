<template>
  <div class="details_container">
    <div class="details_container_block">
      <div class="slider_product_image">
        <div class="slider_block_top">
          <VueSlickCarousel
            v-bind="settingsMainSlider"
            ref="c1"
            :asNavFor="$refs.c2"
          >
          <div>
            <img :src="imageProduct(allDetailProduct.url_image_product)" class="slider_block_top_img"/>
          </div>
        </VueSlickCarousel>
      </div>

      <div class="slider_SubSlider">
        <VueSlickCarousel
          v-bind="settingsSubSlider"
          ref="c2"
          :asNavFor="$refs.c1"
        >
          <div border="2px solid #cb11ab;">
            <img
              :src="imageProduct(allDetailProduct.url_image_product)"
              class="slider_SubSlider_img"
            />
          </div>
          <div>
            <img
              :src="imageProduct(allDetailProduct.url_image_product)"
              class="slider_SubSlider_img"
            />
          </div>
          <div>
            <img
              :src="imageProduct(allDetailProduct.url_image_product)"
              class="slider_SubSlider_img"
            />
          </div>
          <div>
            <img
              :src="imageProduct(allDetailProduct.url_image_product)"
              class="slider_SubSlider_img"
            />
          </div>
          <div>
            <img
              :src="imageProduct(allDetailProduct.url_image_product)"
              class="slider_SubSlider_img"
            />
          </div>
          <div>
            <img
              :src="imageProduct(allDetailProduct.url_image_product)"
              class="slider_SubSlider_img"
            />
          </div>
        </VueSlickCarousel>
      </div>
    </div>

    <div class="details_container_info">
      <p class="details_container_info_nameProduct">{{
        allDetailProduct.name_product
      }}</p>
      <div class="details_container_info_actions">
        <btn class="info_actions_btn">
          <i class="fab fa-gratipay"></i>
          <span>Отложить</span>
        </btn>
        <btn class="info_actions_btn">
          <i class="fas fa-sync-alt"></i>
          <span>Сравнить</span>
        </btn>
        <btn class="info_actions_btn">
          <i class="fas fa-share-alt-square"></i>
          <span>Купить</span>
        </btn>
      </div>

      <span class="details_container_info_price"
        >{{ allDetailProduct.price_product }} тг</span
      >
      <button
        class="details_container_info_btn_basket"
        @click="addToBasket(allDetailProduct)"
      >
        Добавить в корзину
      </button>
    </div>
    </div>

    <div class="details_container_cards">
      <v-card>
        <v-tabs
          v-model="tab"
          background-color="green lighten-2"
          color="black"
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
                  {{ allDetailProduct.description_product }}
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
              <Reviews v-bind:product-id="allDetailProduct.id_product" />
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
      settingsMainSlider: {
        focusOnSelect: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        edgeFriction: 0.35,
        infinite: false,
        speed: 500
      },
      settingsSubSlider: {
        focusOnSelect: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerPadding: "10px",
        centerMode: true,
      },
    };
  },
  mounted() {
    Axios.get(
      "http://localhost:5000/detailsproduct?id=" + this.$route.params.idProduct
    ).then((detailsOnProduct) => {
      this.allDetailProduct = detailsOnProduct.data.result[0];
    });
  },
  methods: {
    imageProduct(imagePath) {
      return require(`../static/${imagePath}`);
    },
    addToBasket(allDetailProduct) {
      this.$store.commit("productsToBasket", allDetailProduct);
    },
  },
};
</script>

<style>
.details_container {
  background: rgb(230, 230, 250, 0.95);
  padding: 20px 0 0px 0;
}

.details_container_block {
  width: 1300px;
  margin-left: 150px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.slider_product_image {
  width: 465px;
  height: 530px;
  margin: 20px 0px 30px 0px;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  background: rgb(141, 206, 157);
  border-radius: 2px;
}

.slider_block_top {
  width: 400px !important;
  height: 350px;
  margin: 20px 0 0 20px;
}

.slider_block_top img {
  width: 390px !important;
  height: 350px;
}

.slider_SubSlider {
  margin-top: 40px;
  margin-left: 20px;
  width: 390px;
  height: 100px;
  padding-top: 6px;
}

.slider_SubSlider_img {
  margin-left: 6px;
  width:80px;
  height: 80px;
}

.details_container_info {
  margin: 10px 0px 0 50px;
  display: flex;
  flex-direction: column;
}

.details_container_info_nameProduct {
  font-weight: 400;
  font-size: 2em;
  margin-bottom: 10px;
  width: 500px;
}

.details_container_info_actions {
  width: 90%;
  margin: 0 0 20px 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.info_actions_btn {
  width: 110px;
  height: 30px;
  border-radius: 2px;
  background-color: rgb(141, 206, 157);
  box-shadow: 0 -3px rgb(20, 163, 91) inset;
  margin-right: 30px;
  padding-top: 2px;
  text-align: center;
  cursor: pointer; 
}

.info_actions_btn:hover {
  background: rgb(53, 167, 110);
}

.info_actions_btn:active {
  background: rgb(33, 147, 90);
  box-shadow: 0 3px rgb(33, 147, 90) inset;
}

.details_container_info_price {
  font-size: 2.5em;
  font-weight: 400;
}

.details_container_info_btn_basket {
  width: 300px;
  height: 40px;
  border-radius: 4px;
  margin-top: 40px;
  background-color: rgb(141, 206, 157);
  box-shadow: 0 -5px rgb(20, 163, 91) inset;
  font-size: 18px;
}

.details_container_info_btn_basket:hover {
  background: rgb(53, 167, 110);
}

.details_container_info_btn_basket:active {
  background: rgb(33, 147, 90);
  box-shadow: 0 3px rgb(33, 147, 90) inset;
}

.details_container_cards {
  margin: 40px 0 0px 160px;
  padding-bottom: 20px; 
  width: 80%;
  height: auto;
}

.details_container_cards_content_p {
  width: 100%;
  height: 150px;
  z-index: 1;
  font-size: 20px;
}
</style>
