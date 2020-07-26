<template>
<body>
<!-- <div id="mainPage" class="onePage" :class="{newMainPage: newGridEl}"> -->
  <div id="mainPage" class="onePage">
  <div id="Header">
    <Header/>
  </div>
  <!-- <div id="sidebar" class="sidebarOpen" :class="{sidebarClose: closeBar}">
    <sidebar/>
  </div> -->
  <div id="Content">
    <router-view/>
  </div>
<footer id="pageFooter">Footer</footer>
</div>
</body>
</template>

<script>

import Header from '../views/Header.vue'
// import Sidebar from '../components/Sidebar.vue'
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
    // Sidebar,
    ContentProduct
  }
}
</script>

<style>

body {
  margin: 0px;
  padding: 0px;
}

.onePage {
  width: 88%;
  display: grid;
  grid-template-areas:
    "Header Header Header"
    "Content Content Content"
    "footer footer footer";
  grid-template-rows: 370px 1fr 300px;
  grid-template-columns: 15% 1fr 15%;
  grid-gap: 10px;
  margin: 0 auto;
  padding: 0px;
  /* width: 88%;
  display: grid;
  grid-template-areas:
    "Header Header Header"
    "sidebar Content Content"
    "footer footer footer";
  grid-template-rows: 370px 1fr 300px;
  grid-template-columns: 25% 1fr 15%;
  grid-gap: 10px;
  margin: 0 auto;
  padding: 0px; */
}
/* 
.newMainPage {
  width: 88%;
  display: grid;
  grid-template-areas:
    "Header Header Header"
    "Content Content Content"
    "footer footer footer";
  grid-template-rows: 370px 1fr 300px;
  grid-template-columns: 15% 1fr 15%;
  grid-gap: 10px;
  margin: 0 auto;
  padding: 0px;
} */

#Header {
  grid-area: Header;
  padding: 10px 0;
}

#pageFooter {
  grid-area: footer;
  background: gold;
}

/* #sidebar {
  padding: 0;
} */

#Content {
  grid-area: Content;
  padding: 0;
}

#mainNav {
  grid-area: nav;
  background: blueviolet;
}
</style>
