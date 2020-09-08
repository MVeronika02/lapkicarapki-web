import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ContentProduct from '../views/ContentProduct.vue'
import DetailsProduct from '../components/DetailsProduct.vue'
import Basket from '../components/Basket.vue'
import FiltredProducts from '../views/FiltredProducts.vue'
import Sidebar from '../components/Sidebar.vue'
import Categories from '../components/Categories.vue'
import Order from '../components/Order.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
      children: [
        {
          
          path: '/',
          name: 'Content',
          component: ContentProduct
        },
        {
          path: 'categories/:Pid',
          name: 'categories',
          component: Categories
        },
        {
          path: '/',
          name: 'Sidebar',
          component: Sidebar
        },
        {
          path: '/filtred',
          name: 'filtredProducts',
          component: FiltredProducts
        },
        {
          path: 'detailsProduct/:Pid',
          name: 'detailsProduct',
          component: DetailsProduct
        },
        {
          path: '/basket',
          name: 'Basket',
          component: Basket
        },
        {
          path: '/order',
          name: 'Order',
          component: Order
        }
      ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(((to, from, next) => {
  if (false) next({ name: 'Basket' })
  else next()
}))

export default router
