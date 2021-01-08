<template>
<body>
<div class="main_background"></div>
<div class="mainPage">
  <div class="header">
    <Header/>
  </div>

  <div class="nav">
    <Navigation/>
  </div>

  <div class="content_grid">
    <router-view />
  </div>
  
  <div class="footer">
    <Footer/>
  </div>

</div>
</body>
</template>

<script>

import Header from '../views/Header.vue'
import Navigation from '../views/Navigation.vue'
import HomeProducts from '../views/HomeProducts.vue'
import Footer from '../views/Footer.vue'

export default {
  name: 'Home',
  data () {
    return {
      closeBar: true,
      newGridEl: true
    }
  },
  components: {
    Header,
    Navigation,
    HomeProducts,
    Footer
  },
  created() {
  },
}
</script>

<style>

body {
  margin: 0px;
  padding: 0px;
}

.main_background {
  position:  absolute;
  height: 100%;
  width: 100%;
  background-size: cover;
  z-index: 0;
  background: url(../assets/img/mainBackground.jpg);
}

.mainPage {
  width: 100%;
  display: grid;
  grid-template-areas:
    "header header header"
    "nav nav nav"
    "homeProducts homeProducts homeProducts"
    "footer footer footer";
  grid-template-rows: 200px 50px auto 200px;
  grid-template-columns: 15% 1fr 15%;
  margin: 0;
  padding: 0px;
  z-index: 5;
  position: relative;
}

.header {
  grid-area: header;
}

.content_grid {
  grid-area: homeProducts;
  padding: 0;
}

.nav {
  grid-area: nav;
}


.footer {
  grid-area: footer;
}
</style>
