<template>
<div class="sidebar_open" :class="{sidebarClose: closeBar}">
  <div class="sidebar_name">
    <h3>ПОДБОР ПАРАМЕТРОВ</h3>
  </div>
  <div class="filters_container">
    <p class="price_name">Цена: </p>
    <div class="slider">
      <v-range-slider
        v-model="range"
        :max="max"
        :min="min"
        hide-details
        class="pa-0 mt-0 align-center"
      >
        <template v-slot:prepend>
          <v-text-field
            :value="range[0]"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="number"
            style="width: 60px"
            @change="$set(range, 0, $event)"
          ></v-text-field>
        </template>
        <template v-slot:append>
          <v-text-field
            :value="range[1]"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="number"
            style="width: 60px"
            @change="$set(range, 1, $event)"
          ></v-text-field>
        </template>
      </v-range-slider>
    </div>

    <div class="select_weight">
      <p><select size="5" multiple name="hero[]">
        <option>Выберите вес</option>
        <option value="weight0">< 1 кг</option>
        <option selected value="weight1">1-2 кг</option>
        <option value="weight2">2-5 кг</option>
        <option value="weight3">5-10 кг</option>
      </select></p>
    </div>
  </div>
  <!-- <div class="btn_filter"> -->
    <v-btn class="btn_filter_v" @click.native="$store.commit('SETFilterKey', true); getFilterValues()">
      <router-link
        to="/filtred"
      >
        Применить
      </router-link>
      </v-btn>
  <!-- </div> -->
</div>
</template>

<script>
import Vuetify from 'vuetify/lib'
import { mapState } from 'vuex'

export default {
  name: 'sidebar',
  vuetify: new Vuetify(),
  data () {
    return {
      min: 500,
      max: 9000,
      slider: 40,
      range: [500, 9000],
      showLi: true,
      closeBar: false
    }
  },
  mounted () {
    this.$store.commit('SETAllCategory')
    this.$store.commit('SETfiltredProducts')
  },
  computed: mapState([
    'allCategoryAnimal'
  ]),
  created () {
    this.$store.dispatch('SETCategory')
  },
  methods: {
    getFilterValues: function () {
      this.$store.commit('SETvalueMinMax', [this.range[0], this.range[1]])
      var valueMin = this.range[0]
      var valueMax = this.range[1]
      this.$store.dispatch('ProductsFilter', { min: valueMin, max: valueMax, page:1})
      // this.$router.push("/profile");
    }
  }
}
</script>

<style>

.sidebar_open {
  display: block;
  width: 400px;
  height: 600px;
  background: rgb(141, 206, 157);
  margin: 20px 0 0 150px;
}

/* .left_sidebar {
  left: -350px;
  width: 100%;
  height: 1000px;
  display: flex;
  flex-direction: column;
  background: rgb(141, 206, 157);
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.9);
  border: 1px solid rgba(0,0,0,0.17);
  border-radius: 2px;
  opacity: 1;
  visibility: visible;
  overflow: hidden;
} */

.sidebarClose {
  display: none;
}

.sidebar_name {
  height: 40px;
  text-align: center;
  background: rgb(20, 163, 91);
}

.filters_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: space-around;
  width: 300px;
}

.price_name {
  margin-top: 20px;
}
.slider {
  display: flex;
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
}

.select_weight {
  height: 150px;
}

.select-weight p {
  height: 150px;
}

.btn-filter {
  /* background-color: #4CAF50; */
  color: white;
  padding: 6px;
  margin-left: 100px;
  font-size: 16px;
  cursor: pointer;
  /* text-align: center; */
}

.btn_filter_v {
  width: 180px;
  height: 50px;
  margin-left: 120px;
  color: black;
  background-color: rgb(141, 206, 157);
  box-shadow: 0 -6px rgb(20, 163, 91) inset;
  transition: 0.2s;
}

.btn_filter_v:hover {
  background: rgb(53, 167, 110);
}

.btn_filter_v a {
  color:black !important;
}


@media only screen and (max-device-width: 520px) {

.leftSidebar {
  will-change: width;  /* предупреждение браузеру об изменениях */
  box-sizing: border-box;  /* внешние элеиенты складываются во внутренние*/
  border: 1px solid black;
  width: 100%;   /*350/1500px*/
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  background: #4682B4;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.9);
  border: 1px solid rgba(0,0,0,0.17);
  border-radius: 5px;
  opacity: 1;    /* прозрачность */
  visibility: visible;  /* видимость */
  transition: width 1.7s linear;
  /*height 1s ease-out;    анимация перехода */
  overflow: hidden; /* обрез невмещающихся при скрывании */
}

}

</style>
