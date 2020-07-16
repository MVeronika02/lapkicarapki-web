import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import theContentProduct from '../views/theContentProduct.vue'
import DetailsProduct from '../components/DetailsProduct.vue'
import allBasket from '../components/allBasket.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
      children: [
        {
          path: '/',
          name: 'thecontent',
          component: theContentProduct
        },
        {
          path: 'detailsProduct/:Pid',
          name: 'detailsProduct',
          component: DetailsProduct
        },
        {
          path: 'allBasket',
          name: 'allBasket',
          component: allBasket
        }
      ]
  },
 


  // {
  //   path: '/about',
  //   name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
