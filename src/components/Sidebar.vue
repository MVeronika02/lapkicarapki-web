<template>
<div class="sidebarOpen" :class="{sidebarClose: closeBar}">
<div class="leftSidebar">
  <div class="filters-container">
    <p class="price-p">Цена: </p>
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

    <div class="select-weight">
      <p><select size="5" multiple name="hero[]">
        <option>Выберите вес</option>
        <option value="weight0">< 1 кг</option>
        <option selected value="weight1">1-2 кг</option>
        <option value="weight2">2-5 кг</option>
        <option value="weight3">5-10 кг</option>
      </select></p>
    </div>
  </div>
  <div class="btn-filter">
    <v-btn  @click.native="$store.commit('SETFilterKey', true); getFilterValues()">
      <router-link
        to="/filtred"
      >
        Применить
      </router-link>
      </v-btn>
  </div>
</div>
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
    }
  }
}
</script>

<style>

.sidebarOpen {
  width: 30%;
}

.leftSidebar {
  will-change: width;  /* предупреждение браузеру об изменениях */
  box-sizing: border-box;  /* внешние элеиенты складываются во внутренние*/
  border: 1px solid black;
  left: -350px;
  width: 100%;   /*350/1500px*/
  height: 1500px;
  padding: 0;
  /*float: left;*/
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  background: #FFA07A;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.9);
  border: 1px solid rgba(0,0,0,0.17);
  border-radius: 5px;
  opacity: 1;    /* прозрачность */
  visibility: visible;  /* видимость */
  transition: width 1.7s linear;
  /*height 1s ease-out;    анимация перехода */
  overflow: hidden; /* обрез невмещающихся при скрывании */
}

.sidebarClose {
  display: none;
}

.filters-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: space-around;
  width: 100%;
}

.price-p {
  margin-top: 20px;
}
.slider {
  display: flex;
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
}

.select-weight {
  height: 150px;
}

.select-weight p {
  height: 150px;
}

.btn-filter {
  background-color: #4CAF50;
  color: white;
  padding: 6px;
  margin-left: 150px;
  font-size: 16px;
  cursor: pointer;
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
