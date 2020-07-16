<template>
    <main class="content">
      <div class="logoContent">
        <a href="/"><img src="../assets/img/logo.jpeg"></a>
        <div class="blockSearch">
        <ul class="navbarLink">
          <li>Доставка и оплата</li>
          <li>Контакты</li>
          <li><button @click="openBasket(); closeSidebar()">Корзина</button></li>
        </ul>
        <input type="text" id="mySearch" placeholder="Search..">
        </div>
      </div>

        <ul class="buttonsAnimal">
          <div class="dropdown">
            <li><button type="button" class="dogsBtn" @mouseover="allCategoryAnimals(1)">Собаки</button></li>
            <div class="drop-content">
              <ul>
                <li v-for="allCategory in $store.state.filtredArray" :key="allCategory.idCategory">{{ allCategory.nameCategory }}</li>
              </ul>
            </div>
          </div>

          <div class="dropdown">
            <li><button type="button" class="dogsBtn" @mouseover="allCategoryAnimals(2)">Кошки</button></li>
            <div class="drop-content">
              <ul>
                <li v-for="allCategory in $store.state.filtredArray" :key="allCategory.idCategory">{{ allCategory.nameCategory }}</li>
              </ul>
            </div>
          </div>
          
          <div class="dropdown">
            <li><button type="button" class="dogsBtn" @mouseover="allCategoryAnimals(3)">Птицы</button></li>
            <div class="drop-content">
              <ul>
                <li v-for="allCategory in $store.state.filtredArray" :key="allCategory.idCategory">{{ allCategory.nameCategory }}</li>
              </ul>
            </div>
          </div>
          
          <div class="dropdown">
            <li><button type="button" class="dogsBtn" @mouseover="allCategoryAnimals(4)">Рыбы</button></li>
            <div class="drop-content">
              <ul>
                <li v-for="allCategory in $store.state.filtredArray" :key="allCategory.idCategory">{{ allCategory.nameCategory }}</li>
              </ul>
            </div>
          </div>
          
          <div class="dropdown">
            <li><button type="button" class="dogsBtn" @mouseover="allCategoryAnimals(5)">Насекомые</button></li>
            <div class="drop-content">
              <ul>
                <li v-for="allCategory in $store.state.filtredArray" :key="allCategory.idCategory">{{ allCategory.nameCategory }}</li>
              </ul>
            </div>
          </div>
          
          <div class="dropdown">
            <li><button type="button" class="dogsBtn" @mouseover="allCategoryAnimals(6)">Грызуны</button></li>
            <div class="drop-content">
              <ul>
                <li v-for="allCategory in $store.state.filtredArray" :key="allCategory.idCategory">{{ allCategory.nameCategory }}</li>
              </ul>
            </div>
          </div>
        </ul>
    </main>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'theheader',
  components: {
    // Sidebar
  },
  data () {
    return {}
  },
  mounted () {
    this.$store.commit('SETProducts')
    // console.log(this.$store.state.allCategoryAnimal)
  },
  computed: mapState([
    'allCategoryAnimal'
  ]),
  methods: {
    allCategoryAnimals: function (idAnimal) {
      this.$store.commit('filterCategory', idAnimal)
    },
    openBasket: function () {
      this.$router.push({name: 'allBasket'})
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
  cursor: pointer;
  position: static;
}

.drop-content {
  display: none;
  position: fixed;
  background-color: orange;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  width: 600px;
  height: 500px;
}

.drop-content li {
  list-style-type: none;
}

.dropdown:hover .drop-content {
  display: block;
  position: absolute;
  z-index: 1;
}
.dropdown:hover .dropbtn {background-color: #3e8e41;}
</style>
