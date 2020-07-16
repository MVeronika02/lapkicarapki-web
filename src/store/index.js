import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allCategoryAnimal: [],
    allProducts: [],
    filtredArray: {},
    basketContent: [],
    cartCount: 0
  },
  mutations: {
    SETAllCategory: (state, categoryAll) => {
      state.allCategoryAnimal = categoryAll
    },
    SETProducts: (state, productsAll) => {
      state.allProducts = productsAll
    },
    filterCategory: (state, idAnimal) => {
      state.filtredArray = state.allCategoryAnimal.filter(object => object.idAnimal === idAnimal)
    },
    SETfiltredProducts: (state, filtredProducts) => {
      state.allProducts = filtredProducts
    },
    SETProductToBasket: (state, allProduct) => {
      let newItem = state.basketContent.find(object => object.idProduct=== allProduct.idProduct)
      
      if (newItem) {
        newItem.quantity ++
        newItem.totalPrice = newItem.quantity * newItem.priceProduct
      } else {
        state.basketContent.push(allProduct)

        Vue.set(allProduct, 'quantity', 1)
        Vue.set(allProduct, 'totalPrice', allProduct.priceProduct)
      }
      state.cartCount++
      console.log(state.basketContent, '++++')
    },
    removeProductFromBasket: (state, allProduct) => {
      let newItemRemove = state.basketContent.find(object => object.idProduct === allProduct.idProduct)
      if (newItemRemove) {
        newItemRemove.quantity --
        newItemRemove.totalPrice = newItemRemove.quantity * newItemRemove.priceProduct
        // if (newItemRemove.quantity == 0) {
        //   state.basketContent.splice(newItemRemove)
        // }
      }
      state.cartCount--
    }
  },
  actions: {
    SETCategory: async (context) => {
      await Axios.get('http://localhost:5000/url2')
        .then(categoryAll => {
          console.log(categoryAll.data.result)
          context.commit('SETAllCategory', categoryAll.data.result)
        })
    },
    SETContent: async (context) => {
      await Axios.get('http://localhost:5000/url1')
        .then(productsAll => {
          console.log(productsAll.data.result)
          context.commit('SETProducts', productsAll.data.result)
        })
    },
    ProductsFilter: async (context, payload) => {
      await Axios.get('http://localhost:5000/api/products?valueMin=' + payload.min + '&valueMax=' + payload.max)
        .then(filtredProducts => {
          context.commit('SETfiltredProducts', filtredProducts.data.result)
        })
    }
  }
})
