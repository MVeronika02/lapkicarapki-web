import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import ContentProduct from '../views/ContentProduct.vue'
import DetailsProduct from '../components/DetailsProduct.vue'
import Basket from '../components/Basket.vue'
import FiltredProducts from '../views/FiltredProducts.vue'
import Sidebar from '../components/Sidebar.vue'
import Categories from '../components/Categories.vue'
import ProductsCategory from '../components/ProductsCategory.vue'
import Order from '../components/Order.vue'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import Profile from '../components/Profile.vue'
import middlewarePipeline from './middlewarePipeline'
import guest from './middleware/guest'
import auth from './middleware/auth'
import Slider from '../views/Slider.vue'

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
        path: 'productsCategory/:Pid',
        name: 'productsCategory',
        component: ProductsCategory
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
        component: DetailsProduct,
        // meta: {
        //   middleware: [
        //     guest
        //   ]
        // }
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
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
          middleware: [
            guest
          ]
        }
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile,
      },
      {
        path: '/slider',
        name: 'Slider',
        component: Slider
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }
  
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
