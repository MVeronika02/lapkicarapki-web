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
import ContentProduct from '../views/ContentProduct.vue'
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
    ContentProduct,
    Footer
  }
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
  width: 88%;
  display: grid;
  grid-template-areas:
    "header header header"
    "nav nav nav"
    "content content content"
    "footer footer footer";
  grid-template-rows: 200px 50px auto 200px;
  grid-template-columns: 15% 1fr 15%;
  grid-gap: 10px;
  margin: 0 auto;
  padding: 0px;
  z-index: 5;
  position: relative;
}

.header {
  grid-area: header;
  padding: 10px 0 0 0;
}

.content_grid {
  grid-area: content;
  padding: 0;
}

.nav {
  grid-area: nav;
}


.footer {
  grid-area: footer;
}
</style>
