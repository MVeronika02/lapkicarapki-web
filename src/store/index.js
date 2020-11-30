import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)
let basketContent = window.localStorage.getItem('basketContent')
let cartCount = window.localStorage.getItem('cartCount')
let backendServerUrl = "http://localhost:5000"
export default new Vuex.Store({
  state: {
    allCategoryAnimal: [],
    allProducts: [],
    filtredCategory: [],
    filterCategoryOneAnimal: [],
    filterProductsForOneCategory: [],
    basketContent: basketContent ? JSON.parse(basketContent) : [],
    cartCount: cartCount ? parseInt(cartCount) : 0,
    productPageNumber: 0,
    filtredProductData: [],
    valueMin: 0,
    valueMax: 0,
    countProductPage: 0,
    allReviews: [],
    countPageReview: 0,
    user: Boolean,
    userData: [],
    // user : {
    //   metaData : {},
    //   presence: undefined
    // }, 
    ninja: false,
    localValue: 0,
  },

  getters: {
    auth(state) {
      console.log(state.user, 'getter')
      return state.user
    }
  },

  //Мутации
  mutations: {
    SETAllCategory: (state, categoryAll) => {
      state.allCategoryAnimal = categoryAll
    },
    // SETProducts: (state, allProducts) => {
    //   console.log(allProducts, 'all')
    //   state.allProducts = allProducts
      
    // },
    SETfiltredProducts: (state, filtredProducts) => {
      state.filtredProductData = filtredProducts
    },
    SETProductToPage: (state, selectedPage) => {
      state.allProducts = selectedPage
    },
    SETCountProductPage: (state, countPage) => {
      state.countProductPage = countPage
    },
    filterCategory: (state, idAnimal) => {
      state.filtredCategory = state.allCategoryAnimal.filter(object => object.id_animal === idAnimal)
    },
    filterCategoryOneAnimal: (state, idAnimal) => {
      state.filterCategoryOneAnimal = state.allCategoryAnimal.filter(object => object.id_animal === idAnimal)
    },
    filterProductsForOneCategory: (state, products) => {
      console.log(products, "pro")
      state.filterProductsForOneCategory = products
    },
    SETFilterKey: (state, key) => {
      state.filtredProductKey = key
    },
    SETvalueMinMax: (state, value) => {
      state.valueMin = value[0]
      state.valueMax = value[1]
    },
    SETUser: (state, resultBool) => {
      state.user = resultBool.success
      state.userData = resultBool.result
      window.localStorage.setItem('key', resultBool.token)
      state.localValue = localStorage.getItem('key')
    },
    SETReviewsToPage: (state, selectedReviews) => {
      state.allReviews = selectedReviews
    },
    SETReviews: (state, countReviews) => {
      state.countPageReview = countReviews
    },
    

    // Корзина: добавление товара, показ товара в корзине, удаление
    saveBasket: (state) => {
      window.localStorage.setItem('basketContent', JSON.stringify(state.basketContent))
      window.localStorage.setItem('cartCount', state.cartCount)
    },
    SETProductToBasket: (state, allDetailProduct) => {
      let newItem = state.basketContent.find(object => object.idProduct === allDetailProduct.idProduct)

      if (newItem) {
        newItem.quantity++
        newItem.totalPrice = newItem.quantity * newItem.priceProduct
      } else {
        state.basketContent.push(allDetailProduct)

        Vue.set(allDetailProduct, 'quantity', 1)
        Vue.set(allDetailProduct, 'totalPrice', allDetailProduct.priceProduct)
      }
      state.cartCount++
    },
    removeProductFromBasket: (state, allDetailProduct) => {
      let newItemRemove = state.basketContent.find(object => object.idProduct === allDetailProduct.idProduct)
      if (newItemRemove.quantity > 0) {
        if (newItemRemove) {
          newItemRemove.quantity--
          newItemRemove.totalPrice = newItemRemove.quantity * newItemRemove.priceProduct
          
        }
      }
      if (state.cartCount > 0) {
        state.cartCount--
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
      await Axios.get(backendServerUrl + '/categories')
        .then(categoryAll => {
          context.commit('SETAllCategory', categoryAll.data.result)
        })
    },
    ProductsFilter: async (context, payload) => {
      await Axios.get(backendServerUrl + '/products?valueMin=' + payload.min + '&valueMax=' + payload.max + '&limit=5&numberpage=' + payload.page)
        .then(filtredProducts => {
          context.commit('SETfiltredProducts', filtredProducts.data.result)
        })

    },
    ProductsOnPage: async (context, page) => {
      await Axios.get(backendServerUrl + '/paginationcontent?limit=12&numberpage=' + page)
        .then(resultBackend => {
          context.commit('SETProductToPage', resultBackend.data.result.product)
          // context.commit('filterProductsForOneCategory', resultBackend.data.result.product)
          context.commit('SETCountProductPage', resultBackend.data.result.count_page)
        })
    },
    ProductsForOneCategory: async (context, payload) => {
      await Axios.get(backendServerUrl + '/products?animal=' + payload.idAnimal + '&category=' + payload.idCategory)
        .then(productsCategory => {
          // context.commit('SETProductToPage', resultBackend.data.result.product)
          context.commit('filterProductsForOneCategory', productsCategory.data.result.product)
          // context.commit('SETCountProductPage', resultBackend.data.result.count_page)
        })
    },
    UserLogin: async (context, payload) => {
      await Axios.get(backendServerUrl + '/user?login=' + payload.login + '&password=' + payload.password)
        .then(answerBool => {
          context.commit('SETUser', answerBool.data)
          console.log(answerBool.data, 'lllllll')
        })
    },
    ReviewsOnPage: async (context, payload) => {
      await Axios.get(
        backendServerUrl + "/inforeviews?productid=" + payload.id + "&offset=" + payload.page + "&limit=3"
      ).then((reviewsProduct) => {
        context.commit('SETReviews', reviewsProduct.data.count_page)
        context.commit('SETReviewsToPage', reviewsProduct.data.result)
        // this.allReviews = reviewsProduct.data.result;
        // this.countPage = reviewsProduct.data.count_page;
        console.log(reviewsProduct.data.result, 'reviewsProduct.data.result')
      });
    }
  }
})
