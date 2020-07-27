<template>
<body>
<div class="main_background"></div>
<div class="mainPage">
  <div class="header">
    <Header/>
  </div>

  <div class="content_grid">
    <router-view/>
  </div>
  
  <footer id="pageFooter">Footer</footer>

</div>
</body>
</template>

<script>

import Header from '../views/Header.vue'
import ContentProduct from '../views/ContentProduct.vue'

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
    ContentProduct
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
    "content content content"
    "footer footer footer";
  grid-template-rows: 250px auto 300px;
  grid-template-columns: 15% 1fr 15%;
  grid-gap: 10px;
  margin: 0 auto;
  padding: 0px;
  z-index: 5;
  position: relative;
}

.header {
  grid-area: header;
  padding: 10px 0;
}

#pageFooter {
  grid-area: footer;
  background: gold;
}

.content_grid {
  grid-area: content;
  padding: 0;
}

#mainNav {
  grid-area: nav;
  background: blueviolet;
}
</style>
