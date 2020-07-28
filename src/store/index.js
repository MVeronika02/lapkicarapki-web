import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)
let basketContent = window.localStorage.getItem('basketContent')
let cartCount = window.localStorage.getItem('cartCount')

export default new Vuex.Store({
  state: {
    allCategoryAnimal: [],
    allProducts: [],
    filtredCategory: [],
    filterCategoryOneAnimal: [],
    basketContent: basketContent ? JSON.parse(basketContent) : [],
    cartCount: cartCount ? parseInt(cartCount) : 0,
    productPageNumber: 0,
    filtredProductData: [],
    valueMin: 0,
    valueMax: 0,
    countProductPage: 0
  },

  //Мутации

  mutations: {
    SETAllCategory: (state, categoryAll) => {
      state.allCategoryAnimal = categoryAll
    },
    SETProducts: (state, allProducts) => {
      state.allProducts = allProducts
    },
    SETfiltredProducts: (state, filtredProducts) => {
      state.filtredProductData = filtredProducts
    },
    filterCategory: (state, idAnimal) => {
      state.filtredCategory = state.allCategoryAnimal.filter(object => object.idAnimal === idAnimal)
      console.log(state.filtredCategory)
    },
    filterCategoryOneAnimal: (state, idAnimal) => {
      state.filterCategoryOneAnimal = state.allCategoryAnimal.filter(object => object.idAnimal === idAnimal)
    },
    SETProductToPage: (state, selectedPage) => {
      state.allProducts = selectedPage
    },
    SETCountProductPage: (state, countPage) => {
      state.countProductPage = countPage
    },
    SETFilterKey: (state, key) => {
      state.filtredProductKey = key
    },
    SETvalueMinMax: (state, value) => {
      state.valueMin = value[0]
      state.valueMax = value[1]
    },

    // Корзина: добавление товара, показ товара в корзине, удаление
    saveBasket: (state) => {
      window.localStorage.setItem('basketContent', JSON.stringify(state.basketContent))
      window.localStorage.setItem('cartCount', state.cartCount)
    },
    SETProductToBasket: (state, allDetailProduct) => {
      let newItem = state.basketContent.find(object => object.idProduct=== allDetailProduct.idProduct)
      
      if (newItem) {
        newItem.quantity ++
        newItem.totalPrice = newItem.quantity * newItem.priceProduct
      } else {
        state.basketContent.push(allDetailProduct)

        Vue.set(allDetailProduct, 'quantity', 1)
        Vue.set(allDetailProduct, 'totalPrice', allDetailProduct.priceProduct)
      }
      state.cartCount++
      console.log(state.basketContent, '++++')
    },
    removeProductFromBasket: (state, allDetailProduct) => {
      let newItemRemove = state.basketContent.find(object => object.idProduct === allDetailProduct.idProduct)
      if ( newItemRemove.quantity > 0 ) {
        if (newItemRemove) {
          newItemRemove.quantity --
          newItemRemove.totalPrice = newItemRemove.quantity * newItemRemove.priceProduct
          if (state.cartCount > 0) { 
            state.cartCount--
          }
        }
      }
      
    },
    removeAllProduct: (state, allDetailProduct) => {
      let index = state.basketContent.indexOf(allDetailProduct)
      if (index > -1) {
        let product = state.basketContent[index]
        state.cartCount -= product.quantity
        state.basketContent.splice(index, 1)
      }
      if (state.basketContent == 0) {
        localStorage.clear()
      }
    }
  },

  // Действия

  actions: {
    SETCategory: async (context) => {
      await Axios.get('http://localhost:5000/categories')
        .then(categoryAll => {
          console.log(categoryAll, '77777')
          context.commit('SETAllCategory', categoryAll.data.result)
        })
    },
    ProductsFilter: async ( context, payload) => {
        await Axios.get('http://localhost:5000/products?valueMin=' + payload.min + '&valueMax=' + payload.max + '&limit=5&numberpage='+ payload.page)
          .then(filtredProducts => {
            context.commit('SETfiltredProducts', filtredProducts.data.result)
            console.log(filtredProducts, '---------------')
          })
      
    },
    ProductsOnPage: async ( context, page) => {
        await Axios.get('http://localhost:5000/paginationcontent?limit=12&numberpage=' + page)
        .then(resultBackend => {
          context.commit('SETProductToPage', resultBackend.data.result.product)
          context.commit('SETCountProductPage', resultBackend.data.result.count_page)
          console.log(resultBackend, 'tytytytytytyty')
        })
    }
  }
})
