<template>
    <main class="content">
      <div class="logoContent">
        <a href="/"><img src="../assets/img/logo.jpeg"></a>
        <div class="blockSearch">
        <ul class="navbarLink">
          <li>Доставка и оплата</li>
          <li>Контакты</li>
          <li><button @click="openBasket(); closeSidebar()">Корзина ({{ $store.state.cartCount }})</button></li>
        </ul>
        <input type="text" id="mySearch" placeholder="Search..">
        </div>
      </div>

        <ul class="buttonsAnimal">
          <div class="dropdown">
            <li><button type="button" class="dogsBtn" @mouseover="allCategoryAnimals(1)" @click="goToCategories(1); categoriesForOneAnimal(1)">Собаки</button></li>
            <div class="drop-content">
              <ul>
                <li v-for="allCategory in $store.state.filtredCategory" :key="allCategory.idCategory"><a>{{ allCategory.nameCategory }}</a></li>
              </ul>
            </div>
          </div>

          <div class="dropdown">
            <li><button type="button" class="dogsBtn" @mouseover="allCategoryAnimals(2)" @click="goToCategories(2); categoriesForOneAnimal(2)">Кошки</button></li>
            <div class="drop-content">
              <ul>
                <li v-for="allCategory in $store.state.filtredCategory" :key="allCategory.idCategory"><a>{{ allCategory.nameCategory }}</a></li>
              </ul>
            </div>
          </div>
          
          <div class="dropdown">
            <li><button type="button" class="dogsBtn" @mouseover="allCategoryAnimals(3)" @click="goToCategories(3); categoriesForOneAnimal(3)">Птицы</button></li>
            <div class="drop-content">
              <ul>
                <li v-for="allCategory in $store.state.filtredCategory" :key="allCategory.idCategory"><a>{{ allCategory.nameCategory }}</a></li>
              </ul>
            </div>
          </div>
          
          <div class="dropdown">
            <li><button type="button" class="dogsBtn" @mouseover="allCategoryAnimals(4)" @click="goToCategories(4); categoriesForOneAnimal(4)">Рыбы</button></li>
            <div class="drop-content">
              <ul>
                <li v-for="allCategory in $store.state.filtredCategory" :key="allCategory.idCategory"><a>{{ allCategory.nameCategory }}</a></li>
              </ul>
            </div>
          </div>
          
          <div class="dropdown">
            <li><button type="button" class="dogsBtn" @mouseover="allCategoryAnimals(5)" @click="goToCategories(5); categoriesForOneAnimal(5)">Насекомые</button></li>
            <div class="drop-content-left">
              <ul>
                <li v-for="allCategory in $store.state.filtredCategory" :key="allCategory.idCategory"><a>{{ allCategory.nameCategory }}</a></li>
              </ul>
            </div>
          </div>
          
          <div class="dropdown">
            <li><button type="button" class="dogsBtn" @mouseover="allCategoryAnimals(6)" @click="goToCategories(6); categoriesForOneAnimal(6)">Грызуны</button></li>
            <div class="drop-content-rodents">
              <ul>
                <li v-for="allCategory in $store.state.filtredCategory" :key="allCategory.idCategory"><a>{{ allCategory.nameCategory }}</a></li>
              </ul>
            </div>
          </div>
        </ul>
    </main>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Header',
  components: {},
  data () {
    return {}
  },
  mounted () {
    this.$store.commit('SETProducts')
    this.$store.dispatch('SETCategory')
  },
  methods: {
    allCategoryAnimals: function (idAnimal) {
      // console.log(idAnimal, '88888888888')
      this.$store.commit('filterCategory', idAnimal)
    },
    categoriesForOneAnimal: function (idAnimal) {
        this.$store.commit('filterCategoryOneAnimal', idAnimal)
    },
    goToCategories: function (idAnimal) {
      this.$router.push({name: 'categories', params:{Pid:idAnimal}})
    },
    openBasket: function () {
      this.$router.push({name: 'Basket'})
    },
    closeSidebar () {
      document.getElementById("sidebar").className = "sidebarClose"
      document.getElementById("mainPage").className = "newMainPage"
    }
  }
}

</script>

<style>
.content {
  height: 100%;
  margin: auto;
  background: rgb(230, 230, 250, 0.95);
  border-radius: 8px;
  box-shadow: 0 0 5px;
}

.logoContent {
  display: flex;
}

.logoContent img {
  float: right;
  border-radius: 5%;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 50px;
}

.blockSearch {
  width: 100%;
  height: 70%;
  margin: 0;
  padding: 0;
}

.navbarLink {
  width: 95%;
  height: 30%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: space-around;
  align-content: flex-start;
  padding-bottom: 5px;
  list-style-type: none;
  margin: 5px 0;
  background-color: blueviolet;
}

.navbarLink li {
  width: 250px;
  font-size: 1em;
}

#mySearch {
  width: 130px;
  transition: width 0.4s ease-in-out;
  /* transition: width 0.4s ease-in-out; */
  /* width: 100%; */
  font-size: 18px;
  padding: 11px;
  border: 1px solid #ddd;
  margin-top: 20px;
}

#mySearch:focus {
  width: 80%;
}

.buttonsAnimal {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: space-around;
  list-style-type: none;
  margin: 40px 0;
}

.buttonsAnimal li {
  font-size: 2em;
}

.dogsBtn {
  background-color: #4CAF50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  border-radius: 10%;
  cursor: pointer;
  position: static;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.dogsBtn:hover {
  background-color: orange;
}

.dogsBtn:active {
  border-radius: 10%;
  background-color: orange;
}

.drop-content {
  display: none;
  position: absolute;
  background-color: orange;
  width: 600px;
  height: 300px;
	/* top: 290px; */
	/* bottom: 0; */
	/* left: 222px; */
	/* right: 0; */
  /* display: none;
  position: static;
  background-color: orange;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  width: 600px;
  height: 500px; */
}

.drop-content ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.drop-content li {
  display: block;
  /* position: relative; */
  list-style-type: none;
}

.dropdown:hover .drop-content {
  display: block;
  position: absolute;
  z-index: 1;
}

.drop-content-left {
  display: none;
  position: absolute;
  background-color: orange;
  width: 600px;
  height: 300px;
  right: 470px; 
}

.drop-content-left ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.drop-content-left li {
  display: block;
  /* position: relative; */
  list-style-type: none;
}

.dropdown:hover .drop-content-left {
  display: block;
  position: absolute;
  z-index: 1;
}

.drop-content-rodents {
  display: none;
  position: absolute;
  background-color: orange;
  width: 600px;
  height: 300px;
	/* top: 290px; */
	/* bottom: 0; */
	right: 195px;
	/* right: 0; */
  /* display: none;
  position: static;
  background-color: orange;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  width: 600px;
  height: 500px; */
}

.drop-content-rodents ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.drop-content-rodents li {
  display: block;
  /* position: relative; */
  list-style-type: none;
}

.dropdown:hover .drop-content-rodents {
  display: block;
  position: absolute;
  z-index: 1;
}

.dropdown:hover .dropbtn {background-color: #3e8e41;}
</style>
