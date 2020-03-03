<template>
<body>
<div class="onePage">
  <div id="header">
    <theHeader/>
  </div>
  <div id="sidebar">
    <sidebar/>
  </div>
  <div id="thecontent">
    <theContentProduct/>
  </div>
<footer id="pageFooter">Footer</footer>
</div>
</body>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import theHeader from '../views/theHeader.vue'
import Sidebar from '../components/Sidebar.vue'
import theContentProduct from '../views/theContentProduct.vue'

export default {
  name: 'Home',
  components: {
    theHeader,
    Sidebar,
    theContentProduct
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
    "header header header"
    "sidebar thecontent thecontent"
    "footer footer footer";
  grid-template-rows: 370px 1fr 300px;
  grid-template-columns: 25% 1fr 15%;
  grid-gap: 10px;
  height: 100vh;
  margin: 0 auto;
  padding: 0px;
}

footer, nav, div {
  padding: 15px;

}
#header {
grid-area: header;
padding: 10px 0;
}
#pageFooter {
grid-area: footer;
background: gold;
}

#sidebar {
  padding: 0;
  /* display: none; */
}
/* #sideBar:active {
  display: block;
} */
#thecontent {
grid-area: thecontent;
padding: 0;
/* background: blue; */
}
#mainNav {
grid-area: nav;
background: blueviolet;
}
</style>
