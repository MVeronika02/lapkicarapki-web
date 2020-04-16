<template>
<!-- <div class="leftSidebar" :class="{leftSidebarOpen: openBar}"> -->
<div class="leftSidebar">
<div class="leftSidebarMenu">
<ul v-show="showLi">
  <!-- <li>Привет</!-->
<li v-for="allCategoryDropDown in $store.state.filtredArray" :key="allCategoryDropDown.idcategory"><a>{{ allCategoryDropDown.namecategory }}</a></li>
</ul>
</div>

  <div class="filter_section">
    <form method="POST">
      <label for="amount">Цена: </label>
      <input type="text" id="amount" readonly style="border:0; color:#f6931f; font-weight:bold;">
      <input type="submit" value="Поиск" @click="priceFiltr"/>
    </form>
  <div id="slider-range"></div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'sidebar',
  // props: ['filtredArray'],
  data () {
    return {
      // openBar: false,
      showLi: true,
      // selected: 'Фильтр по параметрам',
      minPrice: 0,
      maxPrice: 50000
    }
  },
  // mounted () {
  // this.$store.dispatch('loadCategory')
  //   this.$store.commit('SET_Category')
  //   console.log(this.$store.state.allCategoryAnimal)
  // },
  computed: mapState([
    'allCategoryAnimal',
    'priceFiltr'
  ])
  // methods: {
  //   allCategoryAnimals: function (idanimal) {
  //     const filtredArray = this.$store.state.allCategoryAnimal.filter(object => object.idanimal === idanimal)
  //     return filtredArray
  //   }
  // }
}
</script>

<style>

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

.leftSidebarOpen {
  width: 100%;
  opacity: 1;
  padding: 0;
  height: 0;
  visibility: hidden;
  transition: width 1.7s;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  opacity: 1;
  display: flex;
  flex-direction: column;
  /*flex-wrap: wrap;*/
  justify-content: flex-start;
  align-content: center;
  align-items: flex-start;
}

.leftSidebarMenu {
  width: 100%;     /*340/350px*/
  height: 800px;
  padding: 0;
  position: absolute;
  font-weight: normal;
  font-size: 2em;
  font-weight: 800;
  color: #fff;
}

.leftSidebarMenu ul li {
  list-style: none;
  margin-bottom: 15px;
}

.leftSidebarMenu ul li a {
  text-decoration: none;
  color: #FFF;
}

.leftSidebarMenu ul li a:hover {
  color: #E0FFFF;
}

.filter_section {
  height: 300px;
  width: 350px;
  margin-top: 600px;
  /* background: #DCDCDC; */
  opacity: 0.7;
  text-align: center;
}

label {
    font: 1rem 'Fira Sans', sans-serif;
}

.range-slider {
  width: 200px;
  margin: 0;
  text-align: left;
  position: relative;
}

.range-slider .range-slider input[type=range] {
  position: absolute;
  left: 0;
  bottom: 0;
}

input[type=range]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  /* top: 2px; */
}

/* Ширина слайдера */
#slider {
  width: 200px;
}
/* Контейнер слайдера */
.ui-slider {
  position: relative;
}
/* Ползунок */
.ui-slider .ui-slider-handle {
  position: absolute;
  z-index: 2;
  width: 13px;   /* Задаем нужную ширину */
  height: 13px;  /* и высоту */
  background: #4682B4 no-repeat; /* картинка изображающая ползунок. Или можно залить цветом, задать бордюр и скругления */
  cursor: pointer
}
.ui-slider .ui-slider-range {
  position: absolute;
  z-index: 1;
  font-size: .7em;
  display: block;
  border: 0;
  overflow: hidden;
}
/* горизонтальный слайдер (сама полоса по которой бегает ползунок) */
.ui-slider-horizontal {
  height: 3px; /* задаем высоту согласно дизайна */
}
/* позиционируем ползунки */
.ui-slider-horizontal .ui-slider-handle {
  top: -5px;
  /* margin-left: 6px; */
}
.ui-slider-horizontal .ui-slider-range {
  top: -1px;
  height: 15%;
}
.ui-slider-horizontal .ui-slider-range-min {
  left: 0;
}
.ui-slider-horizontal .ui-slider-range-max {
  right: 0;
}
/* оформление полосы по которой ходит ползунок */
.ui-widget-content {
  border: 1px solid #D4D4D4;
  background: #fff;
  height: 3px;
}
/* оформление активного участка (между двумя ползунками) */
.ui-widget-header {
  border: 1px solid #D4D4D4;
  background: #4B0082;
}
/* скругление для полосы слайдера */
.ui-corner-all {
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
}

/* .filter_parameters h3 {
  font-size: 28px;
}*/

.filter_parameters_price h3 {
  font-size: 32px;
}

/*
.topBaner_open * {
  margin-top: 500px;
  opacity: 0;
  transition: opacity .6s;
}*/

/*.nowrapper {
  top: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  visibility: hidden;
}*/

  /*max-width: 960px;*/
 /* top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  visibility: visible;
}*/
.modal {
  /*top: 50%;*/
  right: 50%;
  bottom: 50%;
  left: 50%;
  /*position: absolute;*/
}

@media only screen and (max-device-width: 520px) {

  .leftSidebar {
  will-change: width;  /* предупреждение браузеру об изменениях */
  box-sizing: border-box;  /* внешние элеиенты складываются во внутренние*/
  border: 1px solid black;
  /*left: -350px;*/
  width: 100%;   /*350/1500px*/
  height: 300px;
  /*float: left;*/
  display: flex;
  flex-direction: column;
  /*flex-wrap: wrap;*/
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
.leftSidebarOpen {
  width: 100%;
  opacity: 1;
  padding: 0;
  height: 0;
  visibility: hidden;
  transition: width 1.7s;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  opacity: 1;
  display: flex;
  flex-direction: column;
  /*flex-wrap: wrap;*/
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
}

.leftSidebarMenu {
  width: 100%;
  height: 300px;
  /*position: absolute;*/
  /*font-weight: normal;*/
  /*font-size: 1.8em;*/
  /*font-weight: 800;*/
  /*color: #fff;*/
}

.leftSidebarMenu ul {
  margin: 0;
  margin-left: 30px;
  padding: 0;
  height: 250px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
}

.leftSidebarMenu ul li {
  width: 30%;
  list-style: none;
  margin: 0;
  padding: 0;
}

.leftSidebarMenu ul li a {
  text-decoration: none;
  color: #F4A460;
  /*font-weight: normal;*/
  font-size: 0.5em;
  /*font-weight: 800;*/
}

.leftSidebarMenu ul li a:hover {
  color: #E0FFFF;
}

.filter_section {
  height: 100px;
  width: 100%;
  margin-top: 200px;
  background: #DCDCDC;
  opacity: 0.7;
  text-align: center;
}

.form_filter {
  height: 100px;
  /*float: left;*/
}

.filter_parameters h3 {
  font-size: 1em;
  margin: 0;
}

.filter_parameters_price {
  height: 60px;
}

.filter_parameters_price h3 {
  font-size: 1em;
  margin: 0;
}

.filter_parameters_price input {
  width: 70px;
  height: 25px;
  margin-left: 20px;
}

}

</style>
